import json

with open('src/data/placeBusIndex.js', encoding='utf-8') as f:
    t = f.read()
    items = json.loads(t[t.index('['):t.index('];')+1])

targets = [
    'Raniban Bus Park', 'Savyata Pathshala Buddha Chowk, Raniban', 'Buddha Chowk, Raniban',
    'Svetah Bhawan', 'Nagarjun Futsal', 'Bijayanagar Chowk', 'Radha Krishna Temple', 'Raniban',
    'Army Rehabilitation', 'Siddhartha Bank', 'NIC Asia Bank', 'Nur Chowk', 'Nursery Chowk',
    'Corona Pre-School', 'Big Mart Supermarket', 'Yerahity', 'Thulo Bharyang', 'Sano Bharyang', 'Banasthali'
]

for it in items:
    if it['name'] in targets:
        print(f"{it['name']:40s} -> {it['buses']}")
