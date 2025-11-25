import masculinoData from '../data/masculino.json';
import femeninoData from '../data/femenino.json';

const SITE = import.meta.env.SITE ?? 'https://baby-baloncesto-2025.vercel.app';

export const GET = () => {
  const hostname = SITE.replace(/\/$/, '');
  const lastmod = new Date().toISOString();

  const basePages = ['/', '/masculino/', '/femenino/', '/agradecimientos/'];

  const phaseUrls: string[] = [];

  try {
    const mPhases = Array.isArray((masculinoData as any).phases) ? (masculinoData as any).phases : [];
    const fPhases = Array.isArray((femeninoData as any).phases) ? (femeninoData as any).phases : [];

    mPhases.forEach((p: any) => {
      if (p && p.id) phaseUrls.push(`/masculino/${encodeURIComponent(p.id)}`);
    });

    fPhases.forEach((p: any) => {
      if (p && p.id) phaseUrls.push(`/femenino/${encodeURIComponent(p.id)}`);
    });
  } catch (err) {
    // ignore and continue with base pages
  }

  const pages = [...basePages, ...phaseUrls];

  const urls = pages.map(p => {
    return `  <url>\n    <loc>${hostname}${p}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${urls}\n` +
    `</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml'
    }
  });
};

export default GET;
