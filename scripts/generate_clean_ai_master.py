"""
Generate clean vector master map (11667 x 8750 px) directly from Kathmandu_Bus_Route_Map.ai
1. Strips all PDF BT...ET text blocks (100% text-free vector routes, hubs, stops).
2. Cleanly masks out the 4 corner print legend tables with the background color #eff5f9.
3. Saves uncompressed scratch/clean_master_no_text.png.
"""
import pymupdf
import re
import time
from PIL import Image, ImageDraw

def generate_clean_master():
    t0 = time.time()
    print("1. Opening Kathmandu_Bus_Route_Map.ai...")
    doc = pymupdf.open('Kathmandu_Bus_Route_Map.ai')
    
    # Content stream 61 contains all visual paths and text
    print("2. Stripping all text blocks from vector content stream...")
    stream = doc.xref_stream(61).decode('latin1', errors='ignore')
    clean_stream = re.sub(r'\bBT\b.*?\bET\b', '', stream, flags=re.DOTALL)
    doc.update_stream(61, clean_stream.encode('latin1'))

    p = doc[0]
    W_MAP = 11667
    H_MAP = 8750

    sx = W_MAP / p.rect.width   # 7.3655303
    sy = H_MAP / p.rect.height  # 7.1486928

    print(f"3. Rasterizing vector page to {W_MAP} x {H_MAP} px...")
    matrix = pymupdf.Matrix(sx, sy)
    pix = p.get_pixmap(matrix=matrix, alpha=False)
    print(f"   Rasterized in {time.time()-t0:.2f}s! ({pix.width}x{pix.height} px)")

    img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    draw = ImageDraw.Draw(img)

    # Valley map background color: (239, 245, 249) -> #eff5f9
    BG_COLOR = (239, 245, 249)

    def to_canvas(x_ai, y_ai):
        return int(round(x_ai * sx)), int(round(y_ai * sy))

    # Mask 1: Top-Right Title block (x > 1150 pt, y < 160 pt)
    x0, y0 = to_canvas(1150, 0)
    x1, y1 = to_canvas(1584, 160)
    draw.rectangle([x0, y0, x1, y1], fill=BG_COLOR)

    # Mask 2: Bottom-Left Direction / Legend Table (x < 550 pt, y > 915 pt)
    x0, y0 = to_canvas(0, 915)
    x1, y1 = to_canvas(550, 1224)
    draw.rectangle([x0, y0, x1, y1], fill=BG_COLOR)

    # Mask 3: Bottom-Right 22 Operator List (x > 950 pt, y > 810 pt)
    x0, y0 = to_canvas(950, 810)
    x1, y1 = to_canvas(1584, 1224)
    draw.rectangle([x0, y0, x1, y1], fill=BG_COLOR)

    # Mask 4: Bottom Footer link (y > 1150 pt)
    x0, y0 = to_canvas(0, 1150)
    x1, y1 = to_canvas(1584, 1224)
    draw.rectangle([x0, y0, x1, y1], fill=BG_COLOR)

    out_path = "scratch/clean_master_no_text.png"
    print(f"4. Saving clean master image to {out_path}...")
    img.save(out_path, "PNG", optimize=True)
    print(f"Complete in {time.time()-t0:.2f}s! Saved {out_path} ({pix.width}x{pix.height} px)")

if __name__ == "__main__":
    generate_clean_master()
