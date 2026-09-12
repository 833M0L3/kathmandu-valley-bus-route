import json
import sys
sys.stdout.reconfigure(encoding='utf-8')

for fn in ['scratch/legends.jpg.json', 'scratch/legends-extra.jpg.json']:
    print(f"\n=== {fn} ===")
    with open(fn, encoding='utf-8') as f:
        data = json.load(f)
    for it in data:
        if it['score'] > 0.65:
            print(f"[{it['score']:.2f}] {it['text']}")
