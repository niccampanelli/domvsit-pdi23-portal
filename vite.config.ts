import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    modules: {
      generateScopedName: '[name]__[local]__[hash:base64:5]',
    }
  },
  plugins: [svgr(), react()],
  server: {
    port: 3000,
  }
})
