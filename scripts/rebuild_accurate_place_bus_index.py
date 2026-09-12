import json
import math
import sys
sys.stdout.reconfigure(encoding='utf-8')

# Load all 1115 places
with open('src/data/placesData.js', encoding='utf-8') as f:
    text = f.read()
    start = text.index('[')
    end = text.index('];') + 1
    places = json.loads(text[start:end])

print(f"Loaded {len(places)} places from placesData.js")

corridors = {
    # B: Bhaktapur Buses (Wide network in Bhaktapur + radial corridors to Kathmandu & Ring Road)
    'B': [
        # Kamalbinayak & Byasi route
        [(9393, 4548), (9180, 4417), (8980, 4436), (8865, 4653), (8520, 4640)],
        # Chyamasingh & Jagati route
        [(9390, 4682), (9298, 4985), (8933, 5051), (8520, 4640)],
        # Sallaghari through Thimi, Kaushaltar, Lokanthali, Jadibuti to Koteshwor
        [(8520, 4640), (7590, 4112), (6500, 4400), (5800, 4800), (5489, 4895)],
        # Bode branch
        [(7590, 4112), (7350, 4100), (7100, 4120)],
        # Koteshwor into Ratnapark
        [(5489, 4895), (5800, 4500), (5202, 4485), (4900, 4300), (4537, 4565), (4410, 4145)],
        # Ring Road North branch to Balaju
        [(5489, 4895), (6000, 4200), (5850, 3800), (5780, 3492), (5100, 3050), (3980, 2700), (3617, 3058)],
        # Ring Road South branch to Kalanki
        [(5489, 4895), (5068, 5632), (3964, 5207), (3208, 4542)],
        # Lagankhel branch
        [(5489, 4895), (5175, 5270), (4803, 5109)]
    ],

    # S: Sajha Yatayat
    'S': [
        # North-South trunk: Budhanilkantha -> Maharajgunj -> Lazimpat -> Ratnapark -> Tripureshwor -> Pulchowk -> Lagankhel
        [(6626, 2212), (6100, 2600), (5100, 3050), (4800, 3400), (4400, 3600), (4410, 4145), (4537, 4565), (4600, 4800), (4516, 5182), (4803, 5109)],
        # East trunk: Ratnapark -> Maitighar -> New Baneshwor -> Koteshwor -> Thimi -> Sallaghari -> Suryabinayak (ENDS AT SURYABINAYAK!)
        [(4410, 4145), (4800, 4300), (5202, 4485), (5489, 4895), (5800, 4800), (6500, 4400), (7590, 4112), (8520, 4640), (8933, 5051)],
        # West trunk: Ratnapark -> Tripureshwor -> Kalimati -> Balkhu -> Kalanki -> Swayambhu
        [(4410, 4145), (4537, 4565), (3932, 4518), (3964, 5207), (3208, 4542), (3056, 3592)],
        # Ring Road / Airport loop: Balaju -> Gongabu -> Maharajgunj -> Chabahil -> Gaushala -> Airport
        [(3617, 3058), (3980, 2700), (5100, 3050), (5780, 3492), (5850, 3800), (6000, 4200)],
        # South branch (S7): Lagankhel -> Satdobato -> Harisiddhi -> Thaiba -> Badegaun -> Toukhel -> Godawari
        [(4803, 5109), (5068, 5632), (6119, 6447), (5879, 6721), (6092, 6926), (6284, 7123), (6521, 7361)],
        # South branch (S5): Satdobato -> Khumaltar -> Dolahity -> Sunakothi -> Thecho -> Chapagaun -> Pyangaun -> Bageshwori -> Tikabhairab -> Champeshwori -> Lele
        [(5068, 5632), (4876, 5832), (4848, 5932), (4864, 6032), (4858, 6148), (4840, 6381), (4847, 6648), (4839, 6791), (4852, 7182), (4846, 7315), (4878, 7448), (4868, 7524), (5002, 7525), (5135, 7542)],
        # South-West branch (S6): Jawalakhel -> Nakkhu -> Bhainsepati -> Sainbu -> Chyasikot -> Bungamati
        [(4516, 5182), (4292, 5565), (4270, 5698), (4291, 5965), (4275, 6098), (4285, 6498), (4288, 6631)]
    ],

    # X: Mayur Yatayat (Dhulikhel/Banepa/Sanga -> Jagati -> Suryabinayak -> Koteshwor -> Satdobato -> Balkhu -> Kalanki)
    'X': [
        [(11200, 5800), (10500, 5600), (9791, 5387), (9700, 5290), (9622, 5199), (9298, 4985), (8933, 5051), (8520, 4640), (7590, 4112), (5800, 4800), (5489, 4895), (5175, 5270), (5068, 5632), (4516, 5182), (3964, 5207), (3208, 4542)]
    ],

    # M: Mahanagar Yatayat (CIRCULAR RING ROAD ONLY)
    'M': [
        [(3208, 4542), (3056, 3592), (3096, 3196), (3227, 3097), (3617, 3058), (3980, 2700), (4400, 2680), (5100, 3050), (5780, 3492), (5850, 3800), (6000, 4200), (5800, 4500), (5489, 4895), (5175, 5270), (5068, 5632), (4516, 5182), (3964, 5207), (3208, 4542)]
    ],

    # C: Chandragiri / Thankot Yatayat (Thankot / Matatirtha -> Kalanki -> Kalimati -> Tripureshwor -> Ratnapark)
    'C': [
        [(1418, 4520), (1523, 4925), (2200, 4500), (2688, 4676), (3208, 4542), (3932, 4518), (4537, 4565), (4410, 4145)],
        [(1784, 5411), (2088, 5190), (2319, 4677), (3208, 4542)]
    ],

    # K: Kirtipur Yatayat (Kirtipur / TU Gate / Panga -> Balkhu -> Kalimati -> Tripureshwor -> Ratnapark)
    'K': [
        [(3465, 6107), (3076, 6065), (2825, 5776), (2784, 5647), (3485, 5550), (3863, 5639), (3964, 5207), (3932, 4518), (4537, 4565), (4410, 4145)]
    ],

    # I: Bagmati Yatayat (Kirtipur / Panga -> Balkhu -> Ratnapark -> Lainchaur -> Maharajgunj)
    'I': [
        [(3465, 6107), (2825, 5776), (3863, 5639), (3964, 5207), (3932, 4518), (4537, 4565), (4410, 4145), (4400, 3600), (5100, 3050)]
    ],

    # T: Tarakeshwor Yatayat (Dharmasthali / Goldhunga / Lolang / Phutung -> Balaju -> Thamel -> Ratnapark; Western loop to Kalanki)
    'T': [
        [(2828, 1489), (2609, 1263), (3417, 2885), (3617, 3058), (4142, 3760), (4410, 4145)],
        [(3617, 3058), (3096, 3196), (3227, 3097), (3056, 3592), (3208, 4542)],
        [(3617, 3058), (3212, 2399), (2803, 2423), (2742, 2183), (2569, 2019), (3161, 1992), (3538, 1953)],
        [(3617, 3058), (3400, 2700), (3200, 2600)]
    ],

    # F: Balaju Yatayat (Balaju -> Machhapokhari -> Sorhakhutte -> Thamel -> Ratnapark; Western Ring Road)
    'F': [
        [(3617, 3058), (3417, 2885), (4142, 3760), (4410, 4145)],
        [(3617, 3058), (3096, 3196), (3227, 3097), (3056, 3592)]
    ],

    # Z: Samakhusi Yatayat (Gongabu New Bus Park -> Town Planning -> Samakhusi -> Lainchaur -> Thamel -> Ratnapark; Tokha branch)
    'Z': [
        [(3980, 2700), (4370, 2682), (4400, 3600), (4142, 3760), (4410, 4145)],
        [(4370, 2682), (4658, 2565), (4960, 2254), (5212, 1717), (5212, 1505)]
    ],

    # A: Budhanilkantha Yatayat (Budhanilkantha -> Golfutar -> Maharajgunj -> Lazimpat -> Thamel -> Ratnapark -> Swayambhu -> Kalanki)
    'A': [
        [(6626, 2212), (6100, 2600), (5100, 3050), (4800, 3400), (4400, 3600), (4142, 3760), (4410, 4145)],
        [(4410, 4145), (3056, 3592), (3208, 4542)]
    ],

    # D: Digo Yatayat (Budhanilkantha -> Maharajgunj -> Lazimpat -> Ratnapark -> Kalimati -> Kalanki)
    'D': [
        [(6626, 2212), (5100, 3050), (4400, 3600), (4410, 4145), (3932, 4518), (3208, 4542)]
    ],

    # L: Gokarneshwar Yatayat (Sundarijal -> Gokarna -> Jorpati -> Boudha -> Chabahil -> Maitidevi -> Ratnapark; Danchhi branch)
    'L': [
        [(7125, 1861), (6800, 2600), (6838, 3211), (6400, 3300), (5780, 3492), (5850, 3800), (5178, 4022), (4800, 4100), (4410, 4145)],
        [(6838, 3211), (7400, 3200), (7800, 3200)]
    ],

    # P: Panchpokhari Yatayat (Sankhu -> Mulpani -> Jorpati -> Boudha -> Chabahil -> Maitidevi -> Ratnapark -> Lagankhel -> Satdobato; Danchhi branch)
    'P': [
        [(8200, 2300), (7509, 3522), (6838, 3211), (5780, 3492), (5178, 4022), (4410, 4145), (4537, 4565), (4803, 5109), (5068, 5632)],
        [(6838, 3211), (7400, 3200), (7800, 3200)]
    ],

    # H: Basuki Yatayat (Sankhu -> Jorpati -> Boudha -> Chabahil -> Maitidevi -> Ratnapark -> Swayambhu)
    'H': [
        [(8200, 2300), (6838, 3211), (5780, 3492), (5178, 4022), (4410, 4145), (3056, 3592)]
    ],

    # J: Juneli Yatayat (Jorpati -> Boudha -> Chabahil -> Maitidevi -> Ratnapark)
    'J': [
        [(6838, 3211), (6400, 3300), (5780, 3492), (5178, 4022), (4410, 4145)]
    ],

    # G: Gothatar Yatayat (Gothatar -> Kadaghari -> Suncity -> Sinamangal -> Gaushala -> Chabahil -> Maitidevi -> Ratnapark; branch to Koteshwor)
    'G': [
        [(6495, 3702), (6680, 3817), (6650, 4000), (6000, 4200), (5850, 3800), (5780, 3492), (5178, 4022), (4410, 4145)],
        [(6650, 4000), (5800, 4800), (5489, 4895)]
    ],

    # R: Riddhi Siddhi Yatayat (Kadaghari -> Suncity -> Jadibuti -> Koteshwor -> Baneshwor -> Ratnapark -> Kalanki; R2 branch to Harisiddhi)
    'R': [
        [(6680, 3817), (6650, 4000), (5800, 4800), (5489, 4895), (5202, 4485), (4410, 4145), (3208, 4542)],
        [(5489, 4895), (5175, 5270), (5068, 5632), (6119, 6447)]
    ],

    # Y: Samyukta Yatayat (Kalanki -> Kalimati -> Tripureshwor -> Ratnapark -> New Baneshwor -> Tinkune -> Sinamangal -> Airport)
    'Y': [
        [(3208, 4542), (3932, 4518), (4537, 4565), (4410, 4145), (5202, 4485), (5800, 4500), (6000, 4200), (6112, 4024)]
    ],

    # N: Nepal Yatayat (Balkhu -> Kalimati -> Ratnapark -> Maitidevi -> Baneshwor -> Koteshwor -> Gaushala -> Chabahil -> Boudha -> Jorpati -> Kapan; Tikathali branch)
    'N': [
        [(3964, 5207), (3932, 4518), (4537, 4565), (4410, 4145), (5000, 3950), (5178, 4022), (5202, 4485), (5489, 4895), (5850, 3800), (5780, 3492), (6400, 3300), (6838, 3211), (7124, 1860)],
        [(3964, 5207), (4516, 5182), (4803, 5109)],
        [(5489, 4895), (5900, 5200), (6200, 5500)]
    ],

    # E: Dhumrabaraha Yatayat (Dhumbarahi -> Chabahil -> Gaushala -> Maitidevi -> Ratnapark -> Tripureshwor)
    'E': [
        [(5450, 3200), (5780, 3492), (5850, 3800), (5178, 4022), (4410, 4145), (4537, 4565)]
    ],

    # O: Om Janata Yatayat (Lubhu -> Mahalaxmi -> Imadol -> Gwarko -> Satdobato -> Lagankhel -> Ratnapark)
    'O': [
        [(6114, 6169), (5824, 5836), (5614, 5636), (5175, 5270), (5068, 5632), (4803, 5109), (4516, 5182), (4537, 4565), (4410, 4145)]
    ]
}

def dist_point_to_segment(px, py, x1, y1, x2, y2):
    dx = x2 - x1
    dy = y2 - y1
    if dx == 0 and dy == 0:
        return math.hypot(px - x1, py - y1)
    t = ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy)
    t = max(0.0, min(1.0, t))
    closest_x = x1 + t * dx
    closest_y = y1 + t * dy
    return math.hypot(px - closest_x, py - closest_y)

def dist_to_operator(px, py, op):
    if op not in corridors:
        return 999999
    min_d = 999999
    for polyline in corridors[op]:
        for i in range(len(polyline) - 1):
            x1, y1 = polyline[i]
            x2, y2 = polyline[i + 1]
            d = dist_point_to_segment(px, py, x1, y1, x2, y2)
            if d < min_d:
                min_d = d
    return min_d

# Specific Geographic Boundary & Terminus Rules (Ground Truth)
def is_operator_allowed(op, px, py, name_lower):
    # Rule 0: Specific South Lalitpur Chapagaun/Lele trunk -> ONLY Sajha Yatayat (S)
    # Places: Champeshwori, Bageshwori, Tikabhairab, Lele, Pyangaun, Chapagaun, Thecho, Sunakothi, Dolahity
    if any(k in name_lower for k in ['champeshwori', 'chameshwori', 'bageshwori', 'tikabhairab', 'lele', 'pyangaun', 'chapagaun', 'thecho', 'sunakothi', 'dolahity', 'janani marga', 'pragati chowk', 'simako chowk']):
        # If it's Jaya Bageshwori near Gaushala in Kathmandu (py < 4500), allow standard central operators
        if 'jaya bageshwori' in name_lower or py < 4500:
            return op in ('N', 'M', 'B', 'S', 'L', 'G', 'E')
        return op == 'S'

    # Rule 0B: Bungamati / Bhainsepati / Sainbu / Chyasikot -> ONLY Sajha Yatayat (S)
    if any(k in name_lower for k in ['bungamati', 'bhainsepati', 'chyasikot', 'sainbu', 'adarsha saula yubak', 'wai wai noodles']):
        return op == 'S'

    # Rule 0C: Northwest outer suburbs (Goldhunga, Lolang, Phutung, Bohoratar, Raniban) -> ONLY Tarakeshwor (T)
    if any(k in name_lower for k in ['goldhunga', 'lolang', 'phutung', 'bohoratar', 'raniban', 'dharmasthali', 'kavresthali']):
        return op == 'T'

    # Rule 0D: Matatirtha -> ONLY Chandragiri (C)
    if 'matatirtha' in name_lower:
        return op == 'C'

    # Rule 0E: Panga / Kirtipur inner -> Kirtipur (K) & Bagmati (I)
    if any(k in name_lower for k in ['panga', 'bagh bhairab', 'deukhel', 'nayabazar gate', 'langol']):
        return op in ('K', 'I')

    # Rule 0F: Banepa & Dhulikhel -> ONLY Mayur (X)
    if any(k in name_lower for k in ['dhulikhel', 'banepa', 'pulbazar']):
        return op == 'X'

    # Rule 0G: Tikathali -> ONLY Nepal Yatayat (N)
    if 'tikathali' in name_lower:
        return op == 'N'

    # Rule 0H: Danchhi / Indrayani -> Gokarneshwar (L) & Panchpokhari (P)
    if any(k in name_lower for k in ['danchhi', 'indrayani exchange', 'brahmakhel']):
        return op in ('L', 'P')

    # Rule 1: Chyamasingh, Kamalbinayak, Khwopa, Dekocha, Byasi (East / Ancient Bhaktapur)
    # ONLY Bhaktapur Buses (B) serve these inner Bhaktapur places!
    if px >= 8980 and py < 4950:
        return op == 'B'

    # Rule 2: Sajha Yatayat (S) strictly stops at Suryabinayak (x <= 8980) on the eastern line
    if op == 'S' and px > 8980 and py < 5600:
        return False

    # Rule 3: Mayur Yatayat (X) stays on Araniko Highway in Jagati / Sanga
    if op == 'X':
        if px > 8980 and py < 4900:  # North of Araniko highway in Bhaktapur
            return False
        if py < 4200:  # Inside Kathmandu North / Thamel / Ratnapark / Boudha / Balaju
            return False

    # Rule 4: Mahanagar (M) STRICTLY on Ring Road circle
    if op == 'M':
        # Check if inside central city core
        if 4000 < px < 5400 and 3400 < py < 4800:
            return False
        # Far East / Bhaktapur / Sankhu
        if px > 6300:
            return False
        # Far West / Thankot
        if px < 2800:
            return False
        # Far North / Dharmasthali / Tokha
        if py < 2500:
            return False
        # Far South / Godawari / Chapagaun / Lubhu
        if py > 5900:
            return False

    # Rule 5: Thankot / Chandragiri (C) only in West / Tribhuvan Highway to Ratnapark
    if op == 'C':
        if px > 4600 or py < 3800 or py > 5400:
            return False

    # Rule 6: Kirtipur (K) only Kirtipur corridor
    if op == 'K':
        if px > 4600 or py < 3800:
            return False
        if px < 3200 and py < 5500:
            return False

    # Rule 7: Tarakeshwor (T) strictly North / Balaju / Ratnapark / West Ring Road
    if op == 'T':
        if px > 4600:
            return False

    # Rule 8: Balaju (F) & Samakhusi (Z) strictly Balaju/Samakhusi into Ratnapark
    if op in ('F', 'Z'):
        if px > 5300 or px < 3400 or py > 4400:
            return False

    # Rule 9: Gokarneshwar (L), Panchpokhari (P), Basuki (H), Juneli (J) strictly North-East into Ratnapark
    if op in ('L', 'P', 'H', 'J'):
        if px < 4200 and op != 'H':  # Only H has a branch to Swayambhu
            return False
        if px > 7200 and py > 4000:  # Never in Bhaktapur
            return False

    # Rule 10: Om Janata (O) strictly South-East (Lubhu / Imadol / Gwarko / Lagankhel / Ratnapark)
    if op == 'O':
        if px < 4300 or py < 3800 or (px > 6800 and py < 5000):
            return False

    # Rule 11: Bode is Bhaktapur Buses (B) only
    if 'bode' in name_lower:
        return op == 'B'

    # Rule 12: Sundarijal is Gokarneshwar Yatayat (L) only
    if 'sundarijal' in name_lower:
        return op == 'L'

    # Rule 13: Sankhu is Panchpokhari (P) and Basuki (H) only
    if 'sankhu' in name_lower:
        return op in ('P', 'H')

    # Rule 15: Lubhu is Om Janata (O) only
    if 'lubhu' in name_lower:
        return op == 'O'

    # Rule 16: Godawari / Toukhel is Sajha (S) only
    if 'godawari' in name_lower or 'toukhel' in name_lower or 'badegaun' in name_lower:
        return op == 'S'

    # Rule 17: Harisiddhi is Sajha (S) and Riddhi Siddhi (R)
    if 'harisiddhi' in name_lower:
        return op in ('S', 'R')

    # Rule 18: Budhanilkantha is Sajha (S), Budhanilkantha (A), Digo (D)
    if 'budhanilkantha' in name_lower:
        return op in ('S', 'A', 'D')

    # Rule 19: Thulo Bharyang / Sano Bharyang on West Ring Road
    if 'thulo bharyang' in name_lower or 'sano bharyang' in name_lower:
        return op in ('M', 'T', 'F')

    return True

# Build high precision mapping
updated_index = []
for p in places:
    px, py = p['x'], p['y']
    name = p['name']
    nl = name.lower()

    # Calculate distance to all operators
    op_dists = []
    for op in corridors:
        if not is_operator_allowed(op, px, py, nl):
            continue
        d = dist_to_operator(px, py, op)
        op_dists.append((op, d))

    op_dists.sort(key=lambda x: x[1])

    # Dynamic distance threshold
    matched = []
    for op, d in op_dists:
        if d <= 280:
            matched.append(op)
        elif d <= 380 and len(matched) == 0:
            matched.append(op)
        elif d <= 320 and len(matched) < 4:
            matched.append(op)

    # If still empty, match the single closest allowed operator if under 650px
    if len(matched) == 0 and len(op_dists) > 0:
        if op_dists[0][1] < 650:
            matched.append(op_dists[0][0])

    updated_index.append({
        'name': name,
        'nepali': p.get('nepali', ''),
        'buses': matched
    })

# Save to src/data/placeBusIndex.js
js_bus_index = f"""/**
 * Complete Kathmandu Valley Place-to-Bus Route Mapping
 * Spatially maps all {len(updated_index)} verified places extracted from clean-map.jpg to their passing bus operators.
 * Verified with ground truth transit corridors from legends.jpg and clean-map.jpg.
 */

export const ALL_PLACES_BUS_INDEX = {json.dumps(updated_index, indent=2, ensure_ascii=False)};

// Quick lookup helper: Returns list of bus operator codes that serve any place matching query
export function findBusesForPlaceQuery(query) {{
  if (!query || !query.trim()) return {{ codes: [], matchedPlaces: [] }};
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
    f.write(js_bus_index)

print("Saved calibrated src/data/placeBusIndex.js successfully!")
