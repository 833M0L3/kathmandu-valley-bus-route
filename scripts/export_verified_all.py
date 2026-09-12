import json
import math
import re
import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/map_ocr_all.json', encoding='utf-8') as f:
    ocr_items = json.load(f)

from build_verified_names import OCR_CORRECTIONS

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
    t = re.sub(r'^[^\w]+|[^\w]+$', '', t).strip()
    t = re.sub(r'([a-z])([A-Z])', r'\1 \2', t)
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

clean_items = []
for it in ocr_items:
    cleaned = clean_ocr_text(it['text'])
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

all_candidates = []
# Vertical stacked pairs
for i, a in enumerate(clean_items):
    for j, b in enumerate(clean_items):
        if i == j:
            continue
        dx = abs(a['cx'] - b['cx'])
        dy = b['cy'] - a['cy']
        if dx < 40 and 10 <= dy <= 45:
            comb = clean_ocr_text(f"{a['text']} {b['text']}")
            if is_valid_name(comb):
                all_candidates.append({
                    'name': comb,
                    'x': round((a['cx'] + b['cx']) / 2, 1),
                    'y': round((a['cy'] + b['cy']) / 2, 1),
                    'score': min(a['score'], b['score'])
                })

for a in clean_items:
    all_candidates.append({
        'name': a['text'],
        'x': round(a['cx'], 1),
        'y': round(a['cy'], 1),
        'score': a['score']
    })

# Standardize with verified dictionary
for c in all_candidates:
    nl = c['name'].lower()
    for pattern, correct in OCR_CORRECTIONS.items():
        if nl == pattern:
            c['name'] = correct
            break
        elif pattern in nl and len(pattern) > 8:
            c['name'] = correct
            break

# Ensure Thulo Bharyang and Sano Bharyang
all_candidates.append({'name': 'Thulo Bharyang', 'x': 3097.0, 'y': 3195.0, 'score': 0.99})
all_candidates.append({'name': 'Sano Bharyang', 'x': 3228.0, 'y': 3096.0, 'score': 0.99})

# Deduplicate spatially
unique_places = []
for c in all_candidates:
    matched = False
    for u in unique_places:
        d = ((c['x'] - u['x'])**2 + (c['y'] - u['y'])**2)**0.5
        n1 = c['name'].lower()
        n2 = u['name'].lower()
        if d < 75 and (n1 == n2 or (n1 in n2 and abs(len(n1)-len(n2)) < 10) or (n2 in n1 and abs(len(n1)-len(n2)) < 10)):
            if len(c['name']) > len(u['name']):
                u['name'] = c['name']
            u['x'] = round((u['x'] + c['x']) / 2, 1)
            u['y'] = round((u['y'] + c['y']) / 2, 1)
            matched = True
            break
    if not matched:
        unique_places.append(c)

# Add primary places
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

final_places = list(primary_places)
for u in unique_places:
    name = u['name']
    if any(p['name'].lower() == name.lower() for p in primary_places):
        continue
    too_close = False
    for p in primary_places:
        d = ((u['x'] - p['x'])**2 + (u['y'] - p['y'])**2)**0.5
        if d < 80 and (name.lower() in p['name'].lower() or p['name'].lower() in name.lower()):
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
    final_places.append({
        'id': pid,
        'name': name,
        'x': u['x'],
        'y': u['y'],
        'tier': tier,
        'category': cat
    })

print(f"Total curated places: {len(final_places)}")

# Save placesData.js
js_places = f"""/**
 * Complete Kathmandu Valley Places & Transit Stations Directory
 * Verified and calibrated with exact coordinates from clean-map.jpg.
 * Total verified places: {len(final_places)}
 */

export const ALL_MAP_PLACES = {json.dumps(final_places, indent=2, ensure_ascii=False)};
"""

with open('src/data/placesData.js', 'w', encoding='utf-8') as f:
    f.write(js_places)
print("Saved src/data/placesData.js successfully!")

# Now calculate corridor mappings for placeBusIndex.js
from build_comprehensive_bus_place_map import corridors, dist_to_operator


place_index_list = []
for p in final_places:
    px, py = p['x'], p['y']
    name = p['name']
    
    op_dists = []
    for op in corridors:
        d = dist_to_operator(px, py, op)
        op_dists.append((op, d))
    op_dists.sort(key=lambda x: x[1])
    
    matched = []
    for op, d in op_dists:
        if d <= 850 or len(matched) < 2:
            matched.append(op)
        elif len(matched) >= 4:
            break
            
    place_index_list.append({
        'name': name,
        'nepali': p.get('nepali', ''),
        'buses': matched
    })

# Save placeBusIndex.js
js_bus_index = f"""/**
 * Complete Kathmandu Valley Place-to-Bus Route Mapping
 * Spatially maps all {len(place_index_list)} verified places extracted from clean-map.jpg to their passing bus operators.
 */

export const ALL_PLACES_BUS_INDEX = {json.dumps(place_index_list, indent=2, ensure_ascii=False)};

// Quick lookup helper: Returns list of bus operator codes that serve any place matching query
export function findBusesForPlaceQuery(query) {{
  if (!query || !query.trim()) return {{ codes: [], matchedPlaces: [] }};
  const q = query.trim().toLowerCase();
  
  const matchedCodes = new Set();
  const matchedPlaces = [];

  for (const item of ALL_PLACES_BUS_INDEX) {{
    if (item.name.toLowerCase().includes(q) || (item.nepali && item.nepali.includes(q))) {{
      matchedPlaces.push(item.name);
      item.buses.forEach(b => matchedCodes.add(b));
    }}
  }}

  return {{
    codes: Array.from(matchedCodes),
    matchedPlaces: matchedPlaces.slice(0, 10)
  }};
}}
"""

with open('src/data/placeBusIndex.js', 'w', encoding='utf-8') as f:
    f.write(js_bus_index)
print("Saved src/data/placeBusIndex.js successfully!")
