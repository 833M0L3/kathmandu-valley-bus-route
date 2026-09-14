import pymupdf
import numpy as np
import json
import re
import math
import time

t0 = time.time()
print("1. Loading Kathmandu_Bus_Route_Map.ai...")
doc = pymupdf.open('Kathmandu_Bus_Route_Map.ai')
page = doc[0]

def ai_to_map_coords(x_ai, y_ai):
    x_map = 7.226156 * x_ai + 0.708289 * y_ai - 357.730470
    y_map = 0.026503 * x_ai + 7.191555 * y_ai + 68.110848
    return round(x_map, 1), round(y_map, 1)

HEX_TO_CODE = {
    "#1ba547": "S", # Sajha
    "#c9962a": "N", # Nepal Yatayat
    "#dd1d24": "M", # Mahanagar
    "#808f4d": "B", # Bhaktapur
    "#4588d1": "X", # Mayur
    "#617b82": "K", # Kirtipur
    "#f9a61a": "C", # Chandragiri
    "#7182c5": "T", # Tarakeshwar
    "#9dc11c": "A", # Budhanilkantha
    "#5b8478": "D", # Digo
    "#9572cc": "F", # Balaju
    "#878884": "Z", # Samakhusi
    "#19b48d": "L", # Gokarneshwar
    "#02aac4": "R", # Riddhi Siddhi
    "#df496f": "G", # Gothatar
    "#df6c9f": "P", # Panchpokhari
    "#925844": "Y", # Samyukta
    "#946993": "H", # Basuki
    "#649c9e": "J", # Juneli
    "#266090": "I", # Bagmati
    "#e16a31": "E", # Dhumrabaraha
    "#a7723a": "O", # Om Janata
}

drawings = page.get_drawings()
# Store segment with its bounding box: (min_x, min_y, max_x, max_y, a, b)
op_segments = {code: [] for code in HEX_TO_CODE.values()}

for d in drawings:
    c = d.get('color')
    if not c:
        continue
    h = '#{:02x}{:02x}{:02x}'.format(int(round(c[0]*255)), int(round(c[1]*255)), int(round(c[2]*255)))
    w = round(d.get('width', 0), 2)
    if w == 2.26 and h in HEX_TO_CODE:
        code = HEX_TO_CODE[h]
        for it in d.get('items', []):
            if it[0] == 'l':
                a = np.array([it[1].x, it[1].y], dtype=np.float32)
                b = np.array([it[2].x, it[2].y], dtype=np.float32)
                min_x = min(a[0], b[0])
                max_x = max(a[0], b[0])
                min_y = min(a[1], b[1])
                max_y = max(a[1], b[1])
                op_segments[code].append((min_x, min_y, max_x, max_y, a, b))
            elif it[0] == 'c':
                p1 = np.array([it[1].x, it[1].y], dtype=np.float32)
                p2 = np.array([it[2].x, it[2].y], dtype=np.float32)
                p3 = np.array([it[3].x, it[3].y], dtype=np.float32)
                p4 = np.array([it[4].x, it[4].y], dtype=np.float32)
                t = np.linspace(0, 1, 5)
                pts = [(1-ti)**3*p1 + 3*(1-ti)**2*ti*p2 + 3*(1-ti)*ti**2*p3 + ti**3*p4 for ti in t]
                for k in range(len(pts)-1):
                    a = pts[k]
                    b = pts[k+1]
                    min_x = min(a[0], b[0])
                    max_x = max(a[0], b[0])
                    min_y = min(a[1], b[1])
                    max_y = max(a[1], b[1])
                    op_segments[code].append((min_x, min_y, max_x, max_y, a, b))

print(f"2. Extracted vector segments for {len(op_segments)} operators in {time.time()-t0:.2f}s.")

# Extract text spans
text_page = page.get_text("dict")
all_spans = []
badges = []

badge_regex = re.compile(r'^([A-Z])([0-9]+)([\']|\s*-\s*[A-Z]?[0-9]+|\s*[A-Z][0-9]+)*$')

for block in text_page.get("blocks", []):
    if block.get("type") == 0:
        for line in block.get("lines", []):
            for span in line.get("spans", []):
                txt = span.get("text", "").strip()
                if not txt:
                    continue
                bbox = [round(b, 2) for b in span.get("bbox", [])]
                size = span.get("size", 0)

                if bbox[0] > 950 and bbox[1] > 800:
                    continue
                if size >= 6.0:
                    continue

                m = badge_regex.match(txt)
                if m or size <= 1.5:
                    op_code = m.group(1) if m else None
                    badges.append({
                        "text": txt,
                        "op_code": op_code,
                        "cx": (bbox[0] + bbox[2]) / 2,
                        "cy": (bbox[1] + bbox[3]) / 2,
                    })
                elif 1.7 <= size <= 4.0:
                    all_spans.append({
                        "text": txt,
                        "bbox": bbox,
                        "size": size
                    })

print(f"3. Extracted {len(all_spans)} candidate place spans and {len(badges)} route badges.")

# Multi-line clustering
all_spans.sort(key=lambda s: (round(s['bbox'][1], 1), round(s['bbox'][0], 1)))
used = set()
merged_places = []

for i, s1 in enumerate(all_spans):
    if i in used:
        continue
    cluster = [s1]
    used.add(i)

    changed = True
    while changed:
        changed = False
        for j, s2 in enumerate(all_spans):
            if j in used:
                continue
            for c in list(cluster):
                c_x0, c_y0, c_x1, c_y1 = c['bbox']
                j_x0, j_y0, j_x1, j_y1 = s2['bbox']

                is_stacked = (abs(j_x0 - c_x0) < 4.0 or abs(j_x1 - c_x1) < 4.0 or (j_x0 >= c_x0 - 2 and j_x1 <= c_x1 + 2)) and (0.5 <= (j_y0 - c_y0) <= 5.0)
                is_inline = abs(j_y0 - c_y0) < 1.5 and (0 <= (j_x0 - c_x1) <= 6.0)

                if is_stacked or is_inline:
                    cluster.append(s2)
                    used.add(j)
                    changed = True
                    break

    cluster.sort(key=lambda x: (round(x['bbox'][1], 1), round(x['bbox'][0], 1)))
    full_name = " ".join(c['text'] for c in cluster)
    full_name = re.sub(r'\s+', ' ', full_name).strip()
    full_name = full_name.replace(' ,', ',').replace(' .', '.')

    min_x = min(c['bbox'][0] for c in cluster)
    min_y = min(c['bbox'][1] for c in cluster)
    max_x = max(c['bbox'][2] for c in cluster)
    max_y = max(c['bbox'][3] for c in cluster)

    center_ai_x = (min_x + max_x) / 2
    center_ai_y = (min_y + max_y) / 2
    map_x, map_y = ai_to_map_coords(center_ai_x, center_ai_y)

    merged_places.append({
        "name": full_name,
        "cx": center_ai_x,
        "cy": center_ai_y,
        "map_x": map_x,
        "map_y": map_y
    })

print(f"4. Clustered into {len(merged_places)} merged places.")

def get_category(name):
    n = name.lower()
    if any(k in n for k in ['bus park', 'bus stand', 'bus station', 'bus stop', 'micro bus', 'terminal', 'yatayat park']):
        return "Bus Terminal / Stand"
    if any(k in n for k in ['hospital', 'health care', 'rehabilitation', 'clinic', 'medical']):
        return "Hospital / Health Center"
    if any(k in n for k in ['school', 'campus', 'college', 'vidhyalaya', 'pathshala', 'academy', 'university']):
        return "Educational Institution"
    if any(k in n for k in ['temple', 'mandir', 'stupa', 'shrine', 'masjid', 'church', 'buddha']):
        return "Religious / Cultural Landmark"
    if any(k in n for k in ['chowk', 'dobato', 'mod', 'gate', 'bhanjyang', 'toll', 'tole', 'pul', 'bridge']):
        return "Chowk / Junction"
    if any(k in n for k in ['ward', 'municipality', 'police', 'post office', 'bank']):
        return "Civic / Public Service"
    if any(k in n for k in ['park', 'futsal', 'waterfall', 'resort', 'garden', 'mall', 'mart']):
        return "Recreation & Commerce"
    return "Transit Locality"

def get_tier(name, cat):
    n = name.lower()
    if n in ['kathmandu', 'lalitpur', 'bhaktapur']:
        return "city"
    if any(k in n for k in ['bus park', 'terminal', 'airport', 'kalanki', 'koteshwor', 'ratnapark', 'gongabu', 'lagankhel']):
        return "hub"
    return "station"

final_places = []
final_bus_index = []

thresh = 16.0
thresh_sq = thresh * thresh
badge_thresh = 24.0

for p in merged_places:
    px, py = p['cx'], p['cy']
    matched_ops = set()

    # 1. Fast Bounding Box + Distance
    for code, segs in op_segments.items():
        is_matched = False
        for min_x, min_y, max_x, max_y, a, b in segs:
            if px < min_x - thresh or px > max_x + thresh or py < min_y - thresh or py > max_y + thresh:
                continue
            # Point to segment distance squared
            ab_x = b[0] - a[0]
            ab_y = b[1] - a[1]
            ab_sq = ab_x*ab_x + ab_y*ab_y
            if ab_sq == 0:
                dist_sq = (px - a[0])**2 + (py - a[1])**2
            else:
                t = max(0.0, min(1.0, ((px - a[0])*ab_x + (py - a[1])*ab_y) / ab_sq))
                proj_x = a[0] + t * ab_x
                proj_y = a[1] + t * ab_y
                dist_sq = (px - proj_x)**2 + (py - proj_y)**2
            
            if dist_sq <= thresh_sq:
                is_matched = True
                break
        if is_matched:
            matched_ops.add(code)

    # 2. Nearby Route Badges (within 24pt)
    for b in badges:
        if b['op_code']:
            bd_sq = (px - b['cx'])**2 + (py - b['cy'])**2
            if bd_sq <= (badge_thresh * badge_thresh):
                matched_ops.add(b['op_code'])

    ops_list = sorted(list(matched_ops))
    cat = get_category(p['name'])
    tier = get_tier(p['name'], cat)

    slug = re.sub(r'[^a-z0-9]+', '-', p['name'].lower()).strip('-')

    final_places.append({
        "id": slug,
        "name": p['name'],
        "x": p['map_x'],
        "y": p['map_y'],
        "tier": tier,
        "category": cat
    })

    final_bus_index.append({
        "name": p['name'],
        "buses": ops_list
    })

print(f"5. Successfully matched in {time.time()-t0:.2f}s! Total places: {len(final_places)}")

# Check empty buses count
empty_count = sum(1 for item in final_bus_index if len(item['buses']) == 0)
print(f"   Places with buses: {len(final_bus_index) - empty_count}, Places with 0 buses: {empty_count}")

with open('scratch/ai_verified_places.json', 'w', encoding='utf-8') as f:
    json.dump(final_places, f, ensure_ascii=False, indent=2)

with open('scratch/ai_verified_bus_index.json', 'w', encoding='utf-8') as f:
    json.dump(final_bus_index, f, ensure_ascii=False, indent=2)

print("Saved scratch/ai_verified_places.json and scratch/ai_verified_bus_index.json successfully.")
