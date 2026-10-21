# GeorgeTheDeveloper

Portfolio and blog built with Astro, Tailwind CSS and MDX. Deployed on Vercel.

## Commands
- `npm install` then `npm run dev` for local development
- `npm run build` to build, `npm run preview` to preview the build

## Edit your content
- Personal details, links, roles, stats: `src/config.ts`
- Services: `src/data/services.ts`
- Case studies: add a markdown file in `src/content/work/`
- Testimonials: `src/data/testimonials.json` (array of `{ quote, name, role, company, source }`)
- Blog posts: add a markdown file in `src/content/blog/` with `title`, `description` (max 170 chars), `date`, `tags`. Set `draft: true` to hide a post.
- Cover/OG image: replace `public/og.png` (1200x630)

## Deploy
Import this repo in Vercel (framework: Astro). `SITE_URL` is optional. The site reads Vercel's production URL automatically, including a custom domain once added.
