import json
import re
import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/map_ocr_all.json', encoding='utf-8') as f:
    ocr_items = json.load(f)

# Exclude patterns
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
    r'^[A-Z]{2,4}\d+'
]

EXCLUDE_EXACT = {
    'subham', 'subedi', 'legend', 'kathmandu valley', 'bus route', 'transit map',
    'outbound', 'inbound', 'going', 'return', 'route number', 'bus services',
    'the burger house', 'tbhcfc', 'pkmc', 'multiple campus', 'black lines',
    'common path', 'notation style', 'tundikhel', 'one way', 'two way', 'commission',
    'regulatory', 'electricity', 'development center', 'national media', 'sahitya pratisthan',
    'hem ganga kala', 'association', 'enterprises'
}

def is_noise(text):
    t = text.strip()
    if len(t) < 3:
        return True
    for pat in ROUTE_PATTERNS:
        if re.search(pat, t):
            return True
    if any(ex in t.lower() for ex in EXCLUDE_EXACT):
        return True
    # If ratio of letters is too low
    alpha = sum(1 for c in t if c.isalpha())
    if alpha < 3 or (alpha / len(t)) < 0.6:
        return True
    return False

# Existing primary labels from areaLabels.js
existing_primary = {
    'kathmandu': (4480, 4050, 'city', 'Kathmandu', 'काठमाडौँ'),
    'lalitpur': (4660, 5120, 'city', 'Lalitpur (Patan)', 'ललितपुर'),
    'bhaktapur': (8865, 4650, 'city', 'Bhaktapur', 'भक्तपुर'),
    'kalanki': (3208, 4542, 'hub', 'Kalanki', 'कलङ्की'),
    'koteshwor': (5489, 4895, 'hub', 'Koteshwor', 'कोटेश्वर'),
    'gongabu': (3980, 2700, 'hub', 'Gongabu (New Bus Park)', 'नयाँ बसपार्क'),
    'airport': (6112, 4024, 'hub', 'Tribhuvan Int’l Airport', 'विमानस्थल'),
    'chabahil': (5780, 3492, 'hub', 'Chabahil / Boudha', 'चाबहिल / बौद्ध'),
    'thimi': (7590, 4112, 'hub', 'Madhyapur Thimi', 'मध्यपुर थिमी'),
    'kirtipur': (3465, 6107, 'hub', 'Kirtipur', 'कीर्तिपुर'),
    'ratnapark': (4410, 4145, 'local', 'Ratnapark', 'रत्नपार्क'),
    'baneshwor': (5202, 4485, 'local', 'New Baneshwor', 'नयाँ बानेश्वर'),
    'balaju': (3617, 3058, 'local', 'Balaju', 'बालाजु'),
    'maharajgunj': (5100, 3050, 'local', 'Maharajgunj', 'महाराजगञ्ज'),
    'balkhu': (3964, 5207, 'local', 'Balkhu', 'बल्खु'),
    'thamel': (4142, 3760, 'local', 'Thamel', 'ठमेल'),
    'jawalakhel': (4516, 5182, 'local', 'Jawalakhel', 'जावलाखेल'),
    'lagankhel': (4803, 5109, 'local', 'Lagankhel', 'लगनखेल'),
    'satdobato': (5068, 5632, 'local', 'Satdobato', 'सातदोबाटो'),
    'kalimati': (3932, 4518, 'local', 'Kalimati', 'कालीमाटी'),
    'tripureshwor': (4537, 4565, 'local', 'Tripureshwor', 'त्रिपुरेश्वर'),
    'swayambhu': (3056, 3592, 'local', 'Swayambhu', 'स्वयम्भू'),
    'budhanilkantha': (6626, 2212, 'local', 'Budhanilkantha', 'बुढानीलकण्ठ'),
    'jorpati': (6838, 3211, 'local', 'Jorpati', 'जोरपाटी'),
    'thankot': (1418, 4520, 'local', 'Thankot', 'थानकोट'),
    'suryabinayak': (8933, 5052, 'local', 'Suryabinayak', 'सूर्यविनायक'),
    'sundarijal': (7125, 1861, 'local', 'Sundarijal', 'सुन्दरीजल'),
    'shivapuri': (5700, 780, 'peak', 'Shivapuri Peak (2,732m)', 'शिवपुरी डाँडा'),
    'phulchowki': (7850, 8350, 'peak', 'Phulchowki Peak (2,782m)', 'फूलचोकी डाँडा'),
    'chandragiri': (950, 6850, 'peak', 'Chandragiri Peak (2,551m)', 'चन्द्रागिरी डाँडा'),
    'champadevi': (1950, 7750, 'peak', 'Champadevi Peak (2,285m)', 'चम्पादेवी डाँडा'),
    'nagarjun': (1450, 2400, 'peak', 'Nagarjun Hill (2,128m)', 'नागार्जुन डाँडा')
}

extracted = []
for it in ocr_items:
    text = it['text'].strip()
    text = re.sub(r'^[^\w]+|[^\w]+$', '', text).strip()
    if is_noise(text):
        continue
    box = it['box']
    cx = sum(p[0] for p in box) / 4.0
    cy = sum(p[1] for p in box) / 4.0
    
    extracted.append({
        'name': text,
        'x': round(cx, 1),
        'y': round(cy, 1),
        'score': it['score']
    })

# Merge nearby duplicates (within 70px)
clustered = []
for p in extracted:
    matched = False
    for c in clustered:
        d = ((p['x'] - c['x'])**2 + (p['y'] - c['y'])**2)**0.5
        if d < 70 and (p['name'].lower() == c['name'].lower() or p['name'].lower() in c['name'].lower() or c['name'].lower() in p['name'].lower()):
            if len(p['name']) > len(c['name']):
                c['name'] = p['name']
            c['x'] = round((c['x'] + p['x']) / 2, 1)
            c['y'] = round((c['y'] + p['y']) / 2, 1)
            matched = True
            break
    if not matched:
        clustered.append(p)

print(f"Clustered raw extracted places: {len(clustered)}")

# Filter out if it's right on top of an existing primary label (within 80px)
final_stations = []
for c in clustered:
    name = c['name']
    # Check if name is already in existing_primary
    if any(k in name.lower() for k in existing_primary):
        continue
    # Check distance to any existing primary
    too_close = False
    for pid, pdata in existing_primary.items():
        dist = ((c['x'] - pdata[0])**2 + (c['y'] - pdata[1])**2)**0.5
        if dist < 60:
            too_close = True
            break
    if too_close:
        continue
    
    # Categorize tier: 'station' (transit stop/chowk) vs 'landmark' (temple, hospital, school)
    name_lower = name.lower()
    if any(w in name_lower for w in ['hospital', 'campus', 'college', 'temple', 'mandir', 'gumba', 'school', 'academy', 'park', 'airport', 'embassy', 'bhatbhateni', 'cinema', 'pictures', 'hall']):
        tier = 'landmark'
    else:
        tier = 'station'
        
    final_stations.append({
        'id': re.sub(r'[^a-z0-9]+', '_', name.lower()).strip('_'),
        'name': name,
        'x': c['x'],
        'y': c['y'],
        'tier': tier
    })

print(f"Final stations and landmarks to add: {len(final_stations)}")
final_stations.sort(key=lambda x: x['name'])
for s in final_stations[:30]:
    print(f"  [{s['tier']}] {s['name']:35s} -> [{s['x']}, {s['y']}]")
