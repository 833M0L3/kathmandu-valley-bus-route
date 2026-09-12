import json
import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/map_ocr_all.json', encoding='utf-8') as f:
    items = json.load(f)

print("=== OCR ITEMS WEST (x < 3600, 3800 <= y <= 6200) ===")
for it in items:
    box = it['box']
    cx = sum(p[0] for p in box) / 4.0
    cy = sum(p[1] for p in box) / 4.0
    if cx < 3600 and 3800 <= cy <= 6200:
        txt = it['text']
        print(f"({cx:.1f}, {cy:.1f}) | {txt}")
