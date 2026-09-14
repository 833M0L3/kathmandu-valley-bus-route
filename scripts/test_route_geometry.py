import pymupdf
import json

doc = pymupdf.open('Kathmandu_Bus_Route_Map.ai')
p = doc[0]
drawings = p.get_drawings()

# Let's inspect Sajha Yatayat lines (#1ba547, width=2.26)
sajha_paths = []
for d in drawings:
    c = d.get('color')
    if not c:
        continue
    h = '#{:02x}{:02x}{:02x}'.format(int(round(c[0]*255)), int(round(c[1]*255)), int(round(c[2]*255)))
    w = round(d.get('width', 0), 2)
    if h == '#1ba547' and w == 2.26:
        sajha_paths.append(d)

print(f"Found {len(sajha_paths)} Sajha Yatayat route paths!")
for idx, path in enumerate(sajha_paths):
    items = path.get('items', [])
    types = [it[0] for it in items]
    print(f"Path {idx}: {len(items)} segments, types={types[:10]}... rect={path['rect']}")
