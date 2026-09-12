import json
import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/placeBusIndex.js', encoding='utf-8') as f:
    text = f.read()
    data = json.loads(text[text.index('['):text.index('];')+1])

def test_query(q):
    matched_codes = set()
    matched_places = []
    for item in data:
        if q.lower() in item['name'].lower():
            matched_places.append(item['name'])
            for b in item['buses']:
                matched_codes.add(b)
    print(f"\nQuery: '{q}'")
    print(f"  Matched Places: {matched_places[:5]}")
    print(f"  Buses: {list(matched_codes)}")

test_query('chameshwori')
test_query('champeshwori')
test_query('bageshwori')
test_query('tikabhairab')
test_query('lele')
test_query('chapagaun')
test_query('bungamati')
test_query('goldhunga')
test_query('lolang')
test_query('phutung')
test_query('chyamasingh')
