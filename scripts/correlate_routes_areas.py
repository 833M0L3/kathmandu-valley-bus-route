import json
import re
import sys
sys.stdout.reconfigure(encoding='utf-8')


with open('scratch/map_ocr_all.json', encoding='utf-8') as f:
    ocr = json.load(f)

# The 22 bus operators by code letter:
# S: Sajha Yatayat
# N: Nepal Yatayat
# Y: Samyukta Yatayat
# F: Balaju Yatayat
# K: Kirtipur Yatayat
# X: Mayur Yatayat
# H: Basuki Yatayat
# J: Juneli Yatayat
# I: Bagmati Yatayat
# D: Digo Yatayat
# G: Gothatar Yatayat
# A: Budhanilkantha Yatayat
# T: Tarakeshwor Yatayat
# R: Riddhi Siddhi Yatayat
# P: Panchpokhari Yatayat
# C: Chandragiri Yatayat
# O: Om Janata Yatayat
# M: Mahanagar Yatayat
# Z: Samakhusi Yatayat
# L: Gokarneshwar Yatayat
# E: Dhumrabaraha Yatayat
# B: Bhaktapur Buses

# Let's inspect each item and see what route numbers are present
routes_by_op = {}

# Also, let's load all area labels to find nearest area
area_labels = [
    ('Kathmandu', 4480, 4050),
    ('Ratnapark', 4410, 4145),
    ('Lalitpur (Patan)', 4660, 5120),
    ('Bhaktapur', 8865, 4650),
    ('Kalanki', 3208, 4542),
    ('Koteshwor', 5489, 4895),
    ('Gongabu (New Bus Park)', 3980, 2700),
    ('Airport', 6112, 4024),
    ('Chabahil', 5780, 3492),
    ('Madhyapur Thimi', 7590, 4112),
    ('Kirtipur', 3465, 6107),
    ('New Baneshwor', 5202, 4485),
    ('Balaju', 3617, 3058),
    ('Maharajgunj', 5100, 3050),
    ('Balkhu', 3964, 5207),
    ('Thamel', 4142, 3760),
    ('Jawalakhel', 4516, 5182),
    ('Lagankhel', 4803, 5109),
    ('Satdobato', 5068, 5632),
    ('Kalimati', 3932, 4518),
    ('Tripureshwor', 4537, 4565),
    ('Swayambhu', 3056, 3592),
    ('Budhanilkantha', 6626, 2212),
    ('Jorpati', 6838, 3211),
    ('Thankot', 1418, 4520),
    ('Suryabinayak', 8933, 5052),
    ('Sundarijal', 7125, 1861)
]

def find_nearest_area(x, y):
    best_dist = float('inf')
    best_name = None
    for name, ax, ay in area_labels:
        d = ((x - ax)**2 + (y - ay)**2)**0.5
        if d < best_dist:
            best_dist = d
            best_name = name
    return best_name, best_dist

all_findings = []
for it in ocr:
    text = it['text']
    box = it['box']
    cx = sum(p[0] for p in box) / 4.0
    cy = sum(p[1] for p in box) / 4.0
    
    # Let's see if there are route codes like S1, S2, N2, T4, B10 etc.
    codes = re.findall(r'([A-Z][0-9]+(?:\'[0-9]*)?)', text)
    if codes:
        nearest_area, dist = find_nearest_area(cx, cy)
        all_findings.append({
            'text': text,
            'codes': codes,
            'pos': (round(cx, 1), round(cy, 1)),
            'nearest_area': nearest_area,
            'dist': round(dist, 1)
        })

print(f"Total findings with route codes: {len(all_findings)}")
# Group by area
by_area = {}
for f in all_findings:
    by_area.setdefault(f['nearest_area'], []).append(f)

for area, items in sorted(by_area.items()):
    print(f"\n--- {area} ({len(items)} hits) ---")
    for it in items[:6]:
        print(f"  {it['codes']} in '{it['text']}' (dist: {it['dist']}px)")
