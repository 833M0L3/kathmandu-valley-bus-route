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

print("=== CHECKING REGIONS ===")
for item in index_items:
    p = p_map.get(item['name'])
    if not p: continue
    x, y = p['x'], p['y']
    buses = item['buses']
    name = item['name']

    # 1. Raniban corridor
    if 1700 <= x <= 2200 and 2300 <= y <= 2900:
        if buses != ['F']:
            print(f"Raniban anomaly: {name:35s} (x={x:.0f}, y={y:.0f}) -> {buses}")

    # 2. Far Northwest Tarakeshwor (Goldhunga, Bohoratar, Lolang)
    if x < 2500 and y < 2250:
        if any(b != 'T' for b in buses) or len(buses) == 0:
            print(f"Tarakeshwor anomaly: {name:35s} (x={x:.0f}, y={y:.0f}) -> {buses}")

    # 3. Danchhi / Indrayani
    if x > 8500 and 2800 <= y <= 3300:
        if any(b not in ('L', 'P') for b in buses) or len(buses) == 0:
            print(f"Danchhi anomaly: {name:35s} (x={x:.0f}, y={y:.0f}) -> {buses}")

    # 4. Far West Thankot
    if x < 2700 and 4400 <= y <= 5500:
        if any(b != 'C' for b in buses):
            print(f"Thankot anomaly: {name:35s} (x={x:.0f}, y={y:.0f}) -> {buses}")

    # 5. Far East Bhaktapur (Chyamasingh, Kamalbinayak, Jagati)
    if x > 8900 and 4300 <= y <= 5500:
        if any(b not in ('B', 'X') for b in buses):
            print(f"Bhaktapur East anomaly: {name:35s} (x={x:.0f}, y={y:.0f}) -> {buses}")

    # 6. South Lalitpur (Godawari, Lele, Chapagaun)
    if y > 6600:
        if any(b != 'S' for b in buses):
            print(f"South Lalitpur anomaly: {name:35s} (x={x:.0f}, y={y:.0f}) -> {buses}")
