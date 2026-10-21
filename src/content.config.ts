import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(170),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const work = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    client: z.string(), // can be anonymized, e.g. "Home-services agency"
    industry: z.string(),
    category: z.enum(['n8n', 'Make.com', 'Voice agents', 'GoHighLevel', 'AI agents', 'Web']),
    stack: z.array(z.string()),
    metrics: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
    cover: z.string().optional(),
    demo: z.string().url().optional(),
    videos: z.array(z.object({ title: z.string(), url: z.string().url() })).default([]),
    gallery: z.array(z.object({ file: z.string(), caption: z.string() })).default([]),
    order: z.number().default(100),
    quote: z.object({ text: z.string(), author: z.string() }).optional(),
  }),
});

export const collections = { blog, work };
