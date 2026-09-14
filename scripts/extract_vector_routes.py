import pymupdf
import json

doc = pymupdf.open('Kathmandu_Bus_Route_Map.ai')
p = doc[0]
drawings = p.get_drawings()

print(f"Total drawings: {len(drawings)}")

# Color definitions from legendData.js
OPERATOR_COLORS = {
    "#1ba446": "Sajha Yatayat (S)",
    "#c8952a": "Nepal Yatayat (N)",
    "#dd1d23": "Mahanagar Yatayat (M)",
    "#808f4d": "Bhaktapur Buses (B)",
    "#4587d1": "Mayur Yatayat (X)",
    "#607b84": "Kirtipur Yatayat (K)",
    "#f9a61a": "Chandragiri Yatayat (C)",
    "#7082c5": "Tarakeshwar Yatayat (T)",
    "#9dc11c": "Budhanilkantha Yatayat (A)",
    "#5b8378": "Digo Yatayat (D)",
    "#9572cc": "Balaju Yatayat (F)",
    "#868784": "Samakhusi Yatayat (Z)",
    "#19b38d": "Gokarneshwar Yatayat (L)",
    "#02aac4": "Riddhi Siddhi Yatayat (R)",
    "#df486e": "Gothatar Yatayat (G)",
    "#df6c9f": "Panchpokhari Yatayat (P)",
    "#925744": "Samyukta Yatayat (Y)",
    "#946994": "Basuki Yatayat (H)",
    "#659c9f": "Juneli Yatayat (J)",
    "#266090": "Bagmati Yatayat (I)",
    "#e06a30": "Dhumrabaraha Yatayat (E)",
    "#a77139": "Om Janata Yatayat (O)",
    "#474747": "Trunk Corridor / Station Dot",
    "#eff5f9": "Background / River / Shading"
}

def to_hex(color):
    if not color:
        return None
    r, g, b = [int(round(c * 255)) for c in color[:3]]
    return f"#{r:02x}{g:02x}{b:02x}"

route_paths_by_op = {}
other_paths = []

for d in drawings:
    stroke_col = to_hex(d.get('color'))
    fill_col = to_hex(d.get('fill'))
    items = d.get('items', [])

    # Find closest known operator color
    matched_op = None
    target_col = stroke_col or fill_col
    if target_col in OPERATOR_COLORS:
        matched_op = OPERATOR_COLORS[target_col]

    if matched_op:
        if matched_op not in route_paths_by_op:
            route_paths_by_op[matched_op] = {
                "color": target_col,
                "drawing_count": 0,
                "total_items": 0,
                "stroke_widths": set(),
                "rects": []
            }
        route_paths_by_op[matched_op]["drawing_count"] += 1
        route_paths_by_op[matched_op]["total_items"] += len(items)
        if d.get('width'):
            route_paths_by_op[matched_op]["stroke_widths"].add(round(d['width'], 2))
        r = d['rect']
        route_paths_by_op[matched_op]["rects"].append([round(r.x0, 1), round(r.y0, 1), round(r.x1, 1), round(r.y1, 1)])
    else:
        other_paths.append({
            "stroke": stroke_col,
            "fill": fill_col,
            "type": d.get('type')
        })

print(f"\nExtracted Vector Operators ({len(route_paths_by_op)}):")
for op, info in sorted(route_paths_by_op.items(), key=lambda x: -x[1]["drawing_count"]):
    widths = sorted(list(info["stroke_widths"]))
    print(f"  {op:35s} | {info['color']} | {info['drawing_count']:3d} paths | {info['total_items']:4d} items | widths={widths}")

print(f"\nOther paths (unmatched): {len(other_paths)}")
