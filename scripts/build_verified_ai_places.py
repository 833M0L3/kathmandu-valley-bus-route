import json
import re
import math

with open('scratch/ai_extracted_text.json', encoding='utf-8') as f:
    data = json.load(f)

items = data['items']

# Filter items:
# 1. Legend items: in AI, legend is in bottom section (y > 800 and x > 800) or size >= 8.0
# Let's inspect
non_legend_places = []
badges = []

badge_pattern = re.compile(r'^[A-Z][0-9]+(\'|\s*-\s*[A-Z]?[0-9]+|\s*[A-Z][0-9]+)*$')

for it in items:
    txt = it['text'].strip()
    if not txt:
        continue
    size = it['size']
    bbox = it['bbox']
    x0, y0, x1, y1 = bbox

    # Check if in legend block
    if size >= 6.0:
        continue
    if x0 > 950 and y0 > 800:
        continue

    if size <= 1.5 or badge_pattern.match(txt):
        badges.append(it)
    elif 1.7 <= size <= 4.0:
        non_legend_places.append(it)

print(f"Candidate place text items: {len(non_legend_places)}")
print(f"Candidate badges: {len(badges)}")

# Merge vertically adjacent or horizontally adjacent lines of the same place label
# In Illustrator maps, labels are either:
# 1. Horizontal multi-line: same x0 (or close), y0 difference < 6pt
# 2. Horizontal inline: same y0 (or close), x0 difference < 10pt

# Let's group by proximity
merged_places = []
used = set()

# Sort by y0, then x0
non_legend_places.sort(key=lambda it: (round(it['bbox'][1], 1), round(it['bbox'][0], 1)))

for i, it1 in enumerate(non_legend_places):
    if i in used:
        continue
    
    cluster = [it1]
    used.add(i)

    # Greedily look for line continuations
    changed = True
    while changed:
        changed = False
        for j, it2 in enumerate(non_legend_places):
            if j in used:
                continue
            
            # Check if it2 is a multi-line continuation of any item in cluster
            for c in list(cluster):
                c_x0, c_y0, c_x1, c_y1 = c['bbox']
                j_x0, j_y0, j_x1, j_y1 = it2['bbox']

                # Vertical multi-line (stacked text directly below)
                # Same left alignment (within 3pt) and dy between 1pt and 4pt
                is_stacked = (abs(j_x0 - c_x0) < 3.5 or abs(j_x1 - c_x1) < 3.5 or (j_x0 >= c_x0 - 2 and j_x1 <= c_x1 + 2)) and (0.5 <= (j_y0 - c_y0) <= 5.0)

                # Horizontal continuation (same line, right after)
                is_inline = abs(j_y0 - c_y0) < 1.5 and (0 <= (j_x0 - c_x1) <= 6.0)

                if is_stacked or is_inline:
                    cluster.append(it2)
                    used.add(j)
                    changed = True
                    break

    # Cluster text merged in vertical then horizontal order
    cluster.sort(key=lambda x: (round(x['bbox'][1], 1), round(x['bbox'][0], 1)))
    full_name = " ".join(c['text'] for c in cluster)
    # Clean up double spaces or formatting
    full_name = re.sub(r'\s+', ' ', full_name).strip()

    min_x = min(c['bbox'][0] for c in cluster)
    min_y = min(c['bbox'][1] for c in cluster)
    max_x = max(c['bbox'][2] for c in cluster)
    max_y = max(c['bbox'][3] for c in cluster)

    merged_places.append({
        "name": full_name,
        "x": round((min_x + max_x) / 2, 2),
        "y": round((min_y + max_y) / 2, 2),
        "bbox": [round(min_x, 2), round(min_y, 2), round(max_x, 2), round(max_y, 2)],
        "spans": len(cluster)
    })

print(f"Total merged distinct places from AI: {len(merged_places)}")

# Output first 40 merged places
with open('scratch/merged_places_sample.txt', 'w', encoding='utf-8') as out:
    out.write(f"Total merged distinct places: {len(merged_places)}\n\n")
    for p in merged_places[:100]:
        out.write(f"{p['name']:45s} at ({p['x']:.1f}, {p['y']:.1f}) [spans={p['spans']}]\n")

print("Wrote scratch/merged_places_sample.txt.")
