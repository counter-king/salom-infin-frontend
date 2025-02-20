import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import Icons from 'unplugin-icons/vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from 'unplugin-vue-components/resolvers'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      registerType: 'prompt',
      injectRegister: false,

      // pwaAssets: {
      //   disabled: false,
      //   config: true,
      // },

      manifest: {
        name: 'pwa-test-second',
        short_name: 'pwa-test-second',
        description: 'pwa-test-second',
        theme_color: '#ffffff',
      },

      injectManifest: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      },

      devOptions: {
        enabled: true,
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module',
      },
    }),
    Icons({ compiler: 'vue3' }),
    svgLoader({
      defaultImport: 'url'
    }),
    Components({
      resolvers: [PrimeVueResolver()],
      dirs: ['src/components/UI'],
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // build: {
  //   rollupOptions: {
  //     output: {
  //       entryFileNames: `assets/[name].[hash].${Math.floor(Math.random() * 9999)}.js`,
  //       chunkFileNames: `assets/[name].[hash].${Math.floor(Math.random() * 9999)}.js`,
  //       assetFileNames: `assets/[name].[hash].${Math.floor(Math.random() * 9999)}.[ext]`,
  //     },
  //   },
  // },
})
