import json
import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/placeBusIndex.js', encoding='utf-8') as f:
    text = f.read()
    data = json.loads(text[text.index('['):text.index('];')+1])

empty_places = [d for d in data if not d['buses']]
print(f"Total unassigned places: {len(empty_places)}")
for d in empty_places:
    print(f"{d['name']}")
