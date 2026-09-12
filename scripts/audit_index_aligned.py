import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/placesData.js', encoding='utf-8') as f:
    t = f.read()
    places = json.loads(t[t.find('['):t.rfind(']')+1])

with open('src/data/placeBusIndex.js', encoding='utf-8') as f:
    t = f.read()
    items = json.loads(t[t.index('['):t.index('];')+1])

print("=== CHECKING ALL 1115 PLACES WITH EXACT ALIGNED (X, Y) ===")
unassigned = []
anomalies = []

for i in range(len(places)):
    p = places[i]
    it = items[i]
    x, y = p['x'], p['y']
    name = p['name']
    buses = it['buses']

    # 1. Check unassigned
    if len(buses) == 0:
        # Ignore mountain peaks (which legitimately have no buses)
        if p.get('tier') == 'peak' or 'peak' in name.lower() or 'hill' in name.lower():
            continue
        unassigned.append((i, name, x, y, p.get('category', '')))
        continue

    # 2. Check Raniban (x < 2200, 2300 < y < 2900)
    if 1700 <= x <= 2200 and 2300 <= y <= 2900:
        if buses != ['F']:
            anomalies.append((name, x, y, buses, "Raniban should be only ['F']"))

    # 3. Far Northwest Tarakeshwor (Goldhunga, Bohoratar, Lolang) (x < 2500, y < 2250)
    if x < 2500 and y < 2250:
        if any(b != 'T' for b in buses):
            anomalies.append((name, x, y, buses, "Tarakeshwor northwest should be only ['T']"))

    # 4. Far East Bhaktapur (inner Bhaktapur: Chyamasingh, Kamalbinayak) (x > 8980, 4200 <= y <= 5200)
    if x >= 8980 and 4200 <= y <= 5200:
        if any(b != 'B' for b in buses):
            anomalies.append((name, x, y, buses, "Inner Bhaktapur should be only ['B']"))

    # 5. Far West Thankot (x < 2700, 4400 <= y <= 5500)
    if x < 2700 and 4400 <= y <= 5500:
        if any(b != 'C' for b in buses):
            anomalies.append((name, x, y, buses, "Far West Thankot should be only ['C']"))

    # 6. Deep South Lalitpur (Godawari, Lele, Chapagaun) (y > 6600)
    if y > 6600:
        # Harisiddhi is at y ≈ 6600-6700, has S and R
        if 'harisiddhi' not in name.lower() and any(b != 'S' for b in buses):
            anomalies.append((name, x, y, buses, "Deep South Lalitpur should be only ['S']"))

print(f"Total unassigned non-peak places: {len(unassigned)}")
for u in unassigned:
    print(f"  Unassigned: {u[1]:40s} | x={u[2]:7.1f}, y={u[3]:7.1f} | {u[4]}")

print(f"\nTotal regional boundary anomalies: {len(anomalies)}")
for a in anomalies:
    print(f"  Anomaly: {a[0]:35s} (x={a[1]:.0f}, y={a[2]:.0f}) -> {a[3]} | {a[4]}")
