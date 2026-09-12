import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/placeBusIndex.js', 'r', encoding='utf-8') as f:
    text = f.read()

items = json.loads(text[text.index('['):text.index('];')+1])

print(f"Total items in placeBusIndex: {len(items)}")

for q in ['radha krishna', 'raniban', 'radha krishna temple']:
    matches = [it for it in items if q in it['name'].lower()]
    print(f"\n=== Query: '{q}' ({len(matches)} matches) ===")
    all_buses = set()
    for m in matches:
        print(f"  {m['name']} -> buses: {m['buses']}")
        for b in m['buses']:
            all_buses.add(b)
    print(f"  Combined buses: {all_buses}")
