import fitz
import json

doc = fitz.open('Kathmandu-Bus-Route-Map-by-Subham-Subedi (4).pdf')
page = doc[0]
drawings = page.get_drawings()
scale = 11667.0 / 2800.0

with open('src/data/placesData.js', encoding='utf-8') as f:
    t = f.read()
    places = json.loads(t[t.find('['):t.rfind(']')+1])

def nearest(x, y):
    best = min(places, key=lambda p: (p['x']-x)**2 + (p['y']-y)**2)
    d = ((best['x']-x)**2 + (best['y']-y)**2)**0.5
    return f"{best['name']} ({d:.0f}px)"

for target_code, target_rgb, name in [
    ('D', (0.357, 0.518, 0.471), 'Digo Yatayat'),
    ('Y', (0.573, 0.345, 0.267), 'Samyukta Yatayat'),
    ('O', (0.655, 0.447, 0.227), 'Om Janata Yatayat'),
    ('E', (0.882, 0.416, 0.192), 'Dhumrabaraha Yatayat'),
]:
    print(f"\n==================== [{target_code}] {name} ====================")
    for i, d in enumerate(drawings):
        c = d.get('color')
        if c and len(c) == 3:
            if max(abs(c[j] - target_rgb[j]) for j in range(3)) < 0.02:
                rx0, ry0, rx1, ry1 = d['rect'].x0*scale, d['rect'].y0*scale, d['rect'].x1*scale, d['rect'].y1*scale
                if d['rect'].x0 < 700 and d['rect'].y0 > 1200:
                    continue
                if d['rect'].x0 > 1800 and d['rect'].y0 > 1350:
                    continue
                print(f"Drawing {i}: bbox=({rx0:.0f}, {ry0:.0f}) to ({rx1:.0f}, {ry1:.0f})")
                for it in d['items']:
                    cmd = it[0]
                    pts = [(p.x*scale, p.y*scale) for p in it[1:]]
                    pts_str = ", ".join(f"({p[0]:.0f}, {p[1]:.0f}) [{nearest(p[0], p[1])}]" for p in pts)
                    print(f"   {cmd}: {pts_str}")
