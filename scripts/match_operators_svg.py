import json
import re

with open('src/data/legendData.js', 'r', encoding='utf-8') as f:
    text = f.read()

names = re.findall(r'name:\s*"([^"]+)"', text)
print(f"Total services in legendData.js: {len(names)}")
print(names)

with open('Kathmandu_Bus_Route_Map.svg', 'r', encoding='utf-8') as f:
    svg = f.read()

print("\nMatching against SVG elements:")
for name in names:
    # convert name to common SVG id patterns:
    # e.g. "Sajha Yatayat" -> "Sajha_Yatayat"
    # "Bhaktapur Buses" -> "Bhaktapur_Buses"
    clean_id = name.replace(' ', '_').replace('(', '').replace(')', '').replace('/', '_')
    found = False
    if f'id="{clean_id}"' in svg:
        print(f"  [EXACT] {name} -> #{clean_id}")
        found = True
    else:
        # Search for partial matches
        matches = re.findall(r'id="([^"]*' + re.escape(clean_id[:6]) + r'[^"]*)"', svg)
        if matches:
            print(f"  [PARTIAL] {name} -> {matches}")
            found = True
        else:
            print(f"  [MISSING] {name} (tried {clean_id})")
