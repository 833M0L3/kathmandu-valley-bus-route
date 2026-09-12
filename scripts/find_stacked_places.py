import json
import re
import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/map_ocr_all.json', encoding='utf-8') as f:
    ocr_items = json.load(f)

# Look at items that are stacked vertically
# We want to find cases where line 1 is above line 2:
# dx = abs(cx1 - cx2) < 50
# dy = cy2 - cy1 between 12 and 45 px

items = []
for it in ocr_items:
    t = it['text'].strip()
    # Skip route codes
    if re.match(r'^[A-Z][0-9]+(?:\'[0-9]*)?$', t) or re.match(r'^[0-9\W]+$', t):
        continue
    box = it['box']
    cx = sum(p[0] for p in box) / 4.0
    cy = sum(p[1] for p in box) / 4.0
    items.append({'text': t, 'box': box, 'cx': cx, 'cy': cy, 'score': it['score']})

print(f"Total candidate items: {len(items)}")

stacked_pairs = []
for i, a in enumerate(items):
    for j, b in enumerate(items):
        if i == j:
            continue
        dx = abs(a['cx'] - b['cx'])
        dy = b['cy'] - a['cy']
        if dx < 40 and 10 <= dy <= 45:
            # a is line 1, b is line 2
            combined = f"{a['text']} {b['text']}"
            stacked_pairs.append({
                'combined': combined,
                'l1': a['text'],
                'l2': b['text'],
                'pos': (round((a['cx'] + b['cx'])/2, 1), round((a['cy'] + b['cy'])/2, 1)),
                'dx': round(dx, 1),
                'dy': round(dy, 1)
            })

print(f"Found {len(stacked_pairs)} stacked line pairs:")
# Filter duplicates and print samples
seen = set()
for sp in stacked_pairs:
    if sp['combined'] not in seen:
        seen.add(sp['combined'])
        print(f"  '{sp['combined']}' (l1: '{sp['l1']}', l2: '{sp['l2']}') at {sp['pos']}")
