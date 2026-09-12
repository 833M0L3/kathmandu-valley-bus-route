import json
import re

with open('scratch/map_ocr_all.json', encoding='utf-8') as f:
    ocr_items = json.load(f)

print(f"Total OCR items: {len(ocr_items)}")

# Let's see route code pattern: letter + number (e.g., S1, S2, N2, T4, B1, C2, etc.)
route_pattern = re.compile(r'\b([A-Z][0-9]+(?:\'[0-9]*)?)\b')

found_routes = {}
for item in ocr_items:
    text = item['text']
    matches = route_pattern.findall(text)
    if matches:
        for m in matches:
            found_routes.setdefault(m, []).append((text, item['box']))

print(f"\nUnique route codes found in OCR: {len(found_routes)}")
print(sorted(found_routes.keys()))

# Let's also check for occurrences of comma or dash separated route badges, e.g. "S1, S2", "S5-S8", "T1-T9"
multi_route_pattern = re.compile(r'[A-Z][0-9]+(?:-[A-Z]?[0-9]+)?')
for item in ocr_items:
    text = item['text']
    if any(k in text for k in ['S1', 'S2', 'N1', 'N2', 'B1', 'T1', 'M1', 'Z1', 'R1', 'D1', 'C1', 'F1', 'K1', 'A1', 'G1']):
        print(f"Text: '{text}' at box {item['box'][0]}")
