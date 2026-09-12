"""
Generate Deep Zoom tile pyramid (Zoom 0-6) from clean-map.jpg
with Kathmandu Valley surrounding hills, mountain ridges, elevation contours, and river paths.
Bakes topographic relief onto a seamless pure-white canvas.
"""
import os
import sys
import json
import time
from concurrent.futures import ThreadPoolExecutor
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

Image.MAX_IMAGE_PIXELS = None

INPUT_IMAGE_PATH = "clean-map.jpg"
OUTPUT_DIR = os.path.join("public", "tiles")
TILE_SIZE = 256
MAX_ZOOM = 6
BG_COLOR = (255, 255, 255)  # Seamless pure white

def process_tile(crop_box, img_level, tile_path, w, h):
    x0, y0, x1, y1 = crop_box
    actual_crop = img_level.crop((x0, y0, min(x1, w), min(y1, h)))
    crop_w, crop_h = actual_crop.size

    if crop_w == TILE_SIZE and crop_h == TILE_SIZE:
        tile = actual_crop
    else:
        # Pad edge tiles to exact 256x256 with pure white
        tile = Image.new("RGB", (TILE_SIZE, TILE_SIZE), BG_COLOR)
        tile.paste(actual_crop, (0, 0))

    tile.save(tile_path, "PNG", optimize=True, compress_level=6)

def build_topographic_master(clean_img):
    w, h = clean_img.size
    print(f"Building high-resolution topographic relief canvas ({w} x {h} px)...")

    x = np.linspace(0, 1, w, dtype=np.float32)
    y = np.linspace(0, 1, h, dtype=np.float32)
    xx, yy = np.meshgrid(x, y)

    # Multi-scale fractal ridge noise
    noise = (
        0.06 * np.sin(18.0 * xx + 12.0 * yy) +
        0.04 * np.cos(32.0 * xx - 24.0 * yy) +
        0.03 * np.sin(55.0 * xx + 45.0 * yy) +
        0.02 * np.cos(80.0 * xx - 70.0 * yy)
    )

    # Valley bowl
    cx, cy = 0.48, 0.52
    dx = (xx - cx) / 0.38 + noise * 0.4
    dy = (yy - cy) / 0.32 + noise * 0.4
    dist_bowl = np.sqrt(dx**2 + dy**2)

    elevation = 1350.0 + 800.0 * np.clip((dist_bowl - 0.68) / 0.45, 0, 1.0)**1.8

    # Mountain ranges surrounding Kathmandu Valley:
    # 1. Shivapuri (North)
    r_shiva = np.sqrt(((xx - 0.54)/0.20)**2 + ((yy - 0.05)/0.09)**2) + noise * 0.25
    elev_shiva = 1050.0 * np.exp(-(r_shiva / 0.75)**2)

    # 2. Nagarjun (Northwest)
    r_nagar = np.sqrt(((xx - 0.17)/0.10)**2 + ((yy - 0.12)/0.09)**2) + noise * 0.2
    elev_nagar = 750.0 * np.exp(-(r_nagar / 0.70)**2)

    # 3. Chandragiri (West)
    r_chandra = np.sqrt(((xx - 0.04)/0.08)**2 + ((yy - 0.55)/0.24)**2) + noise * 0.2
    elev_chandra = 950.0 * np.exp(-(r_chandra / 0.75)**2)

    # 4. Phulchowki (South)
    r_phul = np.sqrt(((xx - 0.62)/0.18)**2 + ((yy - 0.95)/0.11)**2) + noise * 0.25
    elev_phul = 1150.0 * np.exp(-(r_phul / 0.75)**2)

    # 5. Champadevi (Southwest)
    r_champa = np.sqrt(((xx - 0.27)/0.10)**2 + ((yy - 0.89)/0.10)**2) + noise * 0.2
    elev_champa = 800.0 * np.exp(-(r_champa / 0.70)**2)

    # 6. Nagarkot (East)
    r_nagar_e = np.sqrt(((xx - 0.94)/0.10)**2 + ((yy - 0.40)/0.20)**2) + noise * 0.2
    elev_nagar_e = 820.0 * np.exp(-(r_nagar_e / 0.75)**2)

    elevation += elev_shiva + elev_nagar + elev_chandra + elev_phul + elev_champa + elev_nagar_e

    # Hillshade calculation (NW sun at 315 deg azimuth, 45 deg altitude)
    gy, gx = np.gradient(elevation * 0.18)
    slope = np.arctan(np.sqrt(gx**2 + gy**2))
    aspect = np.arctan2(-gy, gx)
    altitude = np.radians(45.0)
    azimuth = np.radians(315.0)
    shade = np.sin(altitude) * np.cos(slope) + np.cos(altitude) * np.sin(slope) * np.cos(azimuth - aspect)
    shade = np.clip((shade + 1.0) / 2.0, 0, 1.0)

    # Mountain mask extending across the full canvas
    mountain_mask = np.clip((elevation - 1370.0) / 300.0, 0, 1.0)

    r = 255.0 - mountain_mask * (1.0 - shade) * 48.0
    g = 255.0 - mountain_mask * (1.0 - shade) * 44.0
    b = 255.0 - mountain_mask * (1.0 - shade) * 38.0

    # Contours every 100m and index contours every 500m across full terrain
    is_regular_contour = (np.abs(np.mod(elevation, 100.0)) < 3.2) & (elevation > 1400.0)
    is_index_contour = (np.abs(np.mod(elevation, 500.0)) < 4.2) & (elevation > 1400.0)

    r[is_regular_contour] *= 0.92
    g[is_regular_contour] *= 0.92
    b[is_regular_contour] *= 0.92

    r[is_index_contour] *= 0.84
    g[is_index_contour] *= 0.84
    b[is_index_contour] *= 0.84

    canvas = np.stack([r, g, b], axis=-1).astype(np.uint8)
    img_topo = Image.fromarray(canvas)
    draw = ImageDraw.Draw(img_topo)

    # Bagmati River line
    bagmati_pts = [
        (int(0.74 * w), int(0.30 * h)),
        (int(0.66 * w), int(0.38 * h)),
        (int(0.58 * w), int(0.48 * h)),
        (int(0.52 * w), int(0.52 * h)),
        (int(0.46 * w), int(0.55 * h)),
        (int(0.42 * w), int(0.62 * h)),
        (int(0.38 * w), int(0.70 * h)),
        (int(0.35 * w), int(0.80 * h)),
    ]
    draw.line(bagmati_pts, fill='#93c5fd', width=16)

    # Bishnumati River line
    bishnumati_pts = [
        (int(0.45 * w), int(0.24 * h)),
        (int(0.43 * w), int(0.34 * h)),
        (int(0.42 * w), int(0.44 * h)),
        (int(0.46 * w), int(0.55 * h)),
    ]
    draw.line(bishnumati_pts, fill='#93c5fd', width=12)

    # Composite clean transit lines
    print("Compositing transit network over topographic relief...")
    clean_arr = np.array(clean_img).astype(float)
    bg = np.array([240.0, 245.0, 249.0])
    dist = np.max(np.abs(clean_arr - bg), axis=-1)

    canvas_arr = np.array(img_topo)
    is_transit = dist >= 12

    # Smooth edge blend
    clean_arr[~is_transit] = canvas_arr[~is_transit]

    mask_edge = (dist >= 12) & (dist < 40)
    blend = (40.0 - dist[mask_edge, None]) / 28.0
    clean_arr[mask_edge] = clean_arr[mask_edge] * (1.0 - blend * 0.3) + canvas_arr[mask_edge] * (blend * 0.3)

    composite = np.clip(clean_arr, 0, 255).astype(np.uint8)
    return Image.fromarray(composite)



def main():
    start_total = time.time()
    if not os.path.exists(INPUT_IMAGE_PATH):
        print(f"Error: {INPUT_IMAGE_PATH} not found!")
        sys.exit(1)

    print(f"Opening input image: {INPUT_IMAGE_PATH}...")
    clean_img = Image.open(INPUT_IMAGE_PATH).convert("RGB")
    src_w, src_h = clean_img.size
    print(f"Source dimensions: {src_w} x {src_h} px")

    # Build master composite with topographic relief around the valley
    master_topo = build_topographic_master(clean_img)

    # Ensure output directory exists
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # Write metadata.json for Leaflet / static hosting
    metadata = {
        "width": src_w,
        "height": src_h,
        "tileSize": TILE_SIZE,
        "minZoom": 0,
        "maxZoom": MAX_ZOOM,
        "backgroundColor": "#ffffff",
    }
    with open(os.path.join(OUTPUT_DIR, "metadata.json"), "w") as f:
        json.dump(metadata, f, indent=2)

    current_img = master_topo
    total_tiles_generated = 0

    # Generate zoom levels from MAX_ZOOM down to 0
    for z in range(MAX_ZOOM, -1, -1):
        z_start = time.time()
        w, h = current_img.size
        cols = (w + TILE_SIZE - 1) // TILE_SIZE
        rows = (h + TILE_SIZE - 1) // TILE_SIZE
        num_tiles = cols * rows
        print(f"\n--- Zoom Level {z}: {w}x{h} px ({cols} cols x {rows} rows = {num_tiles} tiles) ---")

        tasks = []
        for x in range(cols):
            x_dir = os.path.join(OUTPUT_DIR, str(z), str(x))
            os.makedirs(x_dir, exist_ok=True)

            for y in range(rows):
                tile_path = os.path.join(x_dir, f"{y}.png")
                x0 = x * TILE_SIZE
                y0 = y * TILE_SIZE
                x1 = x0 + TILE_SIZE
                y1 = y0 + TILE_SIZE
                tasks.append(((x0, y0, x1, y1), current_img, tile_path, w, h))

        with ThreadPoolExecutor(max_workers=16) as executor:
            futures = [executor.submit(process_tile, t[0], t[1], t[2], t[3], t[4]) for t in tasks]
            for f in futures:
                f.result()

        total_tiles_generated += num_tiles
        z_elapsed = time.time() - z_start
        print(f"Zoom level {z} finished in {z_elapsed:.2f}s ({num_tiles / max(0.01, z_elapsed):.1f} tiles/s)")

        if z > 0:
            next_w = max(1, round(w / 2))
            next_h = max(1, round(h / 2))
            print(f"Downsampling to level {z-1} ({next_w}x{next_h} px) with clean Lanczos...")
            current_img = current_img.resize((next_w, next_h), Image.Resampling.LANCZOS)

    total_time = time.time() - start_total
    print(f"\n=======================================================")
    print(f"Topographic tile pyramid complete!")
    print(f"Total tiles generated: {total_tiles_generated}")
    print(f"Total time: {total_time:.2f}s")
    print(f"Output directory: {OUTPUT_DIR}")
    print(f"=======================================================")

if __name__ == "__main__":
    main()
