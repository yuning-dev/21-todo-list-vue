import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteSSR from 'vite-ssr/plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteSSR({
      base: () => '/api/'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    globals: true,
    environment: "happy-dom",
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      },
    },
  },
})
