import json
import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/map_ocr_all.json', encoding='utf-8') as f:
    items = json.load(f)

for it in items:
    txt = it['text'].lower()
    if 'sundari' in txt or 'gokarna' in txt or 'nayapati' in txt or 'attarkhel' in txt or 'sankhu' in txt:
        box = it['box']
        cx = sum(p[0] for p in box) / 4.0
        cy = sum(p[1] for p in box) / 4.0
        print(f"({cx:.1f}, {cy:.1f}) | {it['text']}")
