import json

with open("scratch/map_ocr_all.json", encoding="utf-8") as f:
    data = json.load(f)

places = ['gongabu', 'kalanki', 'kathmandu', 'ratnapark', 'koteshwor', 'airport', 'chabahil', 'bhaktapur']
for p in places:
    print(f"\n=== {p.upper()} ===")
    matches = [d for d in data if p in d['text'].lower()]
    for m in matches:
        print(f"  {m['text']:<25} center: {m['center']}")

# Also let's look for Lalitpur / Patan in all detections
print("\n=== LALITPUR / PATAN ===")
for d in data:
    t = d['text'].lower()
    if 'patan' in t or 'lalit' in t or 'lagankhel' in t or 'pulchowk' in t:
        print(f"  {d['text']:<25} center: {d['center']}")
