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
    VitePWA({
      // registerType: 'autoUpdate',
      manifest: {
        name: "Salom SQB",
        short_name: "SQB document flow",
        theme_color: "#827BFF",
        icons: [
          {
            src: "/images/sqb-logo.svg",
            sizes: "192x192",
            type: "image/svg+xml"
          }
        ]
      },
      devOptions: {
        enabled: true
      }
    }),
    Icons({ compiler: 'vue3' }),
    vue(),
    svgLoader(),
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
  }
})
