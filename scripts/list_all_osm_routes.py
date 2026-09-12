import xml.etree.ElementTree as ET
import sys

sys.stdout.reconfigure(encoding='utf-8')

tree = ET.parse('routes_data/aug_16.osm')
root = tree.getroot()

print('=== ALL 79 ROUTE RELATIONS IN aug_16.osm ===')
for i, rel in enumerate(root.findall('relation')):
    tags = {t.attrib['k']: t.attrib['v'] for t in rel.findall('tag')}
    ref = tags.get('ref', '')
    name = tags.get('name', 'Unnamed')
    route_type = tags.get('route', '')
    print(f"{i+1:2d}. [{ref:15s}] {name} ({route_type})")
