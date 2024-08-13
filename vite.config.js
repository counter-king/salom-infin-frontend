import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import Icons from 'unplugin-icons/vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
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
