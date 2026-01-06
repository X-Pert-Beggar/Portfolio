// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://votre-portfolio.vercel.app', // TODO: Remplacer par votre URL finale Vercel
  output: 'static', // Mode statique pour une performance maximale sur Vercel
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  integrations: [react(), markdoc(), sitemap()],
  prefetch: true,
  compressHTML: true,
  build: {
    inlineStylesheets: 'always',
  },
});
