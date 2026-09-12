import json
import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/placesData.js', encoding='utf-8') as f:
    text = f.read()
    start = text.index('[')
    end = text.index('];') + 1
    places = json.loads(text[start:end])

print(f"Total places: {len(places)}")

def find_place(name):
    for p in places:
        if name.lower() in p['name'].lower():
            print(f"{p['name']:35} | x={p['x']:.1f}, y={p['y']:.1f} | tier={p.get('tier')} | cat={p.get('category')}")

print("\n--- BHAKTAPUR & ARANIKO HIGHWAY ---")
for n in ['Chyamasingh', 'Kamal Binayak', 'Jagati', 'Dekocha', 'Byasi', 'Sallaghari', 'Suryabinayak', 'Bode', 'Thimi', 'Gatthaghar', 'Kaushaltar', 'Lokanthali', 'Jadibuti']:
    find_place(n)

print("\n--- SANKHU & NORTH-EAST ---")
for n in ['Sankhu', 'Mulpani', 'Sundarijal', 'Gokarna', 'Jorpati', 'Boudha', 'Chabahil']:
    find_place(n)

print("\n--- SOUTH / LALITPUR ---")
for n in ['Lubhu', 'Imadol', 'Gwarko', 'Satdobato', 'Lagankhel', 'Jawalakhel', 'Godawari', 'Harisiddhi', 'Bungamati', 'Chapagaun']:
    find_place(n)

print("\n--- WEST / SOUTH-WEST ---")
for n in ['Thankot', 'Chandragiri', 'Naikap', 'Kalanki', 'Kirtipur', 'Balkhu', 'Swayambhu', 'Thulo Bharyang', 'Sano Bharyang']:
    find_place(n)

print("\n--- NORTH ---")
for n in ['Dharmasthali', 'Tokha', 'Budhanilkantha', 'Maharajgunj', 'Balaju', 'Gongabu', 'Samakhusi']:
    find_place(n)
