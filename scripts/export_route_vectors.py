import pymupdf
import numpy as np
import json
import time

t0 = time.time()
print("1. Opening Kathmandu_Bus_Route_Map.ai...")
doc = pymupdf.open('Kathmandu_Bus_Route_Map.ai')
page = doc[0]

def ai_to_map(x_ai, y_ai):
    x_map = 7.226156 * x_ai + 0.708289 * y_ai - 357.730470
    y_map = 0.026503 * x_ai + 7.191555 * y_ai + 68.110848
    return [round(x_map, 1), round(y_map, 1)]

HEX_TO_OP = {
    "#1ba547": {"code": "S", "name": "Sajha Yatayat", "color": "#1ba546"},
    "#c9962a": {"code": "N", "name": "Nepal Yatayat", "color": "#c99629"},
    "#dd1d24": {"code": "M", "name": "Mahanagar Yatayat", "color": "#dc1d24"},
    "#808f4d": {"code": "B", "name": "Bhaktapur Buses", "color": "#808f4e"},
    "#4588d1": {"code": "X", "name": "Mayur Yatayat", "color": "#4587d1"},
    "#617b82": {"code": "K", "name": "Kirtipur Yatayat", "color": "#607b84"},
    "#f9a61a": {"code": "C", "name": "Chandragiri Yatayat", "color": "#f9a61a"},
    "#7182c5": {"code": "T", "name": "Tarakeshwar Yatayat", "color": "#7183c5"},
    "#9dc11c": {"code": "A", "name": "Budhanilkantha Yatayat", "color": "#9cc11c"},
    "#5b8478": {"code": "D", "name": "Digo Yatayat", "color": "#5b8378"},
    "#9572cc": {"code": "F", "name": "Balaju Yatayat", "color": "#9572cc"},
    "#878884": {"code": "Z", "name": "Samakhusi Yatayat", "color": "#878883"},
    "#19b48d": {"code": "L", "name": "Gokarneshwar Yatayat", "color": "#19b38d"},
    "#02aac4": {"code": "R", "name": "Riddhi Siddhi Yatayat", "color": "#02aac4"},
    "#df496f": {"code": "G", "name": "Gothatar Yatayat", "color": "#df496f"},
    "#df6c9f": {"code": "P", "name": "Panchpokhari Yatayat", "color": "#de6c9f"},
    "#925844": {"code": "Y", "name": "Samyukta Yatayat", "color": "#925844"},
    "#946993": {"code": "H", "name": "Basuki Yatayat", "color": "#946994"},
    "#649c9e": {"code": "J", "name": "Juneli Yatayat", "color": "#659c9f"},
    "#266090": {"code": "I", "name": "Bagmati Yatayat", "color": "#266090"},
    "#e16a31": {"code": "E", "name": "Dhumrabaraha Yatayat", "color": "#e16a30"},
    "#a7723a": {"code": "O", "name": "Om Janata Yatayat", "color": "#a7733a"},
}

drawings = page.get_drawings()
op_polylines = {info["code"]: [] for info in HEX_TO_OP.values()}

for d in drawings:
    c = d.get('color')
    if not c:
        continue
    h = '#{:02x}{:02x}{:02x}'.format(int(round(c[0]*255)), int(round(c[1]*255)), int(round(c[2]*255)))
    w = round(d.get('width', 0), 2)
    if w == 2.26 and h in HEX_TO_OP:
        code = HEX_TO_OP[h]["code"]
        current_poly = []

        for it in d.get('items', []):
            if it[0] == 'l':
                p1 = ai_to_map(it[1].x, it[1].y)
                p2 = ai_to_map(it[2].x, it[2].y)
                if not current_poly:
                    current_poly.append(p1)
                elif current_poly[-1] != p1:
                    op_polylines[code].append(current_poly)
                    current_poly = [p1]
                current_poly.append(p2)
            elif it[0] == 'c':
                p1 = np.array([it[1].x, it[1].y])
                p2 = np.array([it[2].x, it[2].y])
                p3 = np.array([it[3].x, it[3].y])
                p4 = np.array([it[4].x, it[4].y])
                t = np.linspace(0, 1, 7) # 7 smooth interpolation points
                curve_pts = [ai_to_map(
                    (1-ti)**3*p1[0] + 3*(1-ti)**2*ti*p2[0] + 3*(1-ti)*ti**2*p3[0] + ti**3*p4[0],
                    (1-ti)**3*p1[1] + 3*(1-ti)**2*ti*p2[1] + 3*(1-ti)*ti**2*p3[1] + ti**3*p4[1]
                ) for ti in t]

                if not current_poly:
                    current_poly.extend(curve_pts)
                elif current_poly[-1] != curve_pts[0]:
                    op_polylines[code].append(current_poly)
                    current_poly = curve_pts
                else:
                    current_poly.extend(curve_pts[1:])

        if len(current_poly) >= 2:
            op_polylines[code].append(current_poly)

print(f"2. Extracted vector paths in {time.time()-t0:.2f}s:")
total_polys = 0
total_pts = 0

routes_output = {}

for hex_val, info in HEX_TO_OP.items():
    code = info["code"]
    polys = op_polylines[code]
    total_polys += len(polys)
    pts_count = sum(len(p) for p in polys)
    total_pts += pts_count
    print(f"  {info['name']:25s} ({code}): {len(polys):3d} polylines, {pts_count:4d} vertices")
    routes_output[code] = {
        "code": code,
        "name": info["name"],
        "color": info["color"],
        "polylines": polys
    }

print(f"\nTotal polylines across all 22 operators: {total_polys}, total vertices: {total_pts}")

# Save to JS file
js_content = f"""/**
 * Real Vector Route Polylines for Kathmandu Valley Bus Operators
 * Extracted directly from Kathmandu_Bus_Route_Map.ai vector curves.
 * Coordinates are mapped to the 11667 x 8750 px canvas.
 */

export const ROUTE_VECTORS = {json.dumps(routes_output, ensure_ascii=False, indent=2)};
"""

with open('src/data/routeVectors.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print("Saved src/data/routeVectors.js successfully.")
