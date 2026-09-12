import json

# Sampled exact hex colors from legends.jpg
services_data = [
    {
        "code": "S",
        "name": "Sajha Yatayat",
        "nepali": "साझा यातायात",
        "color": "#1ba546",
        "routes": ["S1", "S2", "S4", "S5", "S6", "S7", "S8"],
        "stops": ["Lagankhel", "Jawalakhel", "Tripureshwor", "Ratnapark", "Maharajgunj", "Budhanilkantha", "Kalanki", "Balkhu", "New Baneshwor", "Koteshwor", "Suryabinayak", "Balaju"],
        "corridor": "Lagankhel - Ratnapark - Budhanilkantha / Suryabinayak / Kalanki"
    },
    {
        "code": "N",
        "name": "Nepal Yatayat",
        "nepali": "नेपाल यातायात",
        "color": "#c99629",
        "routes": ["N1", "N2", "N3"],
        "stops": ["Balkhu", "Kalimati", "Tripureshwor", "Ratnapark", "New Baneshwor", "Koteshwor", "Chabahil", "Jorpati", "Boudha", "Jawalakhel", "Lagankhel"],
        "corridor": "Balkhu - Ratnapark - Baneshwor - Koteshwor - Chabahil - Jorpati"
    },
    {
        "code": "M",
        "name": "Mahanagar Yatayat",
        "nepali": "महानगर यातायात",
        "color": "#dc1d24",
        "routes": ["M1", "M2", "M3"],
        "stops": ["Kalanki", "Swayambhu", "Balaju", "Gongabu (New Bus Park)", "Maharajgunj", "Chabahil", "Gaushala", "Koteshwor", "Satdobato", "Balkhu"],
        "corridor": "Ring Road Full Loop (Clockwise & Counter-Clockwise)"
    },
    {
        "code": "B",
        "name": "Bhaktapur Buses",
        "nepali": "भक्तपुरका बसहरू",
        "color": "#808f4e",
        "routes": ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10"],
        "stops": ["Bhaktapur", "Suryabinayak", "Madhyapur Thimi", "Koteshwor", "New Baneshwor", "Ratnapark", "Tribhuvan Int’l Airport", "Gongabu (New Bus Park)", "Kalanki", "Lagankhel"],
        "corridor": "Bhaktapur - Thimi - Koteshwor - Ratnapark / Airport / Gongabu / Kalanki"
    },
    {
        "code": "K",
        "name": "Kirtipur Yatayat",
        "nepali": "कीर्तिपुर यातायात",
        "color": "#607b84",
        "routes": ["K1"],
        "stops": ["Kirtipur", "Balkhu", "Kalimati", "Tripureshwor", "Ratnapark"],
        "corridor": "Kirtipur - Balkhu - Kalimati - Ratnapark"
    },
    {
        "code": "C",
        "name": "Chandragiri Yatayat",
        "nepali": "चन्द्रागिरी यातायात",
        "color": "#f9a61a",
        "routes": ["C1"],
        "stops": ["Thankot", "Kalanki", "Kalimati", "Tripureshwor", "Ratnapark"],
        "corridor": "Thankot / Chandragiri - Kalanki - Ratnapark"
    },
    {
        "code": "T",
        "name": "Tarakeshwor Yatayat",
        "nepali": "तारकेश्वर यातायात",
        "color": "#7183c5",
        "routes": ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10"],
        "stops": ["Balaju", "Gongabu (New Bus Park)", "Thamel", "Ratnapark", "Kalanki", "Swayambhu"],
        "corridor": "Tarakeshwor / Balaju - Thamel - Ratnapark - Kalanki"
    },
    {
        "code": "A",
        "name": "Budhanilkantha Yatayat",
        "nepali": "बुढानीलकण्ठ यातायात",
        "color": "#9cc11c",
        "routes": ["A1", "A2", "A3"],
        "stops": ["Budhanilkantha", "Maharajgunj", "Thamel", "Ratnapark", "Swayambhu", "Kalanki"],
        "corridor": "Budhanilkantha - Maharajgunj - Thamel - Ratnapark"
    },
    {
        "code": "D",
        "name": "Digo Yatayat",
        "nepali": "दिगो यातायात",
        "color": "#5b8378",
        "routes": ["D1"],
        "stops": ["Budhanilkantha", "Maharajgunj", "Thamel", "Ratnapark", "Kalanki"],
        "corridor": "Budhanilkantha - Lazimpat - Ratnapark - Kalanki"
    },
    {
        "code": "F",
        "name": "Balaju Yatayat",
        "nepali": "बालाजु यातायात",
        "color": "#9572cc",
        "routes": ["F1"],
        "stops": ["Balaju", "Thamel", "Ratnapark"],
        "corridor": "Balaju - Sorhakhutte - Thamel - Ratnapark"
    },
    {
        "code": "Z",
        "name": "Samakhusi Yatayat",
        "nepali": "सामाखुसी यातायात",
        "color": "#878883",
        "routes": ["Z1", "Z2", "Z3"],
        "stops": ["Gongabu (New Bus Park)", "Thamel", "Ratnapark"],
        "corridor": "Samakhusi / Gongabu - Lainchaur - Ratnapark"
    },
    {
        "code": "L",
        "name": "Gokarneshwor Yatayat",
        "nepali": "गोकर्णेश्वर यातायात",
        "color": "#19b38d",
        "routes": ["L1", "L2"],
        "stops": ["Sundarijal", "Jorpati", "Chabahil / Boudha", "Ratnapark", "Swayambhu"],
        "corridor": "Sundarijal - Gokarna - Chabahil - Ratnapark - Swayambhu"
    },
    {
        "code": "R",
        "name": "Riddhi Siddhi Yatayat",
        "nepali": "रिद्धि सिद्धि यातायात",
        "color": "#02aac4",
        "routes": ["R1", "R2"],
        "stops": ["Koteshwor", "New Baneshwor", "Ratnapark", "Kalanki", "Satdobato"],
        "corridor": "Kadaghari / Koteshwor - Baneshwor - Ratnapark - Kalanki"
    },
    {
        "code": "G",
        "name": "Gothatar Yatayat",
        "nepali": "गोठाटार यातायात",
        "color": "#df496f",
        "routes": ["G1", "G2"],
        "stops": ["Chabahil / Boudha", "Ratnapark", "Gongabu (New Bus Park)", "New Baneshwor", "Koteshwor"],
        "corridor": "Gothatar - Chabahil - Ratnapark / Gongabu"
    },
    {
        "code": "P",
        "name": "Panchpokhari Yatayat",
        "nepali": "पाँचपोखरी यातायात",
        "color": "#de6c9f",
        "routes": ["P1", "P2"],
        "stops": ["Chabahil / Boudha", "Jorpati", "Ratnapark", "Satdobato", "Swayambhu"],
        "corridor": "Sankhu - Chabahil - Ratnapark - Satdobato"
    },
    {
        "code": "Y",
        "name": "Samyukta Yatayat",
        "nepali": "संयुक्त यातायात",
        "color": "#925844",
        "routes": ["Y1", "Y2"],
        "stops": ["Kalanki", "Tripureshwor", "Ratnapark", "New Baneshwor", "Tribhuvan Int’l Airport"],
        "corridor": "Kalanki - Ratnapark - Baneshwor - Airport / Sinamangal"
    },
    {
        "code": "X",
        "name": "Mayur Yatayat",
        "nepali": "मयुर यातायात",
        "color": "#4587d1",
        "routes": ["X1"],
        "stops": ["Bhaktapur", "Madhyapur Thimi", "Koteshwor", "Satdobato", "Balkhu", "Kalanki"],
        "corridor": "Dhulikhel / Banepa - Bhaktapur - Koteshwor - Ring Road - Kalanki"
    },
    {
        "code": "H",
        "name": "Basuki Yatayat",
        "nepali": "बाशुकी यातायात",
        "color": "#946994",
        "routes": ["H1", "H2"],
        "stops": ["Jorpati", "Chabahil / Boudha", "Ratnapark", "Swayambhu"],
        "corridor": "Sankhu / Jorpati - Chabahil - Ratnapark - Swayambhu"
    },
    {
        "code": "J",
        "name": "Juneli Yatayat",
        "nepali": "जुनेली यातायात",
        "color": "#659c9f",
        "routes": ["J1"],
        "stops": ["Jorpati", "Chabahil / Boudha", "Ratnapark"],
        "corridor": "Jorpati - Chabahil - Ratnapark"
    },
    {
        "code": "I",
        "name": "Bagmati Yatayat",
        "nepali": "बाग्मती यातायात",
        "color": "#266090",
        "routes": ["I1"],
        "stops": ["Balkhu", "Kirtipur", "Tripureshwor", "Ratnapark", "Maharajgunj"],
        "corridor": "Kirtipur / Balkhu - Ratnapark - Maharajgunj"
    },
    {
        "code": "E",
        "name": "Dhumrabaraha Yatayat",
        "nepali": "धुम्रबराह यातायात",
        "color": "#e16a30",
        "routes": ["E1"],
        "stops": ["Chabahil / Boudha", "Ratnapark", "Tripureshwor"],
        "corridor": "Dhumbarahi - Chabahil - Ratnapark - Tripureshwor"
    },
    {
        "code": "O",
        "name": "Om Janata Yatayat",
        "nepali": "ओम जनता यातायात",
        "color": "#a7733a",
        "routes": ["O1"],
        "stops": ["Lagankhel", "Satdobato", "Ratnapark", "Koteshwor"],
        "corridor": "Lubhu / Mahalaxmi - Gwarko - Lagankhel - Ratnapark"
    }
]

# Build inverted stop index
stops_index = {}
for s in services_data:
    for st in s["stops"]:
        stops_index.setdefault(st, []).append({
            "code": s["code"],
            "name": s["name"],
            "color": s["color"],
            "routes": s["routes"]
        })

print(f"Total services: {len(services_data)}")
print(f"Total indexed stops: {len(stops_index)}")
for st, buses in sorted(stops_index.items()):
    b_names = [b['code'] for b in buses]
    print(f"  {st:28s}: {', '.join(b_names)} ({len(buses)} operators)")
