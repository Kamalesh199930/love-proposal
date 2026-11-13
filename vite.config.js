import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  preview: {
    allowedHosts: true,
    host: true,
    port: 4173,
  },
  server: {
    allowedHosts: true,
    host: true,
  },
});
