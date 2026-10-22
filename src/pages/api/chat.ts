import type { APIRoute } from 'astro';
import { SITE } from '../../config';
import { services } from '../../data/services';

export const prerender = false;

const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 15;
}

const contact = `Reach George here:\nBook a free call: ${SITE.bookUrl}\nWhatsApp: https://wa.me/${SITE.whatsapp}\nEmail: ${SITE.email}\nUpwork: ${SITE.links.upwork}`;

const SYSTEM = `You are the website assistant for ${SITE.person} (${SITE.name}), a freelance AI automation developer in ${SITE.location}. You are an AI, not George, and you say so if asked.
Facts you can use:
- George builds automations with n8n, Make.com, GoHighLevel, Zapier, AI voice agents (Retell AI, Vapi), Twilio, Airtable, Supabase, Claude and OpenAI.
- He is Top Rated on Upwork with a 100% Job Success Score.
- Services: ${services.map((s) => `${s.title} (${s.short})`).join('; ')}.
- Case studies on the site include a missed-call text-back and AI booking agent, a webinar funnel, AI sales-call analysis, a clip publishing pipeline, an Instagram lead pipeline, an SEO blog engine, a vacation-rental portfolio intelligence system and a healthcare membership email automation.
- Pages on the site (you can send visitors to them by writing the path): /work (case studies and Loom videos), /services, /packages (free audit, single automation, full system, monthly support; all quoted after a free call), /industries (real estate, home services, coaches and sales, creators, e-commerce), /free-workflows (6 free downloadable n8n workflows), /blog, /reviews, /about, /book (free consultation and audit), /contact, /scorecard (free automation scorecard).
- The first call is free and can include an audit of the visitor's current tools and processes.
- ${contact}
Rules: when it helps, tell visitors which page to open and write its path, for example /packages. You are named "George's AI assistant".
Rules: keep answers under 90 words, plain and friendly, no markdown headings. Never invent prices, timelines, discounts or client results. If asked for a quote or price, say it depends on scope and point to booking a call. If you do not know, say so and give the contact options. Only discuss George's work and general automation questions.`;

const FAQ: Array<[RegExp, string]> = [
  [/package|plan|tier/i, 'There are four ways to work together: a free audit, a single automation, a full system and monthly support. Every project is quoted after a free call. See /packages for the details, or book at /book.'],
  [/free workflow|template|download|json|import/i, 'George shares six free n8n workflows you can download and import. Open /free-workflows. If you want one set up and tested for you, book a free call at /book.'],
  [/audit|consult/i, 'The first call is free. George can review your current tools and processes and tell you what is worth automating first. Book it at /book.'],
  [/industr|real estate|ecommerce|e-commerce|coach|agency|creator/i, 'George has pages for real estate, home services, coaches and sales teams, creators and e-commerce. Open /industries to find yours, or /work for case studies.'],
  [/pric|cost|quote|rate|how much|budget|charge|fee/i, `Pricing depends on what you need built. Small fixes and first workflows are quick; larger systems are split into milestones. The fastest way to get a real number is a short call. ${contact}`],
  [/n8n|make|zapier|ghl|gohighlevel|tool|stack/i, 'George works with n8n, Make.com, Zapier, GoHighLevel, Retell AI, Vapi, Twilio, Airtable, Supabase, Claude and OpenAI. He picks the tool that fits your process rather than forcing one.'],
  [/can you|could you|do you|integrat|automate|connect|sync|xero|quickbooks|shopify|stripe|hubspot|salesforce|zoho|notion|slack|gmail|invoice/i, `Most likely yes. George connects apps through their APIs and webhooks, so it comes down to whether your tool offers one. Tell him what you use and what should happen automatically, and he will confirm what is possible. ${contact}`],
  [/missed call|voice|phone|receptionist|calls?/i, 'Yes. George builds missed-call text-back and AI voice agents that answer, qualify the caller and book into your calendar. There is a full walkthrough video on the Work page.'],
  [/example|portfolio|work|case|proof|video/i, 'Open the Work page to see case studies with Loom walkthroughs and the real workflow screenshots, covering booking agents, webinar funnels, lead pipelines and content engines.'],
  [/start|hire|book|call|contact|talk|reach/i, `The easiest start is a free call to talk through what you want automated. ${contact}`],
  [/who|george|about|experience|upwork|review/i, 'George Melody is a freelance AI automation developer in Lagos, Top Rated on Upwork with a 100% Job Success Score. The Reviews page has real client feedback.'],
];

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const json = (reply: string, status = 200) => new Response(JSON.stringify({ reply }), { status, headers: { 'content-type': 'application/json' } });
  let body: any;
  try { body = await request.json(); } catch { return json('Sorry, I could not read that.', 400); }
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || clientAddress || 'anon';
  if (limited(ip)) return json(`You have sent a lot of messages. For anything else, ${contact}`, 429);

  const msgs = (Array.isArray(body?.messages) ? body.messages : [])
    .filter((m: any) => (m?.role === 'user' || m?.role === 'assistant') && typeof m?.content === 'string')
    .slice(-8)
    .map((m: any) => ({ role: m.role as string, content: String(m.content).slice(0, 500) }));
  const last = msgs.filter((m: any) => m.role === 'user').pop();
  if (!last) return json('Ask me anything about George\'s work.', 400);

  const key = process.env.GEMINI_API_KEY || (import.meta as any).env?.GEMINI_API_KEY;
  if (key) {
    try {
      const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM }] },
          contents: msgs.map((m: any) => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] })),
          generationConfig: { maxOutputTokens: 300, temperature: 0.4 },
        }),
      });
      if (r.ok) {
        const d: any = await r.json();
        const text = d?.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join('')?.trim();
        if (text) return json(text);
      }
    } catch { /* fall through to the built-in answers */ }
  }
  const hit = FAQ.find(([re]) => re.test(last.content));
  return json(hit ? hit[1] : `I am an automated assistant and may not have that answer, but George can help directly. ${contact}`);
};
