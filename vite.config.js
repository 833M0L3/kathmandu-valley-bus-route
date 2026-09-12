import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: './', // Ensures relative assets for GitHub Pages and Cloudflare Pages
  build: {
    copyPublicDir: true, // Copy public/tiles/ into dist/ during build (required for Cloudflare deployment)
  },
})
