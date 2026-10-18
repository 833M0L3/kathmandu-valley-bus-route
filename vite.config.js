import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { createHash } from 'node:crypto'
import path from 'node:path'

const PUBLIC_DIR = path.resolve('public')
const TILES_DIR = path.join(PUBLIC_DIR, 'tiles')

// Tile zoom levels small enough (~1.5 MB total) to precache when the service worker installs
const PRECACHE_TILE_MAX_ZOOM = 3

// Public files (besides tiles) the app needs to boot offline
const PUBLIC_SHELL_FILES = [
  'Kathmandu_Bus_Route_Map.svg',
  'manifest.webmanifest',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/apple-touch-icon.png',
]

const shortHash = (input) => createHash('sha256').update(input).digest('hex').slice(0, 12)

// Lists every tile PNG under public/tiles as { path: 'tiles/z/x/y.png', size }
function listTiles() {
  const tiles = []
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const full = path.join(dir, name)
      const stat = statSync(full)
      if (stat.isDirectory()) walk(full)
      else if (name.endsWith('.png')) {
        tiles.push({ path: path.relative(PUBLIC_DIR, full).split(path.sep).join('/'), size: stat.size })
      }
    }
  }
  walk(TILES_DIR)
  return tiles.sort((a, b) => a.path.localeCompare(b.path, 'en', { numeric: true }))
}

// Manifest of all tiles, read by the "Save map offline" downloader. Cache name changes when tiles change.
function buildTilesManifest() {
  const tiles = listTiles()
  const version = shortHash(tiles.map((t) => `${t.path}:${t.size}`).join('|'))
  return {
    cacheName: `ktm-tiles-${version}`,
    totalBytes: tiles.reduce((sum, t) => sum + t.size, 0),
    tiles: tiles.map((t) => t.path),
  }
}

// Emits tiles-manifest.json and a service worker (sw.js) whose precache list includes the hashed build output
function offlinePlugin() {
  return {
    name: 'ktm-offline',
    enforce: 'post',
    configureServer(server) {
      server.middlewares.use('/tiles-manifest.json', (_req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(buildTilesManifest()))
      })
    },
    generateBundle(_options, bundle) {
      const tilesManifest = buildTilesManifest()
      const tilesManifestJson = JSON.stringify(tilesManifest)
      this.emitFile({ type: 'asset', fileName: 'tiles-manifest.json', source: tilesManifestJson })

      const bundleFiles = Object.keys(bundle).filter((f) => !f.endsWith('.map'))
      // Deduped: cache.addAll() rejects duplicate requests (bundleFiles already includes tiles-manifest.json)
      const shellFiles = [...new Set(['./', ...bundleFiles, ...PUBLIC_SHELL_FILES])]
      const shellVersion = shortHash(
        [
          ...bundleFiles.map((f) => {
            const item = bundle[f]
            return item.type === 'chunk' ? item.code : item.source
          }),
          ...PUBLIC_SHELL_FILES.map((f) => readFileSync(path.join(PUBLIC_DIR, f))),
          tilesManifestJson,
        ]
          .map((content) => shortHash(content))
          .join('|')
      )
      const precacheTiles = tilesManifest.tiles.filter((t) => Number(t.split('/')[1]) <= PRECACHE_TILE_MAX_ZOOM)

      const swSource = readFileSync(path.resolve('src/service-worker.js'), 'utf8')
        .replace('__SHELL_CACHE__', JSON.stringify(`ktm-shell-${shellVersion}`))
        .replace('__TILES_CACHE__', JSON.stringify(tilesManifest.cacheName))
        .replace('__SHELL_FILES__', JSON.stringify(shellFiles))
        .replace('__PRECACHE_TILES__', JSON.stringify(precacheTiles))
      this.emitFile({ type: 'asset', fileName: 'sw.js', source: swSource })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    offlinePlugin(),
  ],
  base: './', // Ensures relative assets for GitHub Pages and Cloudflare Pages
  build: {
    copyPublicDir: true, // Copy public/tiles/ into dist/ during build (required for Cloudflare deployment)
  },
})
