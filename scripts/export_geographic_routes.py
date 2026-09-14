import xml.etree.ElementTree as ET
import json
import re

# Load legend operators to match colors and operator names
with open('src/data/legendData.js', 'r', encoding='utf-8') as f:
    legend_text = f.read()

# Parse operators and colors
operator_colors = {}
for block in re.findall(r'\{[^{}]*name:\s*["\']([^"\']+)["\'][^{}]*color:\s*["\']([^"\']+)["\']', legend_text):
    operator_colors[block[0]] = block[1]

# Also read routes.json for operator mappings
with open('routes_data/routes.json', 'r', encoding='utf-8') as f:
    routes_json = json.load(f).get('data', [])

json_op_map = {}
for r in routes_json:
    name_clean = r['name'].lower().strip()
    json_op_map[name_clean] = {
        'operator': r.get('operatorName', 'Unlisted Operator'),
        'color': '#' + r.get('color', '3b82f6')
    }

# Parse OSM
tree = ET.parse('routes_data/aug_16.osm')
root = tree.getroot()

nodes = {}
for node in root.findall('node'):
    nid = node.attrib['id']
    nodes[nid] = (round(float(node.attrib['lat']), 6), round(float(node.attrib['lon']), 6))

ways = {}
for way in root.findall('way'):
    wid = way.attrib['id']
    way_nodes = [nd.attrib['ref'] for nd in way.findall('nd')]
    coords = [nodes[nid] for nid in way_nodes if nid in nodes]
    if coords:
        ways[wid] = coords

geo_routes = []
for rel in root.findall('relation'):
    tags = {t.attrib['k']: t.attrib['v'] for t in rel.findall('tag')}
    name = tags.get('name', 'Unnamed Route')
    ref = tags.get('ref', '')
    operator = tags.get('operator', '')
    
    # Try finding operator in routes.json
    name_clean = name.lower().strip()
    matched_info = None
    for k, v in json_op_map.items():
        if k in name_clean or name_clean in k:
            matched_info = v
            break
            
    if not operator or operator == 'N/A':
        if matched_info and matched_info['operator'] != 'Unlisted Operator':
            operator = matched_info['operator']
        else:
            # Match by name keywords
            if 'sajha' in name_clean:
                operator = 'Sajha Yatayat'
            elif 'nepal' in name_clean:
                operator = 'Nepal Yatayat'
            elif 'mahanagar' in name_clean or 'ringroad' in name_clean or 'ring road' in name_clean:
                operator = 'Mahanagar Yatayat'
            elif 'mayur' in name_clean:
                operator = 'Mayur Yatayat'
            elif 'tarakesh' in name_clean or 'tarkesh' in name_clean:
                operator = 'Tarakeshwar Yatayat'
            elif 'kirtipur' in name_clean:
                operator = 'Kirtipur Yatayat'
            elif 'bhaktapur' in name_clean:
                operator = 'Bhaktapur Buses'
            elif 'chandragiri' in name_clean or 'thankot' in name_clean:
                operator = 'Chandragiri Yatayat'
            elif 'budhanilkantha' in name_clean:
                operator = 'Budhanilkantha Yatayat'
            elif 'digo' in name_clean:
                operator = 'Digo Yatayat'
            elif 'balaju' in name_clean or 'raniban' in name_clean:
                operator = 'Balaju Yatayat'
            elif 'samakhusi' in name_clean:
                operator = 'Samakhusi Yatayat'
            elif 'gokarn' in name_clean:
                operator = 'Gokarneshwar Yatayat'
            elif 'riddhi' in name_clean:
                operator = 'Riddhi Siddhi Yatayat'
            else:
                operator = 'Valley Transit Line'

    color = operator_colors.get(operator, matched_info['color'] if matched_info else '#475569')

    # Gather way segments
    polylines = []
    min_lat, min_lon = 90.0, 180.0
    max_lat, max_lon = -90.0, -180.0
    
    for member in rel.findall('member'):
        if member.attrib['type'] == 'way':
            mref = member.attrib['ref']
            if mref in ways:
                pts = ways[mref]
                polylines.append(pts)
                for lat, lon in pts:
                    min_lat = min(min_lat, lat)
                    min_lon = min(min_lon, lon)
                    max_lat = max(max_lat, lat)
                    max_lon = max(max_lon, lon)

    if polylines:
        geo_routes.append({
            'id': rel.attrib['id'],
            'name': name,
            'ref': ref,
            'operator': operator,
            'color': color,
            'bounds': [[min_lat, min_lon], [max_lat, max_lon]],
            'polylines': polylines
        })

print(f"Exporting {len(geo_routes)} geographic routes to src/data/geographicRoutes.json")
with open('src/data/geographicRoutes.json', 'w', encoding='utf-8') as f:
    json.dump(geo_routes, f, ensure_ascii=False)

print("Done! File size:", len(json.dumps(geo_routes)))
