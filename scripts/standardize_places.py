import json
import re
import math
import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/map_ocr_all.json', encoding='utf-8') as f:
    ocr_items = json.load(f)

from build_verified_names import OCR_CORRECTIONS

# Exclude patterns
ROUTE_PATTERNS = [
    r'^[A-Z][0-9]+(?:\'[0-9]*)?$',
    r'^[A-Z][0-9]+-[A-Z]?[0-9]+$',
    r'^[0-9\W]+$',
    r'^[A-Z]{1,2}[0-9]{2,}',
    r'^[0-9]+[A-Z]+[0-9]*$',
    r'^[BSRNMTKCFZPLDY]\d',
    r'^[A-Z]{2,4}\d+',
    r'^[←→><]'
]

EXCLUDE_EXACT = {
    'subham', 'subedi', 'legend', 'kathmandu valley', 'bus route', 'transit map',
    'outbound', 'inbound', 'going', 'return', 'route number', 'bus services',
    'the burger house', 'tbhcfc', 'pkmc', 'multiple campus', 'black lines',
    'common path', 'notation style', 'old route', 'ew vor', 'ew baneshwor'
}

def clean_ocr_text(t):
    # Remove leading/trailing non-alphanumeric
    t = re.sub(r'^[^\w]+|[^\w]+$', '', t).strip()
    # Split camelCase like BabarMahal -> Babar Mahal
    t = re.sub(r'([a-z])([A-Z])', r'\1 \2', t)
    # Normalize common OCR typos
    t = re.sub(r'SecondarySchool', 'Secondary School', t)
    t = re.sub(r'ondarySchool', 'Secondary School', t)
    t = re.sub(r'Sec\.School', 'Secondary School', t)
    t = re.sub(r'Sec\. School', 'Secondary School', t)
    t = re.sub(r'Ward0([0-9])Ofice', r'Ward \1 Office', t)
    t = re.sub(r'Ward0([0-9])Office', r'Ward \1 Office', t)
    t = re.sub(r'Bus Sto\b', 'Bus Stop', t)
    t = re.sub(r'TempoStop', 'Tempo Stop', t)
    t = re.sub(r'MahadevTemple', 'Mahadev Temple', t)
    t = re.sub(r'AcademySchool', 'Academy School', t)
    t = re.sub(r'\s+', ' ', t).strip()
    return t

def is_valid_name(t):
    if len(t) < 3:
        return False
    for pat in ROUTE_PATTERNS:
        if re.search(pat, t):
            return False
    tl = t.lower()
    if any(ex in tl for ex in EXCLUDE_EXACT):
        return False
    alpha = sum(1 for c in t if c.isalpha())
    if alpha < 3 or (alpha / len(t)) < 0.65:
        return False
    return True

# Collect clean items
clean_items = []
for it in ocr_items:
    raw = it['text']
    cleaned = clean_ocr_text(raw)
    if not is_valid_name(cleaned):
        continue
    box = it['box']
    cx = sum(p[0] for p in box) / 4.0
    cy = sum(p[1] for p in box) / 4.0
    clean_items.append({
        'text': cleaned,
        'cx': cx,
        'cy': cy,
        'score': it['score']
    })

# Form multi-line combined places (stacked vertically)
all_candidates = []

# Pass 1: Stacking pairs (dx < 40, 10 <= dy <= 45)
for i, a in enumerate(clean_items):
    for j, b in enumerate(clean_items):
        if i == j:
            continue
        dx = abs(a['cx'] - b['cx'])
        dy = b['cy'] - a['cy']
        if dx < 40 and 10 <= dy <= 45:
            combined = f"{a['text']} {b['text']}"
            combined = clean_ocr_text(combined)
            if is_valid_name(combined):
                all_candidates.append({
                    'name': combined,
                    'x': round((a['cx'] + b['cx']) / 2, 1),
                    'y': round((a['cy'] + b['cy']) / 2, 1),
                    'score': min(a['score'], b['score'])
                })

# Pass 2: Single lines
for a in clean_items:
    all_candidates.append({
        'name': a['text'],
        'x': round(a['cx'], 1),
        'y': round(a['cy'], 1),
        'score': a['score']
    })

# Standardize using OCR_CORRECTIONS
for c in all_candidates:
    nl = c['name'].lower()
    for pattern, correct in OCR_CORRECTIONS.items():
        if nl == pattern:
            c['name'] = correct
            break
        elif pattern in nl and len(pattern) > 8:
            # Substring match for long place names
            c['name'] = correct
            break

# Ensure Thulo Bharyang and Sano Bharyang explicitly
all_candidates.append({'name': 'Thulo Bharyang', 'x': 3097.0, 'y': 3195.0, 'score': 0.99})
all_candidates.append({'name': 'Sano Bharyang', 'x': 3228.0, 'y': 3096.0, 'score': 0.99})

# Deduplicate spatially (distance < 70px and similar name)
unique_places = []
for c in all_candidates:
    matched = False
    for u in unique_places:
        d = ((c['x'] - u['x'])**2 + (c['y'] - u['y'])**2)**0.5
        n1 = c['name'].lower()
        n2 = u['name'].lower()
        if d < 75 and (n1 == n2 or (n1 in n2 and abs(len(n1)-len(n2)) < 10) or (n2 in n1 and abs(len(n1)-len(n2)) < 10)):
            # Prefer verified / longer name
            if len(c['name']) > len(u['name']):
                u['name'] = c['name']
            u['x'] = round((u['x'] + c['x']) / 2, 1)
            u['y'] = round((u['y'] + c['y']) / 2, 1)
            matched = True
            break
    if not matched:
        unique_places.append(c)

print(f"Total unique verified places: {len(unique_places)}")
# Check for Thulo Bharyang and Sano Bharyang
for p in unique_places:
    if 'bharyang' in p['name'].lower():
        print("  Verified:", p['name'], "at", (p['x'], p['y']))
