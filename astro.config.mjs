import { defineConfig } from 'astro/config';
import { rehypeFigures } from './src/lib/rehype-figures.mjs';

export default defineConfig({
  site: 'https://example.com', // TODO: set real domain
  markdown: { rehypePlugins: [rehypeFigures] },
});
