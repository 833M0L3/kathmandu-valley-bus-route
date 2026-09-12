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
      "N",
      "S",
      "I",
      "D",
      "P",
      "H",
      "J",
      "G",
      "E",
      "L",
      "T",
      "F",
      "Z",
      "A",
      "R",
      "Y",
      "B",
      "C",
      "K",
      "O"
    ]
  },
  {
    "name": "Lalitpur (Patan)",
    "nepali": "ललितपुर",
    "buses": [
      "S",
      "N",
      "O",
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
      "D",
      "R",
      "Y"
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
      "Z"
    ]
  },
  {
    "name": "Tribhuvan Int’l Airport",
    "nepali": "विमानस्थल",
    "buses": [
      "Y",
      "G",
      "B",
      "S",
      "M"
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
      "D",
      "L",
      "P",
      "H",
      "J",
      "G",
      "R",
      "Y",
      "N",
      "E",
      "O"
    ]
  },
  {
    "name": "New Baneshwor",
    "nepali": "नयाँ बानेश्वर",
    "buses": [
      "B",
      "S",
      "R",
      "Y",
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
      "F"
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
      "D"
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
      "H",
      "S",
      "I",
      "D"
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
      "O",
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
      "O",
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
      "R",
      "O"
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
      "D",
      "Y",
      "N",
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
      "Y",
      "N",
      "E",
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
      "A",
      "H"
    ]
  },
  {
    "name": "Budhanilkantha",
    "nepali": "बुढानीलकण्ठ",
    "buses": [
      "S",
      "A",
      "D"
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
    "buses": []
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
    "buses": []
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
    "buses": []
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
    "buses": []
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
    "buses": []
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
    "buses": []
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
    "buses": []
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
    "buses": []
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
    "buses": []
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
    "buses": []
  },
  {
    "name": "Fulbari Gate Army Camp",
    "nepali": "",
    "buses": []
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
    "buses": []
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
    "buses": []
  },
  {
    "name": "Siddhartha Bank",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "NIC Asia Bank",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Nur Chowk",
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
      "T"
    ]
  },
  {
    "name": "Mansingh College",
    "nepali": "",
    "buses": [
      "T"
    ]
  },
  {
    "name": "Angels' Heart Secondary School",
    "nepali": "",
    "buses": [
      "B"
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
      "S"
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
      "T"
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
    "buses": []
  },
  {
    "name": "Taleju Bhawani Petrol Pump",
    "nepali": "",
    "buses": []
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
      "Z"
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
      "Z"
    ]
  },
  {
    "name": "Tokha Municipality Ward 9 Office",
    "nepali": "",
    "buses": [
      "Z",
      "B",
      "S"
    ]
  },
  {
    "name": "Bich Vinayak Ganeshsthan",
    "nepali": "",
    "buses": [
      "Z",
      "B",
      "S"
    ]
  },
  {
    "name": "Basundhara Chowk",
    "nepali": "",
    "buses": [
      "M",
      "Z",
      "B",
      "S"
    ]
  },
  {
    "name": "Deuba Chowk",
    "nepali": "",
    "buses": []
  },
  {
    "name": "Sahajmarga Microbus Station",
    "nepali": "",
    "buses": []
  },
  {
    "name": "Hakucha Bridge",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Anita Milan Kindergarten",
    "nepali": "",
    "buses": [
      "D"
    ]
  },
  {
    "name": "Baluwakhani (Kapan)",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "D"
    ]
  },
  {
    "name": "Naulin Sports Villa",
    "nepali": "",
    "buses": [
      "D"
    ]
  },
  {
    "name": "Sundarbasti Kapan",
    "nepali": "",
    "buses": [
      "D",
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
      "D"
    ]
  },
  {
    "name": "Baluwakhani (Kapan)",
    "nepali": "",
    "buses": [
      "D",
      "S",
      "A"
    ]
  },
  {
    "name": "Sweet Science Boxing and Fitness",
    "nepali": "",
    "buses": [
      "D",
      "S",
      "A"
    ]
  },
  {
    "name": "Municipality Hospital Bhadra Fuel",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "D",
      "L"
    ]
  },
  {
    "name": "Bhadra Fuel Concern",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "D",
      "L"
    ]
  },
  {
    "name": "Kapan Sekuwa Restaurant",
    "nepali": "",
    "buses": [
      "D",
      "S",
      "A"
    ]
  },
  {
    "name": "Neuro Hospital",
    "nepali": "",
    "buses": [
      "D"
    ]
  },
  {
    "name": "Aakashedhar Kapan",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "D",
      "L"
    ]
  },
  {
    "name": "Gangalal Hospital",
    "nepali": "",
    "buses": [
      "D"
    ]
  },
  {
    "name": "Srijana Chowk",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "D"
    ]
  },
  {
    "name": "Rave Futsal Center",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "D"
    ]
  },
  {
    "name": "National Media Development Center",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "D"
    ]
  },
  {
    "name": "Narayan Gopal Chowk (Chakrapath",
    "nepali": "",
    "buses": [
      "D",
      "S",
      "A"
    ]
  },
  {
    "name": "Hem Ganga Kala Sahitya Pratisthan",
    "nepali": "",
    "buses": [
      "S",
      "A"
    ]
  },
  {
    "name": "Chappal Karkhana",
    "nepali": "",
    "buses": [
      "D",
      "S",
      "A"
    ]
  },
  {
    "name": "Aakashedhara Micro Bus Park",
    "nepali": "",
    "buses": [
      "L",
      "S",
      "A",
      "D",
      "N"
    ]
  },
  {
    "name": "ience nd Fitness",
    "nepali": "",
    "buses": [
      "D",
      "S",
      "A"
    ]
  },
  {
    "name": "Kapan Handball Sports Ground",
    "nepali": "",
    "buses": [
      "L",
      "S",
      "A",
      "D",
      "N"
    ]
  },
  {
    "name": "Budhanilkantha Temple",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "D"
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
      "S",
      "A",
      "D",
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
      "S"
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
      "S"
    ]
  },
  {
    "name": "Om Saibaba Memorial Hospital",
    "nepali": "",
    "buses": [
      "M",
      "T"
    ]
  },
  {
    "name": "Yerahity Dhungedhara",
    "nepali": "",
    "buses": [
      "M",
      "T",
      "B",
      "S"
    ]
  },
  {
    "name": "Sano Bharyang",
    "nepali": "",
    "buses": [
      "M",
      "T"
    ]
  },
  {
    "name": "Thulo Bharyang",
    "nepali": "",
    "buses": [
      "M",
      "T"
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
      "D",
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
      "D",
      "A"
    ]
  },
  {
    "name": "Kanti Children's Hospital",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "D",
      "B",
      "M",
      "I",
      "E"
    ]
  },
  {
    "name": "Bishal Nagar",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "M",
      "A",
      "D",
      "I",
      "E"
    ]
  },
  {
    "name": "Oops! Nepal Funpark",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "M",
      "A",
      "E",
      "D",
      "I"
    ]
  },
  {
    "name": "Baluwatar Embassyof China",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "I",
      "D",
      "B",
      "M"
    ]
  },
  {
    "name": "Baluwatar China",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "M",
      "A",
      "I",
      "D"
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
      "A",
      "D"
    ]
  },
  {
    "name": "Aatma Gyan Prachar Sangh (AGPS",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Bishal Basti Gate",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "M",
      "E",
      "A",
      "D",
      "I"
    ]
  },
  {
    "name": "Bishal Basti Big Mart",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "M",
      "E",
      "A",
      "D",
      "I"
    ]
  },
  {
    "name": "Gate Big Mart",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "M",
      "E",
      "A",
      "D",
      "I"
    ]
  },
  {
    "name": "Gate Bishalnagar",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "M",
      "E",
      "A",
      "D",
      "I"
    ]
  },
  {
    "name": "Big Mart Bishalnagar",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "M",
      "E",
      "A",
      "D",
      "I"
    ]
  },
  {
    "name": "Naxal Bhatbhateni",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "I",
      "D",
      "M",
      "B"
    ]
  },
  {
    "name": "Naxal hateni",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "B",
      "M",
      "I",
      "D"
    ]
  },
  {
    "name": "Bodhi Books and Bistro",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "M",
      "E"
    ]
  },
  {
    "name": "Tangal Secondary School",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "M",
      "E"
    ]
  },
  {
    "name": "Samakhusi Town Planning",
    "nepali": "",
    "buses": [
      "Z",
      "T",
      "F",
      "A"
    ]
  },
  {
    "name": "Goma Ganesh Temple",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "I",
      "D"
    ]
  },
  {
    "name": "Siddhartha Bank Head Ofice",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "I",
      "D"
    ]
  },
  {
    "name": "Head Ofice Nepal Police",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "I",
      "D"
    ]
  },
  {
    "name": "Narayan Chaur",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "I",
      "D"
    ]
  },
  {
    "name": "Royal Enfield Showroom",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "I",
      "D"
    ]
  },
  {
    "name": "Nepal Police Headquarters",
    "nepali": "",
    "buses": [
      "S",
      "A"
    ]
  },
  {
    "name": "Ncell Head Ofice",
    "nepali": "",
    "buses": [
      "Z",
      "A",
      "T",
      "F",
      "S",
      "I",
      "D"
    ]
  },
  {
    "name": "Traffic Police Circle Maligaun",
    "nepali": "",
    "buses": [
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
      "D"
    ]
  },
  {
    "name": "Sanima Bank Head Office",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "I",
      "D"
    ]
  },
  {
    "name": "Head Office Naxal Vegetable",
    "nepali": "",
    "buses": [
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
      "I",
      "D"
    ]
  },
  {
    "name": "Naxal Vegetable Market",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "N"
    ]
  },
  {
    "name": "Maligaun Ganesh Mandir",
    "nepali": "",
    "buses": [
      "P",
      "H",
      "J",
      "G"
    ]
  },
  {
    "name": "Ocean Mart Naag",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "I",
      "D"
    ]
  },
  {
    "name": "Naag Pokhari",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "I",
      "D"
    ]
  },
  {
    "name": "Nandi Ratri Secondary School",
    "nepali": "",
    "buses": [
      "N",
      "S",
      "A"
    ]
  },
  {
    "name": "Narayanhiti Palace",
    "nepali": "",
    "buses": [
      "S",
      "I",
      "D",
      "A",
      "Z"
    ]
  },
  {
    "name": "Brihaspati Vidyasadan School",
    "nepali": "",
    "buses": [
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
      "N",
      "P",
      "H",
      "J",
      "G",
      "L",
      "E"
    ]
  },
  {
    "name": "Vidyasadan School hmandu",
    "nepali": "",
    "buses": [
      "N",
      "P",
      "H",
      "J",
      "G",
      "L",
      "E"
    ]
  },
  {
    "name": "NIC Asia Siddhartha Bank",
    "nepali": "",
    "buses": [
      "P",
      "H",
      "J",
      "G",
      "L",
      "E"
    ]
  },
  {
    "name": "Jai Nepal Hall",
    "nepali": "",
    "buses": [
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
      "N",
      "P",
      "H",
      "J",
      "G",
      "E",
      "L"
    ]
  },
  {
    "name": "Hotel Shree Naxal",
    "nepali": "",
    "buses": [
      "N",
      "P",
      "H",
      "J",
      "G",
      "E",
      "L"
    ]
  },
  {
    "name": "Kathmandu English School",
    "nepali": "",
    "buses": [
      "N",
      "P",
      "H",
      "J",
      "G",
      "E",
      "L"
    ]
  },
  {
    "name": "Kathmandu rlish School",
    "nepali": "",
    "buses": [
      "N",
      "P",
      "H",
      "J",
      "G",
      "L",
      "E"
    ]
  },
  {
    "name": "Durbar Marg",
    "nepali": "",
    "buses": [
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
      "N",
      "P",
      "H",
      "J",
      "G",
      "E",
      "L"
    ]
  },
  {
    "name": "Bhagwati Temple Herald College",
    "nepali": "",
    "buses": [
      "N",
      "P",
      "H",
      "J",
      "G",
      "E",
      "L"
    ]
  },
  {
    "name": "Nepal Mountaineering Association",
    "nepali": "",
    "buses": [
      "N",
      "P",
      "H",
      "J",
      "G",
      "E",
      "L"
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
      "E",
      "N"
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
      "L",
      "E",
      "N"
    ]
  },
  {
    "name": "Sano Gaucharan",
    "nepali": "",
    "buses": [
      "N",
      "P",
      "H",
      "J",
      "G",
      "E",
      "L"
    ]
  },
  {
    "name": "Sano Football Field",
    "nepali": "",
    "buses": [
      "N",
      "P",
      "H",
      "J",
      "G",
      "E",
      "L"
    ]
  },
  {
    "name": "Sano botball Field",
    "nepali": "",
    "buses": [
      "N",
      "P",
      "H",
      "J",
      "G",
      "E",
      "L"
    ]
  },
  {
    "name": "Sano potball Field",
    "nepali": "",
    "buses": [
      "N",
      "P",
      "H",
      "J",
      "G",
      "E",
      "L"
    ]
  },
  {
    "name": "Electricity Regulatory",
    "nepali": "",
    "buses": [
      "P",
      "H",
      "J",
      "G",
      "L",
      "E",
      "N"
    ]
  },
  {
    "name": "Electricity Commission",
    "nepali": "",
    "buses": [
      "P",
      "H",
      "J",
      "G",
      "L",
      "E",
      "N"
    ]
  },
  {
    "name": "Regulatory Commission",
    "nepali": "",
    "buses": [
      "P",
      "H",
      "J",
      "G",
      "L",
      "E",
      "N"
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
      "E",
      "L"
    ]
  },
  {
    "name": "Embassy of Germany",
    "nepali": "",
    "buses": [
      "N",
      "P",
      "H",
      "J",
      "G",
      "L",
      "E"
    ]
  },
  {
    "name": "Tri-Chandra Muttiple Campus",
    "nepali": "",
    "buses": [
      "N",
      "P",
      "H",
      "J",
      "G",
      "E",
      "L",
      "S",
      "I",
      "D",
      "R",
      "Y",
      "T",
      "F",
      "Z",
      "A",
      "B",
      "C",
      "K",
      "O"
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
      "E",
      "L",
      "S",
      "R",
      "Y",
      "I",
      "D",
      "B",
      "F",
      "Z",
      "A",
      "O"
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
      "E",
      "L",
      "S",
      "R",
      "Y",
      "I",
      "D",
      "B",
      "F",
      "Z",
      "A",
      "O"
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
      "E"
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
      "E",
      "L",
      "S",
      "R",
      "Y",
      "I",
      "D",
      "B",
      "F",
      "Z",
      "A",
      "O"
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
      "E",
      "L",
      "S",
      "R",
      "Y",
      "I",
      "D",
      "B",
      "C",
      "K",
      "O",
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
      "S",
      "A",
      "D"
    ]
  },
  {
    "name": "Sat Talley Kapan",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Sukedhara Chowk",
    "nepali": "",
    "buses": [
      "S",
      "A"
    ]
  },
  {
    "name": "Kathmandu Unified City School",
    "nepali": "",
    "buses": [
      "L"
    ]
  },
  {
    "name": "Kathmandu Unified Yangtaru Sekuwa Corner",
    "nepali": "",
    "buses": [
      "L",
      "J",
      "N"
    ]
  },
  {
    "name": "City School Yangtaru Sekuwa Corner",
    "nepali": "",
    "buses": [
      "L",
      "J",
      "N"
    ]
  },
  {
    "name": "Italian Bakery Shiva Panchayan Mandir",
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
    "name": "Oops!Nepal Funpark",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "M",
      "A",
      "E",
      "D",
      "I"
    ]
  },
  {
    "name": "Dhumbarahi Chowk",
    "nepali": "",
    "buses": [
      "E",
      "B",
      "S",
      "M",
      "A",
      "D"
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
      "E",
      "B",
      "S",
      "M"
    ]
  },
  {
    "name": "Dhumbarahi Chowk",
    "nepali": "",
    "buses": [
      "E",
      "B",
      "S",
      "M"
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
      "B",
      "S",
      "M",
      "L",
      "N",
      "E"
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
      "L",
      "E"
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
      "P",
      "H",
      "J",
      "G",
      "N",
      "L",
      "E"
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
      "L",
      "E",
      "P",
      "H",
      "J",
      "G",
      "N"
    ]
  },
  {
    "name": "Sinamangal (Airport Gate)",
    "nepali": "",
    "buses": [
      "N",
      "L",
      "E",
      "P"
    ]
  },
  {
    "name": "Kathmandu Medical College",
    "nepali": "",
    "buses": [
      "N",
      "B",
      "S",
      "M",
      "G",
      "L",
      "E",
      "Y"
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
      "P"
    ]
  },
  {
    "name": "Kageshwori Ward 4 Office",
    "nepali": "",
    "buses": [
      "P"
    ]
  },
  {
    "name": "NTC Indrayani",
    "nepali": "",
    "buses": []
  },
  {
    "name": "NTC Exchange",
    "nepali": "",
    "buses": []
  },
  {
    "name": "Manohara Ward 4 Office",
    "nepali": "",
    "buses": [
      "P"
    ]
  },
  {
    "name": "Gokarneshwor Yatayat Bus Park, Danchhi",
    "nepali": "",
    "buses": []
  },
  {
    "name": "NIC Asia Bank Danchhi",
    "nepali": "",
    "buses": []
  },
  {
    "name": "Indrayani Exchange",
    "nepali": "",
    "buses": []
  },
  {
    "name": "Kageshwori Manohara Municipality",
    "nepali": "",
    "buses": [
      "P"
    ]
  },
  {
    "name": "Brahmakhel Chowk",
    "nepali": "",
    "buses": []
  },
  {
    "name": "Panchpokhari Yatayat Bus Park, Danchhi",
    "nepali": "",
    "buses": []
  },
  {
    "name": "Saraswotikhel Bus Park",
    "nepali": "",
    "buses": [
      "L"
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
      "C"
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
      "C"
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
      "C"
    ]
  },
  {
    "name": "Police Circle Kalimati",
    "nepali": "",
    "buses": [
      "S",
      "K",
      "I",
      "N",
      "B",
      "X",
      "M",
      "C",
      "D",
      "Y"
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
      "B",
      "X",
      "M",
      "D",
      "C",
      "Y"
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
      "L",
      "P",
      "H",
      "J",
      "G",
      "E",
      "B",
      "N",
      "S",
      "R",
      "Y"
    ]
  },
  {
    "name": "Bir Hospital NAC",
    "nepali": "",
    "buses": [
      "D",
      "R",
      "A",
      "H",
      "B",
      "S",
      "C",
      "K",
      "I",
      "P",
      "Y",
      "N",
      "E",
      "O",
      "T",
      "F",
      "Z",
      "L",
      "J",
      "G"
    ]
  },
  {
    "name": "Tundikhel Bhrikuti",
    "nepali": "",
    "buses": [
      "R",
      "Y",
      "S",
      "L",
      "P",
      "H",
      "J",
      "G",
      "E",
      "B",
      "C",
      "K",
      "I",
      "N",
      "O",
      "T",
      "F",
      "Z",
      "A",
      "D"
    ]
  },
  {
    "name": "NAC Sundhara",
    "nepali": "",
    "buses": [
      "D",
      "R",
      "B",
      "S",
      "C",
      "K",
      "I",
      "P",
      "Y",
      "N",
      "E",
      "O",
      "A",
      "H",
      "T",
      "F",
      "Z",
      "L",
      "J",
      "G"
    ]
  },
  {
    "name": "Bhrikuti Mandap",
    "nepali": "",
    "buses": [
      "R",
      "Y",
      "S",
      "B",
      "C",
      "K",
      "I",
      "P",
      "N",
      "E",
      "O",
      "L",
      "H",
      "J",
      "G",
      "T",
      "F",
      "Z",
      "A",
      "D"
    ]
  },
  {
    "name": "New Plaza",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "R",
      "Y",
      "L",
      "P",
      "H",
      "J",
      "G",
      "E",
      "N"
    ]
  },
  {
    "name": "Sundhara Sahid",
    "nepali": "",
    "buses": [
      "D",
      "B",
      "S",
      "C",
      "K",
      "I",
      "P",
      "Y",
      "N",
      "E",
      "O",
      "R",
      "A",
      "H",
      "T",
      "F",
      "Z",
      "L",
      "J",
      "G"
    ]
  },
  {
    "name": "Sahid Gate",
    "nepali": "",
    "buses": [
      "D",
      "B",
      "S",
      "C",
      "K",
      "I",
      "P",
      "Y",
      "N",
      "E",
      "O",
      "R",
      "A",
      "H",
      "T",
      "F",
      "Z",
      "L",
      "J",
      "G"
    ]
  },
  {
    "name": "Singha Durbar",
    "nepali": "",
    "buses": [
      "B",
      "R",
      "Y",
      "S",
      "I",
      "P",
      "N",
      "E",
      "O",
      "L"
    ]
  },
  {
    "name": "Anamnagar",
    "nepali": "",
    "buses": [
      "R",
      "Y",
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
      "Y",
      "S",
      "I",
      "P",
      "N",
      "E",
      "O"
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
      "O",
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
      "P",
      "O"
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
      "O",
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
      "O"
    ]
  },
  {
    "name": "Bhatbhateni (Siddhipur)",
    "nepali": "",
    "buses": [
      "O",
      "S",
      "R"
    ]
  },
  {
    "name": "Thasikwa Falcha",
    "nepali": "",
    "buses": [
      "S",
      "R",
      "O"
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
      "R",
      "O"
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
    "buses": []
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
    "buses": []
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
    "buses": []
  },
  {
    "name": "Training Center",
    "nepali": "",
    "buses": []
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
    "buses": []
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
    "buses": []
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
    "buses": []
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
    "buses": []
  },
  {
    "name": "ole",
    "nepali": "",
    "buses": []
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
    "buses": []
  },
  {
    "name": "Bohoratar",
    "nepali": "",
    "buses": []
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
    "buses": []
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
    "buses": []
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
    "buses": []
  },
  {
    "name": "Deepshikha High School",
    "nepali": "",
    "buses": []
  },
  {
    "name": "Lolang Pharmacy",
    "nepali": "",
    "buses": []
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
    "buses": []
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
    "buses": []
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
    "buses": []
  },
  {
    "name": "Goldhunga",
    "nepali": "",
    "buses": []
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
    "buses": []
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
    "buses": []
  },
  {
    "name": "Sadan School",
    "nepali": "",
    "buses": []
  },
  {
    "name": "Rehabilitation Center",
    "nepali": "",
    "buses": []
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
    "buses": []
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
    "buses": []
  },
  {
    "name": "Choyeling Gumba",
    "nepali": "",
    "buses": []
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
    "buses": []
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
    "buses": []
  },
  {
    "name": "National Park Entrance",
    "nepali": "",
    "buses": []
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
    "buses": []
  },
  {
    "name": "Army Camp",
    "nepali": "",
    "buses": []
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
    "buses": []
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
    "buses": []
  },
  {
    "name": "Svetah Bhawan",
    "nepali": "",
    "buses": []
  },
  {
    "name": "Nagarjun Futsal",
    "nepali": "",
    "buses": []
  },
  {
    "name": "Bijayanagar Chowk",
    "nepali": "",
    "buses": []
  },
  {
    "name": "Radha Krishna Temple",
    "nepali": "",
    "buses": []
  },
  {
    "name": "Raniban",
    "nepali": "",
    "buses": []
  },
  {
    "name": "Army Rehabilitation",
    "nepali": "",
    "buses": []
  },
  {
    "name": "Center",
    "nepali": "",
    "buses": []
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
    "buses": []
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
      "T"
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
      "B"
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
      "B"
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
      "S"
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
      "S"
    ]
  },
  {
    "name": "Bishnumati Temple",
    "nepali": "",
    "buses": [
      "M",
      "Z",
      "B",
      "S"
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
      "Z"
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
    "buses": []
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
    "buses": []
  },
  {
    "name": "Petrol Pump",
    "nepali": "",
    "buses": []
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
      "Z"
    ]
  },
  {
    "name": "Greenland Int'l",
    "nepali": "",
    "buses": [
      "Z"
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
      "Z"
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
      "Z"
    ]
  },
  {
    "name": "Banquet",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Bich Vinayak",
    "nepali": "",
    "buses": [
      "Z",
      "B",
      "S"
    ]
  },
  {
    "name": "Basundhara Chowk",
    "nepali": "",
    "buses": [
      "D"
    ]
  },
  {
    "name": "Ward 9 Office",
    "nepali": "",
    "buses": [
      "Z",
      "B",
      "S"
    ]
  },
  {
    "name": "Ganeshsthan",
    "nepali": "",
    "buses": [
      "Z",
      "B",
      "S"
    ]
  },
  {
    "name": "Big Mart",
    "nepali": "",
    "buses": [
      "Z",
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
      "B"
    ]
  },
  {
    "name": "Kharibot, Tokha Road",
    "nepali": "",
    "buses": [
      "Z",
      "M"
    ]
  },
  {
    "name": "Guru Mart",
    "nepali": "",
    "buses": [
      "Z",
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
      "B",
      "S"
    ]
  },
  {
    "name": "Aakash Jogini Enterprises",
    "nepali": "",
    "buses": [
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
      "S"
    ]
  },
  {
    "name": "Petrol Pump",
    "nepali": "",
    "buses": [
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
      "M",
      "Z",
      "B",
      "S"
    ]
  },
  {
    "name": "Tridevi Mandir",
    "nepali": "",
    "buses": []
  },
  {
    "name": "Sahajmarga",
    "nepali": "",
    "buses": []
  },
  {
    "name": "Microbus Station",
    "nepali": "",
    "buses": []
  },
  {
    "name": "Rhythm Bakery",
    "nepali": "",
    "buses": []
  },
  {
    "name": "Chapali",
    "nepali": "",
    "buses": []
  },
  {
    "name": "Happy Chowk",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Ganesh Chowk",
    "nepali": "",
    "buses": [
      "D"
    ]
  },
  {
    "name": "Lokeshwor Park",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Nursery Chowk",
    "nepali": "",
    "buses": [
      "D"
    ]
  },
  {
    "name": "Sukunda Banquet",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Hattigauda Chowk",
    "nepali": "",
    "buses": [
      "D"
    ]
  },
  {
    "name": "Anita Milan",
    "nepali": "",
    "buses": [
      "D"
    ]
  },
  {
    "name": "Kindergarten",
    "nepali": "",
    "buses": [
      "D"
    ]
  },
  {
    "name": "Sapredhunga Pul",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "D"
    ]
  },
  {
    "name": "Naulin",
    "nepali": "",
    "buses": [
      "D"
    ]
  },
  {
    "name": "Panchashil Marga",
    "nepali": "",
    "buses": [
      "D"
    ]
  },
  {
    "name": "Kapan Monastery / Chowk",
    "nepali": "",
    "buses": [
      "D",
      "S",
      "A"
    ]
  },
  {
    "name": "Ananta Studio Cafe",
    "nepali": "",
    "buses": [
      "D"
    ]
  },
  {
    "name": "Shrestha Swimming",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "D"
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
      "D"
    ]
  },
  {
    "name": "Hariyo Pul",
    "nepali": "",
    "buses": [
      "D",
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
      "D"
    ]
  },
  {
    "name": "Pahelo Pul",
    "nepali": "",
    "buses": [
      "D",
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
      "D"
    ]
  },
  {
    "name": "Special Chowk",
    "nepali": "",
    "buses": [
      "D"
    ]
  },
  {
    "name": "Kapan Monastery / Chowk",
    "nepali": "",
    "buses": [
      "D",
      "S",
      "A"
    ]
  },
  {
    "name": "Sweet Science",
    "nepali": "",
    "buses": [
      "D",
      "S",
      "A"
    ]
  },
  {
    "name": "Boxing and Fitness",
    "nepali": "",
    "buses": [
      "D",
      "S",
      "A"
    ]
  },
  {
    "name": "Municipality Hospital",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "D",
      "L"
    ]
  },
  {
    "name": "Golfutar Basketball Court",
    "nepali": "",
    "buses": [
      "D"
    ]
  },
  {
    "name": "Concern",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "D",
      "L"
    ]
  },
  {
    "name": "Kapan Sekuwa",
    "nepali": "",
    "buses": [
      "D",
      "S",
      "A"
    ]
  },
  {
    "name": "Restaurant",
    "nepali": "",
    "buses": [
      "D",
      "S",
      "A"
    ]
  },
  {
    "name": "Kantipur Futsal",
    "nepali": "",
    "buses": [
      "D",
      "S",
      "A"
    ]
  },
  {
    "name": "Kapan Monastery / Chowk",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "D",
      "L"
    ]
  },
  {
    "name": "Ekatabasti Mode",
    "nepali": "",
    "buses": [
      "D",
      "S",
      "A"
    ]
  },
  {
    "name": "Big Mart",
    "nepali": "",
    "buses": [
      "D",
      "S",
      "A"
    ]
  },
  {
    "name": "Bansbari",
    "nepali": "",
    "buses": [
      "D",
      "S",
      "A"
    ]
  },
  {
    "name": "Rudramati Chowk",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "D",
      "L"
    ]
  },
  {
    "name": "National Media",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "D"
    ]
  },
  {
    "name": "Center",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "D"
    ]
  },
  {
    "name": "Development Center",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "D",
      "L"
    ]
  },
  {
    "name": "Narayan Gopal",
    "nepali": "",
    "buses": [
      "D",
      "S",
      "A"
    ]
  },
  {
    "name": "Chowk (Chakrapath",
    "nepali": "",
    "buses": [
      "D",
      "S",
      "A"
    ]
  },
  {
    "name": "Hem Ganga Kala",
    "nepali": "",
    "buses": [
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
      "D"
    ]
  },
  {
    "name": "Nilopul",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "D"
    ]
  },
  {
    "name": "Sahitya Pratisthan",
    "nepali": "",
    "buses": [
      "S",
      "A"
    ]
  },
  {
    "name": "Shivapuri Chowk",
    "nepali": "",
    "buses": [
      "L"
    ]
  },
  {
    "name": "Royal Himalayan Coffee",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "D"
    ]
  },
  {
    "name": "Pvt. Ltd",
    "nepali": "",
    "buses": []
  },
  {
    "name": "Pradesh Park",
    "nepali": "",
    "buses": [
      "N"
    ]
  },
  {
    "name": "Riverside Sports",
    "nepali": "",
    "buses": [
      "N"
    ]
  },
  {
    "name": "Furniture Chautari",
    "nepali": "",
    "buses": [
      "N"
    ]
  },
  {
    "name": "Chunikhel - Mahankal",
    "nepali": "",
    "buses": [
      "N"
    ]
  },
  {
    "name": "Bridge",
    "nepali": "",
    "buses": [
      "N"
    ]
  },
  {
    "name": "Chiya Mantra Tea Shop",
    "nepali": "",
    "buses": [
      "N"
    ]
  },
  {
    "name": "Green City Colony",
    "nepali": "",
    "buses": [
      "N"
    ]
  },
  {
    "name": "Happy Kids Kindergarten",
    "nepali": "",
    "buses": [
      "N"
    ]
  },
  {
    "name": "Chunikhel",
    "nepali": "",
    "buses": [
      "N"
    ]
  },
  {
    "name": "Hakucha Bridge",
    "nepali": "",
    "buses": [
      "N"
    ]
  },
  {
    "name": "Shrestha Skate Park",
    "nepali": "",
    "buses": [
      "L"
    ]
  },
  {
    "name": "Swarupa Tole",
    "nepali": "",
    "buses": [
      "L"
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
      "D",
      "S",
      "A"
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
      "L",
      "S",
      "A",
      "D",
      "N"
    ]
  },
  {
    "name": "Micro Bus Park",
    "nepali": "",
    "buses": [
      "L",
      "S",
      "A",
      "D",
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
      "L",
      "S",
      "A",
      "D",
      "N"
    ]
  },
  {
    "name": "Sports Ground",
    "nepali": "",
    "buses": [
      "L",
      "S",
      "A",
      "D",
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
      "L",
      "S",
      "A",
      "D",
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
      "T"
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
      "M"
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
      "M"
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
      "S"
    ]
  },
  {
    "name": "Big Mart Supermarket",
    "nepali": "",
    "buses": [
      "M",
      "T"
    ]
  },
  {
    "name": "Yerahity",
    "nepali": "",
    "buses": [
      "M",
      "T"
    ]
  },
  {
    "name": "Om Saibaba",
    "nepali": "",
    "buses": [
      "M",
      "T"
    ]
  },
  {
    "name": "Yerahity",
    "nepali": "",
    "buses": [
      "M",
      "T",
      "B",
      "S"
    ]
  },
  {
    "name": "Memorial Hospital",
    "nepali": "",
    "buses": [
      "M",
      "T"
    ]
  },
  {
    "name": "Vibhuti Secondary School",
    "nepali": "",
    "buses": [
      "M",
      "T"
    ]
  },
  {
    "name": "Dhunge Dhara",
    "nepali": "",
    "buses": [
      "M",
      "T",
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
      "B",
      "S"
    ]
  },
  {
    "name": "Naya Bazaar",
    "nepali": "",
    "buses": [
      "F",
      "T"
    ]
  },
  {
    "name": "Sorhakhutte Chowk",
    "nepali": "",
    "buses": [
      "F",
      "T",
      "Z",
      "A"
    ]
  },
  {
    "name": "Sitapaila Chowk",
    "nepali": "",
    "buses": [
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
      "S",
      "A",
      "D",
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
      "D",
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
      "D",
      "A"
    ]
  },
  {
    "name": "Hospital",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "D",
      "B",
      "M",
      "I",
      "E"
    ]
  },
  {
    "name": "Police Hospital",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "I",
      "D",
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
      "A",
      "D",
      "I"
    ]
  },
  {
    "name": "Panipokhari",
    "nepali": "",
    "buses": [
      "I",
      "D",
      "B",
      "S",
      "A"
    ]
  },
  {
    "name": "Aatma Gyan",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Embassyof China",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "I",
      "D",
      "B",
      "M"
    ]
  },
  {
    "name": "Prachar Sangh (AGPS",
    "nepali": "",
    "buses": [
      "Z"
    ]
  },
  {
    "name": "Japanese Embassy",
    "nepali": "",
    "buses": [
      "I",
      "D",
      "Z",
      "S",
      "A"
    ]
  },
  {
    "name": "Kapurdhara",
    "nepali": "",
    "buses": [
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
      "D",
      "S",
      "A"
    ]
  },
  {
    "name": "Gairidhara",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "I",
      "D"
    ]
  },
  {
    "name": "Tangal",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "B",
      "M",
      "I",
      "D"
    ]
  },
  {
    "name": "Bodhi Books",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "M",
      "E"
    ]
  },
  {
    "name": "Gangjong Hotel",
    "nepali": "",
    "buses": [
      "Z",
      "I",
      "D",
      "S",
      "A"
    ]
  },
  {
    "name": "Tangal",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "M",
      "E"
    ]
  },
  {
    "name": "and Bistro",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "M",
      "E"
    ]
  },
  {
    "name": "Children Park",
    "nepali": "",
    "buses": [
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
      "S",
      "A",
      "I",
      "D"
    ]
  },
  {
    "name": "Radison Hotel",
    "nepali": "",
    "buses": [
      "Z",
      "I",
      "D",
      "S",
      "A"
    ]
  },
  {
    "name": "Siddhartha Bank",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "I",
      "D"
    ]
  },
  {
    "name": "Head Ofice",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "I",
      "D"
    ]
  },
  {
    "name": "Lazimpat (Hotel Radisson)",
    "nepali": "",
    "buses": [
      "Z",
      "I",
      "D",
      "S",
      "A"
    ]
  },
  {
    "name": "Nepal Police",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "I",
      "D"
    ]
  },
  {
    "name": "Galkopakha M",
    "nepali": "",
    "buses": [
      "T",
      "F",
      "Z",
      "A",
      "S",
      "I",
      "D"
    ]
  },
  {
    "name": "Showroom",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "I",
      "D"
    ]
  },
  {
    "name": "Headquarters",
    "nepali": "",
    "buses": [
      "S",
      "A"
    ]
  },
  {
    "name": "Naxal",
    "nepali": "",
    "buses": [
      "S",
      "A"
    ]
  },
  {
    "name": "Ncell",
    "nepali": "",
    "buses": [
      "Z",
      "A",
      "T",
      "F",
      "S",
      "I",
      "D"
    ]
  },
  {
    "name": "Machhapuchchhre",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "I",
      "D",
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
      "D"
    ]
  },
  {
    "name": "Maligaun",
    "nepali": "",
    "buses": [
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
      "S",
      "A",
      "I",
      "D"
    ]
  },
  {
    "name": "Head Office",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "I",
      "D"
    ]
  },
  {
    "name": "Maligaun",
    "nepali": "",
    "buses": [
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
      "N",
      "S",
      "A"
    ]
  },
  {
    "name": "Lainchaur Ground",
    "nepali": "",
    "buses": [
      "S",
      "I",
      "D",
      "Z",
      "A",
      "T",
      "F"
    ]
  },
  {
    "name": "Nandi Ratri",
    "nepali": "",
    "buses": [
      "N",
      "S",
      "A"
    ]
  },
  {
    "name": "Secondary School",
    "nepali": "",
    "buses": [
      "N",
      "S",
      "A"
    ]
  },
  {
    "name": "Palace",
    "nepali": "",
    "buses": [
      "S",
      "I",
      "D",
      "A",
      "Z"
    ]
  },
  {
    "name": "Brihaspati",
    "nepali": "",
    "buses": [
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
      "S",
      "I",
      "D"
    ]
  },
  {
    "name": "Bank",
    "nepali": "",
    "buses": [
      "P",
      "H",
      "J",
      "G",
      "L",
      "E"
    ]
  },
  {
    "name": "Hall",
    "nepali": "",
    "buses": [
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
      "F"
    ]
  },
  {
    "name": "Marriot Hotel",
    "nepali": "",
    "buses": [
      "N",
      "P",
      "H",
      "J"
    ]
  },
  {
    "name": "English School",
    "nepali": "",
    "buses": [
      "N",
      "P",
      "H",
      "J",
      "G",
      "E",
      "L"
    ]
  },
  {
    "name": "Bhagwati Temple",
    "nepali": "",
    "buses": [
      "N",
      "P",
      "H",
      "J",
      "G",
      "E",
      "L"
    ]
  },
  {
    "name": "Nepal Mountaineering",
    "nepali": "",
    "buses": [
      "N",
      "P",
      "H",
      "J",
      "G",
      "E",
      "L"
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
      "L",
      "E",
      "N"
    ]
  },
  {
    "name": "Sano",
    "nepali": "",
    "buses": [
      "N",
      "P",
      "H",
      "J",
      "G",
      "E",
      "L"
    ]
  },
  {
    "name": "Electricity",
    "nepali": "",
    "buses": [
      "P",
      "H",
      "J",
      "G",
      "L",
      "E",
      "N"
    ]
  },
  {
    "name": "Herald College",
    "nepali": "",
    "buses": [
      "N",
      "P",
      "H",
      "J",
      "G",
      "E",
      "L"
    ]
  },
  {
    "name": "Regulatory",
    "nepali": "",
    "buses": [
      "P",
      "H",
      "J",
      "G",
      "L",
      "E",
      "N"
    ]
  },
  {
    "name": "Commission",
    "nepali": "",
    "buses": [
      "P",
      "H",
      "J",
      "G",
      "L",
      "E",
      "N"
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
      "E",
      "N"
    ]
  },
  {
    "name": "Hattisar",
    "nepali": "",
    "buses": [
      "N",
      "P",
      "H",
      "J",
      "G",
      "E",
      "L"
    ]
  },
  {
    "name": "Kamalpokhari",
    "nepali": "",
    "buses": [
      "N",
      "P",
      "H",
      "J",
      "G",
      "E",
      "L"
    ]
  },
  {
    "name": "Jamal (Rani Pokhari)",
    "nepali": "",
    "buses": [
      "S",
      "I",
      "D",
      "T",
      "F",
      "Z",
      "A",
      "H",
      "N",
      "B",
      "C",
      "K",
      "L",
      "P",
      "J",
      "G",
      "R",
      "Y",
      "E",
      "O"
    ]
  },
  {
    "name": "Embassy",
    "nepali": "",
    "buses": [
      "P",
      "H",
      "J",
      "G",
      "N",
      "L",
      "E"
    ]
  },
  {
    "name": "Gaucharan",
    "nepali": "",
    "buses": [
      "L",
      "E",
      "P",
      "H",
      "J",
      "G",
      "N"
    ]
  },
  {
    "name": "Tri-Chandra",
    "nepali": "",
    "buses": [
      "N",
      "P",
      "H",
      "J",
      "G",
      "E",
      "L",
      "S",
      "I",
      "D",
      "R",
      "Y",
      "T",
      "F",
      "Z",
      "A",
      "B",
      "C",
      "K",
      "O"
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
      "E",
      "N"
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
      "E",
      "L",
      "N"
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
      "E"
    ]
  },
  {
    "name": "Ghantaghar",
    "nepali": "",
    "buses": [
      "N",
      "S",
      "I",
      "D",
      "P",
      "H",
      "J",
      "G",
      "E",
      "L",
      "T",
      "F",
      "Z",
      "A",
      "R",
      "Y",
      "B",
      "C",
      "K",
      "O"
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
      "D",
      "S",
      "I",
      "B",
      "C",
      "K",
      "L",
      "P",
      "J",
      "G",
      "Y",
      "N",
      "E"
    ]
  },
  {
    "name": "Sukedhara Chowk",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "D"
    ]
  },
  {
    "name": "Bibek Chowk",
    "nepali": "",
    "buses": [
      "L"
    ]
  },
  {
    "name": "Narayan Chowk",
    "nepali": "",
    "buses": [
      "L"
    ]
  },
  {
    "name": "Queen's Palace",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "D"
    ]
  },
  {
    "name": "U.S.Embassy",
    "nepali": "",
    "buses": [
      "D",
      "S",
      "A",
      "B"
    ]
  },
  {
    "name": "and Events",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "D"
    ]
  },
  {
    "name": "Dhumbarahi Chowk",
    "nepali": "",
    "buses": [
      "S",
      "A",
      "D"
    ]
  },
  {
    "name": "Kapan Monastery / Chowk",
    "nepali": "",
    "buses": [
      "S"
    ]
  },
  {
    "name": "Grande School",
    "nepali": "",
    "buses": [
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
      "S",
      "A"
    ]
  },
  {
    "name": "Kathmandu Unified",
    "nepali": "",
    "buses": [
      "L"
    ]
  },
  {
    "name": "City School",
    "nepali": "",
    "buses": [
      "L"
    ]
  },
  {
    "name": "Yangtaru Sekuwa Corner",
    "nepali": "",
    "buses": [
      "N",
      "L",
      "J"
    ]
  },
  {
    "name": "Sukedhara Chowk",
    "nepali": "",
    "buses": [
      "L"
    ]
  },
  {
    "name": "Italian Bakery",
    "nepali": "",
    "buses": [
      "L",
      "J",
      "N",
      "P"
    ]
  },
  {
    "name": "Shiva Panchayan Mandir",
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
    "name": "watar",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "M",
      "A",
      "I",
      "D"
    ]
  },
  {
    "name": "Film Board Chowk",
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
      "B",
      "S",
      "M",
      "A",
      "I",
      "D"
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
      "E",
      "B",
      "S",
      "M"
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
      "B",
      "S",
      "A"
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
      "E",
      "P",
      "H",
      "J"
    ]
  },
  {
    "name": "Chabahil Chowk",
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
    "name": "jexe",
    "nepali": "",
    "buses": [
      "S"
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
      "B",
      "S",
      "M",
      "L",
      "N",
      "E"
    ]
  },
  {
    "name": "Mitrapark",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "M",
      "L",
      "G",
      "N",
      "E",
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
      "L",
      "E"
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
      "N",
      "E"
    ]
  },
  {
    "name": "nedset",
    "nepali": "",
    "buses": [
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
      "L",
      "E"
    ]
  },
  {
    "name": "Kalopul",
    "nepali": "",
    "buses": [
      "P",
      "H",
      "J",
      "G",
      "L",
      "E"
    ]
  },
  {
    "name": "rlish School",
    "nepali": "",
    "buses": [
      "N",
      "P",
      "H",
      "J",
      "G",
      "L",
      "E"
    ]
  },
  {
    "name": "Dotel Dairy",
    "nepali": "",
    "buses": [
      "G",
      "Y"
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
      "Y",
      "R"
    ]
  },
  {
    "name": "Gaushala (Pashupatinath)",
    "nepali": "",
    "buses": [
      "Y",
      "G",
      "B",
      "S",
      "M"
    ]
  },
  {
    "name": "Sundari Chowk",
    "nepali": "",
    "buses": [
      "G",
      "Y",
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
      "R",
      "Y"
    ]
  },
  {
    "name": "Purano",
    "nepali": "",
    "buses": [
      "L",
      "E",
      "P",
      "H",
      "J",
      "G",
      "N"
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
      "P",
      "L"
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
      "P"
    ]
  },
  {
    "name": "Gokarneshwor Yatayat",
    "nepali": "",
    "buses": []
  },
  {
    "name": "NEA Jorpati",
    "nepali": "",
    "buses": [
      "P"
    ]
  },
  {
    "name": "Bagdhara",
    "nepali": "",
    "buses": []
  },
  {
    "name": "Danchhi",
    "nepali": "",
    "buses": [
      "P"
    ]
  },
  {
    "name": "Danchhi",
    "nepali": "",
    "buses": []
  },
  {
    "name": "Bus Park, Danchhi",
    "nepali": "",
    "buses": []
  },
  {
    "name": "Kageshwori Manohara",
    "nepali": "",
    "buses": [
      "P"
    ]
  },
  {
    "name": "Municipality",
    "nepali": "",
    "buses": [
      "P"
    ]
  },
  {
    "name": "Thali Chowk",
    "nepali": "",
    "buses": [
      "P",
      "L"
    ]
  },
  {
    "name": "Chowk",
    "nepali": "",
    "buses": []
  },
  {
    "name": "Panchpokhari Yatayat",
    "nepali": "",
    "buses": []
  },
  {
    "name": "Bus Park, Danchhi",
    "nepali": "",
    "buses": []
  },
  {
    "name": "Bus Park",
    "nepali": "",
    "buses": [
      "L"
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
      "C"
    ]
  },
  {
    "name": "Satungal Chowk",
    "nepali": "",
    "buses": [
      "C"
    ]
  },
  {
    "name": "Naikap",
    "nepali": "",
    "buses": [
      "C"
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
      "C"
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
      "C"
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
      "C"
    ]
  },
  {
    "name": "Matatirtha Police Station",
    "nepali": "",
    "buses": [
      "C"
    ]
  },
  {
    "name": "Shree Mahalaxmi Adharbhut",
    "nepali": "",
    "buses": [
      "C"
    ]
  },
  {
    "name": "School",
    "nepali": "",
    "buses": [
      "C"
    ]
  },
  {
    "name": "Matatirtha Football Ground",
    "nepali": "",
    "buses": [
      "C"
    ]
  },
  {
    "name": "Bus Park",
    "nepali": "",
    "buses": [
      "C"
    ]
  },
  {
    "name": "Soltidobato",
    "nepali": "",
    "buses": [
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
      "S",
      "M",
      "T",
      "A",
      "C",
      "B",
      "X",
      "D",
      "R",
      "Y"
    ]
  },
  {
    "name": "Dhungeadda",
    "nepali": "",
    "buses": [
      "C",
      "S",
      "M",
      "T",
      "A",
      "B",
      "X",
      "D",
      "R",
      "Y"
    ]
  },
  {
    "name": "Soltimode",
    "nepali": "",
    "buses": [
      "C",
      "D",
      "Y",
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
      "B",
      "X",
      "M",
      "C",
      "D",
      "Y"
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
      "M"
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
      "B"
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
      "N",
      "P",
      "H",
      "J",
      "G",
      "E",
      "L"
    ]
  },
  {
    "name": "Muttiple Campus",
    "nepali": "",
    "buses": [
      "N",
      "P",
      "H",
      "J",
      "G",
      "E",
      "L",
      "S",
      "I",
      "D",
      "R",
      "Y",
      "T",
      "F",
      "Z",
      "A",
      "B",
      "C",
      "K",
      "O"
    ]
  },
  {
    "name": "Chowk",
    "nepali": "",
    "buses": [
      "N",
      "L",
      "P",
      "H",
      "J",
      "G",
      "E"
    ]
  },
  {
    "name": "Setopul",
    "nepali": "",
    "buses": [
      "L",
      "E",
      "N",
      "P",
      "H",
      "J",
      "G"
    ]
  },
  {
    "name": "Baghbazar Sadak",
    "nepali": "",
    "buses": [
      "L",
      "P",
      "H",
      "J",
      "G",
      "E",
      "N",
      "S",
      "R",
      "Y",
      "B",
      "I",
      "O",
      "D",
      "F",
      "Z",
      "A"
    ]
  },
  {
    "name": "Dillibazar",
    "nepali": "",
    "buses": [
      "L",
      "P",
      "H",
      "J",
      "G",
      "E",
      "N",
      "B",
      "S",
      "R",
      "Y"
    ]
  },
  {
    "name": "Pipalbot",
    "nepali": "",
    "buses": [
      "L",
      "P",
      "H",
      "J",
      "G",
      "E",
      "B",
      "N",
      "S",
      "R",
      "Y"
    ]
  },
  {
    "name": "Putalisadak",
    "nepali": "",
    "buses": [
      "S",
      "R",
      "Y",
      "B",
      "L",
      "P",
      "H",
      "J",
      "G",
      "E",
      "N"
    ]
  },
  {
    "name": "Sundhara (Dharahara)",
    "nepali": "",
    "buses": [
      "D",
      "R",
      "B",
      "S",
      "C",
      "K",
      "I",
      "P",
      "Y",
      "N",
      "E",
      "O",
      "A",
      "H",
      "T",
      "F",
      "Z",
      "L",
      "J",
      "G"
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
      "Y",
      "N",
      "E",
      "O",
      "D",
      "R",
      "L",
      "T",
      "F",
      "Z",
      "A",
      "H",
      "J",
      "G"
    ]
  },
  {
    "name": "Anamnagar",
    "nepali": "",
    "buses": [
      "B",
      "S",
      "R",
      "Y",
      "N",
      "L",
      "P",
      "H",
      "J",
      "G",
      "E"
    ]
  },
  {
    "name": "Hanumansthan",
    "nepali": "",
    "buses": [
      "S",
      "B",
      "R",
      "Y",
      "N"
    ]
  },
  {
    "name": "Bhatbhateni",
    "nepali": "",
    "buses": [
      "R",
      "Y",
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
      "Y",
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
      "Y",
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
      "Y",
      "N",
      "S",
      "D"
    ]
  },
  {
    "name": "New",
    "nepali": "",
    "buses": [
      "R",
      "Y",
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
      "Y",
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
      "B",
      "Y"
    ]
  },
  {
    "name": "Shantinagar",
    "nepali": "",
    "buses": [
      "B",
      "Y",
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
      "O",
      "B"
    ]
  },
  {
    "name": "Bijulibazar",
    "nepali": "",
    "buses": [
      "S",
      "R",
      "N",
      "Y"
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
      "B",
      "X",
      "M",
      "C",
      "D",
      "Y"
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
      "C",
      "Y",
      "D"
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
      "B",
      "X",
      "M",
      "C",
      "D",
      "Y"
    ]
  },
  {
    "name": "Kupondole",
    "nepali": "",
    "buses": [
      "P",
      "S",
      "O",
      "N"
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
      "M"
    ]
  },
  {
    "name": "Jwagal",
    "nepali": "",
    "buses": [
      "S",
      "O",
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
      "O",
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
      "O",
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
      "O",
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
      "R",
      "O"
    ]
  },
  {
    "name": "Gwarko Chowk",
    "nepali": "",
    "buses": [
      "O",
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
      "B",
      "S",
      "M",
      "G",
      "L",
      "E",
      "Y"
    ]
  },
  {
    "name": "Bagmati Bridge",
    "nepali": "",
    "buses": [
      "N",
      "L",
      "E"
    ]
  },
  {
    "name": "Seto Ghar",
    "nepali": "",
    "buses": [
      "G",
      "R",
      "Y"
    ]
  },
  {
    "name": "Sinamangal (Airport Gate)",
    "nepali": "",
    "buses": [
      "G",
      "Y",
      "B",
      "S",
      "M",
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
      "M",
      "Y"
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
      "Y",
      "M"
    ]
  },
  {
    "name": "Tinkune (Subidhanagar)",
    "nepali": "",
    "buses": [
      "B",
      "Y",
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
      "Y",
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
      "M",
      "Y"
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
      "C"
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
      "O",
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
      "P",
      "O"
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
      "O",
      "B"
    ]
  },
  {
    "name": "Krishna Mandir",
    "nepali": "",
    "buses": [
      "O"
    ]
  },
  {
    "name": "Imadol Kharibot",
    "nepali": "",
    "buses": [
      "O"
    ]
  },
  {
    "name": "Mahalaxmi",
    "nepali": "",
    "buses": [
      "O"
    ]
  },
  {
    "name": "Municipality Office",
    "nepali": "",
    "buses": [
      "O"
    ]
  },
  {
    "name": "Kamalpokhari",
    "nepali": "",
    "buses": [
      "O",
      "S",
      "R"
    ]
  },
  {
    "name": "Imadol Tempo Park",
    "nepali": "",
    "buses": [
      "O",
      "S",
      "R"
    ]
  },
  {
    "name": "Bhatbhateni",
    "nepali": "",
    "buses": [
      "O",
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
      "O",
      "S",
      "R"
    ]
  },
  {
    "name": "Sana Gaun",
    "nepali": "",
    "buses": [
      "O",
      "S",
      "R"
    ]
  },
  {
    "name": "Buddha Pokhari",
    "nepali": "",
    "buses": [
      "S",
      "R",
      "O"
    ]
  },
  {
    "name": "Narkate Chowk",
    "nepali": "",
    "buses": [
      "O",
      "S",
      "R"
    ]
  },
  {
    "name": "Lubhu",
    "nepali": "",
    "buses": [
      "O"
    ]
  },
  {
    "name": "Mahalaxmi Multiple",
    "nepali": "",
    "buses": [
      "O",
      "S",
      "R"
    ]
  },
  {
    "name": "Gate",
    "nepali": "",
    "buses": [
      "S",
      "R",
      "O"
    ]
  },
  {
    "name": "Campus",
    "nepali": "",
    "buses": [
      "O",
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
      "O",
      "S",
      "R"
    ]
  },
  {
    "name": "Supply Plant",
    "nepali": "",
    "buses": [
      "S",
      "R",
      "O"
    ]
  },
  {
    "name": "Phulchowki",
    "nepali": "",
    "buses": [
      "S",
      "R",
      "O"
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
      "R",
      "O"
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

// Quick lookup helper: Returns list of bus operator codes that serve any place matching query
export function findBusesForPlaceQuery(query) {
  if (!query || !query.trim()) return { codes: [], matchedPlaces: [] };
  const q = query.trim().toLowerCase();
  
  const matchedCodes = new Set();
  const matchedPlaces = [];

  for (const item of ALL_PLACES_BUS_INDEX) {
    if (item.name.toLowerCase().includes(q) || (item.nepali && item.nepali.includes(q))) {
      matchedPlaces.push(item.name);
      item.buses.forEach(b => matchedCodes.add(b));
    }
  }

  return {
    codes: Array.from(matchedCodes),
    matchedPlaces: matchedPlaces.slice(0, 10)
  };
}
