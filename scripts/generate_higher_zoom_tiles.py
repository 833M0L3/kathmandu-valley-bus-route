"""
Generate physical tile files for Zoom 7 (and 8) from Zoom 6 tiles using clean Lanczos upsampling.
Creates the actual numbered folders in public/tiles/7/
"""

import os
import sys
import time
import io
from concurrent.futures import ThreadPoolExecutor
from PIL import Image

TILES_DIR = os.path.join("public", "tiles")
BG_COLOR = (255, 255, 255)

# Pre-encode a 256x256 solid white PNG for instant writing
im_white = Image.new("RGB", (256, 256), BG_COLOR)
buf = io.BytesIO()
im_white.save(buf, "PNG", optimize=True)
WHITE_PNG_BYTES = buf.getvalue()

def process_parent_tile(args):
    src_z, x, y, dst_z = args
    src_path = os.path.join(TILES_DIR, str(src_z), str(x), f"{y}.png")
    if not os.path.exists(src_path):
        return

    try:
        im = Image.open(src_path).convert("RGB")
    except Exception:
        return

    # Base coords for the 4 child tiles
    x0 = 2 * x
    y0 = 2 * y

    # Fast path for solid white tiles
    if im.getextrema() == ((255, 255), (255, 255), (255, 255)):
        for dx in (0, 1):
            cx = x0 + dx
            cdir = os.path.join(TILES_DIR, str(dst_z), str(cx))
            os.makedirs(cdir, exist_ok=True)
            for dy in (0, 1):
                cy = y0 + dy
                cpath = os.path.join(cdir, f"{cy}.png")
                with open(cpath, "wb") as f:
                    f.write(WHITE_PNG_BYTES)
        return

    # 2x clean Lanczos upscale
    scaled = im.resize((512, 512), Image.Resampling.LANCZOS)

    quads = [
        (0, 0, x0, y0),
        (256, 0, x0 + 1, y0),
        (0, 256, x0, y0 + 1),
        (256, 256, x0 + 1, y0 + 1),
    ]

    for qx, qy, cx, cy in quads:
        tile = scaled.crop((qx, qy, qx + 256, qy + 256))
        cdir = os.path.join(TILES_DIR, str(dst_z), str(cx))
        os.makedirs(cdir, exist_ok=True)
        cpath = os.path.join(cdir, f"{cy}.png")
        tile.save(cpath, "PNG", optimize=True, compress_level=4)

def generate_zoom_level(src_z, dst_z):
    src_dir = os.path.join(TILES_DIR, str(src_z))
    if not os.path.exists(src_dir):
        print(f"Error: Source zoom folder {src_dir} does not exist!")
        return

    x_folders = [int(f) for f in os.listdir(src_dir) if os.path.isdir(os.path.join(src_dir, f)) and f.isdigit()]
    tasks = []
    for x in sorted(x_folders):
        x_path = os.path.join(src_dir, str(x))
        y_files = [int(f.replace(".png", "")) for f in os.listdir(x_path) if f.endswith(".png") and f.replace(".png", "").isdigit()]
        for y in sorted(y_files):
            tasks.append((src_z, x, y, dst_z))

    print(f"\n--- Generating Zoom {dst_z} from Zoom {src_z} ({len(tasks)} parent tiles -> {len(tasks)*4} child tiles) ---")
    t0 = time.time()

    with ThreadPoolExecutor(max_workers=16) as executor:
        list(executor.map(process_parent_tile, tasks))

    elapsed = time.time() - t0
    print(f"Zoom {dst_z} complete: {len(tasks)*4} tiles generated in {elapsed:.2f}s ({(len(tasks)*4)/max(0.01, elapsed):.1f} tiles/s)")

def main():
    print("=== Generating Higher Zoom Tiles (Zoom 9) ===")
    generate_zoom_level(8, 9)
    print("Zoom 9 complete!")

if __name__ == "__main__":
    main()
