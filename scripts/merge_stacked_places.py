import json
import re
import math
import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/map_ocr_all.json', encoding='utf-8') as f:
    ocr_items = json.load(f)

# Filter out route codes and numeric garbage
ROUTE_PATTERNS = [
    r'^[A-Z][0-9]+(?:\'[0-9]*)?$',
    r'^[A-Z][0-9]+-[A-Z]?[0-9]+$',
    r'^[0-9\W]+$',
    r'^[A-Z]{1,2}[0-9]{2,}',
    r'^[0-9]+[A-Z]+[0-9]*$',
    r'^[BSRNMTKCFZPLDY]\d',
    r'^[A-Z]{2,4}\d+'
]

EXCLUDE_EXACT = {
    'subham', 'subedi', 'legend', 'kathmandu valley', 'bus route', 'transit map',
    'outbound', 'inbound', 'going', 'return', 'route number', 'bus services',
    'the burger house', 'tbhcfc', 'pkmc', 'multiple campus', 'black lines',
    'common path', 'notation style'
}

def is_noise(text):
    t = text.strip()
    if len(t) < 2:
        return True
    for pat in ROUTE_PATTERNS:
        if re.search(pat, t):
            return True
    if any(ex in t.lower() for ex in EXCLUDE_EXACT):
        return True
    alpha = sum(1 for c in t if c.isalpha())
    if alpha < 2:
        return True
    return False

# Step 1: Collect valid word fragments
valid_items = []
for it in ocr_items:
    t = it['text'].strip()
    t = re.sub(r'^[^\w]+|[^\w]+$', '', t).strip()
    if is_noise(t):
        continue
    box = it['box']
    cx = sum(p[0] for p in box) / 4.0
    cy = sum(p[1] for p in box) / 4.0
    w = max(p[0] for p in box) - min(p[0] for p in box)
    h = max(p[1] for p in box) - min(p[1] for p in box)
    valid_items.append({
        'text': t,
        'cx': cx,
        'cy': cy,
        'w': w,
        'h': h,
        'score': it['score']
    })

print(f"Valid text elements: {len(valid_items)}")

# Step 2: Merge vertically stacked lines or closely adjacent words into composite names
# e.g., 'Thulo' + 'Bharyang' -> 'Thulo Bharyang', 'Sano' + 'Bharyang' -> 'Sano Bharyang'
merged_places = []
used_indices = set()

# First pass: find vertical stacked pairs (dx < 45, 10 <= dy <= 45)
for i, a in enumerate(valid_items):
    for j, b in enumerate(valid_items):
        if i == j:
            continue
        dx = abs(a['cx'] - b['cx'])
        dy = b['cy'] - a['cy']
        if dx < 45 and 10 <= dy <= 45:
            # a is line 1, b is line 2
            combined_name = f"{a['text']} {b['text']}"
            # clean camelCase
            combined_name = re.sub(r'([a-z])([A-Z])', r'\1 \2', combined_name)
            combined_name = re.sub(r'\s+', ' ', combined_name).strip()
            
            merged_places.append({
                'name': combined_name,
                'x': round((a['cx'] + b['cx']) / 2, 1),
                'y': round((a['cy'] + b['cy']) / 2, 1),
                'score': min(a['score'], b['score'])
            })
            used_indices.add(i)
            used_indices.add(j)

# Second pass: include single-line places that were not merged or stand alone
for i, a in enumerate(valid_items):
    clean = re.sub(r'([a-z])([A-Z])', r'\1 \2', a['text'])
    clean = re.sub(r'\s+', ' ', clean).strip()
    if len(clean) >= 3:
        merged_places.append({
            'name': clean,
            'x': round(a['cx'], 1),
            'y': round(a['cy'], 1),
            'score': a['score']
        })

print(f"Total places after stacked line merge: {len(merged_places)}")

# Check if Thulo Bharyang and Sano Bharyang are now present!
bharyang_check = [p for p in merged_places if 'bharyang' in p['name'].lower()]
print("\nBharyang check:")
for b in bharyang_check:
    print(f"  '{b['name']}' at [{b['x']}, {b['y']}]")
