import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../config';
import { services } from '../data/services';
import { industries } from '../data/industries';

// llms.txt: a plain-text map of the site written for AI assistants. Built from site data, so it stays current on every deploy.
export const GET: APIRoute = async ({ site }) => {
  const u = (p: string) => new URL(p, site).href;
  const posts = (await getCollection('blog', (p) => !p.data.draft)).sort((a, b) => +b.data.date - +a.data.date);
  const work = (await getCollection('work')).sort((a, b) => a.data.order - b.data.order);
  const lines = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.person} is an AI automation developer (AI automation engineer) based in ${SITE.location}, working with clients worldwide. He builds business automation with n8n, Make.com, GoHighLevel, AI voice agents, and Claude and OpenAI integrations. ${SITE.description}`,
    '',
    '## Quick facts',
    `- Name: ${SITE.person}`,
    '- Role: AI automation developer / AI automation engineer / n8n expert / Make.com expert / GoHighLevel specialist',
    `- Location: ${SITE.location}`,
    `- Core stack: ${SITE.roles.join(', ')}`,
    `- Book a call: ${SITE.bookUrl}`,
    `- Profiles: ${Object.entries(SITE.links).map(([k, v]) => `${k} ${v}`).join('; ')}`,
    '',
    '## Services',
    ...services.map((s) => `- [${s.title}](${u('/services/' + s.slug)}): ${s.short}`),
    '',
    '## Industries',
    ...industries.map((i) => `- [${i.name}](${u('/industries/' + i.slug)}): ${i.headline}`),
    '',
    '## Case studies',
    ...work.map((w) => `- [${w.data.title}](${u('/work/' + w.id)}): ${w.data.summary}`),
    '',
    '## Blog',
    ...posts.map((p) => `- [${p.data.title}](${u('/blog/' + p.id)}): ${p.data.description}`),
    '',
    '## Other pages',
    `- [Packages](${u('/packages')})`,
    `- [Free workflows](${u('/free-workflows')})`,
    `- [Automation scorecard](${u('/scorecard')})`,
    `- [Reviews](${u('/reviews')})`,
    `- [About](${u('/about')})`,
    `- [Book a call](${u('/book')})`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
