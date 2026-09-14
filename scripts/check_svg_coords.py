import xml.etree.ElementTree as ET

tree = ET.parse('Kathmandu_Bus_Route_Map.svg')
root = tree.getroot()

circles = [e for e in root.iter() if e.tag.endswith('circle')]
print(f"Total circles: {len(circles)}")
for c in circles[:5]:
    print("  Circle:", c.attrib)

texts = [e for e in root.iter() if e.tag.endswith('text')]
print(f"Total texts: {len(texts)}")
for t in texts[:5]:
    txt = ''.join(t.itertext()).strip()
    print(f"  Text '{txt}':", t.attrib)
