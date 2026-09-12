import fitz

doc = fitz.open('Kathmandu-Bus-Route-Map-by-Subham-Subedi (4).pdf')
page = doc[0]
drawings = page.get_drawings()
scale = 11667.0 / 2800.0

for i, d in enumerate(drawings):
    c = d.get('color')
    rect = d['rect']
    rx0, ry0, rx1, ry1 = rect.x0*scale, rect.y0*scale, rect.x1*scale, rect.y1*scale
    if rx0 <= 6115 <= rx1 and ry0 <= 6170 <= ry1:
        if d['rect'].x0 < 700 and d['rect'].y0 > 1200: continue
        if d['rect'].x0 > 1800 and d['rect'].y0 > 1350: continue
        if i == 0: continue
        print(f"Drawing {i}: color={c} rect=({rx0:.0f}, {ry0:.0f}, {rx1:.0f}, {ry1:.0f})")
        for it in d['items']:
            for p in it[1:]:
                px, py = p.x * scale, p.y * scale
                if abs(px - 6114) < 300 and abs(py - 6169) < 300:
                    print(f"   item {it[0]}: ({px:.0f}, {py:.0f})")
