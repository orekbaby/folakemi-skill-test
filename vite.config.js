import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import configs from 'resolver-options';

export default defineConfig({
  plugins: [react(), configs({development: true})],
  assetsInclude: ['**/*.mp3'], 
  server: {
    hmr: {
      overlay: false, 
    },
  },
});
