"""
Inspect text detections in specific areas to find Gongabu, Maharajgunj, Boudha, Sundarijal, etc.
"""
import json

with open("scratch/map_ocr_all.json", encoding="utf-8") as f:
    data = json.load(f)

def find_in_rect(name, x_min, y_min, x_max, y_max):
    print(f"\n================ {name} [x: {x_min}..{x_max}, y: {y_min}..{y_max}] ================")
    matches = [d for d in data if x_min <= d['center'][0] <= x_max and y_min <= d['center'][1] <= y_max]
    matches.sort(key=lambda d: d['score'], reverse=True)
    for m in matches[:12]:
        print(f"  {m['text']:<35} @ [{m['center'][0]:.1f}, {m['center'][1]:.1f}] (conf: {m['score']:.2f})")

# 1. Gongabu / New Bus Park (North of Balaju / Thamel)
find_in_rect("Gongabu / New Bus Park Area", 3500, 2400, 4800, 3300)

# 2. Maharajgunj (East of Gongabu, North of Thamel)
find_in_rect("Maharajgunj / Teaching Hospital Area", 4400, 2700, 5500, 3500)

# 3. Boudha (East of Chabahil, West of Jorpati)
find_in_rect("Boudha Area", 5800, 3000, 6800, 3800)

# 4. Sundarijal (Northeast of Jorpati)
find_in_rect("Sundarijal / Gokarna Area", 6800, 1800, 9000, 3200)

# 5. Patan / Lalitpur core (around Jawalakhel, Lagankhel, Mangalbazar)
find_in_rect("Lalitpur / Patan Area", 4200, 4800, 5200, 5600)

# 6. Kathmandu Core (Ratnapark, Asan, New Road, Thamel)
find_in_rect("Kathmandu Core", 4000, 3700, 4800, 4500)
