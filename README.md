# Kathmandu Bus Route Map — Zoomable Tile Viewer

A high-performance, pannable, and zoomable static web viewer for the vector Kathmandu transit map designed by Subham Subedi. Built with **React 19**, **Tailwind CSS v4**, **Vite**, and **Leaflet.js (`L.CRS.Simple`)**, with an optimized Deep Zoom tile pyramid generated via a Python toolchain (`PyMuPDF` + `Pillow`).

---

## 🗺️ Map & Tile Pipeline Specifications

### 1. Source Vector PDF
- **Source File**: `Kathmandu-Bus-Route-Map-by-Subham-Subedi (4).pdf`
- **Native Dimensions**: 2800 × 2100 points (~38.89 × 29.17 inches)
- **Cartographer**: Subham Subedi

### 2. Rasterization & DPI Calculation
To ensure crystal-clear vector text and bus route numbers down to the smallest label, the PDF is rasterized at **6× scale (432 DPI)**:
$$\text{Width} = 2800 \times 6 = 16,800\text{ px}$$
$$\text{Height} = 2100 \times 6 = 12,600\text{ px}$$
$$\text{DPI} = 6 \times 72 = 432\text{ DPI}$$

### 3. Deep Zoom Tile Pyramid
- **Format**: `tiles/{z}/{x}/{y}.png`
- **Tile Size**: 256 × 256 px
- **Zoom Levels**: 0 (overview) to 6 (full 1:1 needle-sharp vector detail)
- **Total Tiles**: 4,437 tiles across 7 zoom levels
- **Storage Size**: ~14.3 MB (optimized web-compressed PNGs with adaptive canvas background padding)

---

## 🚀 Tile Regeneration Guide

If the source PDF is updated, you can regenerate the entire tile pyramid with the included Python toolchain:

### Step 1: Initialize Python Environment
```powershell
# Create local virtual environment
python -m venv .venv

# Install required pip packages
.\.venv\Scripts\python -m pip install pymupdf pillow tqdm
```

### Step 2: Rasterize High-Resolution Master Image
```powershell
.\.venv\Scripts\python scripts/rasterize.py
```
*Outputs `master.png` (16,800 × 12,600 px) in ~6 seconds.*

### Step 3: Slice Deep Zoom Tile Pyramid
```powershell
.\.venv\Scripts\python scripts/generate_tiles.py
```
*Generates all zoom levels (0 to 6) in `public/tiles/{z}/{x}/{y}.png` in ~5 seconds.*

*(Equivalent `libvips` command if libvips is installed: `vips dzsave master.png public/tiles --layout google --suffix .png`)*

> **Note**: `master.png` is an intermediate file (~8 MB) and is excluded from git via `.gitignore`. Only the final tiles and source PDF are tracked in version control.

---

## 💻 Frontend Development & Build

### Development Server
```bash
# Install npm dependencies
npm install

# Start local dev server
npm run dev
```

### Production Static Build
```bash
npm run build
```
Builds the static production bundle into `dist/` with relative subpath asset paths (`base: './'`), ready for deployment.

### Preview Production Build
```bash
npm run preview
```

---

## 📴 Offline, Installable App & Shareable Links

### Offline (service worker)
- `src/service-worker.js` is a template. At build time the `ktm-offline` plugin in `vite.config.js` fills in the hashed bundle file list and emits `dist/sw.js` and `dist/tiles-manifest.json`. The service worker only registers in production builds (`npm run build && npm run preview` to test it).
- On install it precaches the app shell, the route SVG and tile zoom levels 0–3 (~1.5 MB). Every tile the user views after that is cached as they browse.
- The **Save map offline** button (cloud icon) downloads the full tile pyramid (~18 MB) into the same cache, so every zoom level works without data. The download can resume, skips tiles already cached, and asks the browser for persistent storage.
- Cache names include a content hash: regenerating tiles or changing the build automatically replaces old caches.

### Installable app (PWA)
- `public/manifest.webmanifest` and `public/icons/` make the site installable (standalone window, home-screen icon). Regenerate the icons with `python scripts/generate_app_icons.py`.
- The offline panel shows **Install as app** when the browser offers it (Chrome/Edge/Android), and an *Add to Home Screen* hint on iOS.

### Shareable links
The selected operator, route branches and pinned place are kept in the URL, so the share button (or the address bar) gives a link that reopens the same view:

| Param | Meaning | Example |
|-------|---------|---------|
| `op` | Operator code from `legendData.js` | `op=S` (Sajha Yatayat) |
| `r` | Comma-separated branch codes from `dedicatedRoutesData.js` | `r=S1,S2` |
| `p` | Place name from `placesData.js` | `p=Lagankhel` |

Example: `/?op=S&r=S2&p=Lagankhel`. Unknown values are ignored. See `src/shareLink.js`.

---

## 🌐 Deployment Instructions

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "feat: Kathmandu bus route zoomable tile viewer"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

### 2. Deploy to Cloudflare Pages
1. Go to your **Cloudflare Dashboard** → **Workers & Pages** → **Create application** → **Pages**.
2. Connect your GitHub repository.
3. In Build settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Click **Save and Deploy**.

### 3. Deploy to GitHub Pages (Alternative)
- Go to repository **Settings** → **Pages**.
- Select **Deploy from a branch** → Branch: `main` / Folder: `/dist` (or use GitHub Actions static pages deployment).
- Because `base: './'` is configured in `vite.config.js`, all tiles and assets resolve properly on subpaths (`username.github.io/repo/`).

---

## 🎨 Design & Interaction Details
- **Pure Map View**: Ultra-minimalist interface with edge-to-edge canvas.
- **Pure SVGs**: Zero emojis; crisp, curated SVG icons for map controls.
- **Floating Controls**:
  - `+` / `-` : Smooth zoom in and out
  - `↻` : Reset/Fit view to show the complete Kathmandu Valley
  - `⛶` : Fullscreen toggle
- **High Performance**: Native Leaflet integration with smooth inertia panning and bounce boundary constraints.
