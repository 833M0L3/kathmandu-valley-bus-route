import fitz
import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

doc = fitz.open('Kathmandu-Bus-Route-Map-by-Subham-Subedi (4).pdf')
page = doc[0]
drawings = page.get_drawings()
scale = 11667.0 / 2800.0

with open('src/data/placesData.js', encoding='utf-8') as f:
    t = f.read()
    places = json.loads(t[t.find('['):t.rfind(']')+1])

def nearest_place(x, y):
    best = None
    best_d = 9999
    for p in places:
        d = ((p['x']-x)**2 + (p['y']-y)**2)**0.5
        if d < best_d:
            best_d = d
            best = p
    return f"{best['name']} ({best_d:.0f}px)" if best else "Unknown"

with open('src/data/legendData.js', encoding='utf-8') as f:
    leg_text = f.read()

op_blocks = re.findall(r'code:\s*"([A-Z])",\s*name:\s*"([^"]+)",.*?corridor:\s*"([^"]+)"', leg_text, re.DOTALL)

operators_rgb = {
    'S': (27/255, 165/255, 70/255),
    'N': (201/255, 150/255, 41/255),
    'Y': (146/255, 88/255, 68/255),
    'F': (149/255, 114/255, 204/255),
    'K': (96/255, 123/255, 132/255),
    'X': (69/255, 135/255, 209/255),
    'H': (148/255, 105/255, 148/255),
    'J': (101/255, 156/255, 159/255),
    'I': (38/255, 96/255, 144/255),
    'D': (91/255, 132/255, 120/255),
    'G': (223/255, 73/255, 111/255),
    'A': (156/255, 193/255, 28/255),
    'T': (113/255, 131/255, 197/255),
    'R': (2/255, 170/255, 196/255),
    'P': (222/255, 108/255, 159/255),
    'C': (249/255, 166/255, 26/255),
    'O': (167/255, 115/255, 58/255),
    'M': (220/255, 29/255, 36/255),
    'Z': (135/255, 136/255, 131/255),
    'L': (25/255, 179/255, 141/255),
    'E': (225/255, 106/255, 48/255),
    'B': (128/255, 143/255, 78/255)
}

print("=== VERIFYING ALL 22 OPERATORS: LEGEND vs VECTOR MAP GROUND TRUTH ===\n")
for code, name, corridor in op_blocks:
    rgb = operators_rgb[code]
    pts = []
    for d in drawings:
        c = d.get('color')
        if c and len(c) == 3:
            dist = sum(abs(c[j] - rgb[j]) for j in range(3))
            if dist < 0.08 and not (d['rect'].x0 > 1900 and d['rect'].y0 > 1400):
                for item in d['items']:
                    for p in item[1:]:
                        pts.append((p.x * scale, p.y * scale))
    if pts:
        p_min_x = min(pts, key=lambda p: p[0])
        p_max_x = max(pts, key=lambda p: p[0])
        p_min_y = min(pts, key=lambda p: p[1])
        p_max_y = max(pts, key=lambda p: p[1])

        print(f"[{code}] {name}")
        print(f"   Current Legend: {corridor}")
        print(f"   Map Bounding Box:")
        print(f"      Westmost:  {nearest_place(p_min_x[0], p_min_x[1])} (x={p_min_x[0]:.0f}, y={p_min_x[1]:.0f})")
        print(f"      Eastmost:  {nearest_place(p_max_x[0], p_max_x[1])} (x={p_max_x[0]:.0f}, y={p_max_x[1]:.0f})")
        print(f"      Northmost: {nearest_place(p_min_y[0], p_min_y[1])} (x={p_min_y[0]:.0f}, y={p_min_y[1]:.0f})")
        print(f"      Southmost: {nearest_place(p_max_y[0], p_max_y[1])} (x={p_max_y[0]:.0f}, y={p_max_y[1]:.0f})")
        print("-" * 75)
