import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use '/src/styles/_vars.scss' as *;
          @use '/src/styles/_mixins.scss' as *;
          @use 'include-media/dist/_include-media.scss' as *;
        `,
      },
    },
  },
});
