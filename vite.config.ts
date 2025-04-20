import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import commonjs from 'vite-plugin-commonjs';

export default defineConfig({
  plugins: [react(), commonjs()],
  build: {
    outDir: 'build',
  },
  server: {
    open: true,
  },
  resolve: {
    alias: {
      // Add aliases if needed, e.g.:
      // '@': '/src',
    },
  },
});
