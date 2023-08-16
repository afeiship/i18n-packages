import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import requireTransform from 'vite-plugin-require-transform';

// import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
// https://github.com/antfu/vite-plugin-pwa

export default defineConfig({
  root: 'public',
  base: '',
  build: {
    outDir: '../docs',
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@': 'src'
    }
  },
  // vite copy public assets

  plugins: [
    reactRefresh(),
    viteStaticCopy({
      targets: [
        {
          src: './locales',
          dest: '.'
        }
      ]
    }),
    requireTransform({
      fileRegex: /.ts$|.tsx$/
    })
  ]
});
