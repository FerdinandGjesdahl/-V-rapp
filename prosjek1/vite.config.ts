import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/project1/', // Denne kan du beholde for produksjonsbygg
  plugins: [react()],
  server: {
    open: true,
    proxy: {
      '/weatherapi': {
        target: 'https://api.met.no',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/weatherapi/, ''),
      },
    },
  },
  build: {
    outDir: 'build', // Output-mappen settes til 'build'
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/test/setup.ts',
  },
});