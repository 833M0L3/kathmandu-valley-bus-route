import json

with open('src/data/placeBusIndex.js', encoding='utf-8') as f:
    text = f.read()

json_str = text[text.find('['):text.rfind(']')+1]
data = json.loads(json_str)

queries = ['Budhanilkantha', 'Deuba Chowk', 'Chapali', 'Gongabu', 'Sinamangal', 'Maitidevi', 'Radha Krishna Temple', 'Matatirtha', 'Lubhu']
for q in queries:
    matches = [item for item in data if q.lower() in item['name'].lower()]
    print(f"=== Query: {q} ({len(matches)} matches) ===")
    for m in matches[:4]:
        print(f"  {m['name']} -> {m['buses']}")
