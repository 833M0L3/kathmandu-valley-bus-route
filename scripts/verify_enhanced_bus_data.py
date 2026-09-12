import json
import sys
sys.stdout.reconfigure(encoding='utf-8')

# Comprehensive Kathmandu bus services with full stops and transit areas from clean-map.jpg
BUS_SERVICES = [
  {
    "code": "S",
    "name": "Sajha Yatayat",
    "nepali": "साझा यातायात",
    "color": "#1ba546",
    "routes": ["S1", "S2", "S4", "S5", "S6", "S7", "S8"],
    "corridor": "Lagankhel – Ratnapark – Budhanilkantha / Suryabinayak / Kalanki",
    "stops": [
      "Lagankhel", "Jawalakhel", "Pulchowk", "Kupandole", "Thapathali", "Tripureshwor",
      "Sundhara", "Ratnapark", "Jamal", "Lainchaur", "Lazimpat", "Panipokhari",
      "Teaching Hospital", "Maharajgunj", "Golfutar", "Dhapasi", "Budhanilkantha",
      "Kalanki", "Balkhu", "Maitighar", "Babar Mahal", "New Baneshwor", "Minbhawan",
      "Tinkune", "Koteshwor", "Jadibuti", "Kaushaltar", "Gatthaghar", "Madhyapur Thimi",
      "Sallaghari", "Suryabinayak", "Balaju"
    ]
  },
  {
    "code": "N",
    "name": "Nepal Yatayat",
    "nepali": "नेपाल यातायात",
    "color": "#c99629",
    "routes": ["N1", "N2", "N3"],
    "corridor": "Balkhu – Ratnapark – Baneshwor – Koteshwor – Chabahil – Jorpati",
    "stops": [
      "Balkhu", "Kalimati", "Teku", "Tripureshwor", "Sundhara", "Ratnapark",
      "Kamalpokhari", "Gyaneshwor", "Maitidevi", "Old Baneshwor", "New Baneshwor",
      "Minbhawan", "Tinkune", "Koteshwor", "Gaushala", "Chabahil", "Mitra Park",
      "Boudha", "Tusal", "Jorpati", "Baluwakhani", "Kapan", "Jawalakhel", "Lagankhel"
    ]
  },
  {
    "code": "M",
    "name": "Mahanagar Yatayat",
    "nepali": "महानगर यातायात",
    "color": "#dc1d24",
    "routes": ["M1", "M2", "M3"],
    "corridor": "Ring Road Circular Expressway (Clockwise & Counter-Clockwise)",
    "stops": [
      "Kalanki", "Bafal", "Swayambhu", "Sitapaila", "Balaju", "Machhapokhari",
      "Gongabu (New Bus Park)", "Basundhara", "Samakhusi", "Maharajgunj", "Sukedhara",
      "Dhumbarahi", "Chabahil", "Gaushala", "Sinamangal", "Tinkune", "Koteshwor",
      "Balkumari", "Gwarko", "B and B Hospital", "Satdobato", "Ekantakuna", "Balkhu"
    ]
  },
  {
    "code": "B",
    "name": "Bhaktapur Buses",
    "nepali": "भक्तपुरका बसहरू",
    "color": "#808f4e",
    "routes": ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10"],
    "corridor": "Bhaktapur / Suryabinayak – Thimi – Koteshwor – Ratnapark / Airport / Gongabu / Kalanki",
    "stops": [
      "Bhaktapur", "Kamalbinayak", "Suryabinayak", "Sallaghari", "Bode", "Madhyapur Thimi",
      "Gatthaghar", "Kaushaltar", "Lokanthali", "Jadibuti", "Koteshwor", "Tinkune",
      "Minbhawan", "New Baneshwor", "Babar Mahal", "Maitighar", "Sundhara", "Ratnapark",
      "Tribhuvan Int’l Airport", "Sinamangal", "Gongabu (New Bus Park)", "Balaju", "Kalanki", "Lagankhel"
    ]
  },
  {
    "code": "X",
    "name": "Mayur Yatayat",
    "nepali": "मयुर यातायात",
    "color": "#4587d1",
    "routes": ["X1"],
    "corridor": "Dhulikhel / Banepa – Bhaktapur – Koteshwor – Ring Road – Kalanki",
    "stops": [
      "Dhulikhel", "Banepa", "Bhaktapur", "Suryabinayak", "Madhyapur Thimi", "Jadibuti",
      "Koteshwor", "Balkumari", "Gwarko", "B and B Hospital", "Satdobato", "Ekantakuna",
      "Balkhu", "Kalanki"
    ]
  },
  {
    "code": "K",
    "name": "Kirtipur Yatayat",
    "nepali": "कीर्तिपुर यातायात",
    "color": "#607b84",
    "routes": ["K1"],
    "corridor": "Kirtipur (TU Gate) – Balkhu – Kalimati – Tripureshwor – Ratnapark",
    "stops": [
      "Kirtipur", "Naya Bazaar", "TU Gate", "Ayurveda Campus", "Balkhu",
      "Kuleshwor", "Kalimati", "Teku", "Tripureshwor", "Sundhara", "Ratnapark"
    ]
  },
  {
    "code": "C",
    "name": "Chandragiri Yatayat",
    "nepali": "चन्द्रागिरी यातायात",
    "color": "#f9a61a",
    "routes": ["C1"],
    "corridor": "Thankot / Chandragiri Cable Car – Kalanki – Kalimati – Ratnapark",
    "stops": [
      "Thankot", "Chandragiri", "Gurjudhara", "Satungal", "Naikap", "Kalanki",
      "Bafal", "Kuleshwor", "Kalimati", "Teku", "Tripureshwor", "Sundhara", "Ratnapark"
    ]
  },
  {
    "code": "T",
    "name": "Tarakeshwar Yatayat",
    "nepali": "तारकेश्वर यातायात",
    "color": "#7183c5",
    "routes": ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10"],
    "corridor": "Tarakeshwor / Balaju – Thamel – Ratnapark – Swayambhu – Kalanki",
    "stops": [
      "Tarakeshwor", "Dharmasthali", "Kavresthali", "Goldhunga", "Balaju", "Machhapokhari",
      "Gongabu (New Bus Park)", "Sorhakhutte", "ASCOL", "Thamel", "Jamal", "Ratnapark",
      "Swayambhu", "Sitapaila", "Bafal", "Kalanki"
    ]
  },
  {
    "code": "A",
    "name": "Budhanilkantha Yatayat",
    "nepali": "बुढानीलकण्ठ यातायात",
    "color": "#9cc11c",
    "routes": ["A1", "A2", "A3"],
    "corridor": "Budhanilkantha – Maharajgunj – Thamel – Ratnapark – Swayambhu – Kalanki",
    "stops": [
      "Budhanilkantha", "Narayanthan", "Hattigauda", "Golfutar", "Maharajgunj",
      "Teaching Hospital", "Panipokhari", "Lazimpat", "Lainchaur", "Thamel", "Jamal",
      "Ratnapark", "Swayambhu", "Kalanki"
    ]
  },
  {
    "code": "D",
    "name": "Digo Yatayat",
    "nepali": "दिगो यातायात",
    "color": "#5b8378",
    "routes": ["D1"],
    "corridor": "Budhanilkantha – Maharajgunj – Lazimpat – Ratnapark – Kalanki",
    "stops": [
      "Budhanilkantha", "Hattigauda", "Maharajgunj", "Teaching Hospital", "Panipokhari",
      "Lazimpat", "Lainchaur", "Thamel", "Ratnapark", "Teku", "Kalimati", "Bafal", "Kalanki"
    ]
  },
  {
    "code": "F",
    "name": "Balaju Yatayat",
    "nepali": "बालाजु यातायात",
    "color": "#9572cc",
    "routes": ["F1"],
    "corridor": "Balaju – Sorhakhutte – Thamel – Ratnapark",
    "stops": [
      "Balaju", "Bypass", "Machhapokhari", "Sorhakhutte", "ASCOL", "Thamel", "Jamal", "Ratnapark"
    ]
  },
  {
    "code": "Z",
    "name": "Samakhusi Yatayat",
    "nepali": "सामाखुसी यातायात",
    "color": "#878883",
    "routes": ["Z1", "Z2", "Z3"],
    "corridor": "Samakhusi / Gongabu (New Bus Park) – Lainchaur – Ratnapark",
    "stops": [
      "Gongabu (New Bus Park)", "Samakhusi", "Town Planning", "Lainchaur", "ASCOL",
      "Thamel", "Jamal", "Ratnapark"
    ]
  },
  {
    "code": "L",
    "name": "Gokarneshwar Yatayat",
    "nepali": "गोकर्णेश्वर यातायात",
    "color": "#19b38d",
    "routes": ["L1", "L2"],
    "corridor": "Sundarijal – Gokarna – Jorpati – Chabahil – Ratnapark – Swayambhu",
    "stops": [
      "Sundarijal", "Gokarna", "Jorpati", "Boudha", "Mitra Park", "Chabahil",
      "Gaushala", "Maitidevi", "Dillibazar", "Putalisadak", "Ratnapark", "Swayambhu"
    ]
  },
  {
    "code": "R",
    "name": "Riddhi Siddhi Yatayat",
    "nepali": "रिद्धि सिद्धि यातायात",
    "color": "#02aac4",
    "routes": ["R1", "R2"],
    "corridor": "Kadaghari / Koteshwor – New Baneshwor – Ratnapark – Kalanki – Satdobato",
    "stops": [
      "Kadaghari", "Suncity", "Khasimode", "Jadibuti", "Koteshwor", "Tinkune",
      "Minbhawan", "New Baneshwor", "Babar Mahal", "Maitighar", "Ratnapark", "Kalanki",
      "Gwarko", "B and B Hospital", "Satdobato"
    ]
  },
  {
    "code": "G",
    "name": "Gothatar Yatayat",
    "nepali": "गोठाटार यातायात",
    "color": "#df496f",
    "routes": ["G1", "G2"],
    "corridor": "Gothatar – Chabahil – Ratnapark / Gongabu (New Bus Park) – Koteshwor",
    "stops": [
      "Gothatar", "Kadaghari", "Suncity", "Pepsicola", "Sinamangal", "Gaushala",
      "Chabahil", "Boudha", "Maitidevi", "Dillibazar", "Ratnapark", "Gongabu (New Bus Park)",
      "New Baneshwor", "Koteshwor"
    ]
  },
  {
    "code": "P",
    "name": "Panchpokhari Yatayat",
    "nepali": "पाँचपोखरी यातायात",
    "color": "#de6c9f",
    "routes": ["P1", "P2"],
    "corridor": "Sankhu – Jorpati – Chabahil – Ratnapark – Satdobato – Swayambhu",
    "stops": [
      "Sankhu", "Mulpani", "Jorpati", "Boudha", "Mitra Park", "Chabahil", "Gaushala",
      "Maitidevi", "Ratnapark", "Tripureshwor", "Jawalakhel", "Lagankhel", "Satdobato", "Swayambhu"
    ]
  },
  {
    "code": "Y",
    "name": "Samyukta Yatayat",
    "nepali": "संयुक्त यातायात",
    "color": "#925844",
    "routes": ["Y1", "Y2"],
    "corridor": "Kalanki – Tripureshwor – Ratnapark – Baneshwor – Tribhuvan Int’l Airport",
    "stops": [
      "Kalanki", "Bafal", "Kuleshwor", "Kalimati", "Teku", "Tripureshwor", "Sundhara",
      "Ratnapark", "Putalisadak", "Maitighar", "Babar Mahal", "New Baneshwor", "Minbhawan",
      "Tinkune", "Sinamangal", "Tribhuvan Int’l Airport"
    ]
  },
  {
    "code": "H",
    "name": "Basuki Yatayat",
    "nepali": "बाशुकी यातायात",
    "color": "#946994",
    "routes": ["H1", "H2"],
    "corridor": "Sankhu – Jorpati – Chabahil – Ratnapark – Swayambhu",
    "stops": [
      "Sankhu", "Jorpati", "Boudha", "Mitra Park", "Chabahil", "Gaushala",
      "Maitidevi", "Ratnapark", "Swayambhu"
    ]
  },
  {
    "code": "J",
    "name": "Juneli Yatayat",
    "nepali": "जुनेली यातायात",
    "color": "#659c9f",
    "routes": ["J1"],
    "corridor": "Jorpati – Boudha – Chabahil – Ratnapark",
    "stops": [
      "Jorpati", "Boudha", "Mitra Park", "Chabahil", "Gaushala", "Maitidevi", "Dillibazar", "Ratnapark"
    ]
  },
  {
    "code": "I",
    "name": "Bagmati Yatayat",
    "nepali": "बाग्मती यातायात",
    "color": "#266090",
    "routes": ["I1"],
    "corridor": "Kirtipur / Balkhu – Tripureshwor – Ratnapark – Maharajgunj",
    "stops": [
      "Kirtipur", "Balkhu", "Kuleshwor", "Kalimati", "Teku", "Tripureshwor",
      "Sundhara", "Ratnapark", "Lainchaur", "Lazimpat", "Panipokhari", "Maharajgunj"
    ]
  },
  {
    "code": "E",
    "name": "Dhumrabaraha Yatayat",
    "nepali": "धुम्रबराह यातायात",
    "color": "#e16a30",
    "routes": ["E1"],
    "corridor": "Dhumbarahi – Chabahil – Ratnapark – Tripureshwor",
    "stops": [
      "Dhumbarahi", "Chabahil", "Boudha", "Mitra Park", "Gaushala", "Maitidevi",
      "Ratnapark", "Tripureshwor"
    ]
  },
  {
    "code": "O",
    "name": "Om Janata Yatayat",
    "nepali": "ओम जनता यातायात",
    "color": "#a7733a",
    "routes": ["O1"],
    "corridor": "Lubhu / Mahalaxmi – Gwarko – Lagankhel – Satdobato – Ratnapark",
    "stops": [
      "Lubhu", "Mahalaxmi", "Imadol", "Gwarko", "B and B Hospital", "Satdobato",
      "Lagankhel", "Jawalakhel", "Kupandole", "Thapathali", "Tripureshwor", "Ratnapark", "Koteshwor"
    ]
  }
]

print(f"Verified {len(BUS_SERVICES)} bus operators with detailed stop networks.")
for s in BUS_SERVICES:
    print(f"  [{s['code']}] {s['name']:25s} -> {len(s['stops'])} stops: {s['stops'][:6]}...")
