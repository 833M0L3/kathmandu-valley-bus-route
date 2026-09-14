import json
import re
from collections import Counter

with open('src/data/placesData.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Extract json array
json_match = re.search(r'export const ALL_MAP_PLACES = (\[.*?\]);', text, re.DOTALL)
if json_match:
    places = json.loads(json_match.group(1))
    print(f"Total places loaded: {len(places)}")
    tiers = Counter(p.get('tier', 'none') for p in places)
    categories = Counter(p.get('category', 'none') for p in places)
    print("\nTiers:")
    for t, c in tiers.most_common():
        print(f"  {t}: {c}")
    print("\nCategories:")
    for cat, c in categories.most_common():
        print(f"  {cat}: {c}")
