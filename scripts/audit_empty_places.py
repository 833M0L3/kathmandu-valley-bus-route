import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/placesData.js', encoding='utf-8') as f:
    t = f.read()
    places = json.loads(t[t.find('['):t.rfind(']')+1])

p_map = {p['name']: p for p in places}

with open('src/data/placeBusIndex.js', encoding='utf-8') as f:
    t = f.read()
    index_items = json.loads(t[t.index('['):t.index('];')+1])

empty = [item for item in index_items if not item['buses']]
print(f'Total empty in placeBusIndex: {len(empty)}')

for item in empty:
    name = item['name']
    p = p_map.get(name)
    if p:
        print(f"{name:45s} | x={p['x']:7.1f}, y={p['y']:7.1f} | cat={p.get('category', ''):25s} | tier={p.get('tier', '')}")
    else:
        print(f"{name:45s} | NOT FOUND in placesData")
