import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    globals: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Pure-function tests don't import CSS. Explicitly set empty PostCSS plugins
  // so Vite doesn't auto-discover postcss.config.mjs (which uses the Tailwind v4
  // plugin format that Vite's CJS-side dep can't parse).
  css: {
    postcss: { plugins: [] },
  },
});
