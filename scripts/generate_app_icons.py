"""Generate PWA / home-screen icons into public/icons/.

Draws a stylised transit map (three operator route lines with stops) on the app's dark slate background.
Usage: python scripts/generate_app_icons.py
"""
from pathlib import Path

from PIL import Image, ImageDraw

OUT_DIR = Path(__file__).resolve().parent.parent / "public" / "icons"
SUPERSAMPLE = 4
BASE = 512  # Design grid; all coordinates below are on a 512 x 512 canvas

BACKGROUND = "#0f172a"
STOP_FILL = "#ffffff"
# (color, polyline) on the 512 grid, kept inside the maskable safe zone (central ~80%)
ROUTES = [
    ("#c99629", [(256, 112), (256, 400)]),  # Nepal Yatayat gold
    ("#1ba546", [(112, 256), (400, 256)]),  # Sajha green
    ("#e11d48", [(142, 370), (370, 142)]),  # red
]
STOPS = [(256, 256), (256, 112), (256, 400), (112, 256), (400, 256), (142, 370), (370, 142)]


def draw_icon(size, rounded):
    scale = size * SUPERSAMPLE / BASE
    canvas = size * SUPERSAMPLE
    img = Image.new("RGBA", (canvas, canvas), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    if rounded:
        draw.rounded_rectangle((0, 0, canvas - 1, canvas - 1), radius=int(112 * scale), fill=BACKGROUND)
    else:
        draw.rectangle((0, 0, canvas, canvas), fill=BACKGROUND)

    line_width = int(30 * scale)
    for color, points in ROUTES:
        pts = [(x * scale, y * scale) for x, y in points]
        draw.line(pts, fill=color, width=line_width, joint="curve")
        for x, y in (pts[0], pts[-1]):  # Round line caps
            r = line_width / 2
            draw.ellipse((x - r, y - r, x + r, y + r), fill=color)

    outer, inner = 26 * scale, 14 * scale
    for x, y in STOPS:
        cx, cy = x * scale, y * scale
        draw.ellipse((cx - outer, cy - outer, cx + outer, cy + outer), fill=BACKGROUND)
        draw.ellipse((cx - inner, cy - inner, cx + inner, cy + inner), fill=STOP_FILL)

    return img.resize((size, size), Image.LANCZOS)


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    outputs = {
        "icon-192.png": draw_icon(192, rounded=True),
        "icon-512.png": draw_icon(512, rounded=True),
        "icon-maskable-512.png": draw_icon(512, rounded=False),
        "apple-touch-icon.png": draw_icon(180, rounded=False),  # iOS applies its own corner mask
    }
    for name, img in outputs.items():
        img.save(OUT_DIR / name, optimize=True)
        print(f"Wrote {OUT_DIR / name}")


if __name__ == "__main__":
    main()
