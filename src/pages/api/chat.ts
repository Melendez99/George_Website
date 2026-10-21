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

const contact = `You can book a call on Upwork (${SITE.bookUrl}), email ${SITE.email}, or message George on WhatsApp (https://wa.me/${SITE.whatsapp}).`;

const SYSTEM = `You are the website assistant for ${SITE.person} (${SITE.name}), a freelance AI automation developer in ${SITE.location}. You are an AI, not George, and you say so if asked.
Facts you can use:
- George builds automations with n8n, Make.com, GoHighLevel, Zapier, AI voice agents (Retell AI, Vapi), Twilio, Airtable, Supabase, Claude and OpenAI.
- He is Top Rated on Upwork with a 100% Job Success Score.
- Services: ${services.map((s) => `${s.title} (${s.short})`).join('; ')}.
- Case studies on the site include a missed-call text-back and AI booking agent, a webinar funnel, AI sales-call analysis, a clip publishing pipeline, an Instagram lead pipeline, an SEO blog engine, a vacation-rental portfolio intelligence system and a healthcare membership email automation.
- ${contact}
Rules: keep answers under 90 words, plain and friendly, no markdown headings. Never invent prices, timelines, discounts or client results. If asked for a quote or price, say it depends on scope and point to booking a call. If you do not know, say so and give the contact options. Only discuss George's work and general automation questions.`;

const FAQ: Array<[RegExp, string]> = [
  [/pric|cost|quote|rate|how much|budget|charge|fee/i, `Pricing depends on what you need built. Small fixes and first workflows are quick; larger systems are split into milestones. The fastest way to get a real number is a short call. ${contact}`],
  [/n8n|make|zapier|ghl|gohighlevel|tool|stack/i, 'George works with n8n, Make.com, Zapier, GoHighLevel, Retell AI, Vapi, Twilio, Airtable, Supabase, Claude and OpenAI. He picks the tool that fits your process rather than forcing one.'],
  [/missed call|voice|phone|receptionist|calls?/i, 'Yes. George builds missed-call text-back and AI voice agents that answer, qualify the caller and book into your calendar. There is a full walkthrough video on the Work page.'],
  [/example|portfolio|work|case|proof|video/i, 'Open the Work page to see case studies with Loom walkthroughs and the real workflow screenshots, covering booking agents, webinar funnels, lead pipelines and content engines.'],
  [/start|hire|book|call|contact|talk|reach/i, `Easy. ${contact}`],
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
  return json(hit ? hit[1] : `I am an automated assistant and I may not have that answer. ${contact}`);
};
