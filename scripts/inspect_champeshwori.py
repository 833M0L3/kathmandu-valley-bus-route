import json
import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/placeBusIndex.js', encoding='utf-8') as f:
    text = f.read()
    data = json.loads(text[text.index('['):text.index('];')+1])

for d in data:
    name = d['name'].lower()
    if any(k in name for k in ['champeshwori', 'chameshwori', 'bageshwori', 'tikabhairab', 'lele', 'chapagaun', 'thecho', 'sunakothi', 'bungamati', 'khumaltar', 'dolahity', 'dhapakhel']):
        print(f"{d['name']:40} -> {d['buses']}")
