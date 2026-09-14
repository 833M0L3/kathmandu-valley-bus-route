import pymupdf
import numpy as np

# Load landmarks with verified coordinates in placesData.js
# and find their exact text coordinates in the AI file

doc_ai = pymupdf.open('Kathmandu_Bus_Route_Map.ai')
p = doc_ai[0]

# High confidence landmarks across all 4 corners and center:
# 1. Thankot / Chandragiri (West)
# 2. Suryabinayak / Bhaktapur / Kamalbinayak (East)
# 3. Budhanilkantha / Jhor (North)
# 4. Godawari / Lele (South)
# 5. Ratnapark / Jamal (Center)

landmarks = [
    ("Ratnapark", 4410, 4145),
    ("Kalanki", 3208, 4542),
    ("Koteshwor", 5489, 4895),
    ("Balkhu", 3964, 5207),
    ("Lagankhel", 4803, 5109),
    ("Swayambhu", 3056, 3592),
    ("Gongabu", 3980, 2700),
    ("Bhaktapur", 8865, 4650),
    ("Budhanilkantha", 6602, 1018),
    ("Suryabinayak", 8933, 5052),
    ("Sundarijal", 7125, 1861),
    ("Chabahil", 5780, 3492)
]

ai_coords = []
map_coords = []

for name, mx, my in landmarks:
    rects = p.search_for(name)
    if rects:
        # Take center of first match
        r = rects[0]
        cx, cy = (r.x0 + r.x1) / 2, (r.y0 + r.y1) / 2
        ai_coords.append([cx, cy])
        map_coords.append([mx, my])
        print(f"Matched {name:15s}: AI=({cx:.2f}, {cy:.2f}) -> Map=({mx}, {my})")

ai_coords = np.array(ai_coords)
map_coords = np.array(map_coords)

# Affine transformation: Map = A * AI + T
# [x_map, y_map] = [a*x + b*y + c, d*x + e*y + f]
A = np.column_stack([ai_coords, np.ones(len(ai_coords))])
params_x, residuals_x, rank_x, s_x = np.linalg.lstsq(A, map_coords[:, 0], rcond=None)
params_y, residuals_y, rank_y, s_y = np.linalg.lstsq(A, map_coords[:, 1], rcond=None)

print("\n--- Affine Fit Results ---")
print(f"X_map = {params_x[0]:.6f} * X_ai + {params_x[1]:.6f} * Y_ai + {params_x[2]:.6f}")
print(f"Y_map = {params_y[0]:.6f} * X_ai + {params_y[1]:.6f} * Y_ai + {params_y[2]:.6f}")

pred_x = A @ params_x
pred_y = A @ params_y
err_x = map_coords[:, 0] - pred_x
err_y = map_coords[:, 1] - pred_y

print("\nResidual errors (px):")
for i, (name, _, _) in enumerate(landmarks[:len(ai_coords)]):
    print(f"  {name:15s}: dx = {err_x[i]:+6.1f} px, dy = {err_y[i]:+6.1f} px, dist = {np.hypot(err_x[i], err_y[i]):5.1f} px")
