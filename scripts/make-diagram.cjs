// Usage: node scripts/make-diagram.cjs <slug> <file-name-without-ext> "Caption title" "Step 1|Step 2|Step 3|..."
// Writes public/images/blog/<slug>/<file-name>.webp, a flow diagram (original artwork, 4 to 7 steps).
const fs = require('fs'), path = require('path');
let chromium; try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/npm-tools/node_modules/playwright')); }
const [slug, name, heading, stepsRaw] = process.argv.slice(2); const steps = stepsRaw.split('|');
const out = path.join(__dirname, '..', 'public', 'images', 'blog', slug); fs.mkdirSync(out, { recursive: true });
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const cols = steps.length > 4 ? 4 : steps.length;
const html = `<html><body style="margin:0;width:1400px;background:#0a0f1c;font-family:'Space Grotesk',Inter,Helvetica,sans-serif;color:#e8eef9;padding:56px 64px;box-sizing:border-box">
<div style="font:600 20px monospace;letter-spacing:.12em;color:#38b6ff;text-transform:uppercase">How it works</div>
<div style="font-size:42px;font-weight:700;margin:10px 0 36px;letter-spacing:-1px">${esc(heading)}</div>
<div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:28px 44px">
${steps.map((s, i) => `<div style="position:relative;border:1px solid #243255;background:#101a33;border-radius:18px;padding:22px 22px 24px;min-height:120px">
<div style="width:38px;height:38px;border-radius:50%;background:#38b6ff;color:#06121f;font-weight:700;display:grid;place-items:center;margin-bottom:12px">${i + 1}</div>
<div style="font-size:24px;line-height:1.25;font-weight:600">${esc(s.trim())}</div>
${(i + 1) % cols !== 0 && i < steps.length - 1 ? '<div style="position:absolute;right:-38px;top:50%;font-size:30px;color:#38b6ff">→</div>' : ''}</div>`).join('')}
</div><div style="margin-top:34px;font-size:22px;font-weight:700;color:#8fa0bc">George<span style="color:#38b6ff">TheDeveloper</span></div></body></html>`;
(async () => {
  const b = await chromium.launch({ executablePath: fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined });
  const p = await b.newPage({ viewport: { width: 1400, height: 400 } });
  await p.setContent(html); const png = path.join(out, name + '.png'); await p.screenshot({ path: png, fullPage: true }); await b.close();
  try { require('child_process').execSync(`python3 -c "from PIL import Image;Image.open('${png}').convert('RGB').save('${png.replace('.png', '.webp')}',quality=85)" && rm '${png}'`); } catch {}
  console.log('diagram ->', out);
})();
