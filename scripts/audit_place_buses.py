import json
import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/placeBusIndex.js', encoding='utf-8') as f:
    text = f.read()
    start = text.index('[')
    end = text.index('];') + 1
    data = json.loads(text[start:end])

print(f"Total entries in placeBusIndex: {len(data)}")

test_places = [
    'Chyamasingh', 'Kamal Binayak', 'Jagati', 'Bode', 'Changunarayan',
    'Sankhu', 'Sundarijal', 'Kirtipur', 'Thankot', 'Chandragiri', 'Godawari', 'Lubhu',
    'Harisiddhi', 'Bungamati', 'Chapagaun', 'Dakshinkali', 'Tokha', 'Dharmasthali',
    'Budhanilkantha', 'Maitidevi', 'Thulo Bharyang', 'Kalanki'
]

for tp in test_places:
    matches = [d for d in data if tp.lower() in d['name'].lower()]
    for m in matches[:2]:
        name = m['name']
        buses = m['buses']
        print(f"{name:30} -> {buses}")
