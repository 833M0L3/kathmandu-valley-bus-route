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

rgb = (0.357, 0.518, 0.471)
for i, d in enumerate(drawings):
    c = d.get('color')
    if c and max(abs(c[j]-rgb[j]) for j in range(3)) < 0.02:
        if d['rect'].x0 < 700 and d['rect'].y0 > 1200: continue
        if d['rect'].x0 > 1800 and d['rect'].y0 > 1350: continue
        print(f"Drawing {i}")
        for it in d['items']:
            pts = [(p.x*scale, p.y*scale) for p in it[1:]]
            for pt in pts:
                print(f"   ({pt[0]:.1f}, {pt[1]:.1f}) -> {nearest(pt[0], pt[1])}")
