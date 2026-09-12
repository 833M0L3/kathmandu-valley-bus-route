import json
import re
import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/map_ocr_all.json', encoding='utf-8') as f:
    ocr = json.load(f)

print(f"Total OCR items: {len(ocr)}")

# Filter out pure route codes (like S1, B10, etc.) and pure numbers
place_candidates = []
for item in ocr:
    text = item['text'].strip()
    score = item['score']
    # If text has letters and isn't just a short route code
    if len(text) >= 3 and not re.match(r'^[A-Z][0-9]+(?:\'[0-9]*)?$', text):
        # Exclude common noise or non-place words
        box = item['box']
        cx = sum(p[0] for p in box) / 4.0
        cy = sum(p[1] for p in box) / 4.0
        place_candidates.append({
            'text': text,
            'score': round(score, 2),
            'pos': (round(cx, 1), round(cy, 1))
        })

print(f"Place candidates: {len(place_candidates)}")
# Group by clean text name
unique_places = {}
for p in place_candidates:
    # clean up punctuation
    cleaned = re.sub(r'^[^\w]+|[^\w]+$', '', p['text'])
    if len(cleaned) >= 3 and not re.match(r'^[0-9]+$', cleaned):
        unique_places.setdefault(cleaned.title(), []).append(p)

print(f"Unique place text strings: {len(unique_places)}")
for name, items in sorted(unique_places.items(), key=lambda x: len(x[1]), reverse=True)[:60]:
    print(f"{name:30s} (count: {len(items)}, sample pos: {items[0]['pos']})")
