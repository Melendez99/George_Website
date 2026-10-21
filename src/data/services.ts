import n8nImg from '../assets/services/n8n.webp';
import makeImg from '../assets/services/make.webp';
import voiceImg from '../assets/services/ai-voice.webp';
import crmImg from '../assets/services/gohighlevel.webp';
import agentsImg from '../assets/services/ai-agents.webp';
import webImg from '../assets/services/websites.webp';

export interface Service {
  image: ImageMetadata;
  slug: string;
  title: string;
  short: string;
  intro: string;
  bullets: string[];
  stack: string[];
  faq: { q: string; a: string }[];
  icon: string;
}

export const services: Service[] = [
  {
    slug: 'n8n-automation',
    image: n8nImg,
    title: 'n8n Workflow Automation',
    short: 'Self-hosted or cloud workflows that connect your tools and run without you.',
    intro:
      'I build n8n workflows for lead handling, webinar funnels, content pipelines and internal ops. You get a system that runs on its own, with error alerts so you hear about problems before your clients do.',
    bullets: [
      'Lead capture, enrichment and routing into your CRM',
      'Webinar and event sequences with email, SMS and WhatsApp',
      'Content pipelines from idea to published post',
      'Error handling, retries and Slack or email alerts',
    ],
    stack: ['n8n', 'Airtable', 'Supabase', 'Twilio', 'Claude API', 'OpenAI'],
    faq: [
      { q: 'Can you work inside my existing n8n instance?', a: 'Yes. I can build in your cloud or self-hosted instance, or set one up for you.' },
      { q: 'What happens when a workflow breaks?', a: 'Every workflow I ship has error alerts and retry logic, plus a short handover doc.' },
    ],
    icon: 'workflow',
  },
  {
    slug: 'make-automation',
    image: makeImg,
    title: 'Make.com Automation',
    short: 'Scenarios that move data between your apps and cut manual work.',
    intro:
      'Make.com is the fastest route for many small and mid-size businesses. I design scenarios that are easy to read, easy to hand over, and cheap to run.',
    bullets: [
      'Multi-step scenarios with routers, filters and iterators',
      'CRM, spreadsheet and email syncing',
      'AI steps for classification, summaries and replies',
      'Clean naming and notes so your team can maintain it',
    ],
    stack: ['Make.com', 'Airtable', 'Stripe', 'Google Workspace', 'WordPress REST API'],
    faq: [
      { q: 'Make or n8n, which should I pick?', a: 'Make suits quick builds and non-technical teams. n8n suits heavier logic and lower running costs at volume. I will tell you which fits your case.' },
    ],
    icon: 'zap',
  },
  {
    slug: 'ai-voice-agents',
    image: voiceImg,
    title: 'AI Voice Agents',
    short: 'Phone agents that answer, qualify and book, around the clock.',
    intro:
      'I build voice agents on Retell AI, Vapi and ElevenLabs, wired into your calendar, CRM and messaging so every call ends with a clear next step.',
    bullets: [
      'Inbound answering and lead qualification',
      'Missed-call follow-up by text or WhatsApp',
      'Appointment booking with calendar sync',
      'Call summaries and transcripts pushed to your CRM',
    ],
    stack: ['Retell AI', 'Vapi', 'ElevenLabs', 'Twilio', 'GoHighLevel'],
    faq: [
      { q: 'Will callers know it is an AI?', a: 'You decide. I can script a natural greeting that is upfront about it, and a clean handoff to a human.' },
    ],
    icon: 'mic',
  },
  {
    slug: 'gohighlevel-crm',
    image: crmImg,
    title: 'GoHighLevel CRM Systems',
    short: 'Pipelines, follow-ups and automations inside GoHighLevel.',
    intro:
      'I audit and build GoHighLevel setups so leads move through your pipeline without anyone chasing them by hand.',
    bullets: [
      'CRM audits and pipeline clean-up',
      'Automated follow-up by email, SMS and voice',
      'Webinar, booking and reactivation campaigns',
      'Custom integrations through n8n and webhooks',
    ],
    stack: ['GoHighLevel', 'n8n', 'Twilio', 'Zoom'],
    faq: [
      { q: 'Do you migrate from another CRM?', a: 'Yes. I map your fields, import your contacts and rebuild the automations.' },
    ],
    icon: 'layers',
  },
  {
    slug: 'ai-agents-integrations',
    image: agentsImg,
    title: 'AI Agents and Integrations',
    short: 'Claude and OpenAI wired into the way your business already works.',
    intro:
      'I connect Claude and OpenAI to your data and tools: research agents, content engines, sales-call analysis, and internal assistants that do a real job.',
    bullets: [
      'Sales-call analysis and scoring',
      'Content engines with human review steps',
      'Data pipelines with AI classification and enrichment',
      'Custom agents with tool access and guardrails',
    ],
    stack: ['Claude API', 'OpenAI', 'n8n', 'Make.com', 'Supabase'],
    faq: [
      { q: 'Is my data safe?', a: 'I use your own API keys and keep credentials in the platform vault. Nothing is stored on my side after handover.' },
    ],
    icon: 'cpu',
  },
  {
    slug: 'websites-and-apps',
    image: webImg,
    title: 'Websites and Apps',
    short: 'Fast sites and web apps, built with modern tooling and AI-assisted workflows.',
    intro:
      'I build websites, dashboards and small apps with Astro, Next.js, Supabase and AI-assisted coding, then deploy them on Vercel with SEO in place from day one.',
    bullets: [
      'Marketing sites and blogs that load fast and rank',
      'Dashboards and internal tools on Supabase',
      'Mobile apps for iOS and Android',
      'WordPress builds and fixes when that is the right call',
    ],
    stack: ['Astro', 'Next.js', 'Supabase', 'Vercel', 'WordPress', 'Lovable', 'Replit'],
    faq: [
      { q: 'Do you handle hosting?', a: 'I set up hosting on Vercel or your provider and hand you the accounts.' },
    ],
    icon: 'code',
  },
];
