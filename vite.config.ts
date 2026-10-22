import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Relative base so the build works at any path, e.g. GitHub Pages /Portfolio/.
  base: './',
  plugins: [react()],
  test: { environment: 'node' },
} as Parameters<typeof defineConfig>[0]);
