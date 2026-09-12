import json
import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/map_ocr_all.json', encoding='utf-8') as f:
    items = json.load(f)

print("=== OCR ITEMS NORTH (y < 2600) ===")
for it in items:
    box = it['box']
    cx = sum(p[0] for p in box) / 4.0
    cy = sum(p[1] for p in box) / 4.0
    if cy < 2600:
        txt = it['text']
        print(f"({cx:.1f}, {cy:.1f}) | {txt}")
