import json
import re
import sys
sys.stdout.reconfigure(encoding='utf-8')

# Load all 924 places
with open('src/data/placesData.js', encoding='utf-8') as f:
    text = f.read()
    json_str = text[text.index('['):text.rindex(']')+1]
    all_places = json.loads(json_str)

print(f"Total places loaded: {len(all_places)}")

# Load bus services
with open('src/data/legendData.js', encoding='utf-8') as f:
    text = f.read()
    json_str = text[text.index('export const BUS_SERVICES = ['):]
    json_str = json_str[json_str.index('['):json_str.index('];')+1]
    # Replace single quotes or js syntax if needed, or parse via python
    # Let's inspect BUS_SERVICES

# Let's write a python script to define the corridor bounding boxes and key nodes for each of the 22 bus operators
