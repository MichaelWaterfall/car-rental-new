import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
//import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  /*
  root: 'client',
  build: {
    emptyOutDir: true,
    outDir: '../src/index.html',
  },
  */
  plugins: [react()],
});
