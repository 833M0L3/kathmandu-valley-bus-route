import json
import math
import re
import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/map_ocr_all.json', encoding='utf-8') as f:
    ocr_items = json.load(f)

# Primary places from areaLabels.js (always preserve exact coordinates)
primary_places = [
    { 'id': 'kathmandu', 'name': 'Kathmandu', 'nepali': 'काठमाडौँ', 'x': 4480, 'y': 4050, 'tier': 'city', 'category': 'Metropolitan City' },
    { 'id': 'lalitpur', 'name': 'Lalitpur (Patan)', 'nepali': 'ललितपुर', 'x': 4660, 'y': 5120, 'tier': 'city', 'category': 'Metropolitan City' },
    { 'id': 'bhaktapur', 'name': 'Bhaktapur', 'nepali': 'भक्तपुर', 'x': 8865, 'y': 4650, 'tier': 'city', 'category': 'Metropolitan City' },
    { 'id': 'kalanki', 'name': 'Kalanki', 'nepali': 'कलङ्की', 'x': 3208, 'y': 4542, 'tier': 'hub', 'category': 'Transit Gateway' },
    { 'id': 'koteshwor', 'name': 'Koteshwor', 'nepali': 'कोटेश्वर', 'x': 5489, 'y': 4895, 'tier': 'hub', 'category': 'Transit Gateway' },
    { 'id': 'gongabu', 'name': 'Gongabu (New Bus Park)', 'nepali': 'नयाँ बसपार्क', 'x': 3980, 'y': 2700, 'tier': 'hub', 'category': 'Bus Terminal' },
    { 'id': 'airport', 'name': 'Tribhuvan Int’l Airport', 'nepali': 'विमानस्थल', 'x': 6112, 'y': 4024, 'tier': 'hub', 'category': 'International Airport' },
    { 'id': 'chabahil', 'name': 'Chabahil / Boudha', 'nepali': 'चाबहिल / बौद्ध', 'x': 5780, 'y': 3492, 'tier': 'hub', 'category': 'Major Junction' },
    { 'id': 'thimi', 'name': 'Madhyapur Thimi', 'nepali': 'मध्यपुर थिमी', 'x': 7590, 'y': 4112, 'tier': 'hub', 'category': 'Historic Town' },
    { 'id': 'kirtipur', 'name': 'Kirtipur', 'nepali': 'कीर्तिपुर', 'x': 3465, 'y': 6107, 'tier': 'hub', 'category': 'Historic City' },
    { 'id': 'ratnapark', 'name': 'Ratnapark', 'nepali': 'रत्नपार्क', 'x': 4410, 'y': 4145, 'tier': 'local', 'category': 'Central Bus Terminal' },
    { 'id': 'baneshwor', 'name': 'New Baneshwor', 'nepali': 'नयाँ बानेश्वर', 'x': 5202, 'y': 4485, 'tier': 'local', 'category': 'Commercial Hub' },
    { 'id': 'balaju', 'name': 'Balaju', 'nepali': 'बालाजु', 'x': 3617, 'y': 3058, 'tier': 'local', 'category': 'Transit Junction' },
    { 'id': 'maharajgunj', 'name': 'Maharajgunj', 'nepali': 'महाराजगञ्ज', 'x': 5100, 'y': 3050, 'tier': 'local', 'category': 'Commercial Hub' },
    { 'id': 'balkhu', 'name': 'Balkhu', 'nepali': 'बल्खु', 'x': 3964, 'y': 5207, 'tier': 'local', 'category': 'Ring Road Gateway' },
    { 'id': 'thamel', 'name': 'Thamel', 'nepali': 'ठमेल', 'x': 4142, 'y': 3760, 'tier': 'local', 'category': 'Tourism & Culture' },
    { 'id': 'jawalakhel', 'name': 'Jawalakhel', 'nepali': 'जावलाखेल', 'x': 4516, 'y': 5182, 'tier': 'local', 'category': 'Central Lalitpur' },
    { 'id': 'lagankhel', 'name': 'Lagankhel', 'nepali': 'लगनखेल', 'x': 4803, 'y': 5109, 'tier': 'local', 'category': 'Lalitpur Bus Station' },
    { 'id': 'satdobato', 'name': 'Satdobato', 'nepali': 'सातदोबाटो', 'x': 5068, 'y': 5632, 'tier': 'local', 'category': 'Ring Road Junction' },
    { 'id': 'kalimati', 'name': 'Kalimati', 'nepali': 'कालीमाटी', 'x': 3932, 'y': 4518, 'tier': 'local', 'category': 'Commercial Hub' },
    { 'id': 'tripureshwor', 'name': 'Tripureshwor', 'nepali': 'त्रिपुरेश्वर', 'x': 4537, 'y': 4565, 'tier': 'local', 'category': 'Transit Junction' },
    { 'id': 'swayambhu', 'name': 'Swayambhu', 'nepali': 'स्वयम्भू', 'x': 3056, 'y': 3592, 'tier': 'local', 'category': 'Heritage Monument' },
    { 'id': 'budhanilkantha', 'name': 'Budhanilkantha', 'nepali': 'बुढानीलकण्ठ', 'x': 6626, 'y': 2212, 'tier': 'local', 'category': 'Northern Valley' },
    { 'id': 'jorpati', 'name': 'Jorpati', 'nepali': 'जोरपाटी', 'x': 6838, 'y': 3211, 'tier': 'local', 'category': 'Northeastern Hub' },
    { 'id': 'thankot', 'name': 'Thankot', 'nepali': 'थानकोट', 'x': 1418, 'y': 4520, 'tier': 'local', 'category': 'Valley Western Gateway' },
    { 'id': 'suryabinayak', 'name': 'Suryabinayak', 'nepali': 'सूर्यविनायक', 'x': 8933, 'y': 5052, 'tier': 'local', 'category': 'Bhaktapur Terminal' },
    { 'id': 'sundarijal', 'name': 'Sundarijal', 'nepali': 'सुन्दरीजल', 'x': 7125, 'y': 1861, 'tier': 'local', 'category': 'Northern Valley Rim' },
    { 'id': 'shivapuri', 'name': 'Shivapuri Peak (2,732m)', 'nepali': 'शिवपुरी डाँडा', 'x': 5700, 'y': 780, 'tier': 'peak', 'category': 'Mountain Peak' },
    { 'id': 'phulchowki', 'name': 'Phulchowki Peak (2,782m)', 'nepali': 'फूलचोकी डाँडा', 'x': 7850, 'y': 8350, 'tier': 'peak', 'category': 'Mountain Peak' },
    { 'id': 'chandragiri', 'name': 'Chandragiri Peak (2,551m)', 'nepali': 'चन्द्रागिरी डाँडा', 'x': 950, 'y': 6850, 'tier': 'peak', 'category': 'Mountain Peak' },
    { 'id': 'champadevi', 'name': 'Champadevi Peak (2,285m)', 'nepali': 'चम्पादेवी डाँडा', 'x': 1950, 'y': 7750, 'tier': 'peak', 'category': 'Mountain Peak' },
    { 'id': 'nagarjun', 'name': 'Nagarjun Hill (2,128m)', 'nepali': 'नागार्जुन डाँडा', 'x': 1450, 'y': 2400, 'tier': 'peak', 'category': 'Mountain Peak' }
]

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

valid_items = []
for it in ocr_items:
    t = it['text'].strip()
    t = re.sub(r'^[^\w]+|[^\w]+$', '', t).strip()
    if is_noise(t):
        continue
    box = it['box']
    cx = sum(p[0] for p in box) / 4.0
    cy = sum(p[1] for p in box) / 4.0
    valid_items.append({
        'text': t,
        'cx': cx,
        'cy': cy,
        'score': it['score']
    })

# Form multi-line combined places
merged_candidates = []

# Pass 1: Stacking pairs (dx < 45, 10 <= dy <= 45)
for i, a in enumerate(valid_items):
    for j, b in enumerate(valid_items):
        if i == j:
            continue
        dx = abs(a['cx'] - b['cx'])
        dy = b['cy'] - a['cy']
        if dx < 45 and 10 <= dy <= 45:
            comb = f"{a['text']} {b['text']}"
            comb = re.sub(r'([a-z])([A-Z])', r'\1 \2', comb)
            comb = re.sub(r'\s+', ' ', comb).strip()
            merged_candidates.append({
                'name': comb,
                'x': round((a['cx'] + b['cx']) / 2, 1),
                'y': round((a['cy'] + b['cy']) / 2, 1),
                'score': min(a['score'], b['score'])
            })

# Pass 2: Standalone single lines
for a in valid_items:
    clean = re.sub(r'([a-z])([A-Z])', r'\1 \2', a['text'])
    clean = re.sub(r'\s+', ' ', clean).strip()
    if len(clean) >= 3:
        merged_candidates.append({
            'name': clean,
            'x': round(a['cx'], 1),
            'y': round(a['cy'], 1),
            'score': a['score']
        })

print(f"Total merged place candidates: {len(merged_candidates)}")

# Deduplicate spatially (within 60px and similar name)
unique_stations = []
for p in merged_candidates:
    matched = False
    for u in unique_stations:
        d = ((p['x'] - u['x'])**2 + (p['y'] - u['y'])**2)**0.5
        n1 = p['name'].lower()
        n2 = u['name'].lower()
        if d < 70 and (n1 == n2 or (n1 in n2 and abs(len(n1) - len(n2)) < 8) or (n2 in n1 and abs(len(n1) - len(n2)) < 8)):
            # Pick the longer / more descriptive name (e.g. 'Thulo Bharyang' over 'Bharyang')
            if len(p['name']) > len(u['name']):
                u['name'] = p['name']
            u['x'] = round((u['x'] + p['x']) / 2, 1)
            u['y'] = round((u['y'] + p['y']) / 2, 1)
            matched = True
            break
    if not matched:
        unique_stations.append(p)

print(f"Unique stations after deduplication: {len(unique_stations)}")

# Ensure Thulo Bharyang and Sano Bharyang are explicitly in
for name, x, y in [('Thulo Bharyang', 3097.0, 3195.0), ('Sano Bharyang', 3228.0, 3096.0)]:
    found = any(s['name'].lower() == name.lower() for s in unique_stations)
    if not found:
        unique_stations.append({'name': name, 'x': x, 'y': y, 'score': 0.95})

# Exclude overlap with primary places
all_final_places = list(primary_places)
for s in unique_stations:
    name = s['name']
    if any(p['name'].lower() == name.lower() for p in primary_places):
        continue
    # Check distance to any primary place
    too_close = False
    for p in primary_places:
        d = ((s['x'] - p['x'])**2 + (s['y'] - p['y'])**2)**0.5
        if d < 90 and (name.lower() in p['name'].lower() or p['name'].lower() in name.lower()):
            too_close = True
            break
    if too_close:
        continue
        
    nl = name.lower()
    if any(k in nl for k in ['hospital', 'clinic', 'swasthya', 'health']):
        tier = 'landmark'
        cat = 'Hospital / Healthcare'
    elif any(k in nl for k in ['campus', 'college', 'school', 'academy', 'institute', 'polytechnic', 'university']):
        tier = 'landmark'
        cat = 'Educational Campus'
    elif any(k in nl for k in ['temple', 'mandir', 'gumba', 'monastery', 'stupa', 'bahal', 'baha', 'mahadav', 'bhairab']):
        tier = 'landmark'
        cat = 'Religious Landmark'
    elif any(k in nl for k in ['park', 'bus park', 'terminal']):
        tier = 'hub'
        cat = 'Bus Park / Terminal'
    elif any(k in nl for k in ['chowk', 'mode', 'dovan', 'pul', 'bridge', 'gate', 'dhoka', 'falcha']):
        tier = 'station'
        cat = 'Chowk / Intersection'
    elif any(k in nl for k in ['bhatbhateni', 'mart', 'market', 'cinema', 'pictures', 'complex', 'mall']):
        tier = 'landmark'
        cat = 'Shopping / Commercial'
    else:
        tier = 'station'
        cat = 'Transit Stop / Locality'
        
    pid = re.sub(r'[^a-z0-9]+', '_', name.lower()).strip('_')
    all_final_places.append({
        'id': pid,
        'name': name,
        'x': s['x'],
        'y': s['y'],
        'tier': tier,
        'category': cat
    })

print(f"Total places compiled into placesData.js: {len(all_final_places)}")

# Save to placesData.js
js_places = f"""/**
 * Complete Kathmandu Valley Places & Transit Stations Directory
 * Extracted with OCR precision from clean-map.jpg with multi-line phrase reconstruction.
 * Total places: {len(all_final_places)}
 */

export const ALL_MAP_PLACES = {json.dumps(all_final_places, indent=2, ensure_ascii=False)};
"""

with open('src/data/placesData.js', 'w', encoding='utf-8') as f:
    f.write(js_places)

print("Saved src/data/placesData.js successfully!")
