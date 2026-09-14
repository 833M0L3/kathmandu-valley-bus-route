import xml.etree.ElementTree as ET

tree = ET.parse('routes_data/aug_16.osm')
root = tree.getroot()

print("Relations count:", len(root.findall('relation')))
for rel in root.findall('relation')[:15]:
    tags = {t.attrib['k']: t.attrib['v'] for t in rel.findall('tag')}
    print(f"ID: {rel.attrib['id']}, Name: {tags.get('name', 'N/A')}, Ref: {tags.get('ref', 'N/A')}, Operator: {tags.get('operator', 'N/A')}")
