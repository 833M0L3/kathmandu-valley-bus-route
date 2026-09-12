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
        # North-South trunk: Budhanilkantha -> Sahajmarga -> Maharajgunj -> Lazimpat -> Ratnapark -> Tripureshwor -> Pulchowk -> Lagankhel
        [(6602, 1018), (6589, 1410), (6626, 2212), (6100, 2600), (5100, 3050), (4800, 3400), (4400, 3600), (4410, 4145), (4537, 4565), (4600, 4800), (4516, 5182), (4803, 5109)],
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

    # T: Tarakeshwor Yatayat (Dharmasthali / Goldhunga / Lolang / Bohoratar / Phutung -> Balaju -> Thamel -> Ratnapark; Western loop to Kalanki)
    'T': [
        [(1210, 1442), (1267, 1542), (1405, 1695), (1576, 1224), (1618, 1290), (1703, 1356), (1762, 1424), (1803, 1508), (1880, 1934), (1814, 2100), (1852, 2166), (2300, 2017), (2828, 1489), (3417, 2885), (3617, 3058)],
        [(2828, 1489), (2609, 1263), (3417, 2885), (3617, 3058), (4142, 3760), (4410, 4145)],
        [(3617, 3058), (3096, 3196), (3227, 3097), (3056, 3592), (3208, 4542)],
        [(3617, 3058), (3212, 2399), (2803, 2423), (2742, 2183), (2569, 2019), (3161, 1992), (3538, 1953)],
        [(3617, 3058), (3400, 2700), (3200, 2600)]
    ],

    # F: Balaju Yatayat (Raniban -> Buddha Chowk -> Radha Krishna Temple -> Balaju -> Machhapokhari -> Sorhakhutte -> Thamel -> Ratnapark; Western Ring Road)
    'F': [
        # Raniban branch
        [(1738, 2357), (1768, 2448), (1857, 2507), (1922, 2573), (1976, 2639), (2033, 2706), (2079, 2723), (2109, 2773), (2403, 2784), (2802, 2784), (3096, 3196), (3617, 3058)],
        # Balaju into Ratnapark
        [(3617, 3058), (3417, 2885), (4142, 3760), (4410, 4145)],
        # Western Ring Road
        [(3617, 3058), (3096, 3196), (3227, 3097), (3056, 3592)]
    ],

    # Z: Samakhusi Yatayat (Gongabu New Bus Park -> Town Planning -> Samakhusi -> Lainchaur -> Thamel -> Ratnapark; Tokha branch)
    'Z': [
        [(3980, 2700), (4370, 2682), (4400, 3600), (4142, 3760), (4410, 4145)],
        [(4370, 2682), (4658, 2565), (4960, 2254), (5212, 1717), (5212, 1505)],
        [(4204, 1868), (4209, 1978), (4370, 2682)]
    ],

    # A: Budhanilkantha Yatayat (Budhanilkantha -> Golfutar -> Maharajgunj -> Lazimpat -> Thamel -> Ratnapark -> Swayambhu -> Kalanki)
    'A': [
        [(6602, 1018), (6589, 1410), (6626, 2212), (6100, 2600), (5100, 3050), (4800, 3400), (4400, 3600), (4142, 3760), (4410, 4145)],
        [(4410, 4145), (3056, 3592), (3208, 4542)]
    ],

    # D: Digo Yatayat (Gongabu / New Bus Park -> Samakhusi -> Lainchaur -> Jamal -> Ratnapark -> Maitidevi -> Sinamangal / Airport Gate)
    'D': [
        [(4009, 2956), (4135, 3018), (4135, 3524), (4268, 3603), (4310, 3661), (4310, 3924), (4535, 4005), (4468, 4124), (4733, 4124), (5166, 4124), (5953, 4124)]
    ],

    # L: Gokarneshwar Yatayat (Sundarijal -> Gokarna -> Jorpati -> Boudha -> Chabahil -> Maitidevi -> Ratnapark; Danchhi branch)
    'L': [
        [(7125, 1861), (6800, 2600), (6838, 3211), (6400, 3300), (5780, 3492), (5850, 3800), (5178, 4022), (4800, 4100), (4410, 4145)],
        [(6838, 3211), (7400, 3200), (7800, 3200), (8656, 2961), (8802, 2952), (9051, 2952), (9155, 3026)]
    ],

    # P: Panchpokhari Yatayat (Sankhu -> Mulpani -> Jorpati -> Boudha -> Chabahil -> Maitidevi -> Ratnapark -> Lagankhel -> Satdobato; Danchhi branch)
    'P': [
        [(8200, 2300), (7509, 3522), (6838, 3211), (5780, 3492), (5178, 4022), (4410, 4145), (4537, 4565), (4803, 5109), (5068, 5632)],
        [(6838, 3211), (7400, 3200), (7800, 3200), (8656, 2961), (8802, 2952), (9051, 2952), (9155, 3026)]
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

    # Y: Samyukta Yatayat (Pradesh Park / Hattigauda -> Golfutar -> Chabahil -> Maitidevi -> Ratnapark -> Kalimati -> Kalanki -> Swayambhu -> Balaju -> Gongabu Loop)
    'Y': [
        [(7000, 916), (6633, 1501), (6403, 1879), (6029, 3208), (6029, 3499), (5750, 3683), (5294, 3815), (5109, 4091), (4733, 4124), (4468, 4124), (4310, 4323), (4474, 4565), (3839, 4565), (3193, 4565)],
        [(3193, 4565), (3067, 4536), (3067, 3571), (3169, 3216), (3667, 3112), (4023, 2779), (5337, 2537), (5558, 2652), (5946, 2283), (6403, 1879)]
    ],

    # N: Nepal Yatayat (Balkhu -> Kalimati -> Ratnapark -> Maitidevi -> Baneshwor -> Koteshwor -> Gaushala -> Chabahil -> Boudha -> Jorpati -> Kapan; Tikathali branch)
    'N': [
        [(3964, 5207), (3932, 4518), (4537, 4565), (4410, 4145), (5000, 3950), (5178, 4022), (5202, 4485), (5489, 4895), (5850, 3800), (5780, 3492), (6400, 3300), (6838, 3211), (7124, 1860)],
        [(3964, 5207), (4516, 5182), (4803, 5109)],
        [(5489, 4895), (5900, 5200), (6200, 5500)]
    ],

    # E: Dhumrabaraha Yatayat (Kapan / Aakashedhara -> Dhumbarahi -> Bishalnagar -> Naxal -> Ratnapark)
    'E': [
        [(6759, 2159), (5945, 3041), (5546, 3349), (5240, 3151), (5072, 3549), (4939, 3717), (4535, 3991), (4310, 4323)]
    ],

    # O: Om Janata Yatayat (Matatirtha -> Kalanki -> Tripureshwor -> Ratnapark -> Jamal -> Lainchaur -> Maharajgunj -> Golfutar)
    'O': [
        [(1783, 5386), (2119, 4825), (2731, 4825), (3119, 4691), (4474, 4565), (4310, 4323), (4535, 3991), (4906, 3749), (4939, 3549), (5558, 2652), (6807, 1142)]
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

    # Rule 0B2: Raniban corridor -> ONLY Balaju Yatayat (F)
    if any(k in name_lower for k in ['raniban', 'radha krishna temple', 'bijayanagar', 'svetah', 'nagarjun futsal', 'army rehabilitation']):
        return op == 'F'
    if 1700 <= px <= 2200 and 2300 <= py <= 2900:
        return op == 'F'

    # Rule 0C: Northwest outer suburbs (Goldhunga, Lolang, Phutung, Bohoratar) -> ONLY Tarakeshwor (T)
    if any(k in name_lower for k in ['goldhunga', 'lolang', 'phutung', 'bohoratar', 'dharmasthali', 'kavresthali', 'sundar basti', 'oxford driving', 'jana jagriti', 'sanskriti shikshya', 'dhinchen samten', 'fulbari gate']):
        return op == 'T'
    if px < 2500 and py < 2250:
        return op == 'T'

    # Rule 0D: Matatirtha -> ONLY Om Janata (O)
    if 'matatirtha' in name_lower:
        return op == 'O'

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
    if any(k in name_lower for k in ['danchhi', 'indrayani exchange', 'ntc indrayani', 'brahmakhel', 'bagdhara']):
        if 'gokarneshwor' in name_lower or 'bagdhara' in name_lower:
            return op == 'L'
        if 'panchpokhari' in name_lower:
            return op == 'P'
        return op in ('L', 'P')
    if px > 8500 and 2800 <= py <= 3300:
        return op in ('L', 'P')

    # Rule 0I: Budhanilkantha / Chapali / Sahajmarga / Deuba Chowk -> ONLY Budhanilkantha (A) and Sajha (S)
    if any(k in name_lower for k in ['budhanilkantha', 'narayanthan', 'sahajmarga', 'deuba chowk', 'chapali', 'tridevi mandir']):
        return op in ('A', 'S')
    if 6200 <= px <= 6700 and 950 <= py <= 1400:
        return op in ('A', 'S')
    if 6700 < px <= 7100 and 900 <= py <= 1600:
        return op in ('Y', 'O')

    # Rule 0J: Tokha / Bhatkekopul / Taleju Bhawani -> Samakhusi Yatayat (Z)
    if any(k in name_lower for k in ['bhatkekopul', 'taleju bhawani', 'ganesh english', 'indrayani bridge']):
        return op == 'Z'
    if 4100 <= px <= 5300 and 1400 <= py <= 2250:
        return op == 'Z'

    # Rule 0K: Specific landmark assignments
    if 'halesi mahadev' in name_lower:
        return op == 'T'
    if 'halesi driving center' in name_lower:
        return op == 'B'

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

    # Rule 8: Balaju (F) & Samakhusi (Z)
    if op == 'F':
        if px > 4600 or px < 1700 or py > 4400 or py < 2200:
            return False
    if op == 'Z':
        if px > 5300 or px < 3800 or py > 4400 or py < 1500:
            return False

    # Rule 9: Gokarneshwar (L), Panchpokhari (P), Basuki (H), Juneli (J) strictly North-East into Ratnapark
    if op in ('L', 'P', 'H', 'J'):
        if px < 4200 and op != 'H':  # Only H has a branch to Swayambhu
            return False
        if px > 7200 and py > 4000:  # Never in Bhaktapur
            return False

    # Rule 10: Om Janata (O) runs Matatirtha -> Kalanki -> Ratnapark -> Maharajgunj -> Golfutar
    if op == 'O':
        if px > 7000 or (py > 5400 and px > 2500):
            return False
        if px > 5200 and py > 3500:
            return False

    # Rule 10B: Digo Yatayat (D) strictly Gongabu - Lainchaur - Ratnapark - Maitidevi - Sinamangal
    if op == 'D':
        if py < 2800 or py > 4500:
            return False
        if px < 3900 or px > 6200:
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

    # Rule 15: Lubhu is Sajha (S) only
    if 'lubhu' in name_lower:
        return op == 'S'

    # Rule 16: Godawari / Toukhel is Sajha (S) only
    if 'godawari' in name_lower or 'toukhel' in name_lower or 'badegaun' in name_lower:
        return op == 'S'

    # Rule 17: Harisiddhi is Sajha (S) and Riddhi Siddhi (R)
    if 'harisiddhi' in name_lower:
        return op in ('S', 'R')

    # Rule 18: Budhanilkantha is Sajha (S) and Budhanilkantha (A) only
    if 'budhanilkantha' in name_lower:
        return op in ('S', 'A')

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

    # If still empty, match the single closest allowed operator if under 1200px
    if len(matched) == 0 and len(op_dists) > 0:
        if op_dists[0][1] < 1200:
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

const GENERIC_STOP_WORDS = new Set(['temple', 'chowk', 'bus park', 'bus stop', 'gate', 'hospital', 'school', 'center', 'centre', 'store', 'station', 'microbus station', 'park', 'road', 'marga', 'tole']);

// Quick lookup helper: Returns list of bus operator codes that serve any place matching query
export function findBusesForPlaceQuery(query) {{
  if (!query || !query.trim()) return {{ codes: [], matchedPlaces: [] }};
  const normalize = (s) => s.toLowerCase().replace(/budanilk/g, 'budhanilk');
  const q = normalize(query.trim());
  const queryWords = q.split(/\\s+/).filter(w => w.length > 2);

  const matches = [];

  for (const item of ALL_PLACES_BUS_INDEX) {{
    const rawName = item.name.toLowerCase();
    const name = normalize(rawName);
    const nepali = item.nepali || '';

    // 1. Exact match
    if (name === q || nepali === q) {{
      matches.push({{ item, score: 100 }});
      continue;
    }}

    // 2. Name contains full query (e.g. 'radha krishna' in 'radha krishna temple')
    if (name.includes(q) || (nepali && nepali.includes(q))) {{
      matches.push({{ item, score: 80 }});
      continue;
    }}

    // 3. Query contains full specific place name (e.g. 'radha krishna temple raniban' contains 'radha krishna temple')
    // Exclude generic words like 'temple' or 'chowk' from matching full query
    if (!GENERIC_STOP_WORDS.has(name) && name.length >= 5 && q.includes(name)) {{
      matches.push({{ item, score: 70 }});
      continue;
    }}

    // 4. Multi-word intersection: for multi-word queries, all non-generic words must be present in name
    if (queryWords.length >= 2) {{
      const nonGenericWords = queryWords.filter(w => !GENERIC_STOP_WORDS.has(w));
      const matchedCount = nonGenericWords.filter(w => name.includes(w)).length;
      if (nonGenericWords.length > 0 && matchedCount === nonGenericWords.length) {{
        matches.push({{ item, score: 60 }});
      }}
    }}
  }}

  // Filter to highest score tier to prevent pollution from lower-scoring broad matches
  matches.sort((a, b) => b.score - a.score);
  const topScore = matches.length > 0 ? matches[0].score : 0;
  const filtered = matches.filter(m => m.score >= topScore - 10);

  const matchedCodes = new Set();
  const matchedNames = [];
  for (const m of filtered) {{
    matchedNames.push(m.item.name);
    m.item.buses.forEach(b => matchedCodes.add(b));
  }}

  return {{
    codes: Array.from(matchedCodes),
    matchedPlaces: matchedNames.slice(0, 10)
  }};
}}
"""

with open('src/data/placeBusIndex.js', 'w', encoding='utf-8') as f:
    f.write(js_bus_index)

print("Saved calibrated src/data/placeBusIndex.js successfully!")
