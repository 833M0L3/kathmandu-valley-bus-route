import xml.etree.ElementTree as ET

tree = ET.parse('Kathmandu_Bus_Route_Map.svg')
root = tree.getroot()

routes_g = root.find('.//{http://www.w3.org/2000/svg}g[@id="Bus_Routes"]')
if routes_g is not None:
    print("Found Bus_Routes!")
    for child in routes_g:
        cid = child.get('id', '')
        tag = child.tag.split('}')[-1]
        print(f"  {tag}: {cid}")
