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
    b = min(places, key=lambda p: (p['x']-x)**2 + (p['y']-y)**2)
    d = ((b['x']-x)**2 + (b['y']-y)**2)**0.5
    return f"{b['name']} ({d:.0f}px)"

for code, rgb in [('D', (0.357, 0.518, 0.471)), ('Y', (0.573, 0.345, 0.267))]:
    print(f"\n=== [{code}] ===")
    for i, d in enumerate(drawings):
        c = d.get('color')
        if c and max(abs(c[j]-rgb[j]) for j in range(3)) < 0.02:
            if d['rect'].x0 < 700 and d['rect'].y0 > 1200: continue
            if d['rect'].x0 > 1800 and d['rect'].y0 > 1350: continue
            rx0, ry0, rx1, ry1 = d['rect'].x0*scale, d['rect'].y0*scale, d['rect'].x1*scale, d['rect'].y1*scale
            print(f"Drawing {i} bbox=({rx0:.0f}, {ry0:.0f}) to ({rx1:.0f}, {ry1:.0f})")
            for it in d['items']:
                for p in it[1:]:
                    px, py = p.x*scale, p.y*scale
                    print(f"   ({px:.0f}, {py:.0f}) -> {nearest(px, py)}")
