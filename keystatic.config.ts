import { config, collection, fields } from '@keystatic/core';

const isProd = import.meta.env.PROD;

export default config({
  storage: isProd
    ? { kind: 'github', repo: { owner: 'Melendez99', name: 'George_Website' } }
    : { kind: 'local' },
  ui: { brand: { name: 'GeorgeTheDeveloper' } },
  collections: {
    blog: collection({
      label: 'Blog posts',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Title', validation: { length: { min: 5 } } } }),
        description: fields.text({
          label: 'Description (shown on Google, max 170 characters)',
          multiline: true,
          validation: { length: { min: 50, max: 170 } },
        }),
        date: fields.date({ label: 'Publish date', defaultValue: { kind: 'today' }, validation: { isRequired: true } }),
        tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags', itemLabel: (p) => p.value }),
        draft: fields.checkbox({ label: 'Draft (hide from the site)', defaultValue: false }),
        content: fields.mdx({ label: 'Post' }),
      },
    }),
    work: collection({
      label: 'Case studies',
      slugField: 'title',
      path: 'src/content/work/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        summary: fields.text({ label: 'Summary', multiline: true }),
        client: fields.text({ label: 'Client (can be anonymous)' }),
        industry: fields.text({ label: 'Industry' }),
        category: fields.select({
          label: 'Category',
          options: ['n8n', 'Make.com', 'Voice agents', 'GoHighLevel', 'AI agents', 'Web'].map((v) => ({ label: v, value: v })),
          defaultValue: 'n8n',
        }),
        stack: fields.array(fields.text({ label: 'Tool' }), { label: 'Tools used', itemLabel: (p) => p.value }),
        metrics: fields.array(
          fields.object({ value: fields.text({ label: 'Value (e.g. 12 hrs/week)' }), label: fields.text({ label: 'Label' }) }),
          { label: 'Results / metrics', itemLabel: (p) => `${p.fields.value.value} ${p.fields.label.value}` },
        ),
        demo: fields.url({ label: 'Demo or Loom link (optional)' }),
        order: fields.integer({ label: 'Sort order (lower shows first)', defaultValue: 100 }),
        content: fields.mdx({ label: 'Case study body' }),
      },
    }),
  },
});
