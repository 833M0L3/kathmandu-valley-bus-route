import pymupdf
import numpy as np
import json
import re

with open('scratch/merged_places_sample.txt', encoding='utf-8') as f:
    lines = f.readlines()

# Load our route segments from test_route_segments
from test_route_segments import op_segments

def dist_point_to_segment(p, a, b):
    # Vector ab
    ab = b - a
    d = np.dot(ab, ab)
    if d == 0:
        return np.linalg.norm(p - a)
    # Project point p onto segment ab
    t = max(0, min(1, np.dot(p - a, ab) / d))
    projection = a + t * ab
    return np.linalg.norm(p - projection)

def find_operators_for_point(pt, threshold=10.0):
    matched = []
    for code, segs in op_segments.items():
        min_d = float('inf')
        for s in segs:
            d = dist_point_to_segment(pt, s[1], s[2])
            if d < min_d:
                min_d = d
                if min_d <= threshold:
                    break
        if min_d <= threshold:
            matched.append((code, min_d))
    matched.sort(key=lambda x: x[1])
    return [m[0] for m in matched]

# Test on 10 sample places
test_places = [
    ("Tarakeshwor Yatayat Bus Park (Tinpiple)", np.array([242.7, 89.1])),
    ("Jitpur Phedi Bus Park", np.array([353.1, 91.7])),
    ("Shree Boudeshwor H.S. School", np.array([481.3, 92.2])),
    ("Kavresthali Bus Station", np.array([437.4, 93.5])),
    ("Goldhunga Bus Park", np.array([92.9, 119.5])),
    ("Samyukta Bus Park Gamcha, Budhanilkantha", np.array([950.4, 123.1])),
    ("Budhanilkantha School", np.array([853.5, 139.8])),
    ("Dharmasthali Intl. Meditation Center", np.array([360.4, 144.7])),
]

print("=== Spatial Distance Matching Test ===")
for name, pt in test_places:
    ops = find_operators_for_point(pt, threshold=12.0)
    print(f"{name:45s} -> {ops}")
