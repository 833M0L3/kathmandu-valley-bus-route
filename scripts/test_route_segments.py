import pymupdf
import numpy as np
import json
import re

doc = pymupdf.open('Kathmandu_Bus_Route_Map.ai')
p = doc[0]
drawings = p.get_drawings()

# Map hex colors (width 2.26) to operator codes
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

# Collect vector line segments for each operator
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
            if it[0] == 'l': # line (p1, p2)
                op_segments[code].append(('l', np.array([it[1].x, it[1].y]), np.array([it[2].x, it[2].y])))
            elif it[0] == 'c': # cubic bezier (p1, p2, p3, p4)
                # sample 5 points along curve
                p1 = np.array([it[1].x, it[1].y])
                p2 = np.array([it[2].x, it[2].y])
                p3 = np.array([it[3].x, it[3].y])
                p4 = np.array([it[4].x, it[4].y])
                t = np.linspace(0, 1, 6)
                pts = [(1-ti)**3*p1 + 3*(1-ti)**2*ti*p2 + 3*(1-ti)*ti**2*p3 + ti**3*p4 for ti in t]
                for k in range(len(pts)-1):
                    op_segments[code].append(('l', pts[k], pts[k+1]))

print("Loaded operator route segments:")
for code, segs in sorted(op_segments.items()):
    print(f"  Operator {code}: {len(segs)} line segments")
