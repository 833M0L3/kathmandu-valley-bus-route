import xml.etree.ElementTree as ET
import json

tree = ET.parse('routes_data/aug_16.osm')
root = tree.getroot()

# Build node dict: id -> (lat, lon)
nodes = {}
for node in root.findall('node'):
    nid = node.attrib['id']
    lat = float(node.attrib['lat'])
    lon = float(node.attrib['lon'])
    nodes[nid] = (lat, lon)

print(f"Loaded {len(nodes)} nodes")

# Build ways dict: id -> list of (lat, lon)
ways = {}
for way in root.findall('way'):
    wid = way.attrib['id']
    way_nodes = [nd.attrib['ref'] for nd in way.findall('nd')]
    coords = [nodes[nid] for nid in way_nodes if nid in nodes]
    if coords:
        ways[wid] = coords

print(f"Loaded {len(ways)} ways with coordinates")

# Build relations: id -> route info with coordinates
routes = []
for rel in root.findall('relation'):
    tags = {t.attrib['k']: t.attrib['v'] for t in rel.findall('tag')}
    name = tags.get('name', 'Unnamed Route')
    ref = tags.get('ref', '')
    operator = tags.get('operator', '')
    route_type = tags.get('route', 'bus')
    
    # Extract way members in order
    route_segments = []
    for member in rel.findall('member'):
        if member.attrib['type'] == 'way':
            mref = member.attrib['ref']
            if mref in ways:
                route_segments.append(ways[mref])
                
    if route_segments:
        routes.append({
            'id': rel.attrib['id'],
            'name': name,
            'ref': ref,
            'operator': operator,
            'route_type': route_type,
            'segmentsCount': len(route_segments),
            'totalPoints': sum(len(s) for s in route_segments),
            'segments': route_segments
        })

print(f"Extracted {len(routes)} valid route relations")
for r in routes[:10]:
    print(f"- [{r['ref']}] {r['name']} ({r['totalPoints']} pts, {r['segmentsCount']} segments)")
