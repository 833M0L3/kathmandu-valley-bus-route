import json
import re

with open('src/data/placesData.js', encoding='utf-8') as f:
    text = f.read()
    # Extract JSON from "export const ALL_MAP_PLACES = [...]"
    json_str = text[text.index('['):text.rindex(']')+1]
    places = json.loads(json_str)

print(f"Total places loaded: {len(places)}")

# Let's inspect places
sample_names = [p['name'] for p in places[:20]]
print("Sample places:", sample_names)
