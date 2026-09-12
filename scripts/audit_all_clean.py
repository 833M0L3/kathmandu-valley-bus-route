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

operators_hex = {
    'S': ('Sajha Yatayat', '#1ba446'),
    'N': ('Nepal Yatayat', '#c8952a'),
    'Y': ('Samyukta Yatayat', '#925744'),
    'F': ('Balaju Yatayat', '#9471cc'),
    'K': ('Kirtipur Yatayat', '#607a82'),
    'X': ('Mayur Yatayat', '#4587d1'),
    'H': ('Basuki Yatayat', '#936992'),
    'J': ('Juneli Yatayat', '#639c9e'),
    'I': ('Bagmati Yatayat', '#255f90'),
    'D': ('Digo Yatayat', '#5b8478'),
    'G': ('Gothatar Yatayat', '#df486e'),
    'A': ('Budhanilkantha Yatayat', '#9dc11c'),
    'T': ('Tarakeshwar Yatayat', '#7082c5'),
    'R': ('Riddhi Siddhi Yatayat', '#02aac4'),
    'P': ('Panchpokhari Yatayat', '#df6c9f'),
    'C': ('Chandragiri Yatayat', '#f8a61a'),
    'O': ('Om Janata Yatayat', '#a77139'),
    'M': ('Mahanagar Yatayat', '#dd1d23'),
    'Z': ('Samakhusi Yatayat', '#868784'),
    'L': ('Gokarneshwar Yatayat', '#18b48d'),
    'E': ('Dhumrabaraha Yatayat', '#e06a30'),
    'B': ('Bhaktapur Yatayat', '#808f4d')
}

for code, (name, hex_c) in operators_hex.items():
    r_target = int(hex_c[1:3], 16) / 255.0
    g_target = int(hex_c[3:5], 16) / 255.0
    b_target = int(hex_c[5:7], 16) / 255.0
    
    pts = []
    for d in drawings:
        c = d.get('color')
        if c and len(c) == 3:
            dist = max(abs(c[0]-r_target), abs(c[1]-g_target), abs(c[2]-b_target))
            # Exclude bottom-left legend (x < 700, y > 1200 in PDF units)
            # Exclude bottom-right table (x > 1800, y > 1300 in PDF units)
            if dist < 0.015:
                if d['rect'].x0 < 700 and d['rect'].y0 > 1200:
                    continue
                if d['rect'].x0 > 1800 and d['rect'].y0 > 1350:
                    continue
                for item in d['items']:
                    for p in item[1:]:
                        pts.append((p.x * scale, p.y * scale))
    if pts:
        p_min_x = min(pts, key=lambda p: p[0])
        p_max_x = max(pts, key=lambda p: p[0])
        p_min_y = min(pts, key=lambda p: p[1])
        p_max_y = max(pts, key=lambda p: p[1])
        print(f"[{code}] {name}")
        print(f"   W: {nearest(p_min_x[0], p_min_x[1])} (x={p_min_x[0]:.0f}, y={p_min_x[1]:.0f})")
        print(f"   E: {nearest(p_max_x[0], p_max_x[1])} (x={p_max_x[0]:.0f}, y={p_max_x[1]:.0f})")
        print(f"   N: {nearest(p_min_y[0], p_min_y[1])} (x={p_min_y[0]:.0f}, y={p_min_y[1]:.0f})")
        print(f"   S: {nearest(p_max_y[0], p_max_y[1])} (x={p_max_y[0]:.0f}, y={p_max_y[1]:.0f})")
        print("-" * 50)
