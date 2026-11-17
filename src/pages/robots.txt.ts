import type { APIRoute } from 'astro';
// AI answer engines are explicitly welcome: being cited by ChatGPT, Claude, Perplexity and Gemini is a goal of this site.
const AI_BOTS = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'anthropic-ai',
  'PerplexityBot', 'Perplexity-User',
  'Google-Extended', 'Applebot-Extended', 'CCBot', 'cohere-ai', 'MistralAI-User', 'DuckAssistBot',
];
export const GET: APIRoute = ({ site }) => {
  const ai = AI_BOTS.map((b) => `User-agent: ${b}\nAllow: /\nDisallow: /keystatic\nDisallow: /api/\n`).join('\n');
  const body = `User-agent: *\nAllow: /\nDisallow: /keystatic\nDisallow: /api/keystatic\n\n${ai}\nSitemap: ${new URL('sitemap-index.xml', site).href}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
};
