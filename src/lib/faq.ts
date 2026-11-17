// Pulls "**Question?**" + answer paragraph pairs from a blog post body so they can be published as FAQPage schema.
export function extractFaq(body = ''): { q: string; a: string }[] {
  const out: { q: string; a: string }[] = [];
  const re = /^\*\*([^*\n]+\?)\*\*\s*\n+([^\n#*-][^\n]*)/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(body))) out.push({ q: m[1].trim(), a: m[2].replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim() });
  return out;
}
