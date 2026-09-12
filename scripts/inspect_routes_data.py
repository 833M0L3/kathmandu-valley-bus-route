import json
import xml.etree.ElementTree as ET
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("=== INSPECTING routes.json ===")
with open('routes_data/routes.json', encoding='utf-8') as f:
    rdata = json.load(f)

routes_list = rdata.get('data', [])
print(f"Total routes in routes.json: {len(routes_list)}")

operators = set()
for r in routes_list:
    op = r.get('operatorName')
    operators.add(op)
    print(f"Route: {r.get('name')} | Operator: {op} | Stops: {r.get('stopCount')} | Dist: {r.get('distanceMeters')/1000:.1f}km")

print(f"\nUnique Operators in routes.json: {operators}")

print("\n=== INSPECTING aug_16.osm ===")
tree = ET.parse('routes_data/aug_16.osm')
root = tree.getroot()

relations = root.findall('relation')
print(f"Total relations in aug_16.osm: {len(relations)}")
osm_routes = []
for rel in relations:
    tags = {t.attrib['k']: t.attrib['v'] for t in rel.findall('tag')}
    members = rel.findall('member')
    node_members = [m for m in members if m.attrib.get('type') == 'node']
    way_members = [m for m in members if m.attrib.get('type') == 'way']
    osm_routes.append({
        'name': tags.get('name', 'Unnamed'),
        'ref': tags.get('ref', ''),
        'operator': tags.get('operator', ''),
        'from': tags.get('from', ''),
        'to': tags.get('to', ''),
        'via': tags.get('via', ''),
        'route': tags.get('route', ''),
        'stop_nodes': len(node_members),
        'way_segments': len(way_members)
    })

print(f"OSM Route Relations: {len(osm_routes)}")
for r in osm_routes[:20]:
    print(f"  [{r['ref']}] {r['name']} | Op: {r['operator']} | From: {r['from']} -> To: {r['to']} (stops={r['stop_nodes']}, ways={r['way_segments']})")
