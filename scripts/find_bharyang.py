import json
import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/map_ocr_all.json', encoding='utf-8') as f:
    ocr = json.load(f)

print(f"Total items in map_ocr_all.json: {len(ocr)}")

# Search for Bharyang, Thulo, Sano in map_ocr_all.json
hits = []
for item in ocr:
    t = item['text']
    tl = t.lower()
    if 'bharyang' in tl or 'thulo' in tl or 'sano' in tl or 'bhyarang' in tl or 'baryang' in tl or 'bharyahang' in tl:
        hits.append(item)

print(f"Found {len(hits)} hits in map_ocr_all.json:")
for h in hits:
    print(f"  '{h['text']}' (score: {h['score']:.2f}) at {h['box'][0]}")
