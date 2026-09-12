import json
import re
import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/map_ocr_all.json', encoding='utf-8') as f:
    ocr_items = json.load(f)

# Filter out route badge text (like S1, B10, S5-S8, etc.) and pure numbers
# We want actual place names, stations, chowks, and landmarks
EXCLUDE_TERMS = {
    'subham', 'subedi', 'legend', 'kathmandu valley', 'bus route', 'transit map',
    'outbound', 'inbound', 'going', 'return', 'route number', 'bus services',
    'the burger house', 'tbhcfc', 'pkmc', 'multiple campus', 'black lines',
    'common path', 'notation style'
}

raw_places = []
for it in ocr_items:
    text = it['text'].strip()
    score = it['score']
    
    # Skip short strings or route codes
    if len(text) < 3:
        continue
    if re.match(r'^[A-Z][0-9]+(?:\'[0-9]*)?$', text):
        continue
    if re.match(r'^[A-Z][0-9]+-[A-Z]?[0-9]+$', text):
        continue
    if re.match(r'^[0-9\W]+$', text):
        continue
    if any(ex in text.lower() for ex in EXCLUDE_TERMS):
        continue
        
    box = it['box']
    cx = sum(p[0] for p in box) / 4.0
    cy = sum(p[1] for p in box) / 4.0
    
    # Strip leading/trailing punctuation or bullet artifacts
    clean_text = re.sub(r'^[^\w\s]+|[^\w\s]+$', '', text).strip()
    if len(clean_text) >= 3 and not re.match(r'^[0-9]+$', clean_text):
        raw_places.append({
            'name': clean_text,
            'x': round(cx, 1),
            'y': round(cy, 1),
            'score': score
        })

print(f"Total raw place items: {len(raw_places)}")

# Cluster overlapping detections (within 50px distance and same name)
clustered = []
for p in raw_places:
    matched = False
    for c in clustered:
        dist = ((p['x'] - c['x'])**2 + (p['y'] - c['y'])**2)**0.5
        if dist < 60 and (p['name'].lower() == c['name'].lower() or p['name'].lower() in c['name'].lower() or c['name'].lower() in p['name'].lower()):
            # Combine
            if len(p['name']) > len(c['name']):
                c['name'] = p['name']
            c['x'] = round((c['x'] + p['x']) / 2, 1)
            c['y'] = round((c['y'] + p['y']) / 2, 1)
            c['count'] += 1
            matched = True
            break
    if not matched:
        clustered.append({
            'name': p['name'],
            'x': p['x'],
            'y': p['y'],
            'count': 1,
            'score': p['score']
        })

print(f"Unique clustered places: {len(clustered)}")
clustered.sort(key=lambda x: x['name'])
for c in clustered[:40]:
    print(f"  {c['name']:35s} at ({c['x']}, {c['y']})")
