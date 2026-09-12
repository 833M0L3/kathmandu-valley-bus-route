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
    copyPublicDir: false, // Tiles are directly junctioned to dist/tiles
  },
})
