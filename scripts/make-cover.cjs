// Usage: node scripts/make-cover.cjs <slug> "<Title>" "<Tag 1>" "<Tag 2>"
// Writes public/images/blog/<slug>/cover.png (1200x630).
const fs = require('fs'), path = require('path');
let chromium; try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/npm-tools/node_modules/playwright')); }
const [slug, title, a = 'Automation', c = ''] = process.argv.slice(2);
const out = path.join(__dirname, '..', 'public', 'images', 'blog', slug); fs.mkdirSync(out, { recursive: true });
const seed = [...slug].reduce((s, ch) => s + ch.charCodeAt(0), 0), x1 = 10 + (seed % 40), x2 = 60 + (seed % 30);
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const pill = (t, col) => `<span style="padding:8px 18px;border:1px solid #1e2a44;border-radius:99px;background:#111a2e;color:${col}">${esc(t)}</span>`;
const html = `<html><body style="margin:0;width:1200px;height:630px;background:#0a0f1c;font-family:'Space Grotesk',Inter,Helvetica,sans-serif;color:#e8eef9;position:relative;overflow:hidden">
<div style="position:absolute;inset:0;background:radial-gradient(40% 60% at ${x1}% 25%,rgba(56,182,255,.38),transparent 70%),radial-gradient(35% 55% at ${x2}% 85%,rgba(124,92,255,.32),transparent 70%)"></div>
<div style="position:absolute;left:80px;top:80px;display:flex;gap:12px;font:600 22px monospace;letter-spacing:.1em">${pill(a, '#38b6ff')}${c ? pill(c, '#8fa0bc') : ''}</div>
<div style="position:absolute;left:80px;top:190px;width:1020px;font-size:${title.length > 70 ? 56 : 68}px;font-weight:700;line-height:1.1;letter-spacing:-1.5px">${esc(title)}</div>
<div style="position:absolute;left:80px;bottom:70px;font-size:34px;font-weight:700">George<span style="color:#38b6ff">TheDeveloper</span></div></body></html>`;
(async () => {
  const b = await chromium.launch({ executablePath: fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined });
  const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  await p.setContent(html); await p.screenshot({ path: path.join(out, 'cover.png') }); await b.close(); console.log('cover ->', out);
})();
