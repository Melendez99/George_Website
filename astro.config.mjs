import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// Priority: SITE_URL env var, then Vercel's production URL (picks up a custom domain automatically), then the current live address.
const site =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'https://george-website-seven.vercel.app');

// Astro only trusts the forwarded host header for domains listed here. Without this, OAuth redirects on Vercel point at localhost.
const siteHost = new URL(site).hostname;
const allowedDomains = [
  { protocol: 'https', hostname: siteHost },
  { protocol: 'https', hostname: '**.vercel.app' },
];

export default defineConfig({
  site,
  security: { allowedDomains },
  // Pages are pre-rendered (static). Only the /keystatic editor and its API run on demand.
  adapter: vercel(),
  integrations: [mdx(), react(), keystatic(), sitemap({ filter: (page) => !page.includes('/keystatic') })],
  vite: { plugins: [tailwindcss()], optimizeDeps: { exclude: ['astro:env/server', '@keystatic/astro'] } },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
