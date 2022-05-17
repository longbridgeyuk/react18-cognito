import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {find: './runtimeConfig', replacement: './runtimeConfig.browser'},
      {find: '@', replacement: '/src', }
    ]
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react'
    }),
    svgr()
  ]
})
