import xml.etree.ElementTree as ET
import re

tree = ET.parse('Kathmandu_Bus_Route_Map.svg')
root = tree.getroot()

print('Root tag:', root.tag)
print('Root attributes:', root.attrib)

elements = {}
ids = []
for elem in root.iter():
    tag = elem.tag.split('}')[-1]
    elements[tag] = elements.get(tag, 0) + 1
    eid = elem.get('id')
    if eid:
        ids.append((tag, eid))

print('\nElement counts:')
for tag, count in sorted(elements.items(), key=lambda x: -x[1]):
    print(f'  <{tag}>: {count}')

print(f'\nTotal elements with id: {len(ids)}')
print('Sample IDs:')
for tag, eid in ids[:40]:
    print(f'  <{tag} id="{eid}">')

# Check text elements
texts = root.findall('.//{http://www.w3.org/2000/svg}text')
if not texts:
    texts = [elem for elem in root.iter() if elem.tag.endswith('text')]
print(f'\nTotal <text> elements: {len(texts)}')
for t in texts[:10]:
    txt = ''.join(t.itertext()).strip()
    print(f'  Text: "{txt}" attribs={t.attrib}')

# Check paths
paths = [elem for elem in root.iter() if elem.tag.endswith('path')]
print(f'\nTotal <path> elements: {len(paths)}')
