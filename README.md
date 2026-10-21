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

## Contact form
The form posts to a webhook if `PUBLIC_FORM_WEBHOOK` is set in Vercel (point it at an n8n or Make webhook). Without it, the form opens the visitor's email app with the message filled in.

## Blog editor (Keystatic)
Visit `/keystatic` on the live site and sign in with GitHub to write posts and case studies in a browser. Saving commits to this repo and Vercel redeploys.

Required environment variables in Vercel:
- `KEYSTATIC_GITHUB_CLIENT_ID`
- `KEYSTATIC_GITHUB_CLIENT_SECRET`
- `KEYSTATIC_SECRET` (any long random string)
- `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`

Create a GitHub App with callback URL `<site>/api/keystatic/github/oauth/callback`, repository permissions Contents (read and write) and Metadata (read), and install it on this repo.
Locally (`npm run dev`), the editor works without any setup and edits files directly.
