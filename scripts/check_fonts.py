import re

with open('Kathmandu_Bus_Route_Map.svg', 'r', encoding='utf-8') as f:
    content = f.read()

fonts = set(re.findall(r'font-family:([^;\"}]+)', content))
font_attrs = set(re.findall(r'font-family="([^"]+)"', content))
font_weights = set(re.findall(r'font-weight:([^;\"}]+)', content))

print('CSS font-family:', fonts)
print('Attribute font-family:', font_attrs)
print('font-weight:', font_weights)
