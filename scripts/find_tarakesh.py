import re

with open('src/data/placesData.js', 'r', encoding='utf-8') as f:
    txt = f.read()

for line in txt.split('\n'):
    if 'tarakesh' in line.lower():
        print(line)
