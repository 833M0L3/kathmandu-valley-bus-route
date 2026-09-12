import json
import re
import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/map_ocr_all.json', encoding='utf-8') as f:
    ocr_items = json.load(f)

# Primary labels from areaLabels.js
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
    r'^[0-9]+[A-Z]+[0-9]*$',
    r'^[A-Z]{1,2}[0-9]{2,}',
    r'^[0-9]+-[0-9]+',
    r'^[A-Z][0-9]+[A-Z][0-9]+',
    r'^[0-9]+[A-Z]+',
    r'^[BSRNMTKCFZPLDY]\d',
    r'^[A-Z]{2,4}\d+',
    r'^[A-Z]{1,2}\s+[A-Z]{1,2}\d*'
]

EXCLUDE_WORDS = {
    'subham', 'subedi', 'legend', 'kathmandu valley', 'bus route', 'transit map',
    'outbound', 'inbound', 'going', 'return', 'route number', 'bus services',
    'the burger house', 'tbhcfc', 'pkmc', 'multiple campus', 'black lines',
    'common path', 'notation style', 'tundikhel', 'one way', 'two way', 'commission',
    'regulatory', 'electricity', 'development center', 'national media', 'sahitya pratisthan',
    'hem ganga kala', 'association', 'enterprises', 'secondary school', 'sec. school',
    'sec.school', 'boarding school'
}

def clean_name(text):
    # Split camelCase like BabarMahal -> Babar Mahal
    t = re.sub(r'([a-z])([A-Z])', r'\1 \2', text)
    # Remove leading/trailing non-alphanumeric
    t = re.sub(r'^[^\w]+|[^\w]+$', '', t).strip()
    # Normalize spaces
    t = re.sub(r'\s+', ' ', t)
    return t

def is_junk(text):
    t = text.strip()
    if len(t) < 3:
        return True
    for pat in ROUTE_PATTERNS:
        if re.search(pat, t):
            return True
    tl = t.lower()
    if any(ex in tl for ex in EXCLUDE_WORDS):
        return True
    alpha = sum(1 for c in t if c.isalpha())
    if alpha < 3 or (alpha / len(t)) < 0.65:
        return True
    return False

raw_extracted = []
for it in ocr_items:
    t = it['text']
    if is_junk(t):
        continue
    cname = clean_name(t)
    if is_junk(cname):
        continue
    box = it['box']
    cx = sum(p[0] for p in box) / 4.0
    cy = sum(p[1] for p in box) / 4.0
    raw_extracted.append({
        'name': cname,
        'x': round(cx, 1),
        'y': round(cy, 1),
        'score': it['score']
    })

# Cluster
clustered_stations = []
for p in raw_extracted:
    matched = False
    for c in clustered_stations:
        d = ((p['x'] - c['x'])**2 + (p['y'] - c['y'])**2)**0.5
        n1 = p['name'].lower()
        n2 = c['name'].lower()
        if d < 120 and (n1 == n2 or n1 in n2 or n2 in n1):
            if len(p['name']) > len(c['name']):
                c['name'] = p['name']
            c['x'] = round((c['x'] + p['x']) / 2, 1)
            c['y'] = round((c['y'] + p['y']) / 2, 1)
            matched = True
            break
    if not matched:
        clustered_stations.append(p)

print(f"Clustered candidate stations: {len(clustered_stations)}")

# Filter out if overlapping primary
final_places = list(primary_places)
for c in clustered_stations:
    name = c['name']
    # Check if matches any existing
    if any(p['name'].lower() == name.lower() for p in primary_places):
        continue
    too_close = False
    for p in primary_places:
        d = ((c['x'] - p['x'])**2 + (c['y'] - p['y'])**2)**0.5
        if d < 100:
            too_close = True
            break
    if too_close:
        continue
    
    # Classify category and tier
    nl = name.lower()
    if any(k in nl for k in ['hospital', 'clinic', 'swasthya']):
        tier = 'landmark'
        cat = 'Hospital / Healthcare'
    elif any(k in nl for k in ['campus', 'college', 'school', 'academy', 'university']):
        tier = 'landmark'
        cat = 'Educational Campus'
    elif any(k in nl for k in ['temple', 'mandir', 'gumba', 'monastery', 'stupa', 'bahal', 'baha']):
        tier = 'landmark'
        cat = 'Religious Landmark'
    elif any(k in nl for k in ['park', 'bus park', 'terminal']):
        tier = 'hub'
        cat = 'Bus Park / Terminal'
    elif any(k in nl for k in ['chowk', 'mode', 'dovan', 'pul', 'bridge', 'gate', 'dhoka']):
        tier = 'station'
        cat = 'Chowk / Intersection'
    elif any(k in nl for k in ['bhatbhateni', 'mart', 'market', 'cinema', 'hall', 'complex', 'mall']):
        tier = 'landmark'
        cat = 'Shopping / Commercial'
    else:
        tier = 'station'
        cat = 'Transit Stop / Locality'

    pid = re.sub(r'[^a-z0-9]+', '_', name.lower()).strip('_')
    final_places.append({
        'id': pid,
        'name': name,
        'x': c['x'],
        'y': c['y'],
        'tier': tier,
        'category': cat
    })

print(f"Total curated places dataset: {len(final_places)}")

# Count by tier
tiers = {}
for p in final_places:
    tiers[p['tier']] = tiers.get(p['tier'], 0) + 1
print("Count by tier:", tiers)

# Write to src/data/placesData.js
js_content = f"""/**
 * Complete Kathmandu Valley Places & Transit Stations Directory
 * Extracted with OCR precision from clean-map.jpg
 * Total places: {len(final_places)}
 */

export const ALL_MAP_PLACES = {json.dumps(final_places, indent=2, ensure_ascii=False)};
"""

with open('src/data/placesData.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print("Saved to src/data/placesData.js successfully!")
