import json
import math
import re

with open('scratch/map_ocr_all.json', encoding='utf-8') as f:
    ocr_items = json.load(f)

# Let's inspect all items in map_ocr_all.json
# We want to identify:
# 1. Place names (like Kalanki, Ratnapark, Koteshwor, Balkhu, Maharajgunj, Chabahil, Bhaktapur, etc.)
# 2. Route labels (like S1, S2, N2, T4, B10, etc.)

# In clean-map.jpg, what route badge patterns exist?
# Letters: S, N, Y, F, K, X, H, J, I, D, G, A, T, R, P, C, O, M, Z, L, E, B
operators = {
    'S': 'Sajha Yatayat',
    'N': 'Nepal Yatayat',
    'Y': 'Samyukta Yatayat',
    'F': 'Balaju Yatayat',
    'K': 'Kirtipur Yatayat',
    'X': 'Mayur Yatayat',
    'H': 'Basuki Yatayat',
    'J': 'Juneli Yatayat',
    'I': 'Bagmati Yatayat',
    'D': 'Digo Yatayat',
    'G': 'Gothatar Yatayat',
    'A': 'Budhanilkantha Yatayat',
    'T': 'Tarakeshwor Yatayat',
    'R': 'Riddhi Siddhi Yatayat',
    'P': 'Panchpokhari Yatayat',
    'C': 'Chandragiri Yatayat',
    'O': 'Om Janata Yatayat',
    'M': 'Mahanagar Yatayat',
    'Z': 'Samakhusi Yatayat',
    'L': 'Gokarneshwor Yatayat',
    'E': 'Dhumrabaraha Yatayat',
    'B': 'Bhaktapur Buses'
}

# Let's see what items contain route prefixes
route_detections = []
place_detections = []

for it in ocr_items:
    text = it['text'].strip()
    box = it['box']
    cx = sum(p[0] for p in box) / 4.0
    cy = sum(p[1] for p in box) / 4.0
    
    # Check if text looks like route badge cluster
    # Usually contains letters followed by digits: e.g. S1, N2, B10, S5-S8, etc.
    # or multiple such codes like "B5 D1 C1 R1 S4 T10 Y2"
    tokens = re.findall(r'([A-Z][0-9]+(?:\'[0-9]*)?|[A-Z][0-9]+-[A-Z]?[0-9]+)', text)
    if tokens or any(c in text for c in ['T1-T9', 'S5-S8', 'T2-T10']):
        route_detections.append({'text': text, 'tokens': tokens, 'pos': (cx, cy)})
    else:
        # Check if it's text (place name)
        if len(text) >= 3 and not re.match(r'^[0-9\W]+$', text):
            place_detections.append({'text': text, 'pos': (cx, cy)})

print(f"Detected {len(route_detections)} route badge clusters and {len(place_detections)} place name elements.")

# Print some samples
print("\nSample route clusters:")
for r in route_detections[:20]:
    print(f"  {r['text']} at {r['pos']} -> tokens: {r['tokens']}")
