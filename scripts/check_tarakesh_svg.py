import re

with open('Kathmandu_Bus_Route_Map.svg', 'r', encoding='utf-8') as f:
    text = f.read()

matches = set(re.findall(r'id=["\']([^"\']*[Tt]arakesh[^"\']*)["\']', text))
for m in sorted(matches):
    print(m)
