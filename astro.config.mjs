import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Set SITE_URL in Vercel (Project Settings > Environment Variables) once your domain is live.
const site = process.env.SITE_URL || 'https://george-website.vercel.app';

export default defineConfig({
  site,
  integrations: [mdx(), sitemap()],
  vite: { plugins: [tailwindcss()] },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
