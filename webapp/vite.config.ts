import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      port: +env.PORT,
    },
    preview: {
      port: +env.PORT,
    },
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
  };
});
