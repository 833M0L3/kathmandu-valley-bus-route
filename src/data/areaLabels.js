/**
 * Core areas, transit hubs, and mountain peaks for Kathmandu Valley Map.
 * Coordinates are mapped with OCR precision to the 11,667 x 8,750 px canvas master.
 *
 * Tier Hierarchy:
 * - 'city': Primary Metropolitan Cities (Kathmandu, Lalitpur, Bhaktapur) - visible at widest zoom
 * - 'hub': Major Valley Gateways & Terminals (Kalanki, Koteshwor, Gongabu, Airport, etc.) - fades in at Zoom 3.4+
 * - 'local': Neighborhoods & Localities (Balaju, Thamel, Jawalakhel, Baneshwor, etc.) - fades in at Zoom 4.2+
 * - 'peak': Perimeter Mountains & Ridges (Shivapuri, Phulchowki, Chandragiri, etc.) - visible around the valley rim
 */

export const MAP_LABELS = [
  // ==========================================================
  // 1. PRIMARY METROPOLITAN CITIES (Tier: city)
  // Inside the valley bowl, ONLY these 3 labels show at max zoom out!
  // ==========================================================
  {
    id: 'kathmandu',
    name: 'Kathmandu',
    nepali: 'काठमाडौँ',
    x: 4480,
    y: 4050,
    tier: 'city',
  },
  {
    id: 'lalitpur',
    name: 'Lalitpur (Patan)',
    nepali: 'ललितपुर',
    x: 4660,
    y: 5120,
    tier: 'city',
  },
  {
    id: 'bhaktapur',
    name: 'Bhaktapur',
    nepali: 'भक्तपुर',
    x: 8865,
    y: 4650,
    tier: 'city',
  },

  // ==========================================================
  // 2. MAJOR TRANSIT GATEWAYS & HUBS (Tier: hub)
  // Visible at overview and max zoom out!
  // ==========================================================
  {
    id: 'kalanki',
    name: 'Kalanki',
    nepali: 'कलङ्की',
    x: 3208,
    y: 4542,
    tier: 'hub',
  },
  {
    id: 'koteshwor',
    name: 'Koteshwor',
    nepali: 'कोटेश्वर',
    x: 5489,
    y: 4895,
    tier: 'hub',
  },
  {
    id: 'gongabu',
    name: 'Gongabu (New Bus Park)',
    nepali: 'नयाँ बसपार्क',
    x: 3980,
    y: 2700,
    tier: 'hub',
  },
  {
    id: 'airport',
    name: 'Tribhuvan Int’l Airport',
    nepali: 'विमानस्थल',
    x: 6112,
    y: 4024,
    tier: 'hub',
  },
  {
    id: 'chabahil',
    name: 'Chabahil / Boudha',
    nepali: 'चाबहिल / बौद्ध',
    x: 5780,
    y: 3492,
    tier: 'hub',
  },
  {
    id: 'thimi',
    name: 'Madhyapur Thimi',
    nepali: 'मध्यपुर थिमी',
    x: 7590,
    y: 4112,
    tier: 'hub',
  },
  {
    id: 'kirtipur',
    name: 'Kirtipur',
    nepali: 'कीर्तिपुर',
    x: 3465,
    y: 6107,
    tier: 'hub',
  },

  // ==========================================================
  // 3. NEIGHBORHOODS & LOCALITIES (Tier: local)
  // Fades in at medium zoom (Zoom 4.2+)
  // ==========================================================
  {
    id: 'ratnapark',
    name: 'Ratnapark',
    nepali: 'रत्नपार्क',
    x: 4410,
    y: 4145,
    tier: 'local',
  },
  {
    id: 'baneshwor',
    name: 'New Baneshwor',
    nepali: 'नयाँ बानेश्वर',
    x: 5202,
    y: 4485,
    tier: 'local',
  },
  {
    id: 'balaju',
    name: 'Balaju',
    nepali: 'बालाजु',
    x: 3617,
    y: 3058,
    tier: 'local',
  },
  {
    id: 'maharajgunj',
    name: 'Maharajgunj',
    nepali: 'महाराजगञ्ज',
    x: 5100,
    y: 3050,
    tier: 'local',
  },
  {
    id: 'balkhu',
    name: 'Balkhu',
    nepali: 'बल्खु',
    x: 3964,
    y: 5207,
    tier: 'local',
  },
  {
    id: 'thamel',
    name: 'Thamel',
    nepali: 'ठमेल',
    x: 4142,
    y: 3760,
    tier: 'local',
  },
  {
    id: 'jawalakhel',
    name: 'Jawalakhel',
    nepali: 'जावलाखेल',
    x: 4516,
    y: 5182,
    tier: 'local',
  },
  {
    id: 'lagankhel',
    name: 'Lagankhel',
    nepali: 'लगनखेल',
    x: 4803,
    y: 5109,
    tier: 'local',
  },
  {
    id: 'satdobato',
    name: 'Satdobato',
    nepali: 'सातदोबाटो',
    x: 5068,
    y: 5632,
    tier: 'local',
  },
  {
    id: 'kalimati',
    name: 'Kalimati',
    nepali: 'कालीमाटी',
    x: 3932,
    y: 4518,
    tier: 'local',
  },
  {
    id: 'tripureshwor',
    name: 'Tripureshwor',
    nepali: 'त्रिपुरेश्वर',
    x: 4537,
    y: 4565,
    tier: 'local',
  },
  {
    id: 'swayambhu',
    name: 'Swayambhu',
    nepali: 'स्वयम्भू',
    x: 3056,
    y: 3592,
    tier: 'local',
  },
  {
    id: 'budhanilkantha',
    name: 'Budhanilkantha',
    nepali: 'बुढानीलकण्ठ',
    x: 6626,
    y: 2212,
    tier: 'local',
  },
  {
    id: 'jorpati',
    name: 'Jorpati',
    nepali: 'जोरपाटी',
    x: 6838,
    y: 3211,
    tier: 'local',
  },
  {
    id: 'thankot',
    name: 'Thankot',
    nepali: 'थानकोट',
    x: 1418,
    y: 4520,
    tier: 'local',
  },
  {
    id: 'suryabinayak',
    name: 'Suryabinayak',
    nepali: 'सूर्यविनायक',
    x: 8933,
    y: 5052,
    tier: 'local',
  },
  {
    id: 'sundarijal',
    name: 'Sundarijal',
    nepali: 'सुन्दरीजल',
    x: 7125,
    y: 1861,
    tier: 'local',
  },

  // ==========================================================
  // 4. PERIMETER MOUNTAIN PEAKS & RIDGES (Tier: peak)
  // Web text with elevation, positioned around valley rim
  // ==========================================================
  {
    id: 'shivapuri',
    name: 'Shivapuri Peak',
    nepali: 'शिवपुरी (२,७३२m)',
    elevation: '2,732m',
    x: 6400,
    y: 700,
    tier: 'peak',
  },
  {
    id: 'nagarjun',
    name: 'Nagarjun (Jamacho)',
    nepali: 'नागार्जुन (२,१२८m)',
    elevation: '2,128m',
    x: 1800,
    y: 1300,
    tier: 'peak',
  },
  {
    id: 'chandragiri',
    name: 'Chandragiri Ridge',
    nepali: 'चन्द्रागिरी (२,५५१m)',
    elevation: '2,551m',
    x: 650,
    y: 4700,
    tier: 'peak',
  },
  {
    id: 'champadevi',
    name: 'Champadevi',
    nepali: 'चम्पादेवी (२,२८५m)',
    elevation: '2,285m',
    x: 2600,
    y: 7100,
    tier: 'peak',
  },
  {
    id: 'phulchowki',
    name: 'Phulchowki Peak',
    nepali: 'फूलचोकी (२,७८२m)',
    elevation: '2,782m',
    x: 5800,
    y: 7800,
    tier: 'peak',
  },
  {
    id: 'nagarkot',
    name: 'Nagarkot Ridge',
    nepali: 'नगरकोट (२,१७५m)',
    elevation: '2,175m',
    x: 10400,
    y: 3600,
    tier: 'peak',
  },
];
