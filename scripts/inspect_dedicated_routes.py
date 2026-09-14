import xml.etree.ElementTree as ET

tree = ET.parse('Kathmandu_Bus_Route_Map.svg')
root = tree.getroot()

# Find Bus_Routes group
bus_routes = None
for elem in root.iter():
    if elem.get('id') == 'Bus_Routes':
        bus_routes = elem
        break

if bus_routes is None:
    print("Bus_Routes not found")
    exit(1)

route_data = {}

for op in bus_routes:
    op_id = op.get('id', '')
    op_name = op.get('data-name', op_id)
    sub_routes = []
    
    for child in op:
        cid = child.get('id', '')
        cname = child.get('data-name', cid)
        tag = child.tag.split('}')[-1]
        
        # Check if child is a group of routes or a path
        if tag == 'g':
            nested = [sub.get('id', sub.tag.split('}')[-1]) for sub in child]
            sub_routes.append({
                'type': 'group',
                'id': cid,
                'name': cname,
                'nested_count': len(nested),
                'nested_samples': nested[:3]
            })
        elif tag == 'path' or tag == 'polyline' or tag == 'line':
            sub_routes.append({
                'type': tag,
                'id': cid,
                'name': cname
            })
    
    route_data[op_id] = {
        'name': op_name,
        'sub_routes': sub_routes
    }

print(f"Found {len(route_data)} operators under Bus_Routes:\n")
for op_id, info in route_data.items():
    named_subs = [s for s in info['sub_routes'] if s['name']]
    print(f"=== {info['name']} (ID: {op_id}) ===")
    print(f"  Total sub-elements: {len(info['sub_routes'])}, Named sub-routes: {len(named_subs)}")
    for s in info['sub_routes']:
        if s['name']:
            print(f"   -> [{s['type'].upper()}] id='{s['id']}' | name='{s['name']}'")
        else:
            print(f"   -> [{s['type'].upper()}] (unnamed path)")
    print()
