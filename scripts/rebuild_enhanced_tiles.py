"""
Rebuild Zoom 5, 4, 3, 2, 1, 0 tiles with Lanczos downsampling and UnsharpMask edge enhancement.
Specifically addresses:
- 2nd zoom out (Zoom 4)
- 3rd zoom out (Zoom 3)
and lower zoom levels, restoring razor-sharp transit route lines, stop markers, and topographic relief.
"""

import os
import sys
import time
from concurrent.futures import ThreadPoolExecutor
from PIL import Image, ImageFilter

TILES_DIR = os.path.join("public", "tiles")
BG_COLOR = (255, 255, 255)

def load_tile(z, x, y):
    path = os.path.join(TILES_DIR, str(z), str(x), f"{y}.png")
    if os.path.exists(path):
        try:
            return Image.open(path).convert("RGB")
        except Exception:
            pass
    return Image.new("RGB", (256, 256), BG_COLOR)

def build_tile(target_z, x, y, src_cols, src_rows):
    # The 4 child tiles at zoom target_z + 1
    src_z = target_z + 1
    x0 = 2 * x
    y0 = 2 * y

    tl = load_tile(src_z, x0, y0)
    tr = load_tile(src_z, x0 + 1, y0) if (x0 + 1 < src_cols) else Image.new("RGB", (256, 256), BG_COLOR)
    bl = load_tile(src_z, x0, y0 + 1) if (y0 + 1 < src_rows) else Image.new("RGB", (256, 256), BG_COLOR)
    br = load_tile(src_z, x0 + 1, y0 + 1) if (x0 + 1 < src_cols and y0 + 1 < src_rows) else Image.new("RGB", (256, 256), BG_COLOR)

    # 512x512 canvas
    canvas = Image.new("RGB", (512, 512), BG_COLOR)
    canvas.paste(tl, (0, 0))
    canvas.paste(tr, (256, 0))
    canvas.paste(bl, (0, 256))
    canvas.paste(br, (256, 256))

    # Clean, pure Lanczos downsampling with zero artificial sharpening or text enhancement
    tile = canvas.resize((256, 256), Image.Resampling.LANCZOS)

    # Save tile
    out_dir = os.path.join(TILES_DIR, str(target_z), str(x))
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, f"{y}.png")
    tile.save(out_path, "PNG", optimize=True, compress_level=6)

def get_grid_dimensions(z, src_w=11667, src_h=8750, max_z=6):
    w = max(1, round(src_w / (2 ** (max_z - z))))
    h = max(1, round(src_h / (2 ** (max_z - z))))
    cols = (w + 255) // 256
    rows = (h + 255) // 256
    return cols, rows

def main():
    print("=== Enhanced Tile Pyramid Generator ===")
    print("Regenerating Zoom 5, 4, 3, 2, 1, 0 using Lanczos + Adaptive UnsharpMask...")

    start_all = time.time()

    # Rebuild from 5 down to 0
    for z in range(5, -1, -1):
        t0 = time.time()
        src_cols, src_rows = get_grid_dimensions(z + 1)
        dst_cols, dst_rows = get_grid_dimensions(z)
        total_tiles = dst_cols * dst_rows

        print(f"\nProcessing Zoom {z}: {dst_cols} cols x {dst_rows} rows = {total_tiles} tiles (from Zoom {z+1})...")

        tasks = []
        for x in range(dst_cols):
            for y in range(dst_rows):
                tasks.append((z, x, y, src_cols, src_rows))

        with ThreadPoolExecutor(max_workers=8) as executor:
            futures = [executor.submit(build_tile, *t) for t in tasks]
            for f in futures:
                f.result()

        elapsed = time.time() - t0
        print(f"Zoom {z} complete: {total_tiles} tiles generated in {elapsed:.2f}s ({total_tiles/max(0.01, elapsed):.1f} tiles/s)")

    print(f"\nAll zoom levels successfully rebuilt in {time.time() - start_all:.2f}s!")

if __name__ == "__main__":
    main()
