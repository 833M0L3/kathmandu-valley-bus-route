import json
import re
import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/map_ocr_all.json', encoding='utf-8') as f:
    ocr_items = json.load(f)

# Exclude route numbers, author credits, and metadata text
ROUTE_PATTERNS = [
    r'^[A-Z][0-9]+(?:\'[0-9]*)?$',
    r'^[A-Z][0-9]+-[A-Z]?[0-9]+$',
    r'^[0-9\W]+$',
    r'^[A-Z]{1,2}[0-9]{2,}',
    r'^[0-9]+[A-Z]+'
]

EXCLUDE_EXACT = {
    'subham', 'subedi', 'legend', 'kathmandu valley', 'bus route', 'transit map',
    'outbound', 'inbound', 'going', 'return', 'route number', 'bus services',
    'the burger house', 'tbhcfc', 'pkmc', 'multiple campus', 'black lines',
    'common path', 'notation style', 'tundikhel', 'one way', 'two way'
}

def is_valid_place(text):
    text_clean = text.strip()
    if len(text_clean) < 3:
        return False
    if any(re.match(pat, text_clean) for pat in ROUTE_PATTERNS):
        return False
    if any(text_clean.lower().startswith(ex) for ex in EXCLUDE_EXACT):
        return False
    # If text is mostly digits or punctuation
    alpha_chars = sum(1 for c in text_clean if c.isalpha())
    if alpha_chars < 3:
        return False
    return True

clean_places = []
for it in ocr_items:
    text = it['text'].strip()
    # Clean leading/trailing junk
    text = re.sub(r'^[^\w]+|[^\w]+$', '', text).strip()
    if not is_valid_place(text):
        continue
    box = it['box']
    cx = sum(p[0] for p in box) / 4.0
    cy = sum(p[1] for p in box) / 4.0
    clean_places.append({
        'name': text,
        'x': round(cx, 1),
        'y': round(cy, 1),
        'score': it['score']
    })

# Deduplicate spatially (distance < 50px and similar text)
unique_places = []
for p in clean_places:
    matched = False
    for u in unique_places:
        dist = ((p['x'] - u['x'])**2 + (p['y'] - u['y'])**2)**0.5
        if dist < 65:
            # Same or substring match
            name1 = p['name'].lower()
            name2 = u['name'].lower()
            if name1 == name2 or name1 in name2 or name2 in name1:
                # Keep the longer / more complete name
                if len(p['name']) > len(u['name']):
                    u['name'] = p['name']
                u['x'] = round((u['x'] + p['x']) / 2, 1)
                u['y'] = round((u['y'] + p['y']) / 2, 1)
                u['count'] += 1
                matched = True
                break
    if not matched:
        unique_places.append({
            'name': p['name'],
            'x': p['x'],
            'y': p['y'],
            'count': 1,
            'score': p['score']
        })

print(f"Total clean extracted places from clean-map.jpg: {len(unique_places)}")

# Sort by name
unique_places.sort(key=lambda x: x['name'])
print("\nSample clean places:")
for p in unique_places[:30]:
    print(f"  {p['name']:35s} -> [{p['x']}, {p['y']}]")
