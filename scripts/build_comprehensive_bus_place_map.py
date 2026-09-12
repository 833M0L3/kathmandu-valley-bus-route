import json
import math
import sys
sys.stdout.reconfigure(encoding='utf-8')

# Load all 924 places
with open('src/data/placesData.js', encoding='utf-8') as f:
    text = f.read()
    json_str = text[text.index('['):text.rindex(']')+1]
    all_places = json.loads(json_str)

# Define corridor polylines for each of the 22 bus operators based on their route networks on clean-map.jpg
# Each operator is defined by a series of connected route segments (waypoints)
corridors = {
    'S': [  # Sajha Yatayat: Lagankhel - Ratnapark - Budhanilkantha / Suryabinayak / Kalanki / Balaju
        [(4803, 5109), (4516, 5182), (4500, 4800), (4537, 4565), (4410, 4145), (4200, 3800), (5100, 3050), (6626, 2212)],
        [(4410, 4145), (3932, 4518), (3208, 4542)],
        [(4410, 4145), (4800, 4300), (5202, 4485), (5489, 4895), (7590, 4112), (8865, 4650), (8933, 5052)],
        [(4410, 4145), (4142, 3760), (3617, 3058)]
    ],
    'N': [  # Nepal Yatayat: Balkhu - Kalimati - Ratnapark - Maitidevi - Baneshwor - Koteshwor - Chabahil - Jorpati
        [(3964, 5207), (3932, 4518), (4537, 4565), (4410, 4145), (5178, 4022), (5202, 4485), (5489, 4895)],
        [(5489, 4895), (5800, 4000), (5780, 3492), (6838, 3211), (7124, 1860)],
        [(4803, 5109), (4516, 5182), (3964, 5207)]
    ],
    'M': [  # Mahanagar Yatayat: Ring Road Full Loop
        [(3208, 4542), (3056, 3592), (3617, 3058), (3980, 2700), (5100, 3050), (5780, 3492), (5900, 4200), (5489, 4895), (5068, 5632), (3964, 5207), (3208, 4542)]
    ],
    'B': [  # Bhaktapur Buses: Bhaktapur - Thimi - Koteshwor - Baneshwor - Ratnapark / Airport / Gongabu / Kalanki
        [(8933, 5052), (8865, 4650), (7590, 4112), (5489, 4895), (5202, 4485), (4914, 4714), (4410, 4145)],
        [(5489, 4895), (6112, 4024)],
        [(5489, 4895), (5780, 3492), (5100, 3050), (3980, 2700)],
        [(4410, 4145), (3932, 4518), (3208, 4542)]
    ],
    'X': [  # Mayur Yatayat: Dhulikhel/Banepa - Bhaktapur - Koteshwor - Satdobato - Balkhu - Kalanki
        [(9500, 5000), (8933, 5052), (8865, 4650), (7590, 4112), (5489, 4895), (5068, 5632), (3964, 5207), (3208, 4542)]
    ],
    'K': [  # Kirtipur Yatayat: Kirtipur - Balkhu - Kalimati - Tripureshwor - Ratnapark
        [(3465, 6107), (3964, 5207), (3932, 4518), (4537, 4565), (4410, 4145)]
    ],
    'C': [  # Chandragiri Yatayat: Thankot - Kalanki - Kalimati - Tripureshwor - Ratnapark
        [(1418, 4520), (2200, 4500), (3208, 4542), (3932, 4518), (4537, 4565), (4410, 4145)]
    ],
    'T': [  # Tarakeshwor Yatayat: Tarakeshwor - Balaju - Thamel - Ratnapark - Swayambhu - Kalanki
        [(2400, 2400), (3617, 3058), (4142, 3760), (4410, 4145)],
        [(4410, 4145), (3056, 3592), (3208, 4542)]
    ],
    'A': [  # Budhanilkantha Yatayat: Budhanilkantha - Maharajgunj - Thamel - Ratnapark - Swayambhu - Kalanki
        [(6626, 2212), (5100, 3050), (4142, 3760), (4410, 4145), (3056, 3592), (3208, 4542)]
    ],
    'D': [  # Digo Yatayat: Budhanilkantha - Maharajgunj - Lazimpat - Ratnapark - Kalanki
        [(6626, 2212), (5100, 3050), (4500, 3600), (4410, 4145), (3932, 4518), (3208, 4542)]
    ],
    'F': [  # Balaju Yatayat: Balaju - Sorhakhutte - Thamel - Ratnapark
        [(3617, 3058), (4142, 3760), (4410, 4145)]
    ],
    'Z': [  # Samakhusi Yatayat: Gongabu - Samakhusi - Lainchaur - Ratnapark
        [(3980, 2700), (4300, 3100), (4142, 3760), (4410, 4145)]
    ],
    'L': [  # Gokarneshwar Yatayat: Sundarijal - Jorpati - Chabahil - Maitidevi - Ratnapark - Swayambhu
        [(7125, 1861), (6838, 3211), (5780, 3492), (5178, 4022), (4410, 4145), (3056, 3592)]
    ],
    'R': [  # Riddhi Siddhi Yatayat: Kadaghari - Suncity - Koteshwor - Baneshwor - Ratnapark - Kalanki - Satdobato
        [(6680, 3817), (5489, 4895), (5202, 4485), (4410, 4145), (3208, 4542)],
        [(5489, 4895), (5068, 5632)]
    ],
    'G': [  # Gothatar Yatayat: Gothatar - Chabahil - Ratnapark / Gongabu - Koteshwor
        [(6495, 3702), (5780, 3492), (5178, 4022), (4410, 4145)],
        [(5780, 3492), (5100, 3050), (3980, 2700)],
        [(6495, 3702), (5489, 4895)]
    ],
    'P': [  # Panchpokhari Yatayat: Sankhu - Jorpati - Chabahil - Ratnapark - Satdobato - Swayambhu
        [(8000, 2500), (6838, 3211), (5780, 3492), (4410, 4145), (4803, 5109), (5068, 5632)],
        [(4410, 4145), (3056, 3592)]
    ],
    'Y': [  # Samyukta Yatayat: Kalanki - Tripureshwor - Ratnapark - Baneshwor - Airport
        [(3208, 4542), (3932, 4518), (4537, 4565), (4410, 4145), (5202, 4485), (6112, 4024)]
    ],
    'H': [  # Basuki Yatayat: Sankhu - Jorpati - Chabahil - Ratnapark - Swayambhu
        [(8000, 2500), (6838, 3211), (5780, 3492), (4410, 4145), (3056, 3592)]
    ],
    'J': [  # Juneli Yatayat: Jorpati - Boudha - Chabahil - Maitidevi - Ratnapark
        [(6838, 3211), (5780, 3492), (5178, 4022), (4410, 4145)]
    ],
    'I': [  # Bagmati Yatayat: Kirtipur - Balkhu - Tripureshwor - Ratnapark - Maharajgunj
        [(3465, 6107), (3964, 5207), (4537, 4565), (4410, 4145), (5100, 3050)]
    ],
    'E': [  # Dhumrabaraha Yatayat: Dhumbarahi - Chabahil - Maitidevi - Ratnapark - Tripureshwor
        [(5500, 3200), (5780, 3492), (5178, 4022), (4410, 4145), (4537, 4565)]
    ],
    'O': [  # Om Janata Yatayat: Lubhu - Gwarko - Lagankhel - Satdobato - Ratnapark
        [(6500, 6200), (5068, 5632), (4803, 5109), (4537, 4565), (4410, 4145)]
    ]
}

def dist_point_to_segment(px, py, x1, y1, x2, y2):
    dx = x2 - x1
    dy = y2 - y1
    if dx == 0 and dy == 0:
        return math.hypot(px - x1, py - y1)
    # Project point onto line segment
    t = ((px - x1) * dx + (py - y1) * dy) / (dx*dx + dy*dy)
    t = max(0.0, min(1.0, t))
    proj_x = x1 + t * dx
    proj_y = y1 + t * dy
    return math.hypot(px - proj_x, py - proj_y)

def dist_to_operator(px, py, op_code):
    min_dist = float('inf')
    for branch in corridors[op_code]:
        for i in range(len(branch) - 1):
            x1, y1 = branch[i]
            x2, y2 = branch[i+1]
            d = dist_point_to_segment(px, py, x1, y1, x2, y2)
            if d < min_dist:
                min_dist = d
    return min_dist

# Build a mapping: place_name_lower -> list of bus operator codes
# We assign any bus whose corridor passes within a reasonable catchment radius (e.g. 700px on an 11,667px map, which is ~6% of map)
# And at least ensure the closest 2 bus operators are ALWAYS mapped!
place_to_buses = {}
bus_to_places = {op: set() for op in corridors}

THRESHOLD_DIST = 750 # pixels

for p in all_places:
    px, py = p['x'], p['y']
    name = p['name']
    name_key = name.lower()
    
    # Calculate distance to all 22 operators
    op_dists = []
    for op in corridors:
        d = dist_to_operator(px, py, op)
        op_dists.append((op, d))
    op_dists.sort(key=lambda x: x[1])
    
    # Select operators within threshold, and always at least top 2
    matched_ops = []
    for op, d in op_dists:
        if d <= THRESHOLD_DIST or len(matched_ops) < 2:
            matched_ops.append(op)
            bus_to_places[op].add(name)
        elif len(matched_ops) >= 4:
            break
            
    place_to_buses[name_key] = matched_ops

print(f"Mapped {len(place_to_buses)} places to bus services.")
for op, plist in sorted(bus_to_places.items()):
    print(f"  [{op}] covers {len(plist)} places/stops.")

# Test a few sample place searches
test_places = ['ASCOL', 'Aani Gumba', 'Asta Narayan Pictures', 'Maitidevi', 'Bode', 'Suncity', 'B and B Hospital', 'Pulchowk', 'Sitapaila']
print("\n--- Test Place Queries ---")
for tp in test_places:
    ops = place_to_buses.get(tp.lower(), [])
    print(f"  Query '{tp}': {ops}")
