import json

with open('scratch/ai_verified_bus_index.json', encoding='utf-8') as f:
    bus_index = json.load(f)

# Also load existing area labels (Kathmandu, Lalitpur, Kalanki, etc.)
# so major hubs are preserved
area_hubs = [
    {"name": "Kathmandu", "nepali": "काठमाडौँ", "buses": ["E","O","D","N","S","I","Y","P","H","J","G","L","T","F","Z","A","R","B","C","K"]},
    {"name": "Lalitpur (Patan)", "nepali": "ललितपुर", "buses": ["S","N","P","X","M","B"]},
    {"name": "Bhaktapur", "nepali": "भक्तपुर", "buses": ["B","S","X"]},
    {"name": "Kalanki", "nepali": "कलङ्की", "buses": ["B","S","X","M","C","T","A","R","Y","O"]},
    {"name": "Koteshwor", "nepali": "कोटेश्वर", "buses": ["B","S","X","M","G","R","N"]},
    {"name": "Gongabu (New Bus Park)", "nepali": "नयाँ बसपार्क", "buses": ["B","S","M","Z","Y"]},
    {"name": "Tribhuvan Int’l Airport", "nepali": "विमानस्थल", "buses": ["G","B","D","S"]},
    {"name": "Ratnapark", "nepali": "रत्नपार्क", "buses": ["S","N","M","B","K","C","T","A","D","F","Z","L","R","G","P","Y","H","J","I","E","O"]},
]

# Merge into unified index
name_map = {}
for h in area_hubs:
    name_map[h['name'].lower()] = h

for b in bus_index:
    k = b['name'].lower()
    if k in name_map:
        # union buses
        name_map[k]['buses'] = sorted(list(set(name_map[k]['buses'] + b['buses'])))
    else:
        name_map[k] = b

unified = list(name_map.values())
print(f"Total unified bus index entries: {len(unified)}")

# Test search queries:
queries = ['tinpiple', 'jhor', 'raniban', 'kalanki', 'budhanilkantha', 'boudeshwor', 'kavresthali']
for q in queries:
    matches = [u for u in unified if q in u['name'].lower()]
    print(f"\nQuery '{q}': found {len(matches)} matches")
    for m in matches[:3]:
        print(f"  {m['name']} -> {m['buses']}")
