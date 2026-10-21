import type { ImageMetadata } from 'astro';
const all = import.meta.glob<{ default: ImageMetadata }>('/src/assets/work/*.{png,jpg,jpeg,webp}', { eager: true });
export function workImage(file: string): ImageMetadata | undefined {
  return all[`/src/assets/work/${file}`]?.default;
}
export function loomEmbed(url: string): string | null {
  const m = url.match(/loom\.com\/(?:share|embed)\/([a-f0-9]{32})/i);
  return m ? `https://www.loom.com/embed/${m[1]}` : null;
}
