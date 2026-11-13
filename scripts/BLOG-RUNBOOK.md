# Blog runbook (scheduled posts for GeorgeTheDeveloper)

Goal: publish ONE useful, accurate blog post per run, with images, for SEO. Two runs a day.

## Steps
1. `git pull`. Read `scripts/blog-queue.md`. Pick the first topic not marked `[x]`. Also `ls src/content/blog` so you never repeat a slug or topic.
2. Write `src/content/blog/<slug>.mdx` (frontmatter fields: title, description under 160 chars, date = today as YYYY-MM-DD, tags, cover, draft false). Quote the title if it has a colon.
3. Length 700 to 1000 words. Structure: one-paragraph answer up front, H2 sections, a numbered "how it works" list, a "what you need" list, 3 FAQ questions in bold, one internal link to a related post or case study, one closing line linking /book. Use plain words. No em dashes. No hype, no filler openers.
4. Images, both required:
   - Cover: `node scripts/make-cover.cjs <slug> "<Title>" "<Tag1>" "<Tag2>"` then `cover: /images/blog/<slug>/cover.png`.
   - One inline image with descriptive alt text: a flow diagram via `node scripts/make-diagram.cjs <slug> <name> "<Heading>" "Step|Step|Step|Step"` and reference `/images/blog/<slug>/<name>.webp`. If the post is about something George really built, use the matching screenshot from `src/assets/work/` instead (copy a resized webp to `public/images/blog/<slug>/`), and say "one of my builds, shown unedited".
5. Accuracy rules: never invent clients, prices, results, metrics, quotes or statistics. Describe what tools can do in general terms. Only describe George's own work using facts in `src/content/work/*.mdx`. Do not copy text from other websites. Tell readers to check local rules on texting, calls and data privacy where relevant.
6. Internal links must exist: check against `ls src/content/blog`, `src/content/work`, and pages /book /packages /free-workflows /industries /services.
7. `npm run build`. It must finish with no errors (YAML errors usually mean an unquoted colon).
8. Mark the topic `[x]` in `scripts/blog-queue.md`. Commit and push to main:
   `git add -A && git commit -m "Blog: <title>"` with these trailers:
   `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>` and `Claude-Session: <this session URL>`. Then `git push origin main`. Vercel deploys on push.
9. Finish with one line: title and slug published. If anything failed, say what and stop without pushing broken content.
