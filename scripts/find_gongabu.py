import json

with open("scratch/map_ocr_all.json", encoding="utf-8") as f:
    data = json.load(f)

print("--- Near Gongabu & Samakhusi ---")
for d in data:
    x, y = d["center"]
    if 3600 <= x <= 4600 and 2400 <= y <= 3100:
        print(f"  {d['text']:<30} @ ({x:.1f}, {y:.1f})")

print("\n--- Near Maharajgunj & Chakrapath North ---")
for d in data:
    x, y = d["center"]
    if 4600 <= x <= 5600 and 2600 <= y <= 3300:
        print(f"  {d['text']:<30} @ ({x:.1f}, {y:.1f})")
