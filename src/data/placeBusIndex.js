/**
 * Complete Kathmandu Valley Place-to-Bus Route Mapping
 * Spatially maps all 1115 verified places extracted from clean-map.jpg to their passing bus operators.
 * Verified with ground truth transit corridors from legends.jpg and clean-map.jpg.
 */

export const ALL_PLACES_BUS_INDEX = [
  {
    "name": "Kathmandu",
    "nepali": "काठमाडौँ",
    "buses": [
      "E",
      "O",
      "D",
      "N",
      "S",
      "I",
      "Y",
      "P",
      "H",
      "J",
      "G",
      "L",
      "T",
      "F",
      "Z",
      "A",
      "R",
      "B",
      "C",
      "K"
    ]
  },
  {
    "name": "Lalitpur (Patan)",
    "nepali": "ललितपुर",
    "buses": [
      "S",
      "N",
      "P",
      "X",
      "M",
      "B"
    ]
  },
  {
    "name": "Bhaktapur",
    "nepali": "भक्तपुर",
    "buses": [
      "B",
      "S",
      "X"
    ]
  },
  {
    "name": "Kalanki",
    "nepali": "कलङ्की",
    "buses": [
      "B",
      "S",
      "X",
      "M",
      "C",
      "T",
      "A",
      "R",
      "Y",
      "O"
    ]
  },
  {
    "name": "Koteshwor",
    "nepali": "कोटेश्वर",
    "buses": [
      "B",
      "S",
      "X",
      "M",
      "G",
      "R",
      "N"
    ]
  },
  {
    "name": "Gongabu (New Bus Park)",
    "nepali": "नयाँ बसपार्क",
    "buses": [
      "B",
      "S",
      "M",
      "Z",
      "Y"
    ]
  },
  {
    "name": "Tribhuvan Int’l Airport",
    "nepali": "विमानस्थल",
    "buses": [
      "G",
      "B",
      "S",
      "M",
      "D"
    ]
  },
  {
    "name": "Chabahil / Boudha",
    "nepali": "चाबहिल / बौद्ध",
    "buses": [
      "B",
      "S",
      "M",
      "L",
      "P",
      "H",
      "J",
      "G",
      "N",
      "Y",
      "E"
    ]
  },
  {
    "name": "Madhyapur Thimi",
    "nepali": "मध्यपुर थिमी",
    "buses": [
      "B",
      "S"
    ]
  },
  {
    "name": "Kirtipur",
    "nepali": "कीर्तिपुर",
    "buses": [
      "K",
      "I"
    ]
  },
  {
    "name": "Ratnapark",
    "nepali": "रत्नपार्क",
    "buses": [
      "B",
      "S",
      "C",
      "K",
      "I",
      "T",
      "F",
      "Z",
      "A",
      "L",
      "P",
      "H",
      "J",
      "G",
      "R",
      "N",
      "E",
      "O",
      "Y",
      "D"
    ]
  },
  {
    "name": "New Baneshwor",
    "nepali": "नयाँ बानेश्वर",
    "buses": [
      "B",
      "S",
      "R",
      "N"
    ]
  },
  {
    "name": "Balaju",
    "nepali": "बालाजु",
    "buses": [
      "B",
      "S",
      "M",
      "T",
      "F",
      "Y"
    ]
  },
  {
    "name": "Maharajgunj",
    "nepali": "महाराजगञ्ज",
    "buses": [
      "B",
      "S",
      "M",
      "I",
      "A",
      "O",
      "E"
    ]
  },
  {
    "name": "Balkhu",
    "nepali": "बल्खु",
    "buses": [
      "B",
      "S",
      "X",
      "M",
      "K",
      "I",
      "N"
    ]
  },
  {
    "name": "Thamel",
    "nepali": "ठमेल",
    "buses": [
      "T",
      "F",
      "Z",
      "A",
      "D",
      "H",
      "S",
      "I"
    ]
  },
  {
    "name": "Jawalakhel",
    "nepali": "जावलाखेल",
    "buses": [
      "S",
      "X",
      "M",
      "N",
      "B"
    ]
  },
  {
    "name": "Lagankhel",
    "nepali": "लगनखेल",
    "buses": [
      "B",
      "S",
      "P",
      "N",
      "X",
      "M"
    ]
  },
  {
    "name": "Satdobato",
    "nepali": "सातदोबाटो",
    "buses": [
      "B",
      "S",
      "X",
      "M",
      "P",
      "R"
    ]
  },
  {
    "name": "Kalimati",
    "nepali": "कालीमाटी",
    "buses": [
      "S",
      "C",
      "K",
      "I",
      "N",
      "Y",
      "O",
      "R"
    ]
  },
  {
    "name": "Tripureshwor",
    "nepali": "त्रिपुरेश्वर",
    "buses": [
      "B",
      "S",
      "C",
      "K",
      "I",
      "P",
      "N",
      "Y",
      "O"
    ]
  },
  {
    "name": "Swayambhu",
    "nepali": "स्वयम्भू",
    "buses": [
      "S",
      "M",
      "T",
      "F",
      "A",
      "H",
      "Y"
    ]
  },
  {
    "name": "Budhanilkantha",
    "nepali": "बुढानीलकण्ठ",
    "buses": [
      "S",
      "A"
    ]
  },
  {
    "name": "Jorpati",
    "nepali": "जोरपाटी",
    "buses": [
      "L",
      "P",
      "H",
      "J",
      "N"
    ]
  },
  {
    "name": "Thankot",
    "nepali": "थानकोट",
    "buses": [
      "C"
    ]
  },
  {
    "name": "Suryabinayak",
    "nepali": "सूर्यविनायक",
    "buses": [
      "B",
      "S",
      "X"
    ]
  },
  {
    "name": "Sundarijal",
    "nepali": "सुन्दरीजल",
    "buses": [
      "L"
    ]
  },
  {
    "name": "Shivapuri Peak (2,732m)",
    "nepali": "शिवपुरी डाँडा",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Phulchowki Peak (2,782m)",
    "nepali": "फूलचोकी डाँडा",
    "buses": []
  },
  {
    "name": "Chandragiri Peak (2,551m)",
    "nepali": "चन्द्रागिरी डाँडा",
    "buses": []
  },
  {
    "name": "Champadevi Peak (2,285m)",
    "nepali": "चम्पादेवी डाँडा",
    "buses": []
  },
  {
    "name": "Nagarjun Hill (2,128m)",
    "nepali": "नागार्जुन डाँडा",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Shree Khandeshwor Mahadev Temple",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Sano Bypass",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Oxford Driving Training Center",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Tarakeshwor",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Naya Basti Entrance Bohoratar",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Jor Ganesh Temple Entrance Gate",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Shree Bangalamukhi Mai Temple",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Friendship Colony Bohoratar",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Bangalamukhi Mai Temple Entrance Gate",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Sunflower Secondary School",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Sunflower econdary School",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Goldhunga",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Tarakeshwor",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Balapan Pre-School arakeshwor",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Milan Basti Entrance Gate",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Milan Basti intrance Gate",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Jana Jagriti Chowk",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Lolang Pipalbot",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Jai Nepal Chowk",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Sanskriti Shikshya Sadan School",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Swarnim Basti Entrance Gate",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Swarnim Basti intrance Gate",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Ujyalo Basti Lolang",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Dhinchen Samten Choyeling Gumba",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Goldhunga",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Ganesh Temple Lolang",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Seshmati indoues",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Seshmati Sanopul",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Shivapuri Nagarjun National Park Entrance",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Fulbari Gate Army Camp",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Srijana Gyansagal Secondary School",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Chardobato Ganesh Mandir",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Raniban Bus Park",
    "nepali": "",
    "buses": [
      "F"
    ]
  },
  {
    "name": "Asta Naray Cinen",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Savyata Pathshala Buddha Chowk, Raniban",
    "nepali": "",
    "buses": [
      "F"
    ]
  },
  {
    "name": "Siddhartha Bank",
    "nepali": "",
    "buses": [
      "F"
    ]
  },
  {
    "name": "NIC Asia Bank",
    "nepali": "",
    "buses": [
      "F"
    ]
  },
  {
    "name": "Nur Chowk",
    "nepali": "",
    "buses": [
      "F"
    ]
  },
  {
    "name": "Dharmasthali",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Tarakeshwor",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Tarakeshwor",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "North Valley School",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "ialapan Pre-School arakeshwor",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Tarakeshwor",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Manamaiju Oil Store Petrol Pump",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Srijana Gyansagar Secondary School",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Manamaiju Micro Station",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Mansingh College",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Angels' Heart Secondary School",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Mana Bishnumati Bridge",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Jeevan Jyoti English Boarding School",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Asta Narayan Cinema Hall (Bypass)",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Tokha Munici Ward 9 Office",
    "nepali": "",
    "buses": [
      "Z",
      "B",
      "S",
      "Y"
    ]
  },
  {
    "name": "Bal Batika International School",
    "nepali": "",
    "buses": [
      "T",
      "F",
      "M"
    ]
  },
  {
    "name": "Nursery Chowk",
    "nepali": "",
    "buses": [
      "F"
    ]
  },
  {
    "name": "Ganesh English Secondary School",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Bhatkekopul Bus Stop",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Taleju Bhawani Petrol Pump",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Manorath Tirtha Dham",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Bhat-Bhateni Super Store Tokha",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Manamaju Bishnumati Bridge",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Greenland Int'l Boarding High School",
    "nepali": "",
    "buses": [
      "Z",
      "Y"
    ]
  },
  {
    "name": "Tokha Skate Park",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Lord Palace Banquet",
    "nepali": "",
    "buses": [
      "Z",
      "Y"
    ]
  },
  {
    "name": "Tokha Municipality Ward 9 Office",
    "nepali": "",
    "buses": [
      "Z",
      "B",
      "S",
      "Y"
    ]
  },
  {
    "name": "Bich Vinayak Ganeshsthan",
    "nepali": "",
    "buses": [
      "Z",
      "Y",
      "B",
      "S"
    ]
  },
  {
    "name": "Basundhara Chowk",
    "nepali": "",
    "buses": [
      "Y",
      "M",
      "Z",
      "B",
      "S"
    ]
  },
  {
    "name": "Deuba Chowk",
    "nepali": "",
    "buses": [
      "S",
      "A"
    ]
  },
  {
    "name": "Sahajmarga Microbus Station",
    "nepali": "",
    "buses": [
      "S",
      "A"
    ]
  },
  {
    "name": "Hakucha Bridge",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "Y",
      "O"
    ]
  },
  {
    "name": "Anita Milan Kindergarten",
    "nepali": "",
    "buses": [
      "Y",
      "O",
      "S",
      "A"
    ]
  },
  {
    "name": "Baluwakhani (Kapan)",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "Y",
      "E"
    ]
  },
  {
    "name": "Naulin Sports Villa",
    "nepali": "",
    "buses": [
      "Y",
      "S",
      "A",
      "O"
    ]
  },
  {
    "name": "Sundarbasti Kapan",
    "nepali": "",
    "buses": [
      "Y",
      "O",
      "S",
      "A"
    ]
  },
  {
    "name": "Shrestha Swimming Pool and Futsal",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "E",
      "Y"
    ]
  },
  {
    "name": "Baluwakhani (Kapan)",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "E",
      "Y"
    ]
  },
  {
    "name": "Sweet Science Boxing and Fitness",
    "nepali": "",
    "buses": [
      "Y",
      "S",
      "A",
      "E"
    ]
  },
  {
    "name": "Municipality Hospital Bhadra Fuel",
    "nepali": "",
    "buses": [
      "E",
      "S",
      "A",
      "L"
    ]
  },
  {
    "name": "Bhadra Fuel Concern",
    "nepali": "",
    "buses": [
      "E",
      "S",
      "A",
      "L"
    ]
  },
  {
    "name": "Kapan Sekuwa Restaurant",
    "nepali": "",
    "buses": [
      "Y",
      "S",
      "A",
      "E"
    ]
  },
  {
    "name": "Neuro Hospital",
    "nepali": "",
    "buses": [
      "O",
      "Y"
    ]
  },
  {
    "name": "Aakashedhar Kapan",
    "nepali": "",
    "buses": [
      "E",
      "S",
      "A",
      "L"
    ]
  },
  {
    "name": "Gangalal Hospital",
    "nepali": "",
    "buses": [
      "O",
      "Y"
    ]
  },
  {
    "name": "Srijana Chowk",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "Y",
      "E"
    ]
  },
  {
    "name": "Rave Futsal Center",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "Y",
      "E"
    ]
  },
  {
    "name": "National Media Development Center",
    "nepali": "",
    "buses": [
      "E",
      "S",
      "A",
      "Y"
    ]
  },
  {
    "name": "Narayan Gopal Chowk (Chakrapath",
    "nepali": "",
    "buses": [
      "Y",
      "O",
      "S",
      "A"
    ]
  },
  {
    "name": "Hem Ganga Kala Sahitya Pratisthan",
    "nepali": "",
    "buses": [
      "E",
      "Y",
      "S",
      "A"
    ]
  },
  {
    "name": "Chappal Karkhana",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "Y",
      "O"
    ]
  },
  {
    "name": "Aakashedhara Micro Bus Park",
    "nepali": "",
    "buses": [
      "E",
      "L",
      "S",
      "A",
      "N"
    ]
  },
  {
    "name": "ience nd Fitness",
    "nepali": "",
    "buses": [
      "Y",
      "S",
      "A",
      "E"
    ]
  },
  {
    "name": "Kapan Handball Sports Ground",
    "nepali": "",
    "buses": [
      "E",
      "L",
      "S",
      "A",
      "N"
    ]
  },
  {
    "name": "Budhanilkantha Temple",
    "nepali": "",
    "buses": [
      "S",
      "A"
    ]
  },
  {
    "name": "Sanima Bank Faika",
    "nepali": "",
    "buses": [
      "N",
      "L"
    ]
  },
  {
    "name": "Aakashedhara Kapan",
    "nepali": "",
    "buses": [
      "E",
      "S",
      "A",
      "L"
    ]
  },
  {
    "name": "Faika Chowk Kapan",
    "nepali": "",
    "buses": [
      "N",
      "L"
    ]
  },
  {
    "name": "Balaju Bypass",
    "nepali": "",
    "buses": [
      "T",
      "F",
      "M",
      "B",
      "S",
      "Y"
    ]
  },
  {
    "name": "Nepal School of Hotel Management",
    "nepali": "",
    "buses": [
      "T",
      "F",
      "M",
      "B",
      "S",
      "Y"
    ]
  },
  {
    "name": "Om Saibaba Memorial Hospital",
    "nepali": "",
    "buses": [
      "M",
      "T",
      "F",
      "Y"
    ]
  },
  {
    "name": "Yerahity Dhungedhara",
    "nepali": "",
    "buses": [
      "M",
      "F",
      "T",
      "Y"
    ]
  },
  {
    "name": "Sano Bharyang",
    "nepali": "",
    "buses": [
      "M",
      "T",
      "F"
    ]
  },
  {
    "name": "Thulo Bharyang",
    "nepali": "",
    "buses": [
      "M",
      "T",
      "F"
    ]
  },
  {
    "name": "Balmaitri Hospital",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "M",
      "I",
      "A"
    ]
  },
  {
    "name": "Rastrapati Bhawan",
    "nepali": "",
    "buses": [
      "M",
      "B",
      "S",
      "I",
      "A",
      "O",
      "E"
    ]
  },
  {
    "name": "Kanti Children's Hospital",
    "nepali": "",
    "buses": [
      "O",
      "S",
      "A",
      "B",
      "M",
      "E",
      "I"
    ]
  },
  {
    "name": "Bishal Nagar",
    "nepali": "",
    "buses": [
      "O",
      "B",
      "S",
      "M",
      "E",
      "A",
      "I"
    ]
  },
  {
    "name": "Oops! Nepal Funpark",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "M",
      "O",
      "E",
      "A",
      "I"
    ]
  },
  {
    "name": "Baluwatar Embassyof China",
    "nepali": "",
    "buses": [
      "O",
      "S",
      "A",
      "I",
      "B",
      "M",
      "E"
    ]
  },
  {
    "name": "Baluwatar China",
    "nepali": "",
    "buses": [
      "O",
      "B",
      "S",
      "M",
      "A",
      "I",
      "E"
    ]
  },
  {
    "name": "Dhum Pipalbot",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "M",
      "E",
      "O",
      "A"
    ]
  },
  {
    "name": "Aatma Gyan Prachar Sangh (AGPS",
    "nepali": "",
    "buses": [
      "D",
      "Z"
    ]
  },
  {
    "name": "Bishal Basti Gate",
    "nepali": "",
    "buses": [
      "E",
      "B",
      "S",
      "M",
      "O",
      "A",
      "I"
    ]
  },
  {
    "name": "Bishal Basti Big Mart",
    "nepali": "",
    "buses": [
      "E",
      "B",
      "S",
      "M",
      "O",
      "A",
      "I"
    ]
  },
  {
    "name": "Gate Big Mart",
    "nepali": "",
    "buses": [
      "E",
      "B",
      "S",
      "M",
      "O",
      "A",
      "I"
    ]
  },
  {
    "name": "Gate Bishalnagar",
    "nepali": "",
    "buses": [
      "E",
      "B",
      "S",
      "M",
      "O",
      "A",
      "I"
    ]
  },
  {
    "name": "Big Mart Bishalnagar",
    "nepali": "",
    "buses": [
      "E",
      "B",
      "S",
      "M",
      "O",
      "A",
      "I"
    ]
  },
  {
    "name": "Naxal Bhatbhateni",
    "nepali": "",
    "buses": [
      "O",
      "E",
      "S",
      "A",
      "I",
      "M",
      "B"
    ]
  },
  {
    "name": "Naxal hateni",
    "nepali": "",
    "buses": [
      "O",
      "E",
      "S",
      "A",
      "B",
      "M",
      "I"
    ]
  },
  {
    "name": "Bodhi Books and Bistro",
    "nepali": "",
    "buses": [
      "E",
      "O",
      "B",
      "S",
      "M"
    ]
  },
  {
    "name": "Tangal Secondary School",
    "nepali": "",
    "buses": [
      "E",
      "B",
      "S",
      "M",
      "O"
    ]
  },
  {
    "name": "Samakhusi Town Planning",
    "nepali": "",
    "buses": [
      "D",
      "Z",
      "T",
      "F"
    ]
  },
  {
    "name": "Goma Ganesh Temple",
    "nepali": "",
    "buses": [
      "O",
      "E",
      "S",
      "A",
      "I"
    ]
  },
  {
    "name": "Siddhartha Bank Head Ofice",
    "nepali": "",
    "buses": [
      "O",
      "E",
      "S",
      "A",
      "I"
    ]
  },
  {
    "name": "Head Ofice Nepal Police",
    "nepali": "",
    "buses": [
      "O",
      "E",
      "S",
      "A"
    ]
  },
  {
    "name": "Narayan Chaur",
    "nepali": "",
    "buses": [
      "O",
      "E",
      "S",
      "A",
      "I"
    ]
  },
  {
    "name": "Royal Enfield Showroom",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "O",
      "I",
      "E"
    ]
  },
  {
    "name": "Nepal Police Headquarters",
    "nepali": "",
    "buses": [
      "O",
      "E",
      "S",
      "A"
    ]
  },
  {
    "name": "Ncell Head Ofice",
    "nepali": "",
    "buses": [
      "D",
      "Z",
      "A",
      "T",
      "F",
      "S",
      "I"
    ]
  },
  {
    "name": "Traffic Police Circle Maligaun",
    "nepali": "",
    "buses": [
      "E",
      "Y",
      "P",
      "H",
      "J",
      "G"
    ]
  },
  {
    "name": "Bank BYDShowroom",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "I",
      "E",
      "O"
    ]
  },
  {
    "name": "Sanima Bank Head Office",
    "nepali": "",
    "buses": [
      "O",
      "E",
      "S",
      "A"
    ]
  },
  {
    "name": "Head Office Naxal Vegetable",
    "nepali": "",
    "buses": [
      "O",
      "E",
      "S",
      "A"
    ]
  },
  {
    "name": "BYDShowroom Ocean Mart",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "E",
      "O",
      "I"
    ]
  },
  {
    "name": "Naxal Vegetable Market",
    "nepali": "",
    "buses": [
      "O",
      "E",
      "S",
      "A"
    ]
  },
  {
    "name": "Maligaun Ganesh Mandir",
    "nepali": "",
    "buses": [
      "E",
      "Y",
      "P",
      "H",
      "J",
      "G",
      "O"
    ]
  },
  {
    "name": "Ocean Mart Naag",
    "nepali": "",
    "buses": [
      "E",
      "O",
      "S",
      "A",
      "I"
    ]
  },
  {
    "name": "Naag Pokhari",
    "nepali": "",
    "buses": [
      "E",
      "O",
      "S",
      "A"
    ]
  },
  {
    "name": "Nandi Ratri Secondary School",
    "nepali": "",
    "buses": [
      "E",
      "O",
      "N",
      "S"
    ]
  },
  {
    "name": "Narayanhiti Palace",
    "nepali": "",
    "buses": [
      "S",
      "I",
      "A",
      "Z",
      "D",
      "E",
      "O"
    ]
  },
  {
    "name": "Brihaspati Vidyasadan School",
    "nepali": "",
    "buses": [
      "E",
      "Y",
      "O",
      "N",
      "P",
      "H",
      "J",
      "G"
    ]
  },
  {
    "name": "Brihaspati yasadan School",
    "nepali": "",
    "buses": [
      "E",
      "Y",
      "O",
      "N",
      "P",
      "H",
      "J",
      "G"
    ]
  },
  {
    "name": "Vidyasadan School Kathmandu",
    "nepali": "",
    "buses": [
      "Y",
      "E",
      "N",
      "O",
      "P",
      "H",
      "J",
      "G",
      "L"
    ]
  },
  {
    "name": "Vidyasadan School hmandu",
    "nepali": "",
    "buses": [
      "Y",
      "E",
      "N",
      "O",
      "P",
      "H",
      "J",
      "G",
      "L"
    ]
  },
  {
    "name": "NIC Asia Siddhartha Bank",
    "nepali": "",
    "buses": [
      "Y",
      "P",
      "H",
      "J",
      "G",
      "L"
    ]
  },
  {
    "name": "Jai Nepal Hall",
    "nepali": "",
    "buses": [
      "E",
      "O",
      "S",
      "I",
      "D",
      "A"
    ]
  },
  {
    "name": "Hilton Hotel",
    "nepali": "",
    "buses": [
      "E",
      "O",
      "N",
      "Y",
      "P",
      "H",
      "J",
      "G",
      "L"
    ]
  },
  {
    "name": "Hotel Shree Naxal",
    "nepali": "",
    "buses": [
      "O",
      "E",
      "N",
      "P",
      "H",
      "J",
      "G",
      "L",
      "Y"
    ]
  },
  {
    "name": "Kathmandu English School",
    "nepali": "",
    "buses": [
      "Y",
      "N",
      "E",
      "P",
      "H",
      "J",
      "G",
      "O",
      "L"
    ]
  },
  {
    "name": "Kathmandu rlish School",
    "nepali": "",
    "buses": [
      "Y",
      "N",
      "P",
      "H",
      "J",
      "G",
      "E",
      "L",
      "O"
    ]
  },
  {
    "name": "Durbar Marg",
    "nepali": "",
    "buses": [
      "E",
      "O",
      "S",
      "I",
      "D",
      "N"
    ]
  },
  {
    "name": "Shree Naxal Bhagwati Temple",
    "nepali": "",
    "buses": [
      "O",
      "N",
      "E",
      "P",
      "H",
      "J",
      "G",
      "L",
      "Y"
    ]
  },
  {
    "name": "Bhagwati Temple Herald College",
    "nepali": "",
    "buses": [
      "N",
      "O",
      "E",
      "P",
      "H",
      "J",
      "G",
      "L",
      "Y",
      "D"
    ]
  },
  {
    "name": "Nepal Mountaineering Association",
    "nepali": "",
    "buses": [
      "O",
      "E",
      "N",
      "P",
      "H",
      "J",
      "G",
      "L",
      "Y",
      "D"
    ]
  },
  {
    "name": "Sano Gaucharan",
    "nepali": "",
    "buses": [
      "P",
      "H",
      "J",
      "G",
      "L",
      "Y",
      "N",
      "D"
    ]
  },
  {
    "name": "OPipalbot Oralo Gas Station",
    "nepali": "",
    "buses": [
      "P",
      "H",
      "J",
      "G",
      "Y",
      "L",
      "N",
      "D"
    ]
  },
  {
    "name": "Sano Gaucharan",
    "nepali": "",
    "buses": [
      "Y",
      "N",
      "P",
      "H",
      "J",
      "G",
      "L",
      "D",
      "E",
      "O"
    ]
  },
  {
    "name": "Sano Football Field",
    "nepali": "",
    "buses": [
      "Y",
      "N",
      "P",
      "H",
      "J",
      "G",
      "L",
      "D",
      "E",
      "O"
    ]
  },
  {
    "name": "Sano botball Field",
    "nepali": "",
    "buses": [
      "Y",
      "N",
      "P",
      "H",
      "J",
      "G",
      "L",
      "D",
      "E",
      "O"
    ]
  },
  {
    "name": "Sano potball Field",
    "nepali": "",
    "buses": [
      "Y",
      "N",
      "P",
      "H",
      "J",
      "G",
      "L",
      "D",
      "E",
      "O"
    ]
  },
  {
    "name": "Electricity Regulatory",
    "nepali": "",
    "buses": [
      "Y",
      "P",
      "H",
      "J",
      "G",
      "L",
      "N",
      "D"
    ]
  },
  {
    "name": "Electricity Commission",
    "nepali": "",
    "buses": [
      "Y",
      "P",
      "H",
      "J",
      "G",
      "L",
      "N",
      "D"
    ]
  },
  {
    "name": "Regulatory Commission",
    "nepali": "",
    "buses": [
      "Y",
      "P",
      "H",
      "J",
      "G",
      "L",
      "N",
      "D"
    ]
  },
  {
    "name": "City Centre",
    "nepali": "",
    "buses": [
      "N",
      "P",
      "H",
      "J",
      "G",
      "L",
      "Y",
      "O",
      "E",
      "D"
    ]
  },
  {
    "name": "Embassy of Germany",
    "nepali": "",
    "buses": [
      "Y",
      "N",
      "P",
      "H",
      "J",
      "G",
      "L",
      "D"
    ]
  },
  {
    "name": "Tri-Chandra Muttiple Campus",
    "nepali": "",
    "buses": [
      "O",
      "E",
      "D",
      "N",
      "P",
      "H",
      "J",
      "G",
      "L",
      "Y",
      "S",
      "I",
      "R",
      "T",
      "F",
      "Z",
      "A",
      "B",
      "C",
      "K"
    ]
  },
  {
    "name": "Skywalk Tower",
    "nepali": "",
    "buses": [
      "N",
      "P",
      "H",
      "J",
      "G",
      "O",
      "E",
      "D",
      "L",
      "Y",
      "S",
      "R",
      "I",
      "B",
      "Z",
      "A"
    ]
  },
  {
    "name": "Skywalk Kamaladi Sadak",
    "nepali": "",
    "buses": [
      "N",
      "P",
      "H",
      "J",
      "G",
      "L",
      "D",
      "Y",
      "O",
      "E",
      "S",
      "R",
      "I",
      "B",
      "Z",
      "A"
    ]
  },
  {
    "name": "Maitidevi Chowk",
    "nepali": "",
    "buses": [
      "N",
      "L",
      "P",
      "H",
      "J",
      "G",
      "Y",
      "D"
    ]
  },
  {
    "name": "Tower Kamaladi Sadak",
    "nepali": "",
    "buses": [
      "N",
      "P",
      "H",
      "J",
      "G",
      "L",
      "D",
      "Y",
      "O",
      "E",
      "S",
      "R",
      "I",
      "B",
      "Z",
      "A"
    ]
  },
  {
    "name": "Bhaktapur Mini Bus Park",
    "nepali": "",
    "buses": [
      "N",
      "P",
      "H",
      "J",
      "G",
      "D",
      "Y",
      "L",
      "E",
      "O",
      "S",
      "R",
      "I",
      "B",
      "C",
      "K",
      "T",
      "F",
      "Z",
      "A"
    ]
  },
  {
    "name": "Queen's Palace and Events",
    "nepali": "",
    "buses": [
      "E",
      "Y",
      "S",
      "A"
    ]
  },
  {
    "name": "Sat Talley Kapan",
    "nepali": "",
    "buses": [
      "E",
      "Y"
    ]
  },
  {
    "name": "Sukedhara Chowk",
    "nepali": "",
    "buses": [
      "E",
      "Y",
      "S",
      "A"
    ]
  },
  {
    "name": "Kathmandu Unified City School",
    "nepali": "",
    "buses": [
      "Y",
      "E"
    ]
  },
  {
    "name": "Kathmandu Unified Yangtaru Sekuwa Corner",
    "nepali": "",
    "buses": [
      "Y",
      "E",
      "L",
      "J"
    ]
  },
  {
    "name": "City School Yangtaru Sekuwa Corner",
    "nepali": "",
    "buses": [
      "Y",
      "E",
      "L",
      "J"
    ]
  },
  {
    "name": "Italian Bakery Shiva Panchayan Mandir",
    "nepali": "",
    "buses": [
      "Y",
      "E",
      "L",
      "J",
      "N",
      "P",
      "H"
    ]
  },
  {
    "name": "Oops!Nepal Funpark",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "M",
      "O",
      "E",
      "A",
      "I"
    ]
  },
  {
    "name": "Dhumbarahi Chowk",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "M",
      "E",
      "O",
      "A"
    ]
  },
  {
    "name": "Taragaon Next",
    "nepali": "",
    "buses": [
      "N",
      "L",
      "J",
      "P",
      "H"
    ]
  },
  {
    "name": "Tusal Chowk",
    "nepali": "",
    "buses": [
      "L",
      "J",
      "N",
      "P",
      "H"
    ]
  },
  {
    "name": "Chhapro Restro",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "M",
      "E",
      "O"
    ]
  },
  {
    "name": "Dhumbarahi Chowk",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "M",
      "E"
    ]
  },
  {
    "name": "The Insight Vision College",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "M",
      "E",
      "P",
      "H",
      "J",
      "G",
      "L",
      "N"
    ]
  },
  {
    "name": "Trafic Police Circle Maligaun",
    "nepali": "",
    "buses": [
      "E",
      "Y",
      "P",
      "H",
      "J",
      "G"
    ]
  },
  {
    "name": "Texas College of Management and IT",
    "nepali": "",
    "buses": [
      "P",
      "H",
      "J",
      "G",
      "Y",
      "B",
      "S",
      "M",
      "L",
      "N"
    ]
  },
  {
    "name": "Aradhana Petrol Pump",
    "nepali": "",
    "buses": [
      "P",
      "H",
      "J",
      "G",
      "Y",
      "L"
    ]
  },
  {
    "name": "Big Mart Gothatar",
    "nepali": "",
    "buses": [
      "G",
      "R"
    ]
  },
  {
    "name": "Tej Binayak Chowk",
    "nepali": "",
    "buses": [
      "G",
      "R"
    ]
  },
  {
    "name": "Chapabot Gothatar",
    "nepali": "",
    "buses": [
      "G",
      "R"
    ]
  },
  {
    "name": "Mahantar Chowk",
    "nepali": "",
    "buses": [
      "G",
      "R"
    ]
  },
  {
    "name": "nedset Vidyasadan School",
    "nepali": "",
    "buses": [
      "E",
      "Y",
      "O",
      "N",
      "P",
      "H",
      "J",
      "G"
    ]
  },
  {
    "name": "nedset yasadan School",
    "nepali": "",
    "buses": [
      "Y",
      "E",
      "O",
      "P",
      "H",
      "J",
      "G",
      "N",
      "L"
    ]
  },
  {
    "name": "Kadagha Chowk",
    "nepali": "",
    "buses": [
      "G",
      "R"
    ]
  },
  {
    "name": "Gandhi Adarsha Secondary School",
    "nepali": "",
    "buses": [
      "G",
      "R"
    ]
  },
  {
    "name": "Laure C Kada",
    "nepali": "",
    "buses": [
      "G",
      "R"
    ]
  },
  {
    "name": "Kadaghari",
    "nepali": "",
    "buses": [
      "G",
      "R",
      "B",
      "S"
    ]
  },
  {
    "name": "Gandhi Mode",
    "nepali": "",
    "buses": [
      "G",
      "R",
      "B",
      "S"
    ]
  },
  {
    "name": "Purano Baneshwor",
    "nepali": "",
    "buses": [
      "D",
      "L",
      "P",
      "H",
      "J",
      "G",
      "N",
      "Y"
    ]
  },
  {
    "name": "Sinamangal (Airport Gate)",
    "nepali": "",
    "buses": [
      "D",
      "N",
      "L",
      "P"
    ]
  },
  {
    "name": "Kathmandu Medical College",
    "nepali": "",
    "buses": [
      "N",
      "D",
      "B",
      "S",
      "M",
      "G",
      "L"
    ]
  },
  {
    "name": "Ramsterdam Cafe",
    "nepali": "",
    "buses": [
      "L",
      "N",
      "H",
      "P",
      "J"
    ]
  },
  {
    "name": "Narayantar Bridge",
    "nepali": "",
    "buses": [
      "L",
      "P",
      "H",
      "N"
    ]
  },
  {
    "name": "Bauddha Gate",
    "nepali": "",
    "buses": [
      "L",
      "J",
      "N",
      "P",
      "H"
    ]
  },
  {
    "name": "Shankarapur Hospital",
    "nepali": "",
    "buses": [
      "L",
      "P",
      "H",
      "N",
      "J"
    ]
  },
  {
    "name": "Narayantar Chowk",
    "nepali": "",
    "buses": [
      "L",
      "P",
      "H",
      "N",
      "J"
    ]
  },
  {
    "name": "Metro Mart",
    "nepali": "",
    "buses": [
      "L",
      "P",
      "H"
    ]
  },
  {
    "name": "Dakshindhoka Gokarneshwor",
    "nepali": "",
    "buses": [
      "L",
      "P",
      "H"
    ]
  },
  {
    "name": "Thali Vegetable Market",
    "nepali": "",
    "buses": [
      "L",
      "P"
    ]
  },
  {
    "name": "Mulpani Intl Cricket Ground",
    "nepali": "",
    "buses": [
      "L",
      "P"
    ]
  },
  {
    "name": "Royal Palace Banquet",
    "nepali": "",
    "buses": [
      "P",
      "L"
    ]
  },
  {
    "name": "Tinpiple Oralo Kantipur",
    "nepali": "",
    "buses": [
      "L",
      "P"
    ]
  },
  {
    "name": "Kantipur Campus",
    "nepali": "",
    "buses": [
      "L",
      "P"
    ]
  },
  {
    "name": "Tiwari Tole",
    "nepali": "",
    "buses": [
      "P",
      "L"
    ]
  },
  {
    "name": "Hariyali Nagar",
    "nepali": "",
    "buses": [
      "P",
      "L"
    ]
  },
  {
    "name": "Mulpani Chaur",
    "nepali": "",
    "buses": [
      "P"
    ]
  },
  {
    "name": "Nepal Engineering College",
    "nepali": "",
    "buses": [
      "P"
    ]
  },
  {
    "name": "Mulpani Volleyball Center",
    "nepali": "",
    "buses": [
      "P"
    ]
  },
  {
    "name": "Jaya Sec Boarding School",
    "nepali": "",
    "buses": [
      "P"
    ]
  },
  {
    "name": "Bode Health Post",
    "nepali": "",
    "buses": [
      "B"
    ]
  },
  {
    "name": "Bode Planning",
    "nepali": "",
    "buses": [
      "B"
    ]
  },
  {
    "name": "Gaurinath Chowk",
    "nepali": "",
    "buses": [
      "G",
      "R"
    ]
  },
  {
    "name": "New Force Bus Park",
    "nepali": "",
    "buses": [
      "B"
    ]
  },
  {
    "name": "Kadaghari",
    "nepali": "",
    "buses": [
      "G",
      "R"
    ]
  },
  {
    "name": "Birendra Chowk",
    "nepali": "",
    "buses": [
      "G",
      "R"
    ]
  },
  {
    "name": "Thapa Chowk",
    "nepali": "",
    "buses": [
      "G",
      "R"
    ]
  },
  {
    "name": "Har Har Mahadev",
    "nepali": "",
    "buses": [
      "G",
      "R"
    ]
  },
  {
    "name": "Nepal Yatayat Bus Park (Har Har Mahadev)",
    "nepali": "",
    "buses": [
      "B",
      "S"
    ]
  },
  {
    "name": "Laure Chowk Kada",
    "nepali": "",
    "buses": [
      "G",
      "R"
    ]
  },
  {
    "name": "Kageshwori Manohara",
    "nepali": "",
    "buses": [
      "L",
      "P"
    ]
  },
  {
    "name": "Kageshwori Ward 4 Office",
    "nepali": "",
    "buses": [
      "L",
      "P"
    ]
  },
  {
    "name": "NTC Indrayani",
    "nepali": "",
    "buses": [
      "L",
      "P"
    ]
  },
  {
    "name": "NTC Exchange",
    "nepali": "",
    "buses": [
      "L",
      "P"
    ]
  },
  {
    "name": "Manohara Ward 4 Office",
    "nepali": "",
    "buses": [
      "L",
      "P"
    ]
  },
  {
    "name": "Gokarneshwor Yatayat Bus Park, Danchhi",
    "nepali": "",
    "buses": [
      "L"
    ]
  },
  {
    "name": "NIC Asia Bank Danchhi",
    "nepali": "",
    "buses": [
      "L",
      "P"
    ]
  },
  {
    "name": "Indrayani Exchange",
    "nepali": "",
    "buses": [
      "L",
      "P"
    ]
  },
  {
    "name": "Kageshwori Manohara Municipality",
    "nepali": "",
    "buses": [
      "L",
      "P"
    ]
  },
  {
    "name": "Brahmakhel Chowk",
    "nepali": "",
    "buses": [
      "L",
      "P"
    ]
  },
  {
    "name": "Panchpokhari Yatayat Bus Park, Danchhi",
    "nepali": "",
    "buses": [
      "P"
    ]
  },
  {
    "name": "Saraswotikhel Bus Park",
    "nepali": "",
    "buses": [
      "L",
      "P"
    ]
  },
  {
    "name": "ONagdhunga Checkpost",
    "nepali": "",
    "buses": [
      "C"
    ]
  },
  {
    "name": "Thankot Checkpost",
    "nepali": "",
    "buses": [
      "C"
    ]
  },
  {
    "name": "Nepal Telecom Balambu",
    "nepali": "",
    "buses": [
      "O",
      "C"
    ]
  },
  {
    "name": "Chandragiri Cable Car Bottom Station",
    "nepali": "",
    "buses": [
      "C"
    ]
  },
  {
    "name": "Chandragiri Cable Car Bottom Station",
    "nepali": "",
    "buses": [
      "C",
      "O"
    ]
  },
  {
    "name": "Trinetra Futsal Court",
    "nepali": "",
    "buses": [
      "C"
    ]
  },
  {
    "name": "Sahari Swasthya Kendra",
    "nepali": "",
    "buses": [
      "C",
      "O"
    ]
  },
  {
    "name": "Godam Thankot",
    "nepali": "",
    "buses": [
      "C"
    ]
  },
  {
    "name": "Mahadevsthan Swasthya Chauki",
    "nepali": "",
    "buses": [
      "C"
    ]
  },
  {
    "name": "Krishan Temple",
    "nepali": "",
    "buses": [
      "C"
    ]
  },
  {
    "name": "Panchpokhari Bus Park",
    "nepali": "",
    "buses": [
      "O",
      "C"
    ]
  },
  {
    "name": "Police Circle Kalimati",
    "nepali": "",
    "buses": [
      "O",
      "S",
      "K",
      "I",
      "N",
      "Y",
      "B",
      "X",
      "M",
      "C"
    ]
  },
  {
    "name": "Police Circle mati",
    "nepali": "",
    "buses": [
      "S",
      "K",
      "I",
      "N",
      "O",
      "Y",
      "B",
      "X",
      "M",
      "C"
    ]
  },
  {
    "name": "Kuleshwor Awas Kshetra",
    "nepali": "",
    "buses": [
      "S",
      "K",
      "I",
      "N",
      "B",
      "X",
      "M"
    ]
  },
  {
    "name": "Kitab Kalam Stationery Mart",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "X",
      "M",
      "K",
      "I",
      "N"
    ]
  },
  {
    "name": "Kitab Kalam tationery Mart",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "X",
      "M",
      "K",
      "I",
      "N"
    ]
  },
  {
    "name": "Sita Petrol Pump",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "X",
      "M"
    ]
  },
  {
    "name": "Shree Dakshinkali Petrol Pump",
    "nepali": "",
    "buses": [
      "K",
      "I",
      "B",
      "S",
      "X",
      "M",
      "N"
    ]
  },
  {
    "name": "Janavikas Secondary School",
    "nepali": "",
    "buses": [
      "K",
      "I",
      "B",
      "S",
      "X",
      "M",
      "N"
    ]
  },
  {
    "name": "Janavikas ondary School",
    "nepali": "",
    "buses": [
      "K",
      "I",
      "B",
      "S",
      "X",
      "M",
      "N"
    ]
  },
  {
    "name": "Dillibazar",
    "nepali": "",
    "buses": [
      "D",
      "Y",
      "L",
      "P",
      "H",
      "J",
      "G",
      "B",
      "N",
      "S",
      "R"
    ]
  },
  {
    "name": "Bir Hospital NAC",
    "nepali": "",
    "buses": [
      "R",
      "E",
      "O",
      "Y",
      "A",
      "H",
      "B",
      "S",
      "C",
      "K",
      "I",
      "P",
      "N",
      "T",
      "F",
      "Z",
      "L",
      "J",
      "G",
      "D"
    ]
  },
  {
    "name": "Tundikhel Bhrikuti",
    "nepali": "",
    "buses": [
      "R",
      "S",
      "L",
      "P",
      "H",
      "J",
      "G",
      "D",
      "Y",
      "B",
      "C",
      "K",
      "I",
      "N",
      "E",
      "O",
      "T",
      "F",
      "Z",
      "A"
    ]
  },
  {
    "name": "NAC Sundhara",
    "nepali": "",
    "buses": [
      "E",
      "O",
      "Y",
      "R",
      "B",
      "S",
      "C",
      "K",
      "I",
      "P",
      "N",
      "A",
      "H",
      "T",
      "F",
      "Z",
      "L",
      "J",
      "G",
      "D"
    ]
  },
  {
    "name": "Bhrikuti Mandap",
    "nepali": "",
    "buses": [
      "R",
      "S",
      "B",
      "C",
      "K",
      "I",
      "P",
      "N",
      "Y",
      "L",
      "H",
      "J",
      "G",
      "E",
      "O",
      "D",
      "T",
      "F",
      "Z",
      "A"
    ]
  },
  {
    "name": "New Plaza",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "R",
      "D",
      "Y",
      "L",
      "P",
      "H",
      "J",
      "G",
      "N"
    ]
  },
  {
    "name": "Sundhara Sahid",
    "nepali": "",
    "buses": [
      "Y",
      "E",
      "O",
      "B",
      "S",
      "C",
      "K",
      "I",
      "P",
      "N",
      "R",
      "A",
      "H",
      "T",
      "F",
      "Z",
      "L",
      "J",
      "G",
      "D"
    ]
  },
  {
    "name": "Sahid Gate",
    "nepali": "",
    "buses": [
      "Y",
      "O",
      "E",
      "B",
      "S",
      "C",
      "K",
      "I",
      "P",
      "N",
      "R",
      "A",
      "H",
      "T",
      "F",
      "Z",
      "L",
      "J",
      "G",
      "D"
    ]
  },
  {
    "name": "Singha Durbar",
    "nepali": "",
    "buses": [
      "B",
      "R",
      "S",
      "D",
      "Y",
      "I",
      "P",
      "N",
      "L"
    ]
  },
  {
    "name": "Anamnagar",
    "nepali": "",
    "buses": [
      "R",
      "S",
      "B",
      "N"
    ]
  },
  {
    "name": "Supreme Court",
    "nepali": "",
    "buses": [
      "B",
      "R",
      "S",
      "I",
      "P",
      "N"
    ]
  },
  {
    "name": "Suryamukhi Chowk",
    "nepali": "",
    "buses": [
      "G",
      "R",
      "B",
      "S"
    ]
  },
  {
    "name": "Big Mart (Pepsicola)",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "G",
      "R",
      "X"
    ]
  },
  {
    "name": "Sai Ram Chowk",
    "nepali": "",
    "buses": [
      "G",
      "R",
      "B",
      "S",
      "X"
    ]
  },
  {
    "name": "Manohara Bridge",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "X",
      "G",
      "R"
    ]
  },
  {
    "name": "Sanothimi (Panika)",
    "nepali": "",
    "buses": [
      "X",
      "B",
      "S",
      "G"
    ]
  },
  {
    "name": "Police Sector (Narephat)",
    "nepali": "",
    "buses": [
      "N",
      "B",
      "S",
      "X",
      "G",
      "R"
    ]
  },
  {
    "name": "Manohara (Narephant - Imadol)",
    "nepali": "",
    "buses": [
      "N"
    ]
  },
  {
    "name": "Manohara Bridge",
    "nepali": "",
    "buses": [
      "N"
    ]
  },
  {
    "name": "Mahalaxmi Municipality Ward 3 Office",
    "nepali": "",
    "buses": [
      "N"
    ]
  },
  {
    "name": "Bogateshwor Mahadev Temple",
    "nepali": "",
    "buses": [
      "N"
    ]
  },
  {
    "name": "Tikathali Panitanki",
    "nepali": "",
    "buses": [
      "N"
    ]
  },
  {
    "name": "Nepal Yatayat Bus Park (Tikathali)",
    "nepali": "",
    "buses": [
      "N"
    ]
  },
  {
    "name": "Sanothimi",
    "nepali": "",
    "buses": [
      "X",
      "B",
      "S"
    ]
  },
  {
    "name": "Big Mart Bahaka Bazar",
    "nepali": "",
    "buses": [
      "X",
      "B",
      "S"
    ]
  },
  {
    "name": "Siddhikali Chowk",
    "nepali": "",
    "buses": [
      "X",
      "S",
      "B"
    ]
  },
  {
    "name": "Bahakha Bazaar (Purano Thimi)",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "X"
    ]
  },
  {
    "name": "Sanothimi",
    "nepali": "",
    "buses": [
      "X",
      "B",
      "S"
    ]
  },
  {
    "name": "Madhyapur Bus Stop",
    "nepali": "",
    "buses": [
      "X",
      "B",
      "S"
    ]
  },
  {
    "name": "Radhe Radhe Chowk",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "X"
    ]
  },
  {
    "name": "Nagadesh Bus Stop",
    "nepali": "",
    "buses": [
      "X",
      "B",
      "S"
    ]
  },
  {
    "name": "University Grants Commission (UGC)",
    "nepali": "",
    "buses": [
      "X",
      "B",
      "S"
    ]
  },
  {
    "name": "Indreni Polytechnic Institute",
    "nepali": "",
    "buses": [
      "X",
      "B",
      "S"
    ]
  },
  {
    "name": "Big Mart (Gatthaghar)",
    "nepali": "",
    "buses": [
      "X",
      "B",
      "S"
    ]
  },
  {
    "name": "Dhungedhara (Nikosera)",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "X"
    ]
  },
  {
    "name": "Haku Falcha (Bhaktapur)",
    "nepali": "",
    "buses": [
      "B"
    ]
  },
  {
    "name": "Mahalaxmi Bus Stop",
    "nepali": "",
    "buses": [
      "B"
    ]
  },
  {
    "name": "Kamal Binayak",
    "nepali": "",
    "buses": [
      "B"
    ]
  },
  {
    "name": "Sallaghari Shopping Complex",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "X"
    ]
  },
  {
    "name": "Bhaktapur Hospital",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "X"
    ]
  },
  {
    "name": "Bhaktapur Mini Bus Park",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "X"
    ]
  },
  {
    "name": "Hanumante Bridge",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "X"
    ]
  },
  {
    "name": "Sallaghari Tinkune",
    "nepali": "",
    "buses": [
      "B"
    ]
  },
  {
    "name": "Kamal Binayak",
    "nepali": "",
    "buses": [
      "B"
    ]
  },
  {
    "name": "Chyamhasingh Bus Park",
    "nepali": "",
    "buses": [
      "B"
    ]
  },
  {
    "name": "Khwopa College of Engineering",
    "nepali": "",
    "buses": [
      "B"
    ]
  },
  {
    "name": "Kumari Bank (Jagati)",
    "nepali": "",
    "buses": [
      "B"
    ]
  },
  {
    "name": "Rush Cutter Petrol Pump",
    "nepali": "",
    "buses": [
      "K",
      "I",
      "B",
      "S",
      "X",
      "M",
      "N"
    ]
  },
  {
    "name": "Laboratory Secondary School",
    "nepali": "",
    "buses": [
      "K",
      "I"
    ]
  },
  {
    "name": "Laboratory ondary School",
    "nepali": "",
    "buses": [
      "K",
      "I"
    ]
  },
  {
    "name": "Ayurveda Campus & Teaching Hospital",
    "nepali": "",
    "buses": [
      "K",
      "I"
    ]
  },
  {
    "name": "Loktantrik Chowk",
    "nepali": "",
    "buses": [
      "K",
      "I"
    ]
  },
  {
    "name": "B.P. Koirala Memorial Planetarium & Science Museum",
    "nepali": "",
    "buses": [
      "K",
      "I"
    ]
  },
  {
    "name": "National Center for Fruit Development",
    "nepali": "",
    "buses": [
      "K",
      "I"
    ]
  },
  {
    "name": "Police Circle (Kirtipur)",
    "nepali": "",
    "buses": [
      "K",
      "I"
    ]
  },
  {
    "name": "KUKL Water Distribution Center",
    "nepali": "",
    "buses": [
      "I",
      "K"
    ]
  },
  {
    "name": "KUKL Water ibution Center",
    "nepali": "",
    "buses": [
      "I",
      "K"
    ]
  },
  {
    "name": "Bagh Bhairab Boarding High School",
    "nepali": "",
    "buses": [
      "K",
      "I"
    ]
  },
  {
    "name": "Nawajyoti School",
    "nepali": "",
    "buses": [
      "K",
      "I"
    ]
  },
  {
    "name": "Bhajangal Water Tank",
    "nepali": "",
    "buses": [
      "I",
      "K"
    ]
  },
  {
    "name": "Bishnudevi Temple",
    "nepali": "",
    "buses": [
      "K",
      "I"
    ]
  },
  {
    "name": "Rata Chowk",
    "nepali": "",
    "buses": [
      "B",
      "X",
      "M",
      "R"
    ]
  },
  {
    "name": "Dhapakhel Dobato",
    "nepali": "",
    "buses": [
      "S",
      "R",
      "B",
      "X",
      "M",
      "P"
    ]
  },
  {
    "name": "KUKLWater Distribution Center",
    "nepali": "",
    "buses": [
      "I",
      "K"
    ]
  },
  {
    "name": "KUKLWater ibution Center",
    "nepali": "",
    "buses": [
      "I",
      "K"
    ]
  },
  {
    "name": "Wai Wai Noodles Factory",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Adarsha Saula Yubak Secondary School",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Rata Makai Chowk",
    "nepali": "",
    "buses": [
      "B",
      "X",
      "M",
      "R"
    ]
  },
  {
    "name": "Mahalaxmi Municipality Office",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Bhatbhateni (Siddhipur)",
    "nepali": "",
    "buses": [
      "S",
      "R"
    ]
  },
  {
    "name": "Thasikwa Falcha",
    "nepali": "",
    "buses": [
      "S",
      "R"
    ]
  },
  {
    "name": "Siddhipur Height Gate",
    "nepali": "",
    "buses": [
      "S",
      "R"
    ]
  },
  {
    "name": "Siddhipur Drinking Water Plant",
    "nepali": "",
    "buses": [
      "S",
      "R"
    ]
  },
  {
    "name": "Harisiddhi Naya Basti",
    "nepali": "",
    "buses": [
      "S",
      "R"
    ]
  },
  {
    "name": "Lakhur Chowk (Harisiddhi)",
    "nepali": "",
    "buses": [
      "S",
      "R"
    ]
  },
  {
    "name": "Dhulikhel Hospital",
    "nepali": "",
    "buses": [
      "X"
    ]
  },
  {
    "name": "Nepal Telecom (Thecho)",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Tikabhairab Temple",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Champeshwori (Chameshwori) Temple",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Sundar Basti Entrance",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Shree Khandeshwor",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Kalpana Health Care",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Lolang",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Mahadev Temple",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Center",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Dharmasthali",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Oxford Driving",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Training Center",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Paiyatar Height",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Naya Basti Entrance",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Ward 6 Office",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Jor Ganesh Temple",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Bohoratar",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Entrance Gate",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Shree Bangalamukhi",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Friendship Colony",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Bangalamukhi Mai",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Pirkun Bus Stop",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Mai Temple",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Bohoratar",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "ole",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Temple Entrance Gate",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Goldhunga",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Bohoratar",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Diamond Chowk",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Times Academy",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Sunflower",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Crystal Store",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Secondary School",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Nepal Yoga Home",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Deepshikha High School",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Lolang Pharmacy",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Sunflower Bridge",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Housing Society",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Balapan Pre-School",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Lolang Height",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Summer Angels'School",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Milan Basti",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Entrance Gate",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Chowk",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Goldhunga",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "J.S.Driving Center",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Sanskriti Shikshya",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Chowk",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "New Life",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Sadan School",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Rehabilitation Center",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Swarnim Basti",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Lolang Ratopul",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Entrance Gate",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Lolang",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Dhinchen Samten",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Choyeling Gumba",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Lolang",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Academy School",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Goldhunga",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Purano Guheshwori",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Shivapuri Nagarjun",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "National Park Entrance",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Aagaman Academy",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "School",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Fulbari Gate",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Army Camp",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Srijana Gyansagal",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Chardobato",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Secondary School",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Ganesh Mandir",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Ganesh Mandir",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Lakhapata Bridge",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Savyata Pathshala",
    "nepali": "",
    "buses": [
      "F"
    ]
  },
  {
    "name": "Cinen",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Buddha Chowk, Raniban",
    "nepali": "",
    "buses": [
      "F"
    ]
  },
  {
    "name": "Svetah Bhawan",
    "nepali": "",
    "buses": [
      "F"
    ]
  },
  {
    "name": "Nagarjun Futsal",
    "nepali": "",
    "buses": [
      "F"
    ]
  },
  {
    "name": "Bijayanagar Chowk",
    "nepali": "",
    "buses": [
      "F"
    ]
  },
  {
    "name": "Radha Krishna Temple",
    "nepali": "",
    "buses": [
      "F"
    ]
  },
  {
    "name": "Raniban",
    "nepali": "",
    "buses": [
      "F"
    ]
  },
  {
    "name": "Army Rehabilitation",
    "nepali": "",
    "buses": [
      "F"
    ]
  },
  {
    "name": "Center",
    "nepali": "",
    "buses": [
      "F"
    ]
  },
  {
    "name": "pdnispunnng",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Halesi Mahadev Temple",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Khadka Bhanjyang",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Padamsal",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Phutung Pati",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Phutung Secondary School",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Police Station",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Phutung Micro Bus Stand",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Dhakaltar",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Municipality Office",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Ward 7 Office",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "School",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Phutung Naag Pokhari",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "ialapan Pre-School",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Kalpeshwor Mahadev Temple",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "intrance Gate",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Jarankhupul",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Phutung",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Tushal Chowk",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Romas Library",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "intrance Gate",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Mahadev Temple",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Sadbhav Basti",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Sano Pul",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Dandagaun Police Station",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Pipaldanda Chowk",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Manamaiju Oil Store",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Petrol Pump",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Srijana Gyansagar",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Manamaiju",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Micro Station",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Him Rashmi High School",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Shanti Tole",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Seshmati Bridge",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Angels' Heart",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Parijat Colony",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Manamaju",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Secondary School",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Seshmati",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Bishnumati",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Jeevan Jyoti English",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Boarding School",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Live Bakery Nepaltar",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Tokha Saraswati",
    "nepali": "",
    "buses": [
      "Z",
      "B",
      "S"
    ]
  },
  {
    "name": "Cinema Hall",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Charghare Gate",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Tokha Municipality",
    "nepali": "",
    "buses": [
      "Z",
      "B",
      "S",
      "Y"
    ]
  },
  {
    "name": "Gramin Adarsha",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "NIM Gongabu Churo",
    "nepali": "",
    "buses": [
      "M",
      "Z",
      "B",
      "S",
      "Y"
    ]
  },
  {
    "name": "Bishnumati Temple",
    "nepali": "",
    "buses": [
      "M",
      "Z",
      "B",
      "S",
      "Y"
    ]
  },
  {
    "name": "Nepaltar Bridge",
    "nepali": "",
    "buses": [
      "T",
      "F"
    ]
  },
  {
    "name": "Naya Bus Park",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "M",
      "Z",
      "Y"
    ]
  },
  {
    "name": "Bal Batika",
    "nepali": "",
    "buses": [
      "T",
      "F",
      "M"
    ]
  },
  {
    "name": "International School",
    "nepali": "",
    "buses": [
      "T",
      "F",
      "M",
      "B"
    ]
  },
  {
    "name": "Ganesh English",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Secondary School",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Tokha Chandeshwori",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Hospital",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Tokha Ganeshsthan",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Mandir",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Ganeshman Singh",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Park",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Tokha Entrance Gate",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Land Revenue Office",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Tokha Saraswati",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Bus Stop",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Saibaba Chowk",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Taleju Bhawani",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Petrol Pump",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Dhalmal",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Sherpa Oil Store",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Tokha Police Station",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Dhaneshwor-Manamaiju",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Bridge",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Grande International",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Indrayani Bridge",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Hospital",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Bhat-Bhateni",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Dham",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Super Store Tokha",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Ganesh Mandir",
    "nepali": "",
    "buses": [
      "Z",
      "Y"
    ]
  },
  {
    "name": "Greenland Int'l",
    "nepali": "",
    "buses": [
      "Z",
      "Y"
    ]
  },
  {
    "name": "Ganeshsthan",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Boarding High School",
    "nepali": "",
    "buses": [
      "Z",
      "Y"
    ]
  },
  {
    "name": "Park",
    "nepali": "",
    "buses": [
      "Z",
      "B",
      "S"
    ]
  },
  {
    "name": "Fruits and Vegetable Market",
    "nepali": "",
    "buses": [
      "Z",
      "Y"
    ]
  },
  {
    "name": "Banquet",
    "nepali": "",
    "buses": [
      "Z",
      "Y"
    ]
  },
  {
    "name": "Bich Vinayak",
    "nepali": "",
    "buses": [
      "Z",
      "Y",
      "B",
      "S"
    ]
  },
  {
    "name": "Basundhara Chowk",
    "nepali": "",
    "buses": [
      "Y",
      "O"
    ]
  },
  {
    "name": "Ward 9 Office",
    "nepali": "",
    "buses": [
      "Z",
      "B",
      "S",
      "Y"
    ]
  },
  {
    "name": "Ganeshsthan",
    "nepali": "",
    "buses": [
      "Z",
      "Y",
      "B",
      "S"
    ]
  },
  {
    "name": "Big Mart",
    "nepali": "",
    "buses": [
      "Z",
      "Y",
      "M"
    ]
  },
  {
    "name": "NIM Gongabu Church",
    "nepali": "",
    "buses": [
      "M",
      "Z",
      "S",
      "B",
      "Y"
    ]
  },
  {
    "name": "Kharibot, Tokha Road",
    "nepali": "",
    "buses": [
      "Z",
      "Y",
      "M"
    ]
  },
  {
    "name": "Guru Mart",
    "nepali": "",
    "buses": [
      "Z",
      "Y",
      "M",
      "B",
      "S"
    ]
  },
  {
    "name": "Infinity Movies",
    "nepali": "",
    "buses": [
      "M",
      "Z",
      "Y",
      "B",
      "S"
    ]
  },
  {
    "name": "Aakash Jogini Enterprises",
    "nepali": "",
    "buses": [
      "Y",
      "Z",
      "M",
      "B",
      "S"
    ]
  },
  {
    "name": "Samakhusi Town Planning",
    "nepali": "",
    "buses": [
      "Z",
      "M",
      "Y",
      "B",
      "S"
    ]
  },
  {
    "name": "Gongabu (New Bus Park / Naya Bus Park)",
    "nepali": "",
    "buses": [
      "M",
      "Z",
      "B",
      "S",
      "Y"
    ]
  },
  {
    "name": "Petrol Pump",
    "nepali": "",
    "buses": [
      "Y",
      "M",
      "Z",
      "B",
      "S"
    ]
  },
  {
    "name": "Talim Kendra",
    "nepali": "",
    "buses": [
      "Y",
      "M",
      "Z",
      "B",
      "S"
    ]
  },
  {
    "name": "Chauki",
    "nepali": "",
    "buses": [
      "Y",
      "M",
      "Z",
      "B",
      "S"
    ]
  },
  {
    "name": "Tridevi Mandir",
    "nepali": "",
    "buses": [
      "S",
      "A"
    ]
  },
  {
    "name": "Sahajmarga",
    "nepali": "",
    "buses": [
      "S",
      "A"
    ]
  },
  {
    "name": "Microbus Station",
    "nepali": "",
    "buses": [
      "O",
      "S",
      "A",
      "Y"
    ]
  },
  {
    "name": "Rhythm Bakery",
    "nepali": "",
    "buses": [
      "O",
      "S",
      "A",
      "Y"
    ]
  },
  {
    "name": "Chapali",
    "nepali": "",
    "buses": [
      "S",
      "A"
    ]
  },
  {
    "name": "Happy Chowk",
    "nepali": "",
    "buses": [
      "Y",
      "S",
      "A",
      "O"
    ]
  },
  {
    "name": "Ganesh Chowk",
    "nepali": "",
    "buses": [
      "O",
      "Y"
    ]
  },
  {
    "name": "Lokeshwor Park",
    "nepali": "",
    "buses": [
      "Y",
      "O",
      "S",
      "A"
    ]
  },
  {
    "name": "Nursery Chowk",
    "nepali": "",
    "buses": [
      "Y",
      "O",
      "S",
      "A"
    ]
  },
  {
    "name": "Sukunda Banquet",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "Y",
      "O"
    ]
  },
  {
    "name": "Hattigauda Chowk",
    "nepali": "",
    "buses": [
      "O",
      "Y"
    ]
  },
  {
    "name": "Anita Milan",
    "nepali": "",
    "buses": [
      "Y",
      "O",
      "S",
      "A"
    ]
  },
  {
    "name": "Kindergarten",
    "nepali": "",
    "buses": [
      "Y",
      "O",
      "S",
      "A"
    ]
  },
  {
    "name": "Sapredhunga Pul",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "Y",
      "E"
    ]
  },
  {
    "name": "Naulin",
    "nepali": "",
    "buses": [
      "Y",
      "S",
      "A",
      "O"
    ]
  },
  {
    "name": "Panchashil Marga",
    "nepali": "",
    "buses": [
      "Y",
      "O"
    ]
  },
  {
    "name": "Kapan Monastery / Chowk",
    "nepali": "",
    "buses": [
      "Y",
      "O",
      "S",
      "A"
    ]
  },
  {
    "name": "Ananta Studio Cafe",
    "nepali": "",
    "buses": [
      "Y",
      "O"
    ]
  },
  {
    "name": "Shrestha Swimming",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "E",
      "Y"
    ]
  },
  {
    "name": "pre",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Pool and Futsal",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "E",
      "Y"
    ]
  },
  {
    "name": "Hariyo Pul",
    "nepali": "",
    "buses": [
      "Y",
      "O",
      "S",
      "A"
    ]
  },
  {
    "name": "Station",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Tallo Bhangal",
    "nepali": "",
    "buses": [
      "Y",
      "O"
    ]
  },
  {
    "name": "Pahelo Pul",
    "nepali": "",
    "buses": [
      "Y",
      "O",
      "S",
      "A"
    ]
  },
  {
    "name": "Big Mart",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "E",
      "Y"
    ]
  },
  {
    "name": "Special Chowk",
    "nepali": "",
    "buses": [
      "O",
      "Y"
    ]
  },
  {
    "name": "Kapan Monastery / Chowk",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "E",
      "Y"
    ]
  },
  {
    "name": "Sweet Science",
    "nepali": "",
    "buses": [
      "Y",
      "S",
      "A",
      "E"
    ]
  },
  {
    "name": "Boxing and Fitness",
    "nepali": "",
    "buses": [
      "Y",
      "S",
      "A",
      "E"
    ]
  },
  {
    "name": "Municipality Hospital",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "E",
      "L"
    ]
  },
  {
    "name": "Golfutar Basketball Court",
    "nepali": "",
    "buses": [
      "O",
      "Y"
    ]
  },
  {
    "name": "Concern",
    "nepali": "",
    "buses": [
      "E",
      "S",
      "A",
      "L"
    ]
  },
  {
    "name": "Kapan Sekuwa",
    "nepali": "",
    "buses": [
      "Y",
      "S",
      "A",
      "O"
    ]
  },
  {
    "name": "Restaurant",
    "nepali": "",
    "buses": [
      "Y",
      "S",
      "A",
      "E"
    ]
  },
  {
    "name": "Kantipur Futsal",
    "nepali": "",
    "buses": [
      "Y",
      "S",
      "A",
      "E"
    ]
  },
  {
    "name": "Kapan Monastery / Chowk",
    "nepali": "",
    "buses": [
      "E",
      "S",
      "A",
      "L"
    ]
  },
  {
    "name": "Ekatabasti Mode",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "Y",
      "O"
    ]
  },
  {
    "name": "Big Mart",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "Y",
      "E"
    ]
  },
  {
    "name": "Bansbari",
    "nepali": "",
    "buses": [
      "O",
      "Y",
      "S",
      "A"
    ]
  },
  {
    "name": "Rudramati Chowk",
    "nepali": "",
    "buses": [
      "E",
      "S",
      "A",
      "Y"
    ]
  },
  {
    "name": "National Media",
    "nepali": "",
    "buses": [
      "E",
      "S",
      "A",
      "Y"
    ]
  },
  {
    "name": "Center",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "Y",
      "E"
    ]
  },
  {
    "name": "Development Center",
    "nepali": "",
    "buses": [
      "E",
      "S",
      "A",
      "Y"
    ]
  },
  {
    "name": "Narayan Gopal",
    "nepali": "",
    "buses": [
      "Y",
      "O",
      "S",
      "A"
    ]
  },
  {
    "name": "Chowk (Chakrapath",
    "nepali": "",
    "buses": [
      "Y",
      "S",
      "A",
      "O"
    ]
  },
  {
    "name": "Hem Ganga Kala",
    "nepali": "",
    "buses": [
      "E",
      "Y",
      "S",
      "A"
    ]
  },
  {
    "name": "Ramcha Chowk",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "Y",
      "E"
    ]
  },
  {
    "name": "Nilopul",
    "nepali": "",
    "buses": [
      "E",
      "Y",
      "S",
      "A"
    ]
  },
  {
    "name": "Sahitya Pratisthan",
    "nepali": "",
    "buses": [
      "E",
      "Y",
      "S",
      "A"
    ]
  },
  {
    "name": "Shivapuri Chowk",
    "nepali": "",
    "buses": [
      "E",
      "Y"
    ]
  },
  {
    "name": "Royal Himalayan Coffee",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "E",
      "Y"
    ]
  },
  {
    "name": "Pvt. Ltd",
    "nepali": "",
    "buses": [
      "Y",
      "O"
    ]
  },
  {
    "name": "Pradesh Park",
    "nepali": "",
    "buses": [
      "Y",
      "O"
    ]
  },
  {
    "name": "Riverside Sports",
    "nepali": "",
    "buses": [
      "Y",
      "O"
    ]
  },
  {
    "name": "Furniture Chautari",
    "nepali": "",
    "buses": [
      "Y",
      "O"
    ]
  },
  {
    "name": "Chunikhel - Mahankal",
    "nepali": "",
    "buses": [
      "Y",
      "O"
    ]
  },
  {
    "name": "Bridge",
    "nepali": "",
    "buses": [
      "Y",
      "O"
    ]
  },
  {
    "name": "Chiya Mantra Tea Shop",
    "nepali": "",
    "buses": [
      "Y",
      "O"
    ]
  },
  {
    "name": "Green City Colony",
    "nepali": "",
    "buses": [
      "Y",
      "S",
      "A",
      "O"
    ]
  },
  {
    "name": "Happy Kids Kindergarten",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "Y"
    ]
  },
  {
    "name": "Chunikhel",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "Y",
      "O"
    ]
  },
  {
    "name": "Hakucha Bridge",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "Y"
    ]
  },
  {
    "name": "Shrestha Skate Park",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "Y",
      "L"
    ]
  },
  {
    "name": "Swarupa Tole",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "Y"
    ]
  },
  {
    "name": "Nepal Yatayat Bus Park",
    "nepali": "",
    "buses": [
      "N",
      "L"
    ]
  },
  {
    "name": "Kapan Monastery / Chowk",
    "nepali": "",
    "buses": [
      "L",
      "N"
    ]
  },
  {
    "name": "Bangalamukhi Temple",
    "nepali": "",
    "buses": [
      "N",
      "L"
    ]
  },
  {
    "name": "Gate",
    "nepali": "",
    "buses": [
      "L",
      "N"
    ]
  },
  {
    "name": "basti",
    "nepali": "",
    "buses": [
      "Y",
      "S",
      "A",
      "O"
    ]
  },
  {
    "name": "Dhaulagiri Chowk",
    "nepali": "",
    "buses": [
      "N",
      "L"
    ]
  },
  {
    "name": "Aakashedhara",
    "nepali": "",
    "buses": [
      "E",
      "L",
      "S",
      "A",
      "N"
    ]
  },
  {
    "name": "Micro Bus Park",
    "nepali": "",
    "buses": [
      "E",
      "L",
      "S",
      "A",
      "N"
    ]
  },
  {
    "name": "Aani Gumba (White Monastery)",
    "nepali": "",
    "buses": [
      "N",
      "L"
    ]
  },
  {
    "name": "Kapan Handball",
    "nepali": "",
    "buses": [
      "E",
      "L",
      "S",
      "A",
      "N"
    ]
  },
  {
    "name": "Sports Ground",
    "nepali": "",
    "buses": [
      "E",
      "L",
      "S",
      "A",
      "N"
    ]
  },
  {
    "name": "Kharibot Chowk",
    "nepali": "",
    "buses": [
      "N",
      "L"
    ]
  },
  {
    "name": "Ward No.10Ofice",
    "nepali": "",
    "buses": [
      "E",
      "L",
      "S",
      "A",
      "N"
    ]
  },
  {
    "name": "Faika",
    "nepali": "",
    "buses": [
      "N",
      "L"
    ]
  },
  {
    "name": "Kapan Monastery / Chowk",
    "nepali": "",
    "buses": [
      "N",
      "L"
    ]
  },
  {
    "name": "Mandala Banquet",
    "nepali": "",
    "buses": [
      "N",
      "L"
    ]
  },
  {
    "name": "Mugum Gumba",
    "nepali": "",
    "buses": [
      "N",
      "H",
      "L"
    ]
  },
  {
    "name": "Bank",
    "nepali": "",
    "buses": [
      "F"
    ]
  },
  {
    "name": "Machhapokhari Bus Stop",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "M",
      "T",
      "Y",
      "F"
    ]
  },
  {
    "name": "Balaju Bypass / Machhapokhari",
    "nepali": "",
    "buses": [
      "T",
      "F",
      "M",
      "B",
      "S"
    ]
  },
  {
    "name": "Corona Pre-School",
    "nepali": "",
    "buses": [
      "F"
    ]
  },
  {
    "name": "Nepal School of",
    "nepali": "",
    "buses": [
      "T",
      "F",
      "B",
      "S",
      "M",
      "Y"
    ]
  },
  {
    "name": "Hotel Management",
    "nepali": "",
    "buses": [
      "T",
      "F",
      "M",
      "B",
      "S",
      "Y"
    ]
  },
  {
    "name": "Big Mart Supermarket",
    "nepali": "",
    "buses": [
      "F",
      "M",
      "T"
    ]
  },
  {
    "name": "Yerahity",
    "nepali": "",
    "buses": [
      "F",
      "M",
      "T",
      "Y"
    ]
  },
  {
    "name": "Om Saibaba",
    "nepali": "",
    "buses": [
      "M",
      "T",
      "F",
      "Y"
    ]
  },
  {
    "name": "Yerahity",
    "nepali": "",
    "buses": [
      "M",
      "F",
      "T",
      "Y"
    ]
  },
  {
    "name": "Memorial Hospital",
    "nepali": "",
    "buses": [
      "M",
      "T",
      "F",
      "Y"
    ]
  },
  {
    "name": "Vibhuti Secondary School",
    "nepali": "",
    "buses": [
      "F",
      "M",
      "T",
      "Y"
    ]
  },
  {
    "name": "Dhunge Dhara",
    "nepali": "",
    "buses": [
      "M",
      "T",
      "F",
      "Y",
      "B",
      "S"
    ]
  },
  {
    "name": "Banasthali",
    "nepali": "",
    "buses": [
      "M",
      "T",
      "F",
      "Y",
      "B",
      "S"
    ]
  },
  {
    "name": "Naya Bazaar",
    "nepali": "",
    "buses": [
      "F",
      "T",
      "D"
    ]
  },
  {
    "name": "Sorhakhutte Chowk",
    "nepali": "",
    "buses": [
      "F",
      "T",
      "D",
      "Z",
      "A"
    ]
  },
  {
    "name": "Sitapaila Chowk",
    "nepali": "",
    "buses": [
      "Y",
      "S",
      "M",
      "T",
      "A"
    ]
  },
  {
    "name": "Teaching Hospital",
    "nepali": "",
    "buses": [
      "O",
      "S",
      "A",
      "B",
      "M",
      "E",
      "I"
    ]
  },
  {
    "name": "Hospital",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "M",
      "I",
      "A"
    ]
  },
  {
    "name": "Bhawan",
    "nepali": "",
    "buses": [
      "S",
      "B",
      "M",
      "I",
      "A",
      "O",
      "E"
    ]
  },
  {
    "name": "Hospital",
    "nepali": "",
    "buses": [
      "O",
      "S",
      "A",
      "B",
      "M",
      "E",
      "I"
    ]
  },
  {
    "name": "Police Hospital",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "I",
      "M",
      "A"
    ]
  },
  {
    "name": "Funpark",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "M",
      "E",
      "O",
      "A",
      "I"
    ]
  },
  {
    "name": "Panipokhari",
    "nepali": "",
    "buses": [
      "I",
      "B",
      "S",
      "A"
    ]
  },
  {
    "name": "Aatma Gyan",
    "nepali": "",
    "buses": [
      "D",
      "Z"
    ]
  },
  {
    "name": "Embassyof China",
    "nepali": "",
    "buses": [
      "O",
      "S",
      "A",
      "I",
      "E",
      "B",
      "M"
    ]
  },
  {
    "name": "Prachar Sangh (AGPS",
    "nepali": "",
    "buses": [
      "D",
      "Z"
    ]
  },
  {
    "name": "Japanese Embassy",
    "nepali": "",
    "buses": [
      "I",
      "Z",
      "S",
      "A"
    ]
  },
  {
    "name": "Kapurdhara",
    "nepali": "",
    "buses": [
      "D",
      "Z",
      "T"
    ]
  },
  {
    "name": "Shangri-La Hotel",
    "nepali": "",
    "buses": [
      "Z",
      "I",
      "S",
      "A"
    ]
  },
  {
    "name": "Gairidhara",
    "nepali": "",
    "buses": [
      "O",
      "S",
      "A",
      "E",
      "I"
    ]
  },
  {
    "name": "Tangal",
    "nepali": "",
    "buses": [
      "O",
      "E",
      "S",
      "A",
      "B",
      "M",
      "I"
    ]
  },
  {
    "name": "Bodhi Books",
    "nepali": "",
    "buses": [
      "E",
      "O",
      "B",
      "S",
      "M"
    ]
  },
  {
    "name": "Gangjong Hotel",
    "nepali": "",
    "buses": [
      "Z",
      "I",
      "S",
      "A"
    ]
  },
  {
    "name": "Tangal",
    "nepali": "",
    "buses": [
      "E",
      "B",
      "S",
      "M",
      "O"
    ]
  },
  {
    "name": "and Bistro",
    "nepali": "",
    "buses": [
      "E",
      "O",
      "B",
      "S",
      "M"
    ]
  },
  {
    "name": "Children Park",
    "nepali": "",
    "buses": [
      "D",
      "Z",
      "T",
      "F",
      "A"
    ]
  },
  {
    "name": "Temple",
    "nepali": "",
    "buses": [
      "O",
      "S",
      "A",
      "E",
      "I"
    ]
  },
  {
    "name": "Radison Hotel",
    "nepali": "",
    "buses": [
      "Z",
      "I",
      "S",
      "A",
      "D"
    ]
  },
  {
    "name": "Siddhartha Bank",
    "nepali": "",
    "buses": [
      "O",
      "E",
      "S",
      "A",
      "I"
    ]
  },
  {
    "name": "Head Ofice",
    "nepali": "",
    "buses": [
      "O",
      "E",
      "S",
      "A",
      "I"
    ]
  },
  {
    "name": "Lazimpat (Hotel Radisson)",
    "nepali": "",
    "buses": [
      "Z",
      "I",
      "S",
      "A",
      "D"
    ]
  },
  {
    "name": "Nepal Police",
    "nepali": "",
    "buses": [
      "O",
      "E",
      "S",
      "A"
    ]
  },
  {
    "name": "Galkopakha M",
    "nepali": "",
    "buses": [
      "D",
      "T",
      "F",
      "Z",
      "A",
      "S",
      "I"
    ]
  },
  {
    "name": "Showroom",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "O",
      "I",
      "E"
    ]
  },
  {
    "name": "Headquarters",
    "nepali": "",
    "buses": [
      "E",
      "O",
      "S",
      "A"
    ]
  },
  {
    "name": "Naxal",
    "nepali": "",
    "buses": [
      "E",
      "O",
      "S",
      "A"
    ]
  },
  {
    "name": "Ncell",
    "nepali": "",
    "buses": [
      "D",
      "Z",
      "A",
      "T",
      "F",
      "S",
      "I"
    ]
  },
  {
    "name": "Machhapuchchhre",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "I",
      "O",
      "E",
      "Z"
    ]
  },
  {
    "name": "Bank",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "I",
      "O",
      "E"
    ]
  },
  {
    "name": "Maligaun",
    "nepali": "",
    "buses": [
      "E",
      "Y",
      "P",
      "H",
      "J",
      "G"
    ]
  },
  {
    "name": "Sanima Bank",
    "nepali": "",
    "buses": [
      "O",
      "E",
      "S",
      "A"
    ]
  },
  {
    "name": "Head Office",
    "nepali": "",
    "buses": [
      "O",
      "E",
      "S",
      "A"
    ]
  },
  {
    "name": "Maligaun",
    "nepali": "",
    "buses": [
      "E",
      "Y",
      "O",
      "P",
      "H",
      "J",
      "G"
    ]
  },
  {
    "name": "Market",
    "nepali": "",
    "buses": [
      "O",
      "E",
      "N",
      "S"
    ]
  },
  {
    "name": "Lainchaur Ground",
    "nepali": "",
    "buses": [
      "S",
      "I",
      "Z",
      "A",
      "D",
      "T",
      "F"
    ]
  },
  {
    "name": "Nandi Ratri",
    "nepali": "",
    "buses": [
      "E",
      "O",
      "N",
      "S"
    ]
  },
  {
    "name": "Secondary School",
    "nepali": "",
    "buses": [
      "E",
      "O",
      "N",
      "S"
    ]
  },
  {
    "name": "Palace",
    "nepali": "",
    "buses": [
      "S",
      "I",
      "A",
      "Z",
      "D",
      "E",
      "O"
    ]
  },
  {
    "name": "Brihaspati",
    "nepali": "",
    "buses": [
      "E",
      "Y",
      "O",
      "N",
      "P",
      "H",
      "J",
      "G"
    ]
  },
  {
    "name": "ASCOL (Amrit Science Campus)",
    "nepali": "",
    "buses": [
      "Z",
      "A",
      "T",
      "F",
      "D",
      "S",
      "I"
    ]
  },
  {
    "name": "Bank",
    "nepali": "",
    "buses": [
      "Y",
      "P",
      "H",
      "J",
      "G",
      "L"
    ]
  },
  {
    "name": "Hall",
    "nepali": "",
    "buses": [
      "E",
      "O",
      "S",
      "I",
      "D",
      "N",
      "A"
    ]
  },
  {
    "name": "Kaiser Mahal",
    "nepali": "",
    "buses": [
      "S",
      "I",
      "D",
      "Z",
      "A",
      "T",
      "F",
      "E",
      "O"
    ]
  },
  {
    "name": "Marriot Hotel",
    "nepali": "",
    "buses": [
      "E",
      "O",
      "N",
      "P"
    ]
  },
  {
    "name": "English School",
    "nepali": "",
    "buses": [
      "Y",
      "N",
      "P",
      "H",
      "J",
      "G",
      "E",
      "L",
      "O"
    ]
  },
  {
    "name": "Bhagwati Temple",
    "nepali": "",
    "buses": [
      "N",
      "O",
      "E",
      "P",
      "H",
      "J",
      "G",
      "L",
      "Y"
    ]
  },
  {
    "name": "Nepal Mountaineering",
    "nepali": "",
    "buses": [
      "O",
      "E",
      "N",
      "P",
      "H",
      "J",
      "G",
      "L",
      "Y",
      "D"
    ]
  },
  {
    "name": "OPipalbot Oralo",
    "nepali": "",
    "buses": [
      "P",
      "H",
      "J",
      "G",
      "Y",
      "L",
      "N",
      "D"
    ]
  },
  {
    "name": "Sano",
    "nepali": "",
    "buses": [
      "Y",
      "N",
      "P",
      "H",
      "J",
      "G",
      "L",
      "E",
      "O",
      "D"
    ]
  },
  {
    "name": "Electricity",
    "nepali": "",
    "buses": [
      "Y",
      "P",
      "H",
      "J",
      "G",
      "L",
      "N",
      "D"
    ]
  },
  {
    "name": "Herald College",
    "nepali": "",
    "buses": [
      "N",
      "O",
      "E",
      "P",
      "H",
      "J",
      "G",
      "L",
      "Y",
      "D"
    ]
  },
  {
    "name": "Regulatory",
    "nepali": "",
    "buses": [
      "Y",
      "P",
      "H",
      "J",
      "G",
      "L",
      "N",
      "D"
    ]
  },
  {
    "name": "Commission",
    "nepali": "",
    "buses": [
      "Y",
      "P",
      "H",
      "J",
      "G",
      "L",
      "N",
      "D"
    ]
  },
  {
    "name": "Gas Station",
    "nepali": "",
    "buses": [
      "P",
      "H",
      "J",
      "G",
      "L",
      "Y",
      "N",
      "D"
    ]
  },
  {
    "name": "Hattisar",
    "nepali": "",
    "buses": [
      "O",
      "E",
      "N",
      "P",
      "H",
      "J",
      "G",
      "L",
      "D",
      "Y"
    ]
  },
  {
    "name": "Kamalpokhari",
    "nepali": "",
    "buses": [
      "N",
      "O",
      "P",
      "H",
      "J",
      "G",
      "E",
      "L",
      "Y",
      "D"
    ]
  },
  {
    "name": "Jamal (Rani Pokhari)",
    "nepali": "",
    "buses": [
      "D",
      "S",
      "I",
      "T",
      "F",
      "Z",
      "A",
      "E",
      "O",
      "H",
      "N",
      "Y",
      "B",
      "C",
      "K",
      "L",
      "P",
      "J",
      "G",
      "R"
    ]
  },
  {
    "name": "Embassy",
    "nepali": "",
    "buses": [
      "Y",
      "P",
      "H",
      "J",
      "G",
      "N",
      "L",
      "D"
    ]
  },
  {
    "name": "Gaucharan",
    "nepali": "",
    "buses": [
      "L",
      "P",
      "H",
      "J",
      "G",
      "Y",
      "N",
      "D"
    ]
  },
  {
    "name": "Tri-Chandra",
    "nepali": "",
    "buses": [
      "O",
      "E",
      "D",
      "N",
      "P",
      "H",
      "J",
      "G",
      "Y",
      "L",
      "S",
      "I",
      "R",
      "T",
      "F",
      "Z",
      "A",
      "B",
      "C",
      "K"
    ]
  },
  {
    "name": "Triangle",
    "nepali": "",
    "buses": [
      "P",
      "H",
      "J",
      "G",
      "L",
      "Y",
      "N",
      "D"
    ]
  },
  {
    "name": "Gyaneshwor",
    "nepali": "",
    "buses": [
      "P",
      "H",
      "J",
      "G",
      "L",
      "N",
      "Y",
      "D",
      "O"
    ]
  },
  {
    "name": "Temple",
    "nepali": "",
    "buses": [
      "N",
      "L",
      "P",
      "H",
      "J",
      "G",
      "Y",
      "D"
    ]
  },
  {
    "name": "Ghantaghar",
    "nepali": "",
    "buses": [
      "E",
      "O",
      "D",
      "N",
      "S",
      "I",
      "Y",
      "P",
      "H",
      "J",
      "G",
      "L",
      "T",
      "F",
      "Z",
      "A",
      "R",
      "B",
      "C",
      "K"
    ]
  },
  {
    "name": "Bhotahiti",
    "nepali": "",
    "buses": [
      "A",
      "H",
      "T",
      "F",
      "Z",
      "R",
      "S",
      "I",
      "B",
      "C",
      "K",
      "L",
      "P",
      "J",
      "G",
      "N",
      "D",
      "E",
      "O",
      "Y"
    ]
  },
  {
    "name": "Sukedhara Chowk",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "E",
      "Y"
    ]
  },
  {
    "name": "Bibek Chowk",
    "nepali": "",
    "buses": [
      "E",
      "Y"
    ]
  },
  {
    "name": "Narayan Chowk",
    "nepali": "",
    "buses": [
      "E"
    ]
  },
  {
    "name": "Queen's Palace",
    "nepali": "",
    "buses": [
      "E",
      "Y",
      "S",
      "A"
    ]
  },
  {
    "name": "U.S.Embassy",
    "nepali": "",
    "buses": [
      "O",
      "S",
      "A",
      "Y"
    ]
  },
  {
    "name": "and Events",
    "nepali": "",
    "buses": [
      "E",
      "Y",
      "S",
      "A"
    ]
  },
  {
    "name": "Dhumbarahi Chowk",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "E",
      "Y"
    ]
  },
  {
    "name": "Kapan Monastery / Chowk",
    "nepali": "",
    "buses": [
      "E",
      "Y"
    ]
  },
  {
    "name": "Grande School",
    "nepali": "",
    "buses": [
      "Y",
      "E",
      "S",
      "A"
    ]
  },
  {
    "name": "Mahankal",
    "nepali": "",
    "buses": [
      "L",
      "N",
      "J",
      "P"
    ]
  },
  {
    "name": "Police Sector",
    "nepali": "",
    "buses": [
      "E",
      "Y",
      "S",
      "A"
    ]
  },
  {
    "name": "Kathmandu Unified",
    "nepali": "",
    "buses": [
      "Y",
      "E"
    ]
  },
  {
    "name": "City School",
    "nepali": "",
    "buses": [
      "Y",
      "E"
    ]
  },
  {
    "name": "Yangtaru Sekuwa Corner",
    "nepali": "",
    "buses": [
      "Y",
      "E",
      "N",
      "L"
    ]
  },
  {
    "name": "Sukedhara Chowk",
    "nepali": "",
    "buses": [
      "Y",
      "E"
    ]
  },
  {
    "name": "Italian Bakery",
    "nepali": "",
    "buses": [
      "Y",
      "E",
      "L",
      "J",
      "N"
    ]
  },
  {
    "name": "Shiva Panchayan Mandir",
    "nepali": "",
    "buses": [
      "Y",
      "E",
      "L",
      "J",
      "N",
      "P",
      "H"
    ]
  },
  {
    "name": "watar",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "M",
      "O",
      "A",
      "I",
      "E"
    ]
  },
  {
    "name": "Film Board Chowk",
    "nepali": "",
    "buses": [
      "Y",
      "L",
      "J",
      "N",
      "E",
      "P",
      "H"
    ]
  },
  {
    "name": "Friendship Community",
    "nepali": "",
    "buses": [
      "E",
      "B",
      "S",
      "M"
    ]
  },
  {
    "name": "China",
    "nepali": "",
    "buses": [
      "O",
      "E",
      "B",
      "S",
      "M",
      "A",
      "I"
    ]
  },
  {
    "name": "Tusal (Boudha)",
    "nepali": "",
    "buses": [
      "L",
      "J",
      "N",
      "P",
      "H"
    ]
  },
  {
    "name": "Hospital",
    "nepali": "",
    "buses": [
      "E",
      "B",
      "S",
      "M"
    ]
  },
  {
    "name": "Secondary School",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "M",
      "E"
    ]
  },
  {
    "name": "Chuchepati",
    "nepali": "",
    "buses": [
      "P",
      "H",
      "L",
      "J",
      "N"
    ]
  },
  {
    "name": "The Insight",
    "nepali": "",
    "buses": [
      "S",
      "M",
      "B",
      "E",
      "P",
      "H",
      "J",
      "G",
      "L",
      "N"
    ]
  },
  {
    "name": "Vision College",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "M",
      "E",
      "P",
      "H",
      "J",
      "G",
      "L",
      "N"
    ]
  },
  {
    "name": "Tangal Marga",
    "nepali": "",
    "buses": [
      "E",
      "O",
      "B",
      "S"
    ]
  },
  {
    "name": "Chabahil Chowk",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "M",
      "L",
      "G",
      "N",
      "P",
      "H",
      "J",
      "Y",
      "E"
    ]
  },
  {
    "name": "Chabahil Chowk",
    "nepali": "",
    "buses": [
      "Y",
      "P",
      "H",
      "L",
      "J",
      "N"
    ]
  },
  {
    "name": "jexe",
    "nepali": "",
    "buses": [
      "E",
      "O"
    ]
  },
  {
    "name": "Texas College of",
    "nepali": "",
    "buses": [
      "P",
      "H",
      "J",
      "G",
      "Y",
      "B",
      "S",
      "M",
      "L",
      "N",
      "E"
    ]
  },
  {
    "name": "Management and IT",
    "nepali": "",
    "buses": [
      "P",
      "H",
      "J",
      "G",
      "Y",
      "B",
      "S",
      "M",
      "L",
      "N"
    ]
  },
  {
    "name": "Mitrapark",
    "nepali": "",
    "buses": [
      "Y",
      "B",
      "S",
      "M",
      "L",
      "G",
      "N",
      "P",
      "H",
      "J"
    ]
  },
  {
    "name": "Pump",
    "nepali": "",
    "buses": [
      "P",
      "H",
      "J",
      "G",
      "Y",
      "L"
    ]
  },
  {
    "name": "Chowk",
    "nepali": "",
    "buses": [
      "G",
      "R"
    ]
  },
  {
    "name": "Jaya Bageshwori",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "M",
      "L",
      "G",
      "N"
    ]
  },
  {
    "name": "nedset",
    "nepali": "",
    "buses": [
      "E",
      "Y",
      "O",
      "N",
      "P",
      "H",
      "J",
      "G"
    ]
  },
  {
    "name": "Siphal",
    "nepali": "",
    "buses": [
      "P",
      "H",
      "J",
      "G",
      "Y",
      "L"
    ]
  },
  {
    "name": "Kalopul",
    "nepali": "",
    "buses": [
      "Y",
      "P",
      "H",
      "J",
      "G",
      "L"
    ]
  },
  {
    "name": "rlish School",
    "nepali": "",
    "buses": [
      "Y",
      "N",
      "P",
      "H",
      "J",
      "G",
      "E",
      "L",
      "O"
    ]
  },
  {
    "name": "Dotel Dairy",
    "nepali": "",
    "buses": [
      "G"
    ]
  },
  {
    "name": "Khasimode",
    "nepali": "",
    "buses": [
      "G",
      "R"
    ]
  },
  {
    "name": "Hattidada",
    "nepali": "",
    "buses": [
      "G",
      "R"
    ]
  },
  {
    "name": "Gaushala (Pashupatinath)",
    "nepali": "",
    "buses": [
      "G",
      "B",
      "S",
      "M",
      "D"
    ]
  },
  {
    "name": "Sundari Chowk",
    "nepali": "",
    "buses": [
      "G",
      "R"
    ]
  },
  {
    "name": "Gandhi Adarsha",
    "nepali": "",
    "buses": [
      "G",
      "R"
    ]
  },
  {
    "name": "Secondary School",
    "nepali": "",
    "buses": [
      "G",
      "R"
    ]
  },
  {
    "name": "Khahare",
    "nepali": "",
    "buses": [
      "G",
      "R"
    ]
  },
  {
    "name": "Purano",
    "nepali": "",
    "buses": [
      "D",
      "L",
      "P",
      "H",
      "J",
      "G",
      "N",
      "Y"
    ]
  },
  {
    "name": "Suncity Apartments (Kadaghari)",
    "nepali": "",
    "buses": [
      "G",
      "R",
      "B",
      "S"
    ]
  },
  {
    "name": "Bajranagar",
    "nepali": "",
    "buses": [
      "N",
      "H",
      "L"
    ]
  },
  {
    "name": "Ramhiti",
    "nepali": "",
    "buses": [
      "N",
      "L",
      "H",
      "P"
    ]
  },
  {
    "name": "Cafe",
    "nepali": "",
    "buses": [
      "L",
      "N",
      "H",
      "P",
      "J"
    ]
  },
  {
    "name": "Milan Chowk",
    "nepali": "",
    "buses": [
      "L",
      "P"
    ]
  },
  {
    "name": "Big Mart, Thali",
    "nepali": "",
    "buses": [
      "L",
      "P"
    ]
  },
  {
    "name": "Dakshindhoka",
    "nepali": "",
    "buses": [
      "L",
      "P",
      "H"
    ]
  },
  {
    "name": "Bridge",
    "nepali": "",
    "buses": [
      "L",
      "P",
      "H",
      "N"
    ]
  },
  {
    "name": "Chowk",
    "nepali": "",
    "buses": [
      "L",
      "P",
      "H",
      "N",
      "J"
    ]
  },
  {
    "name": "Hospital",
    "nepali": "",
    "buses": [
      "L",
      "P",
      "H",
      "N",
      "J"
    ]
  },
  {
    "name": "Gokarneshwor",
    "nepali": "",
    "buses": [
      "L",
      "P",
      "H"
    ]
  },
  {
    "name": "Mulpani Intl",
    "nepali": "",
    "buses": [
      "L",
      "P"
    ]
  },
  {
    "name": "Market",
    "nepali": "",
    "buses": [
      "L",
      "P"
    ]
  },
  {
    "name": "Cricket Ground",
    "nepali": "",
    "buses": [
      "L",
      "P"
    ]
  },
  {
    "name": "Banquet",
    "nepali": "",
    "buses": [
      "P",
      "L"
    ]
  },
  {
    "name": "Nepal Yatayat Bus Park",
    "nepali": "",
    "buses": [
      "P",
      "L"
    ]
  },
  {
    "name": "Mulpani Cricket Ground / Chowk",
    "nepali": "",
    "buses": [
      "P",
      "L"
    ]
  },
  {
    "name": "Mulpani Cricket Ground / Chowk",
    "nepali": "",
    "buses": [
      "P",
      "L"
    ]
  },
  {
    "name": "Milan Chowk",
    "nepali": "",
    "buses": [
      "P"
    ]
  },
  {
    "name": "College",
    "nepali": "",
    "buses": [
      "P"
    ]
  },
  {
    "name": "Mulpani Cricket Ground / Chowk",
    "nepali": "",
    "buses": [
      "P"
    ]
  },
  {
    "name": "Jaya Sec",
    "nepali": "",
    "buses": [
      "P"
    ]
  },
  {
    "name": "Bode (Madhyapur Thimi)",
    "nepali": "",
    "buses": [
      "B"
    ]
  },
  {
    "name": "Bode (Madhyapur Thimi)",
    "nepali": "",
    "buses": [
      "B"
    ]
  },
  {
    "name": "Mulpani Pipalbot",
    "nepali": "",
    "buses": [
      "P"
    ]
  },
  {
    "name": "Baba Chowk",
    "nepali": "",
    "buses": [
      "G"
    ]
  },
  {
    "name": "Chowk",
    "nepali": "",
    "buses": [
      "G",
      "R"
    ]
  },
  {
    "name": "Sanotar Pipalbot",
    "nepali": "",
    "buses": [
      "P"
    ]
  },
  {
    "name": "Godhargaun",
    "nepali": "",
    "buses": [
      "G",
      "R"
    ]
  },
  {
    "name": "Christian Community",
    "nepali": "",
    "buses": [
      "P"
    ]
  },
  {
    "name": "Bode Chardobato",
    "nepali": "",
    "buses": [
      "B"
    ]
  },
  {
    "name": "School",
    "nepali": "",
    "buses": [
      "B"
    ]
  },
  {
    "name": "Bus Park",
    "nepali": "",
    "buses": [
      "B"
    ]
  },
  {
    "name": "North Point Mall",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "P"
    ]
  },
  {
    "name": "Force Park",
    "nepali": "",
    "buses": [
      "G",
      "R"
    ]
  },
  {
    "name": "Bista Gaun",
    "nepali": "",
    "buses": [
      "B"
    ]
  },
  {
    "name": "Sanima Bank, Bode",
    "nepali": "",
    "buses": [
      "B"
    ]
  },
  {
    "name": "Lord Buddha School",
    "nepali": "",
    "buses": [
      "B",
      "S"
    ]
  },
  {
    "name": "Temple",
    "nepali": "",
    "buses": [
      "G",
      "R",
      "B"
    ]
  },
  {
    "name": "Bahra Shutter",
    "nepali": "",
    "buses": [
      "G",
      "R"
    ]
  },
  {
    "name": "Big Mart Supermarket",
    "nepali": "",
    "buses": [
      "B",
      "S"
    ]
  },
  {
    "name": "Nepal Yatayat Bus Park",
    "nepali": "",
    "buses": [
      "B",
      "S"
    ]
  },
  {
    "name": "Bode (Madhyapur Thimi)",
    "nepali": "",
    "buses": [
      "B"
    ]
  },
  {
    "name": "Har Har Mahadev",
    "nepali": "",
    "buses": [
      "B",
      "S"
    ]
  },
  {
    "name": "Gladstone Academy",
    "nepali": "",
    "buses": [
      "B",
      "S"
    ]
  },
  {
    "name": "Manohara",
    "nepali": "",
    "buses": [
      "L",
      "P"
    ]
  },
  {
    "name": "Gokarneshwor Yatayat",
    "nepali": "",
    "buses": [
      "L",
      "P"
    ]
  },
  {
    "name": "NEA Jorpati",
    "nepali": "",
    "buses": [
      "L",
      "P"
    ]
  },
  {
    "name": "Bagdhara",
    "nepali": "",
    "buses": [
      "L"
    ]
  },
  {
    "name": "Danchhi",
    "nepali": "",
    "buses": [
      "L",
      "P"
    ]
  },
  {
    "name": "Danchhi",
    "nepali": "",
    "buses": [
      "L",
      "P"
    ]
  },
  {
    "name": "Bus Park, Danchhi",
    "nepali": "",
    "buses": [
      "L",
      "P"
    ]
  },
  {
    "name": "Kageshwori Manohara",
    "nepali": "",
    "buses": [
      "L",
      "P"
    ]
  },
  {
    "name": "Municipality",
    "nepali": "",
    "buses": [
      "L",
      "P"
    ]
  },
  {
    "name": "Thali Chowk",
    "nepali": "",
    "buses": [
      "L",
      "P"
    ]
  },
  {
    "name": "Chowk",
    "nepali": "",
    "buses": [
      "L",
      "P"
    ]
  },
  {
    "name": "Panchpokhari Yatayat",
    "nepali": "",
    "buses": [
      "L",
      "P"
    ]
  },
  {
    "name": "Bus Park, Danchhi",
    "nepali": "",
    "buses": [
      "L",
      "P"
    ]
  },
  {
    "name": "Bus Park",
    "nepali": "",
    "buses": [
      "L",
      "P"
    ]
  },
  {
    "name": "t Bank",
    "nepali": "",
    "buses": [
      "B",
      "S"
    ]
  },
  {
    "name": "ONagdhunga",
    "nepali": "",
    "buses": [
      "C"
    ]
  },
  {
    "name": "Checkpost",
    "nepali": "",
    "buses": [
      "C"
    ]
  },
  {
    "name": "Nagdhunga",
    "nepali": "",
    "buses": [
      "C"
    ]
  },
  {
    "name": "Tribhuvan Park",
    "nepali": "",
    "buses": [
      "C"
    ]
  },
  {
    "name": "Gurjudhara",
    "nepali": "",
    "buses": [
      "C",
      "O"
    ]
  },
  {
    "name": "Satungal Chowk",
    "nepali": "",
    "buses": [
      "C",
      "O"
    ]
  },
  {
    "name": "Naikap",
    "nepali": "",
    "buses": [
      "C",
      "O"
    ]
  },
  {
    "name": "Prabhat Secondary School",
    "nepali": "",
    "buses": [
      "C"
    ]
  },
  {
    "name": "Balambu",
    "nepali": "",
    "buses": [
      "O",
      "C"
    ]
  },
  {
    "name": "Ward Office",
    "nepali": "",
    "buses": [
      "C"
    ]
  },
  {
    "name": "Ward 5 Office",
    "nepali": "",
    "buses": [
      "C",
      "O"
    ]
  },
  {
    "name": "Trinetra",
    "nepali": "",
    "buses": [
      "C"
    ]
  },
  {
    "name": "Kendra",
    "nepali": "",
    "buses": [
      "C",
      "O"
    ]
  },
  {
    "name": "Thankot Checkpost",
    "nepali": "",
    "buses": [
      "C"
    ]
  },
  {
    "name": "Mahadevsthan",
    "nepali": "",
    "buses": [
      "C"
    ]
  },
  {
    "name": "Swasthya Chauki",
    "nepali": "",
    "buses": [
      "C"
    ]
  },
  {
    "name": "Yashaswi Shiksha Sadan",
    "nepali": "",
    "buses": [
      "C",
      "O"
    ]
  },
  {
    "name": "Golchhap, Itakhel",
    "nepali": "",
    "buses": [
      "C"
    ]
  },
  {
    "name": "School",
    "nepali": "",
    "buses": [
      "C",
      "O"
    ]
  },
  {
    "name": "Matatirtha Police Station",
    "nepali": "",
    "buses": [
      "O"
    ]
  },
  {
    "name": "Shree Mahalaxmi Adharbhut",
    "nepali": "",
    "buses": [
      "C",
      "O"
    ]
  },
  {
    "name": "School",
    "nepali": "",
    "buses": [
      "C",
      "O"
    ]
  },
  {
    "name": "Matatirtha Football Ground",
    "nepali": "",
    "buses": [
      "O"
    ]
  },
  {
    "name": "Bus Park",
    "nepali": "",
    "buses": [
      "O",
      "C"
    ]
  },
  {
    "name": "Soltidobato",
    "nepali": "",
    "buses": [
      "Y",
      "S",
      "M",
      "T",
      "A"
    ]
  },
  {
    "name": "Bafal (Ring Road)",
    "nepali": "",
    "buses": [
      "Y",
      "S",
      "M",
      "T",
      "A",
      "C",
      "B",
      "X",
      "R"
    ]
  },
  {
    "name": "Dhungeadda",
    "nepali": "",
    "buses": [
      "C",
      "Y",
      "O",
      "S",
      "M",
      "T",
      "A",
      "B",
      "X",
      "R"
    ]
  },
  {
    "name": "Soltimode",
    "nepali": "",
    "buses": [
      "C",
      "Y",
      "O",
      "R",
      "B",
      "S",
      "X",
      "M"
    ]
  },
  {
    "name": "Kalimati Tarkari Bazaar",
    "nepali": "",
    "buses": [
      "S",
      "K",
      "I",
      "N",
      "O",
      "Y",
      "B",
      "X",
      "M",
      "C"
    ]
  },
  {
    "name": "Global IME Bank",
    "nepali": "",
    "buses": [
      "S",
      "K",
      "I",
      "N",
      "B",
      "X",
      "M",
      "O"
    ]
  },
  {
    "name": "Nabil Bank",
    "nepali": "",
    "buses": [
      "S",
      "K",
      "I",
      "N",
      "B",
      "X",
      "M"
    ]
  },
  {
    "name": "Khasibazar",
    "nepali": "",
    "buses": [
      "O"
    ]
  },
  {
    "name": "Kitab Kalam",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "X",
      "M",
      "K",
      "I",
      "N"
    ]
  },
  {
    "name": "Stationery Mart",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "X",
      "M",
      "K",
      "I",
      "N"
    ]
  },
  {
    "name": "University Path",
    "nepali": "",
    "buses": [
      "S",
      "K",
      "I",
      "N",
      "B",
      "X",
      "M"
    ]
  },
  {
    "name": "Sita",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "X",
      "M"
    ]
  },
  {
    "name": "Shree Dakshinkali",
    "nepali": "",
    "buses": [
      "K",
      "I",
      "B",
      "S",
      "X",
      "M",
      "N"
    ]
  },
  {
    "name": "Petrol Pump",
    "nepali": "",
    "buses": [
      "K",
      "I",
      "B",
      "S",
      "X",
      "M",
      "N"
    ]
  },
  {
    "name": "Dhobighat",
    "nepali": "",
    "buses": [
      "B",
      "X",
      "M",
      "N",
      "K",
      "I",
      "S"
    ]
  },
  {
    "name": "Janavikas",
    "nepali": "",
    "buses": [
      "K",
      "I",
      "B",
      "S",
      "X",
      "M",
      "N"
    ]
  },
  {
    "name": "Secondary School",
    "nepali": "",
    "buses": [
      "K",
      "I",
      "B",
      "S",
      "X",
      "M",
      "N"
    ]
  },
  {
    "name": "Association",
    "nepali": "",
    "buses": [
      "O",
      "E",
      "N",
      "P",
      "H",
      "J",
      "G",
      "L",
      "Y",
      "D"
    ]
  },
  {
    "name": "Muttiple Campus",
    "nepali": "",
    "buses": [
      "O",
      "E",
      "D",
      "N",
      "P",
      "H",
      "J",
      "G",
      "L",
      "Y",
      "S",
      "I",
      "R",
      "T",
      "F",
      "Z",
      "A",
      "B",
      "C",
      "K"
    ]
  },
  {
    "name": "Chowk",
    "nepali": "",
    "buses": [
      "N",
      "D",
      "Y",
      "L",
      "P",
      "H",
      "J",
      "G"
    ]
  },
  {
    "name": "Setopul",
    "nepali": "",
    "buses": [
      "D",
      "L",
      "N",
      "P",
      "H",
      "J",
      "G",
      "Y"
    ]
  },
  {
    "name": "Baghbazar Sadak",
    "nepali": "",
    "buses": [
      "D",
      "Y",
      "L",
      "P",
      "H",
      "J",
      "G",
      "N",
      "S",
      "R",
      "E",
      "O",
      "B",
      "I",
      "Z",
      "A"
    ]
  },
  {
    "name": "Dillibazar",
    "nepali": "",
    "buses": [
      "D",
      "Y",
      "L",
      "P",
      "H",
      "J",
      "G",
      "N",
      "B",
      "S",
      "R"
    ]
  },
  {
    "name": "Pipalbot",
    "nepali": "",
    "buses": [
      "D",
      "Y",
      "L",
      "P",
      "H",
      "J",
      "G",
      "B",
      "N",
      "S",
      "R"
    ]
  },
  {
    "name": "Putalisadak",
    "nepali": "",
    "buses": [
      "S",
      "R",
      "B",
      "D",
      "Y",
      "L",
      "P",
      "H",
      "J",
      "G",
      "N"
    ]
  },
  {
    "name": "Sundhara (Dharahara)",
    "nepali": "",
    "buses": [
      "E",
      "O",
      "Y",
      "R",
      "B",
      "S",
      "C",
      "K",
      "I",
      "P",
      "N",
      "A",
      "H",
      "T",
      "F",
      "Z",
      "L",
      "J",
      "G",
      "D"
    ]
  },
  {
    "name": "Bhadrakali",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "C",
      "K",
      "I",
      "P",
      "N",
      "Y",
      "E",
      "O",
      "R",
      "L",
      "T",
      "F",
      "Z",
      "A",
      "H",
      "J",
      "G",
      "D"
    ]
  },
  {
    "name": "Anamnagar",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "R",
      "D",
      "N",
      "Y",
      "L",
      "P",
      "H",
      "J",
      "G"
    ]
  },
  {
    "name": "Hanumansthan",
    "nepali": "",
    "buses": [
      "S",
      "B",
      "R",
      "N",
      "D",
      "Y"
    ]
  },
  {
    "name": "Bhatbhateni",
    "nepali": "",
    "buses": [
      "R",
      "S",
      "B",
      "N"
    ]
  },
  {
    "name": "Thapagaun",
    "nepali": "",
    "buses": [
      "S",
      "R",
      "B",
      "N"
    ]
  },
  {
    "name": "Tempo Stop",
    "nepali": "",
    "buses": [
      "S",
      "R",
      "N",
      "B"
    ]
  },
  {
    "name": "Teku Hospital / Bridge",
    "nepali": "",
    "buses": [
      "C",
      "K",
      "I",
      "N",
      "S",
      "Y",
      "O",
      "E"
    ]
  },
  {
    "name": "New",
    "nepali": "",
    "buses": [
      "R",
      "S",
      "B",
      "N"
    ]
  },
  {
    "name": "Baneshwor",
    "nepali": "",
    "buses": [
      "R",
      "S",
      "B",
      "N"
    ]
  },
  {
    "name": "Minbhawan (Civil Hospital)",
    "nepali": "",
    "buses": [
      "S",
      "N",
      "R",
      "B"
    ]
  },
  {
    "name": "Shantinagar",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "R",
      "N"
    ]
  },
  {
    "name": "Thapathali",
    "nepali": "",
    "buses": [
      "P",
      "S",
      "B",
      "I"
    ]
  },
  {
    "name": "Bijulibazar",
    "nepali": "",
    "buses": [
      "S",
      "R",
      "N",
      "B"
    ]
  },
  {
    "name": "Babar Mahal",
    "nepali": "",
    "buses": [
      "P"
    ]
  },
  {
    "name": "ircle",
    "nepali": "",
    "buses": [
      "S",
      "K",
      "I",
      "N",
      "O",
      "Y",
      "B",
      "X",
      "M",
      "C"
    ]
  },
  {
    "name": "一N3K",
    "nepali": "",
    "buses": [
      "S",
      "K",
      "I",
      "N",
      "O",
      "Y",
      "C"
    ]
  },
  {
    "name": "mati",
    "nepali": "",
    "buses": [
      "S",
      "K",
      "I",
      "N",
      "O",
      "Y",
      "B",
      "X",
      "M",
      "C"
    ]
  },
  {
    "name": "Kupondole",
    "nepali": "",
    "buses": [
      "P",
      "S",
      "N",
      "B"
    ]
  },
  {
    "name": "Dal IMEBank",
    "nepali": "",
    "buses": [
      "S",
      "K",
      "I",
      "N",
      "B",
      "X",
      "M",
      "O"
    ]
  },
  {
    "name": "Jwagal",
    "nepali": "",
    "buses": [
      "S",
      "P",
      "N",
      "X",
      "M"
    ]
  },
  {
    "name": "Hariharbhawan",
    "nepali": "",
    "buses": [
      "S",
      "N",
      "X",
      "M",
      "P"
    ]
  },
  {
    "name": "Balkumari Bridge",
    "nepali": "",
    "buses": [
      "B",
      "X",
      "M",
      "R",
      "S",
      "G",
      "N"
    ]
  },
  {
    "name": "Pulchowk (Engineering Campus)",
    "nepali": "",
    "buses": [
      "S",
      "N",
      "X",
      "M",
      "P"
    ]
  },
  {
    "name": "Kumaripati",
    "nepali": "",
    "buses": [
      "S",
      "N",
      "X",
      "M",
      "P",
      "B"
    ]
  },
  {
    "name": "Kharibot",
    "nepali": "",
    "buses": [
      "B",
      "X",
      "M",
      "R"
    ]
  },
  {
    "name": "Gwarko Chowk",
    "nepali": "",
    "buses": [
      "B",
      "X",
      "M",
      "R",
      "S",
      "P"
    ]
  },
  {
    "name": "Medical College",
    "nepali": "",
    "buses": [
      "N",
      "D",
      "B",
      "S",
      "M",
      "G",
      "L"
    ]
  },
  {
    "name": "Bagmati Bridge",
    "nepali": "",
    "buses": [
      "D",
      "N",
      "L"
    ]
  },
  {
    "name": "Seto Ghar",
    "nepali": "",
    "buses": [
      "G",
      "R"
    ]
  },
  {
    "name": "Sinamangal (Airport Gate)",
    "nepali": "",
    "buses": [
      "G",
      "B",
      "S",
      "M",
      "D",
      "R"
    ]
  },
  {
    "name": "Town Planning",
    "nepali": "",
    "buses": [
      "G",
      "R",
      "B",
      "S"
    ]
  },
  {
    "name": "Big Mart",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "G",
      "R",
      "X"
    ]
  },
  {
    "name": "Chowk",
    "nepali": "",
    "buses": [
      "G",
      "R",
      "B",
      "S",
      "X"
    ]
  },
  {
    "name": "Pepsicola Town Planning",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "G",
      "R",
      "X"
    ]
  },
  {
    "name": "Pepsicola Town Planning",
    "nepali": "",
    "buses": [
      "G",
      "R",
      "B",
      "S",
      "M"
    ]
  },
  {
    "name": "Bhaktapur Road",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "G",
      "R",
      "X"
    ]
  },
  {
    "name": "Purano Bato",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "X",
      "G",
      "R"
    ]
  },
  {
    "name": "Panika",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "X",
      "G"
    ]
  },
  {
    "name": "Tinkune (Subidhanagar)",
    "nepali": "",
    "buses": [
      "N",
      "B",
      "M",
      "D"
    ]
  },
  {
    "name": "Tinkune (Subidhanagar)",
    "nepali": "",
    "buses": [
      "B",
      "N",
      "M",
      "S",
      "R"
    ]
  },
  {
    "name": "vor",
    "nepali": "",
    "buses": [
      "R",
      "S",
      "B",
      "N"
    ]
  },
  {
    "name": "Chhapro",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "X",
      "G",
      "R"
    ]
  },
  {
    "name": "Jadibuti Chowk",
    "nepali": "",
    "buses": [
      "G",
      "R",
      "B",
      "S",
      "X",
      "M"
    ]
  },
  {
    "name": "Lokanthali",
    "nepali": "",
    "buses": [
      "X",
      "B",
      "S",
      "G",
      "R"
    ]
  },
  {
    "name": "Kausaltar",
    "nepali": "",
    "buses": [
      "X",
      "B",
      "S"
    ]
  },
  {
    "name": "Bhatbhateni",
    "nepali": "",
    "buses": [
      "B",
      "X",
      "M",
      "R",
      "N",
      "S",
      "G"
    ]
  },
  {
    "name": "Police Sector",
    "nepali": "",
    "buses": [
      "N",
      "B",
      "S",
      "X",
      "G",
      "R"
    ]
  },
  {
    "name": "Narephat",
    "nepali": "",
    "buses": [
      "N",
      "B",
      "S",
      "X",
      "G",
      "R"
    ]
  },
  {
    "name": "Manohara Corridor",
    "nepali": "",
    "buses": [
      "N",
      "B",
      "S",
      "X",
      "G",
      "R",
      "M"
    ]
  },
  {
    "name": "Narephant-Imadole",
    "nepali": "",
    "buses": [
      "N"
    ]
  },
  {
    "name": "Mahalaxmi Municipality",
    "nepali": "",
    "buses": [
      "N"
    ]
  },
  {
    "name": "Bogateshwor",
    "nepali": "",
    "buses": [
      "N"
    ]
  },
  {
    "name": "Tikathali",
    "nepali": "",
    "buses": [
      "N"
    ]
  },
  {
    "name": "Ward 3 Office",
    "nepali": "",
    "buses": [
      "N"
    ]
  },
  {
    "name": "Mahadev Temple",
    "nepali": "",
    "buses": [
      "N"
    ]
  },
  {
    "name": "Panitanki",
    "nepali": "",
    "buses": [
      "N"
    ]
  },
  {
    "name": "Nepal Yatayat Bus Park",
    "nepali": "",
    "buses": [
      "N"
    ]
  },
  {
    "name": "Tikathali",
    "nepali": "",
    "buses": [
      "N"
    ]
  },
  {
    "name": "Shangri-la Development Bank",
    "nepali": "",
    "buses": [
      "B",
      "S"
    ]
  },
  {
    "name": "Thimi Branch",
    "nepali": "",
    "buses": [
      "B",
      "S"
    ]
  },
  {
    "name": "Chetrapal Chowk",
    "nepali": "",
    "buses": [
      "B",
      "S"
    ]
  },
  {
    "name": "Nabil Bank, Thimi Branch",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "X"
    ]
  },
  {
    "name": "Halesi Driving Center",
    "nepali": "",
    "buses": [
      "B"
    ]
  },
  {
    "name": "Big Mart",
    "nepali": "",
    "buses": [
      "X",
      "B",
      "S"
    ]
  },
  {
    "name": "Nagadesh Gate",
    "nepali": "",
    "buses": [
      "X",
      "B",
      "S"
    ]
  },
  {
    "name": "Bahakha Bazar",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "X"
    ]
  },
  {
    "name": "Ground",
    "nepali": "",
    "buses": [
      "X",
      "B",
      "S"
    ]
  },
  {
    "name": "Buddha Park",
    "nepali": "",
    "buses": [
      "X",
      "B",
      "S"
    ]
  },
  {
    "name": "Chowk",
    "nepali": "",
    "buses": [
      "X",
      "B",
      "S"
    ]
  },
  {
    "name": "Purano Thimi",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "X"
    ]
  },
  {
    "name": "CTEVT",
    "nepali": "",
    "buses": [
      "X",
      "B",
      "S"
    ]
  },
  {
    "name": "Campus",
    "nepali": "",
    "buses": [
      "X",
      "B",
      "S"
    ]
  },
  {
    "name": "Bus Stop",
    "nepali": "",
    "buses": [
      "X",
      "B",
      "S"
    ]
  },
  {
    "name": "Chowk",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "X"
    ]
  },
  {
    "name": "University Grants",
    "nepali": "",
    "buses": [
      "X",
      "B",
      "S"
    ]
  },
  {
    "name": "Nikosera",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "X"
    ]
  },
  {
    "name": "Commission",
    "nepali": "",
    "buses": [
      "X",
      "B",
      "S"
    ]
  },
  {
    "name": "CTEVTOCE",
    "nepali": "",
    "buses": [
      "X",
      "B",
      "S"
    ]
  },
  {
    "name": "Indreni Polytechnic",
    "nepali": "",
    "buses": [
      "X",
      "B",
      "S"
    ]
  },
  {
    "name": "Mar",
    "nepali": "",
    "buses": [
      "X",
      "B",
      "S"
    ]
  },
  {
    "name": "Institute",
    "nepali": "",
    "buses": [
      "X",
      "B",
      "S"
    ]
  },
  {
    "name": "Big Mart",
    "nepali": "",
    "buses": [
      "X",
      "B",
      "S"
    ]
  },
  {
    "name": "Gatthaghar",
    "nepali": "",
    "buses": [
      "X",
      "B",
      "S"
    ]
  },
  {
    "name": "Gathhaghar",
    "nepali": "",
    "buses": [
      "X"
    ]
  },
  {
    "name": "Chardobato",
    "nepali": "",
    "buses": [
      "X"
    ]
  },
  {
    "name": "Thimi",
    "nepali": "",
    "buses": [
      "X"
    ]
  },
  {
    "name": "Radhe Radhe",
    "nepali": "",
    "buses": [
      "B"
    ]
  },
  {
    "name": "Srijana Nagar",
    "nepali": "",
    "buses": [
      "B"
    ]
  },
  {
    "name": "Dhungedhara",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "X"
    ]
  },
  {
    "name": "Haku",
    "nepali": "",
    "buses": [
      "B"
    ]
  },
  {
    "name": "Nikosera",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "X"
    ]
  },
  {
    "name": "Thulo Byasi",
    "nepali": "",
    "buses": [
      "B"
    ]
  },
  {
    "name": "Falcha",
    "nepali": "",
    "buses": [
      "B"
    ]
  },
  {
    "name": "Dekocha (Bhaktapur)",
    "nepali": "",
    "buses": [
      "B"
    ]
  },
  {
    "name": "Bus Stop",
    "nepali": "",
    "buses": [
      "B"
    ]
  },
  {
    "name": "Bus Stop",
    "nepali": "",
    "buses": [
      "B"
    ]
  },
  {
    "name": "NEA (Bhaktapur DC",
    "nepali": "",
    "buses": [
      "B"
    ]
  },
  {
    "name": "NTCBhaktapur",
    "nepali": "",
    "buses": [
      "B"
    ]
  },
  {
    "name": "Sallaghari Chowk",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "X"
    ]
  },
  {
    "name": "Shopping Complex",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "X"
    ]
  },
  {
    "name": "Hospital",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "X"
    ]
  },
  {
    "name": "Army Multiple",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "X"
    ]
  },
  {
    "name": "Campus",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "X"
    ]
  },
  {
    "name": "Siddha Pokhari",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "X"
    ]
  },
  {
    "name": "Bridge",
    "nepali": "",
    "buses": [
      "B"
    ]
  },
  {
    "name": "Sallaghari Chowk",
    "nepali": "",
    "buses": [
      "B"
    ]
  },
  {
    "name": "Tinkune (Subidhanagar)",
    "nepali": "",
    "buses": [
      "B"
    ]
  },
  {
    "name": "Jagati",
    "nepali": "",
    "buses": [
      "B",
      "X"
    ]
  },
  {
    "name": "Bus Park",
    "nepali": "",
    "buses": [
      "B"
    ]
  },
  {
    "name": "Khwopa Hospital",
    "nepali": "",
    "buses": [
      "B"
    ]
  },
  {
    "name": "Chyamasingh",
    "nepali": "",
    "buses": [
      "B"
    ]
  },
  {
    "name": "Bus Park",
    "nepali": "",
    "buses": [
      "B"
    ]
  },
  {
    "name": "Khwopa College",
    "nepali": "",
    "buses": [
      "B"
    ]
  },
  {
    "name": "of Engineering",
    "nepali": "",
    "buses": [
      "B"
    ]
  },
  {
    "name": "Jagati Branch",
    "nepali": "",
    "buses": [
      "B"
    ]
  },
  {
    "name": "Nalinchowk",
    "nepali": "",
    "buses": [
      "X"
    ]
  },
  {
    "name": "Palanse",
    "nepali": "",
    "buses": [
      "X"
    ]
  },
  {
    "name": "Sanga",
    "nepali": "",
    "buses": [
      "X"
    ]
  },
  {
    "name": "Golchhap,Itakhel",
    "nepali": "",
    "buses": [
      "C"
    ]
  },
  {
    "name": "Matatirtha Temple",
    "nepali": "",
    "buses": [
      "O"
    ]
  },
  {
    "name": "Kirtipur Vegetal",
    "nepali": "",
    "buses": [
      "K",
      "I"
    ]
  },
  {
    "name": "Panga Dobato",
    "nepali": "",
    "buses": [
      "K",
      "I"
    ]
  },
  {
    "name": "Bagh Bhairal",
    "nepali": "",
    "buses": [
      "K",
      "I"
    ]
  },
  {
    "name": "Rush Cutter",
    "nepali": "",
    "buses": [
      "K",
      "I",
      "B",
      "S",
      "X",
      "M",
      "N"
    ]
  },
  {
    "name": "Petrol Pump",
    "nepali": "",
    "buses": [
      "K",
      "I",
      "B",
      "S",
      "X",
      "M",
      "N"
    ]
  },
  {
    "name": "TU Gate",
    "nepali": "",
    "buses": [
      "K",
      "I",
      "B",
      "S"
    ]
  },
  {
    "name": "Laboratory",
    "nepali": "",
    "buses": [
      "K",
      "I"
    ]
  },
  {
    "name": "Ayurveda Campus",
    "nepali": "",
    "buses": [
      "K",
      "I"
    ]
  },
  {
    "name": "B.P. Koirala Memorial Museum",
    "nepali": "",
    "buses": [
      "K",
      "I"
    ]
  },
  {
    "name": "National Center for",
    "nepali": "",
    "buses": [
      "K",
      "I"
    ]
  },
  {
    "name": "Secondary School",
    "nepali": "",
    "buses": [
      "K",
      "I"
    ]
  },
  {
    "name": "Chowk",
    "nepali": "",
    "buses": [
      "K",
      "I"
    ]
  },
  {
    "name": "and Teaching Hospital",
    "nepali": "",
    "buses": [
      "K",
      "I"
    ]
  },
  {
    "name": "Nayabazar Gate",
    "nepali": "",
    "buses": [
      "K",
      "I"
    ]
  },
  {
    "name": "Science Museum",
    "nepali": "",
    "buses": [
      "K",
      "I"
    ]
  },
  {
    "name": "Fruit Development",
    "nepali": "",
    "buses": [
      "K",
      "I"
    ]
  },
  {
    "name": "Police Circle",
    "nepali": "",
    "buses": [
      "K",
      "I"
    ]
  },
  {
    "name": "Kirtipur Vegetable Market",
    "nepali": "",
    "buses": [
      "K",
      "I"
    ]
  },
  {
    "name": "Oralo",
    "nepali": "",
    "buses": [
      "K",
      "I"
    ]
  },
  {
    "name": "Sundarighat",
    "nepali": "",
    "buses": [
      "I",
      "K"
    ]
  },
  {
    "name": "KUKL Water",
    "nepali": "",
    "buses": [
      "I",
      "K"
    ]
  },
  {
    "name": "Distribution Center",
    "nepali": "",
    "buses": [
      "I",
      "K"
    ]
  },
  {
    "name": "Horticulture Park",
    "nepali": "",
    "buses": [
      "I",
      "K"
    ]
  },
  {
    "name": "Bagh Bhairab",
    "nepali": "",
    "buses": [
      "K",
      "I"
    ]
  },
  {
    "name": "High School",
    "nepali": "",
    "buses": [
      "K",
      "I"
    ]
  },
  {
    "name": "Chobhar Gate",
    "nepali": "",
    "buses": [
      "K",
      "I"
    ]
  },
  {
    "name": "Deukhel",
    "nepali": "",
    "buses": [
      "K",
      "I"
    ]
  },
  {
    "name": "Bhajangal",
    "nepali": "",
    "buses": [
      "I",
      "K"
    ]
  },
  {
    "name": "Salvinia Academy",
    "nepali": "",
    "buses": [
      "K",
      "I"
    ]
  },
  {
    "name": "School",
    "nepali": "",
    "buses": [
      "K",
      "I"
    ]
  },
  {
    "name": "Panga Salik",
    "nepali": "",
    "buses": [
      "K",
      "I"
    ]
  },
  {
    "name": "Water Tank",
    "nepali": "",
    "buses": [
      "I",
      "K"
    ]
  },
  {
    "name": "Temple",
    "nepali": "",
    "buses": [
      "K",
      "I"
    ]
  },
  {
    "name": "Ward 7 Office",
    "nepali": "",
    "buses": [
      "K",
      "I"
    ]
  },
  {
    "name": "Itagol Tole Entry",
    "nepali": "",
    "buses": [
      "K",
      "I"
    ]
  },
  {
    "name": "Ujwal Shishu Niketan",
    "nepali": "",
    "buses": [
      "K",
      "I"
    ]
  },
  {
    "name": "Academy",
    "nepali": "",
    "buses": [
      "K",
      "I"
    ]
  },
  {
    "name": "Janasewa Secondary",
    "nepali": "",
    "buses": [
      "K",
      "I"
    ]
  },
  {
    "name": "School",
    "nepali": "",
    "buses": [
      "K",
      "I"
    ]
  },
  {
    "name": "Yancho Gaun Pipalbot",
    "nepali": "",
    "buses": [
      "K"
    ]
  },
  {
    "name": "Langol Bus Park",
    "nepali": "",
    "buses": [
      "K"
    ]
  },
  {
    "name": "Ekantakuna",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "X",
      "M",
      "N",
      "K",
      "I"
    ]
  },
  {
    "name": "B & B Hospital (Gwarko)",
    "nepali": "",
    "buses": [
      "X",
      "M",
      "R",
      "B",
      "S",
      "P"
    ]
  },
  {
    "name": "STC Chowk",
    "nepali": "",
    "buses": [
      "S",
      "B"
    ]
  },
  {
    "name": "Kusunti",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "X",
      "M"
    ]
  },
  {
    "name": "Thasikhel",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "X",
      "M"
    ]
  },
  {
    "name": "Nakkhu",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Mahalaxmisthan",
    "nepali": "",
    "buses": [
      "B",
      "S"
    ]
  },
  {
    "name": "Dobato",
    "nepali": "",
    "buses": [
      "S",
      "R",
      "B",
      "X",
      "M",
      "P"
    ]
  },
  {
    "name": "KUKLWater",
    "nepali": "",
    "buses": [
      "I",
      "K"
    ]
  },
  {
    "name": "Nakkhu Bridge",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Chapagaun Dobato",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Khumaltar",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Bhainsepati",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Hattiban",
    "nepali": "",
    "buses": [
      "S",
      "R"
    ]
  },
  {
    "name": "Loktantrik Chowk",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Sainbu",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Janani Marga",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Wai Wai",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Pragati Chowk",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Adarsha Saula Yubak",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Secondary School",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Dolahity",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Chyasikot",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Simako Chowk",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Bungamati",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Sunakothi",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Imadol Pipalbot",
    "nepali": "",
    "buses": [
      "B"
    ]
  },
  {
    "name": "Krishna Mandir",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Imadol Kharibot",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Mahalaxmi",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Municipality Office",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Kamalpokhari",
    "nepali": "",
    "buses": [
      "S",
      "R"
    ]
  },
  {
    "name": "Imadol Tempo Park",
    "nepali": "",
    "buses": [
      "S",
      "R"
    ]
  },
  {
    "name": "Bhatbhateni",
    "nepali": "",
    "buses": [
      "S",
      "R"
    ]
  },
  {
    "name": "Harisiddhi Road",
    "nepali": "",
    "buses": [
      "S",
      "R"
    ]
  },
  {
    "name": "Siddhipur",
    "nepali": "",
    "buses": [
      "S",
      "R"
    ]
  },
  {
    "name": "Sana Gaun",
    "nepali": "",
    "buses": [
      "S",
      "R"
    ]
  },
  {
    "name": "Buddha Pokhari",
    "nepali": "",
    "buses": [
      "S",
      "R"
    ]
  },
  {
    "name": "Narkate Chowk",
    "nepali": "",
    "buses": [
      "S",
      "R"
    ]
  },
  {
    "name": "Lubhu",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Mahalaxmi Multiple",
    "nepali": "",
    "buses": [
      "S",
      "R"
    ]
  },
  {
    "name": "Gate",
    "nepali": "",
    "buses": [
      "S",
      "R"
    ]
  },
  {
    "name": "Campus",
    "nepali": "",
    "buses": [
      "S",
      "R"
    ]
  },
  {
    "name": "Harisiddhi",
    "nepali": "",
    "buses": [
      "S",
      "R"
    ]
  },
  {
    "name": "Pani Tanki",
    "nepali": "",
    "buses": [
      "S",
      "R"
    ]
  },
  {
    "name": "Supply Plant",
    "nepali": "",
    "buses": [
      "S",
      "R"
    ]
  },
  {
    "name": "Phulchowki",
    "nepali": "",
    "buses": [
      "S",
      "R"
    ]
  },
  {
    "name": "Bhujunge Chowk",
    "nepali": "",
    "buses": [
      "S",
      "R"
    ]
  },
  {
    "name": "Harisiddhi",
    "nepali": "",
    "buses": [
      "S",
      "R"
    ]
  },
  {
    "name": "Naya Basti",
    "nepali": "",
    "buses": [
      "S",
      "R"
    ]
  },
  {
    "name": "Lamatar",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Dhusal Dhara",
    "nepali": "",
    "buses": [
      "S",
      "R"
    ]
  },
  {
    "name": "Lakhur Chowk",
    "nepali": "",
    "buses": [
      "S",
      "R"
    ]
  },
  {
    "name": "Dhungin",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Harisiddhi",
    "nepali": "",
    "buses": [
      "S",
      "R"
    ]
  },
  {
    "name": "Pulbazar",
    "nepali": "",
    "buses": [
      "X"
    ]
  },
  {
    "name": "Banepa",
    "nepali": "",
    "buses": [
      "X"
    ]
  },
  {
    "name": "Dhulikhel",
    "nepali": "",
    "buses": [
      "X"
    ]
  },
  {
    "name": "Hospital",
    "nepali": "",
    "buses": [
      "X"
    ]
  },
  {
    "name": "Thecho",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Thecho",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Jhyal Pati",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Chapagaun",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Pyangaun",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Bageshwori Temple",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Temple",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Temple",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Lele",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Thaiba",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Badegaun",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Toukhel",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Godawari",
    "nepali": "",
    "buses": [
      "S"
    ]
  }
];

const GENERIC_STOP_WORDS = new Set(['temple', 'chowk', 'bus park', 'bus stop', 'gate', 'hospital', 'school', 'center', 'centre', 'store', 'station', 'microbus station', 'park', 'road', 'marga', 'tole']);

// Quick lookup helper: Returns list of bus operator codes that serve any place matching query
export function findBusesForPlaceQuery(query) {
  if (!query || !query.trim()) return { codes: [], matchedPlaces: [] };
  const normalize = (s) => s.toLowerCase().replace(/budanilk/g, 'budhanilk');
  const q = normalize(query.trim());
  const queryWords = q.split(/\s+/).filter(w => w.length > 2);

  const matches = [];

  for (const item of ALL_PLACES_BUS_INDEX) {
    const rawName = item.name.toLowerCase();
    const name = normalize(rawName);
    const nepali = item.nepali || '';

    // 1. Exact match
    if (name === q || nepali === q) {
      matches.push({ item, score: 100 });
      continue;
    }

    // 2. Name contains full query (e.g. 'radha krishna' in 'radha krishna temple')
    if (name.includes(q) || (nepali && nepali.includes(q))) {
      matches.push({ item, score: 80 });
      continue;
    }

    // 3. Query contains full specific place name (e.g. 'radha krishna temple raniban' contains 'radha krishna temple')
    // Exclude generic words like 'temple' or 'chowk' from matching full query
    if (!GENERIC_STOP_WORDS.has(name) && name.length >= 5 && q.includes(name)) {
      matches.push({ item, score: 70 });
      continue;
    }

    // 4. Multi-word intersection: for multi-word queries, all non-generic words must be present in name
    if (queryWords.length >= 2) {
      const nonGenericWords = queryWords.filter(w => !GENERIC_STOP_WORDS.has(w));
      const matchedCount = nonGenericWords.filter(w => name.includes(w)).length;
      if (nonGenericWords.length > 0 && matchedCount === nonGenericWords.length) {
        matches.push({ item, score: 60 });
      }
    }
  }

  // Filter to highest score tier to prevent pollution from lower-scoring broad matches
  matches.sort((a, b) => b.score - a.score);
  const topScore = matches.length > 0 ? matches[0].score : 0;
  const filtered = matches.filter(m => m.score >= topScore - 10);

  const matchedCodes = new Set();
  const matchedNames = [];
  for (const m of filtered) {
    matchedNames.push(m.item.name);
    m.item.buses.forEach(b => matchedCodes.add(b));
  }

  return {
    codes: Array.from(matchedCodes),
    matchedPlaces: matchedNames.slice(0, 10)
  };
}
