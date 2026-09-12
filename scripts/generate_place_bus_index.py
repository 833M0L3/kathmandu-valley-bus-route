import json
import math
import re
import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/placesData.js', encoding='utf-8') as f:
    text = f.read()
    json_str = text[text.index('['):text.rindex(']')+1]
    all_places = json.loads(json_str)

# The 22 bus corridors
corridors = {
    'S': [  # Sajha Yatayat
        [(4803, 5109), (4516, 5182), (4537, 4565), (4410, 4145), (4142, 3760), (5100, 3050), (6626, 2212)],
        [(4410, 4145), (3932, 4518), (3208, 4542)],
        [(4410, 4145), (5202, 4485), (5489, 4895), (7590, 4112), (8865, 4650), (8933, 5052)],
        [(4410, 4145), (3617, 3058)]
    ],
    'N': [  # Nepal Yatayat
        [(3964, 5207), (3932, 4518), (4537, 4565), (4410, 4145), (5178, 4022), (5202, 4485), (5489, 4895)],
        [(5489, 4895), (5800, 4000), (5780, 3492), (6838, 3211)],
        [(4803, 5109), (4516, 5182), (3964, 5207)]
    ],
    'M': [  # Mahanagar Yatayat: Ring Road Full Loop
        [(3208, 4542), (3056, 3592), (3617, 3058), (3980, 2700), (5100, 3050), (5780, 3492), (5900, 4200), (5489, 4895), (5068, 5632), (3964, 5207), (3208, 4542)]
    ],
    'B': [  # Bhaktapur Buses
        [(8933, 5052), (8865, 4650), (7590, 4112), (5489, 4895), (5202, 4485), (4914, 4714), (4410, 4145)],
        [(5489, 4895), (6112, 4024)],
        [(5489, 4895), (5780, 3492), (5100, 3050), (3980, 2700)],
        [(4410, 4145), (3932, 4518), (3208, 4542)]
    ],
    'X': [  # Mayur Yatayat
        [(9500, 5000), (8933, 5052), (8865, 4650), (7590, 4112), (5489, 4895), (5068, 5632), (3964, 5207), (3208, 4542)]
    ],
    'K': [  # Kirtipur Yatayat
        [(3465, 6107), (3964, 5207), (3932, 4518), (4537, 4565), (4410, 4145)]
    ],
    'C': [  # Chandragiri Yatayat
        [(1418, 4520), (2200, 4500), (3208, 4542), (3932, 4518), (4537, 4565), (4410, 4145)]
    ],
    'T': [  # Tarakeshwor Yatayat
        [(2400, 2400), (3617, 3058), (4142, 3760), (4410, 4145)],
        [(4410, 4145), (3056, 3592), (3208, 4542)]
    ],
    'A': [  # Budhanilkantha Yatayat
        [(6626, 2212), (5100, 3050), (4142, 3760), (4410, 4145), (3056, 3592), (3208, 4542)]
    ],
    'D': [  # Digo Yatayat
        [(6626, 2212), (5100, 3050), (4142, 3760), (4410, 4145), (3932, 4518), (3208, 4542)]
    ],
    'F': [  # Balaju Yatayat
        [(3617, 3058), (4142, 3760), (4410, 4145)]
    ],
    'Z': [  # Samakhusi Yatayat
        [(3980, 2700), (4300, 3100), (4142, 3760), (4410, 4145)]
    ],
    'L': [  # Gokarneshwar Yatayat
        [(7125, 1861), (6838, 3211), (5780, 3492), (5178, 4022), (4410, 4145), (3056, 3592)]
    ],
    'R': [  # Riddhi Siddhi Yatayat
        [(6680, 3817), (5489, 4895), (5202, 4485), (4410, 4145), (3208, 4542)],
        [(5489, 4895), (5068, 5632)]
    ],
    'G': [  # Gothatar Yatayat
        [(6495, 3702), (5780, 3492), (5178, 4022), (4410, 4145)],
        [(5780, 3492), (5100, 3050), (3980, 2700)],
        [(6495, 3702), (5489, 4895)]
    ],
    'P': [  # Panchpokhari Yatayat
        [(8000, 2500), (6838, 3211), (5780, 3492), (4410, 4145), (4803, 5109), (5068, 5632)],
        [(4410, 4145), (3056, 3592)]
    ],
    'Y': [  # Samyukta Yatayat
        [(3208, 4542), (3932, 4518), (4537, 4565), (4410, 4145), (5202, 4485), (6112, 4024)]
    ],
    'H': [  # Basuki Yatayat
        [(8000, 2500), (6838, 3211), (5780, 3492), (4410, 4145), (3056, 3592)]
    ],
    'J': [  # Juneli Yatayat
        [(6838, 3211), (5780, 3492), (5178, 4022), (4410, 4145)]
    ],
    'I': [  # Bagmati Yatayat
        [(3465, 6107), (3964, 5207), (4537, 4565), (4410, 4145), (5100, 3050)]
    ],
    'E': [  # Dhumrabaraha Yatayat
        [(5500, 3200), (5780, 3492), (5178, 4022), (4410, 4145), (4537, 4565)]
    ],
    'O': [  # Om Janata Yatayat
        [(6500, 6200), (5068, 5632), (4803, 5109), (4537, 4565), (4410, 4145)]
    ]
}

def dist_point_to_segment(px, py, x1, y1, x2, y2):
    dx = x2 - x1
    dy = y2 - y1
    if dx == 0 and dy == 0:
        return math.hypot(px - x1, py - y1)
    t = ((px - x1) * dx + (py - y1) * dy) / (dx*dx + dy*dy)
    t = max(0.0, min(1.0, t))
    return math.hypot(px - (x1 + t * dx), py - (y1 + t * dy))

def dist_to_operator(px, py, op_code):
    min_d = float('inf')
    for branch in corridors[op_code]:
        for i in range(len(branch) - 1):
            x1, y1 = branch[i]
            x2, y2 = branch[i+1]
            d = dist_point_to_segment(px, py, x1, y1, x2, y2)
            if d < min_d:
                min_d = d
    return min_d

# Compute mapping for every single place
place_index = {}
for p in all_places:
    px, py = p['x'], p['y']
    name = p['name']
    name_clean = name.strip()
    
    # Calculate distance to all operators
    op_dists = []
    for op in corridors:
        d = dist_to_operator(px, py, op)
        op_dists.append((op, d))
    op_dists.sort(key=lambda x: x[1])
    
    # Keep operators within 800px or at least top 2
    matched = []
    for op, d in op_dists:
        if d <= 850 or len(matched) < 2:
            matched.append(op)
        elif len(matched) >= 4:
            break
            
    place_index[name_clean] = {
        'name': name_clean,
        'nepali': p.get('nepali', ''),
        'buses': matched
    }

print(f"Total indexed places: {len(place_index)}")

# Export to src/data/placeBusIndex.js
js_content = f"""/**
 * Complete Kathmandu Valley Place-to-Bus Route Mapping
 * Spatially maps all {len(place_index)} places extracted from clean-map.jpg to their passing bus operators.
 */

export const ALL_PLACES_BUS_INDEX = {json.dumps(list(place_index.values()), indent=2, ensure_ascii=False)};

// Quick lookup helper: Returns list of bus operator codes that serve any place matching query
export function findBusesForPlaceQuery(query) {{
  if (!query || !query.trim()) return [];
  const q = query.trim().toLowerCase();
  
  const matchedCodes = new Set();
  const matchedPlaces = [];

  for (const item of ALL_PLACES_BUS_INDEX) {{
    if (item.name.toLowerCase().includes(q) || (item.nepali && item.nepali.includes(q))) {{
      matchedPlaces.push(item.name);
      item.buses.forEach(b => matchedCodes.add(b));
    }}
  }}

  return {{
    codes: Array.from(matchedCodes),
    matchedPlaces: matchedPlaces.slice(0, 10)
  }};
}}
"""

with open('src/data/placeBusIndex.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print("Saved src/data/placeBusIndex.js successfully!")
