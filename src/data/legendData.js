/**
 * Kathmandu Valley Transit Legend & Bus Services Directory
 * Colors and route lines calibrated via OCR & color swatch sampling from legends.jpg and clean-map.jpg
 * Comprehensive stop networks encompass all transit stops and places across Kathmandu Valley.
 */

export const BUS_SERVICES = [
  {
    code: "S",
    name: "Sajha Yatayat",
    nepali: "साझा यातायात",
    color: "#1ba546",
    routes: ["S1", "S2", "S4", "S5", "S6", "S7", "S8"],
    corridor: "Lagankhel – Ratnapark – Budhanilkantha / Suryabinayak / Lele / Godawari",
    stops: [
      "Lagankhel", "Jawalakhel", "Pulchowk", "Kupandole", "Thapathali", "Tripureshwor",
      "Sundhara", "Ratnapark", "Jamal", "Lainchaur", "Lazimpat", "Panipokhari",
      "Teaching Hospital", "Maharajgunj", "Golfutar", "Dhapasi", "Budhanilkantha",
      "Kalanki", "Balkhu", "Maitighar", "Babar Mahal", "New Baneshwor", "Minbhawan",
      "Tinkune", "Koteshwor", "Jadibuti", "Kaushaltar", "Gatthaghar", "Madhyapur Thimi",
      "Sallaghari", "Suryabinayak", "Harisiddhi", "Godawari", "Satdobato", "Chapagaun",
      "Thecho", "Sunakothi", "Bageshwori Temple", "Champeshwori Temple", "Tikabhairab", "Lele", "Bungamati", "Balaju"
    ]
  },
  {
    code: "N",
    name: "Nepal Yatayat",
    nepali: "नेपाल यातायात",
    color: "#c99629",
    routes: ["N1", "N2", "N3"],
    corridor: "Balkhu – Ratnapark – Baneshwor – Koteshwor – Chabahil – Jorpati",
    stops: [
      "Balkhu", "Kalimati", "Teku", "Tripureshwor", "Sundhara", "Ratnapark",
      "Kamalpokhari", "Gyaneshwor", "Maitidevi", "Old Baneshwor", "New Baneshwor",
      "Minbhawan", "Tinkune", "Koteshwor", "Gaushala", "Chabahil", "Mitra Park",
      "Boudha", "Tusal", "Jorpati", "Baluwakhani", "Kapan", "Jawalakhel", "Lagankhel"
    ]
  },
  {
    code: "M",
    name: "Mahanagar Yatayat",
    nepali: "महानगर यातायात",
    color: "#dc1d24",
    routes: ["M1", "M2", "M3"],
    corridor: "Ring Road Circular Expressway (Clockwise & Counter-Clockwise)",
    stops: [
      "Kalanki", "Bafal", "Swayambhu", "Thulo Bharyang", "Sano Bharyang", "Sitapaila", "Balaju", "Machhapokhari",
      "Gongabu (New Bus Park)", "Basundhara", "Samakhusi", "Maharajgunj", "Sukedhara",
      "Dhumbarahi", "Chabahil", "Gaushala", "Sinamangal", "Tinkune", "Koteshwor",
      "Balkumari", "Gwarko", "B and B Hospital", "Satdobato", "Ekantakuna", "Balkhu"
    ]
  },
  {
    code: "B",
    name: "Bhaktapur Buses",
    nepali: "भक्तपुरका बसहरू",
    color: "#808f4e",
    routes: ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10"],
    corridor: "Bhaktapur / Suryabinayak – Thimi – Koteshwor – Ratnapark / Airport / Gongabu / Kalanki",
    stops: [
      "Bhaktapur", "Kamalbinayak", "Chyamasingh", "Jagati", "Suryabinayak", "Sallaghari", "Bode", "Madhyapur Thimi",
      "Gatthaghar", "Kaushaltar", "Lokanthali", "Jadibuti", "Koteshwor", "Tinkune",
      "Minbhawan", "New Baneshwor", "Babar Mahal", "Maitighar", "Sundhara", "Ratnapark",
      "Tribhuvan Int’l Airport", "Sinamangal", "Gongabu (New Bus Park)", "Balaju", "Kalanki", "Lagankhel"
    ]
  },
  {
    code: "X",
    name: "Mayur Yatayat",
    nepali: "मयुर यातायात",
    color: "#4587d1",
    routes: ["X1"],
    corridor: "Dhulikhel / Banepa – Bhaktapur – Koteshwor – Ring Road – Kalanki",
    stops: [
      "Dhulikhel", "Banepa", "Bhaktapur", "Suryabinayak", "Madhyapur Thimi", "Jadibuti",
      "Koteshwor", "Balkumari", "Gwarko", "B and B Hospital", "Satdobato", "Ekantakuna",
      "Balkhu", "Kalanki"
    ]
  },
  {
    code: "K",
    name: "Kirtipur Yatayat",
    nepali: "कीर्तिपुर यातायात",
    color: "#607b84",
    routes: ["K1"],
    corridor: "Kirtipur (TU Gate) – Balkhu – Kalimati – Tripureshwor – Ratnapark",
    stops: [
      "Kirtipur", "Naya Bazaar", "TU Gate", "Ayurveda Campus", "Balkhu",
      "Kuleshwor", "Kalimati", "Teku", "Tripureshwor", "Sundhara", "Ratnapark"
    ]
  },
  {
    code: "C",
    name: "Chandragiri Yatayat",
    nepali: "चन्द्रागिरी यातायात",
    color: "#f9a61a",
    routes: ["C1"],
    corridor: "Thankot / Chandragiri Cable Car – Kalanki – Kalimati – Ratnapark",
    stops: [
      "Thankot", "Chandragiri", "Gurjudhara", "Satungal", "Naikap", "Kalanki",
      "Bafal", "Kuleshwor", "Kalimati", "Teku", "Tripureshwor", "Sundhara", "Ratnapark"
    ]
  },
  {
    code: "T",
    name: "Tarakeshwar Yatayat",
    nepali: "तारकेश्वर यातायात",
    color: "#7183c5",
    routes: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10"],
    corridor: "Tarakeshwor / Goldhunga / Lolang / Bohoratar / Balaju – Thamel – Ratnapark – Swayambhu – Kalanki",
    stops: [
      "Tarakeshwor", "Tarakeshwar", "Tarkeshwor", "Tarkeshwar", "Dharmasthali", "Kavresthali", "Goldhunga", "Lolang", "Bohoratar", "Balaju", "Machhapokhari",
      "Gongabu (New Bus Park)", "Sorhakhutte", "ASCOL", "Thamel", "Jamal", "Ratnapark",
      "Swayambhu", "Thulo Bharyang", "Sano Bharyang", "Sitapaila", "Bafal", "Kalanki"
    ]
  },
  {
    code: "A",
    name: "Budhanilkantha Yatayat",
    nepali: "बुढानीलकण्ठ यातायात",
    color: "#9cc11c",
    routes: ["A1", "A2", "A3"],
    corridor: "Budhanilkantha – Chabahil – Jadibuti (A1) | Balaju – Kalanki (A2) | Lazimpat – Ratnapark (A3)",
    stops: [
      "Budhanilkantha", "Narayanthan", "Chapali", "Sahajmarga", "Hattigauda", "Golfutar", "Bansbari", "Maharajgunj",
      "Teaching Hospital", "Panipokhari", "Lazimpat", "Lainchaur", "Thamel", "Jamal", "Ratnapark",
      "Gongabu (New Bus Park)", "Balaju", "Machhapokhari", "Banasthali", "Swayambhu", "Kalanki", "Khasibazar",
      "Gopikrishna", "Chabahil", "Mitrapark", "Gaushala", "Airport", "Sinamangal", "Tinkune", "Koteshwor", "Jadibuti"
    ]
  },
  {
    code: "D",
    name: "Digo Yatayat",
    nepali: "दिगो यातायात",
    color: "#5b8378",
    routes: ["D1"],
    corridor: "Gongabu (New Bus Park) – Samakhusi – Lainchaur – Ratnapark – Maitidevi – Sinamangal (Airport Gate)",
    stops: [
      "Gongabu (New Bus Park)", "Town Planning", "Samakhusi", "Kapurdhara", "Galkopakha", "Lainchaur",
      "Jamal", "Ratnapark", "Baghbazar", "Dillibazar", "Maitidevi", "Purano Baneshwor", "Sinamangal (Airport Gate)"
    ]
  },
  {
    code: "F",
    name: "Balaju Yatayat",
    nepali: "बालाजु यातायात",
    color: "#9572cc",
    routes: ["F1"],
    corridor: "Raniban – Balaju – Sorhakhutte – Thamel – Ratnapark",
    stops: [
      "Raniban Bus Park", "Raniban", "Radha Krishna Temple", "Buddha Chowk", "Army Rehabilitation Center",
      "Balaju", "Bypass", "Machhapokhari", "Sorhakhutte", "ASCOL", "Thamel", "Jamal", "Ratnapark"
    ]
  },
  {
    code: "Z",
    name: "Samakhusi Yatayat",
    nepali: "सामाखुसी यातायात",
    color: "#878883",
    routes: ["Z1", "Z2", "Z3"],
    corridor: "Tokha / Samakhusi / Gongabu (New Bus Park) – Lainchaur – Ratnapark",
    stops: [
      "Tokha", "Bhatkekopul", "Gongabu (New Bus Park)", "Samakhusi", "Town Planning", "Lainchaur", "ASCOL",
      "Thamel", "Jamal", "Ratnapark"
    ]
  },
  {
    code: "L",
    name: "Gokarneshwar Yatayat",
    nepali: "गोकर्णेश्वर यातायात",
    color: "#19b38d",
    routes: ["L1", "L2"],
    corridor: "Sundarijal / Danchhi – Gokarna – Jorpati – Chabahil – Ratnapark – Swayambhu",
    stops: [
      "Sundarijal", "Danchhi", "Gokarna", "Jorpati", "Boudha", "Mitra Park", "Chabahil",
      "Gaushala", "Maitidevi", "Dillibazar", "Putalisadak", "Ratnapark", "Swayambhu"
    ]
  },
  {
    code: "R",
    name: "Riddhi Siddhi Yatayat",
    nepali: "रिद्धि सिद्धि यातायात",
    color: "#02aac4",
    routes: ["R1", "R2"],
    corridor: "Kadaghari / Koteshwor – New Baneshwor – Ratnapark – Kalanki – Satdobato",
    stops: [
      "Kadaghari", "Suncity", "Khasimode", "Jadibuti", "Koteshwor", "Tinkune",
      "Minbhawan", "New Baneshwor", "Babar Mahal", "Maitighar", "Ratnapark", "Kalanki",
      "Gwarko", "B and B Hospital", "Satdobato"
    ]
  },
  {
    code: "G",
    name: "Gothatar Yatayat",
    nepali: "गोठाटार यातायात",
    color: "#df496f",
    routes: ["G1", "G2"],
    corridor: "Gothatar – Chabahil – Ratnapark / Gongabu (New Bus Park) – Koteshwor",
    stops: [
      "Gothatar", "Kadaghari", "Suncity", "Pepsicola", "Sinamangal", "Gaushala",
      "Chabahil", "Boudha", "Maitidevi", "Dillibazar", "Ratnapark", "Gongabu (New Bus Park)",
      "New Baneshwor", "Koteshwor"
    ]
  },
  {
    code: "P",
    name: "Panchpokhari Yatayat",
    nepali: "पाँचपोखरी यातायात",
    color: "#de6c9f",
    routes: ["P1", "P2"],
    corridor: "Sankhu / Danchhi – Jorpati – Chabahil – Ratnapark – Satdobato – Swayambhu",
    stops: [
      "Sankhu", "Danchhi", "Brahmakhel", "Mulpani", "Jorpati", "Boudha", "Mitra Park", "Chabahil", "Gaushala",
      "Maitidevi", "Ratnapark", "Tripureshwor", "Jawalakhel", "Lagankhel", "Satdobato", "Swayambhu"
    ]
  },
  {
    code: "Y",
    name: "Samyukta Yatayat",
    nepali: "संयुक्त यातायात",
    color: "#925844",
    routes: ["Y1", "Y2"],
    corridor: "Hattigauda / Budhanilkantha East – Chabahil – Maitidevi – Ratnapark – Kalanki – Balaju Loop",
    stops: [
      "Pradesh Park", "Hattigauda", "Golfutar", "Sukedhara", "Chabahil", "Mitrapark",
      "Gaushala", "Maitidevi", "Dillibazar", "Ratnapark", "Tripureshwor", "Kalimati",
      "Kalanki", "Swayambhu", "Balaju", "Gongabu"
    ]
  },
  {
    code: "H",
    name: "Basuki Yatayat",
    nepali: "बाशुकी यातायात",
    color: "#946994",
    routes: ["H1", "H2"],
    corridor: "Sankhu – Jorpati – Chabahil – Ratnapark – Swayambhu",
    stops: [
      "Sankhu", "Jorpati", "Boudha", "Mitra Park", "Chabahil", "Gaushala",
      "Maitidevi", "Ratnapark", "Swayambhu"
    ]
  },
  {
    code: "J",
    name: "Juneli Yatayat",
    nepali: "जुनेली यातायात",
    color: "#659c9f",
    routes: ["J1"],
    corridor: "Jorpati – Boudha – Chabahil – Ratnapark",
    stops: [
      "Jorpati", "Boudha", "Mitra Park", "Chabahil", "Gaushala", "Maitidevi", "Dillibazar", "Ratnapark"
    ]
  },
  {
    code: "I",
    name: "Bagmati Yatayat",
    nepali: "बाग्मती यातायात",
    color: "#266090",
    routes: ["I1"],
    corridor: "Kirtipur / Balkhu – Tripureshwor – Ratnapark – Maharajgunj",
    stops: [
      "Kirtipur", "Balkhu", "Kuleshwor", "Kalimati", "Teku", "Tripureshwor",
      "Sundhara", "Ratnapark", "Lainchaur", "Lazimpat", "Panipokhari", "Maharajgunj"
    ]
  },
  {
    code: "E",
    name: "Dhumrabaraha Yatayat",
    nepali: "धुम्रबराह यातायात",
    color: "#e16a30",
    routes: ["E1"],
    corridor: "Kapan / Aakashedhara – Dhumbarahi – Chabahil – Maitidevi – Ratnapark",
    stops: [
      "Aakashedhara", "Kapan", "Bishalnagar", "Dhumbarahi", "Chabahil", "Gaushala", "Maitidevi",
      "Ratnapark", "Sahid Gate"
    ]
  },
  {
    code: "O",
    name: "Om Janata Yatayat",
    nepali: "ओम जनता यातायात",
    color: "#a7733a",
    routes: ["O1"],
    corridor: "Matatirtha – Kalanki – Tripureshwor – Ratnapark – Maharajgunj – Golfutar / Budhanilkantha East",
    stops: [
      "Matatirtha", "Balambu", "Naikap", "Kalanki", "Kalimati", "Tripureshwor", "Ratnapark",
      "Jamal", "Lainchaur", "Lazimpat", "Panipokhari", "Maharajgunj", "Golfutar", "Budhanilkantha East"
    ]
  }
];

export const POPULAR_HUBS = [
  "Kalanki",
  "Ratnapark",
  "Thulo Bharyang",
  "Sano Bharyang",
  "Chyamasingh",
  "Kamalbinayak",
  "Sundarijal",
  "Koteshwor",
  "Gongabu (New Bus Park)",
  "Bhaktapur",
  "Tribhuvan Int’l Airport",
  "Lagankhel",
  "Chabahil",
  "Balkhu",
  "New Baneshwor",
  "Thamel",
  "Swayambhu",
  "Maitidevi",
  "Pulchowk",
  "B and B Hospital",
  "Kirtipur",
  "Maharajgunj",
  "Suncity",
  "Godawari"
];

export const ROUTE_NOTATION_EXAMPLES = [
  { service: "Sajha Yatayat", number: "01", outbound: "S1", inbound: "S1'", color: "#1ba546" },
  { service: "Nepal Yatayat", number: "02", outbound: "N2", inbound: "N2'", color: "#c99629" },
  { service: "Samakhusi Yatayat", number: "03", outbound: "Z3", inbound: "Z3'", color: "#878883" },
  { service: "Tarakeshwar Yatayat", number: "04", outbound: "T4", inbound: "T4'", color: "#7183c5" }
];

export const MAP_SYMBOLS = [
  {
    title: "Common Trunk Corridors",
    description: "Thick black lines represent a common shared transit corridor carrying multiple overlapping bus services through the central city core."
  }
];

export const ABBREVIATIONS = [
  { short: "TBHCFC", full: "The Burger House and Crunchy Fried Chicken" },
  { short: "PKMC", full: "Padma Kanya Multiple Campus" }
];
