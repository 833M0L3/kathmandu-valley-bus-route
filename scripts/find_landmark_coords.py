import json

with open('scratch/ai_extracted_text.json', encoding='utf-8') as f:
    data = json.load(f)

items = data['items']

targets = ['Kalanki', 'Ratnapark', 'Gongabu', 'Bhaktapur', 'Lagankhel', 'Koteshwor', 'Swayambhu', 'Balkhu']
found = {}
for it in items:
    for t in targets:
        if t.lower() in it['text'].lower():
            if t not in found:
                found[t] = []
            found[t].append(it)

print('=== Target coordinates in AI file (1584 x 1224 pt) ===')
for t, matches in found.items():
    for m in matches[:2]:
        bbox = m['bbox']
        txt = m['text']
        print(f"{t:12s} bbox={bbox} text={txt}")

# Compare with placesData.js coordinates
with open('src/data/placesData.js', encoding='utf-8') as f:
    p_text = f.read()
    # extract JSON array
    json_str = p_text[p_text.index('['):p_text.rindex(']')+1]
    places = json.loads(json_str)

print('\n=== Target coordinates in placesData.js (11667 x 8750 px) ===')
for p in places:
    if p['name'] in targets:
        print(f"{p['name']:12s} x={p['x']}, y={p['y']}")
