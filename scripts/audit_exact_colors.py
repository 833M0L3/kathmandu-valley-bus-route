import fitz
import json

doc = fitz.open('Kathmandu-Bus-Route-Map-by-Subham-Subedi (4).pdf')
page = doc[0]
drawings = page.get_drawings()
scale = 11667.0 / 2800.0

operators_hex = {
    'S': '#1ba446',
    'N': '#c8952a',
    'Y': '#925744',
    'F': '#9471cc',
    'K': '#607a82',
    'X': '#4587d1',
    'H': '#936992',
    'J': '#639c9e',
    'I': '#255f90',
    'D': '#5b8478',
    'G': '#df486e',
    'A': '#9dc11c',
    'T': '#7082c5',
    'R': '#02aac4',
    'P': '#df6c9f',
    'C': '#f8a61a',
    'O': '#a77139',
    'M': '#dd1d23',
    'Z': '#868784',
    'L': '#18b48d',
    'E': '#e06a30',
    'B': '#808f4d'
}

with open('src/data/placesData.js', encoding='utf-8') as f:
    t = f.read()
    places = json.loads(t[t.find('['):t.rfind(']')+1])

def nearest(x, y):
    best = min(places, key=lambda p: (p['x']-x)**2 + (p['y']-y)**2)
    d = ((best['x']-x)**2 + (best['y']-y)**2)**0.5
    return f"{best['name']} ({d:.0f}px)"

for code, hex_c in operators_hex.items():
    r_target = int(hex_c[1:3], 16) / 255.0
    g_target = int(hex_c[3:5], 16) / 255.0
    b_target = int(hex_c[5:7], 16) / 255.0
    
    pts = []
    seg_count = 0
    for d in drawings:
        c = d.get('color')
        if c and len(c) == 3:
            dist = max(abs(c[0]-r_target), abs(c[1]-g_target), abs(c[2]-b_target))
            # exclude legend box at bottom left
            if dist < 0.015 and not (d['rect'].x0 < 600 and d['rect'].y0 > 1200):
                seg_count += 1
                for item in d['items']:
                    for p in item[1:]:
                        pts.append((p.x * scale, p.y * scale))
    if pts:
        p_min_x = min(pts, key=lambda p: p[0])
        p_max_x = max(pts, key=lambda p: p[0])
        p_min_y = min(pts, key=lambda p: p[1])
        p_max_y = max(pts, key=lambda p: p[1])
        print(f"[{code}] hex={hex_c} segments={seg_count} pts={len(pts)}")
        print(f"   W: {nearest(p_min_x[0], p_min_x[1])} ({p_min_x[0]:.0f}, {p_min_x[0]:.0f})")
        print(f"   E: {nearest(p_max_x[0], p_max_x[1])} ({p_max_x[0]:.0f}, {p_max_x[1]:.0f})")
        print(f"   N: {nearest(p_min_y[0], p_min_y[1])} ({p_min_y[0]:.0f}, {p_min_y[1]:.0f})")
        print(f"   S: {nearest(p_max_y[0], p_max_y[1])} ({p_max_y[0]:.0f}, {p_max_y[1]:.0f})")
