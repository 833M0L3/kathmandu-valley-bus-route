import json
import xml.etree.ElementTree as ET
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/placesData.js', encoding='utf-8') as f:
    t = f.read()
    places = json.loads(t[t.find('['):t.rfind(']')+1])

place_names = {p['name'].lower(): p for p in places}

print(f"Loaded {len(places)} places from placesData.js\n")

# Check routes.json
with open('routes_data/routes.json', encoding='utf-8') as f:
    rdata = json.load(f)

print("=== ROUTES IN routes.json MATCHED WITH OPERATORS ===")
for r in rdata['data']:
    op = r.get('operatorName')
    name = r.get('name')
    print(f"[{op}] {name} ({r.get('stopCount')} stops, {r.get('distanceMeters')/1000:.1f}km)")

# Check OSM named nodes vs placesData.js
tree = ET.parse('routes_data/aug_16.osm')
root = tree.getroot()

osm_named_stops = []
for n in root.findall('node'):
    tags = {t.attrib['k']: t.attrib['v'] for t in n.findall('tag')}
    if 'name' in tags:
        osm_named_stops.append({
            'id': n.attrib['id'],
            'lat': float(n.attrib['lat']),
            'lon': float(n.attrib['lon']),
            'name': tags['name'],
            'nepali': tags.get('name:ne', ''),
            'highway': tags.get('highway', ''),
            'transport': tags.get('public_transport', '')
        })

print(f"\nTotal OSM named points: {len(osm_named_stops)}")
exact_matches = 0
partial_matches = 0
for s in osm_named_stops:
    sn = s['name'].lower()
    if sn in place_names:
        exact_matches += 1
    elif any(sn in pn or pn in sn for pn in place_names):
        partial_matches += 1

print(f"Exact name matches with placesData.js: {exact_matches}")
print(f"Partial name matches with placesData.js: {partial_matches}")
