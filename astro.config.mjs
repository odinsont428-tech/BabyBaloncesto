import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://baby-baloncesto-2025.vercel.app',
  integrations: [
    tailwind(),
    sitemap()
  ],
  vite: {
    ssr: {
      external: ['photoswipe']
    }
  }
});