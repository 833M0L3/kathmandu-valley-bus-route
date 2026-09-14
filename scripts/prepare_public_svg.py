with open('Kathmandu_Bus_Route_Map.svg', 'r', encoding='utf-8') as f:
    content = f.read()

# Make background rectangle transparent
content = content.replace('.cls-1{fill:#f0f5fa;}', '.cls-1{fill:none;}')

# Optimize font-family in SVG stylesheet to prioritize 'Hanken Grotesk'
content = content.replace(
    'font-family:HankenGrotesk-Medium, Hanken Grotesk;',
    "font-family:'Hanken Grotesk', HankenGrotesk-Medium, sans-serif;"
)

# Ensure root svg has id
if '<svg ' in content and 'id="' not in content[:100]:
    content = content.replace('<svg ', '<svg id="ktm-bus-map-svg" ', 1)

with open('public/Kathmandu_Bus_Route_Map.svg', 'w', encoding='utf-8') as f:
    f.write(content)

# Validate that generated public SVG is 100% valid XML
import xml.etree.ElementTree as ET
try:
    tree = ET.parse('public/Kathmandu_Bus_Route_Map.svg')
    print('SUCCESS: public/Kathmandu_Bus_Route_Map.svg is 100% VALID XML! Root:', tree.getroot().tag)
except Exception as e:
    print('ERROR: public SVG is invalid XML:', e)
