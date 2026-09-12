import json
import re
import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/map_ocr_all.json', encoding='utf-8') as f:
    ocr = json.load(f)

# The 22 bus operators:
operators = {
    'S': ('Sajha Yatayat', '#1ba546', 'साझा यातायात'),
    'N': ('Nepal Yatayat', '#c99629', 'नेपाल यातायात'),
    'Y': ('Samyukta Yatayat', '#925844', 'संयुक्त यातायात'),
    'F': ('Balaju Yatayat', '#9572cc', 'बालाजु यातायात'),
    'K': ('Kirtipur Yatayat', '#607b84', 'कीर्तिपुर यातायात'),
    'X': ('Mayur Yatayat', '#4587d1', 'मयुर यातायात'),
    'H': ('Basuki Yatayat', '#946994', 'बाशुकी यातायात'),
    'J': ('Juneli Yatayat', '#659c9f', 'जुनेली यातायात'),
    'I': ('Bagmati Yatayat', '#266090', 'बाग्मती यातायात'),
    'D': ('Digo Yatayat', '#5b8378', 'दिगो यातायात'),
    'G': ('Gothatar Yatayat', '#df496f', 'गोठाटार यातायात'),
    'A': ('Budhanilkantha Yatayat', '#9cc11c', 'बुढानीलकण्ठ यातायात'),
    'T': ('Tarakeshwor Yatayat', '#7183c5', 'तारकेश्वर यातायात'),
    'R': ('Riddhi Siddhi Yatayat', '#02aac4', 'रिद्धि सिद्धि यातायात'),
    'P': ('Panchpokhari Yatayat', '#de6c9f', 'पाँचपोखरी यातायात'),
    'C': ('Chandragiri Yatayat', '#f9a61a', 'चन्द्रागिरी यातायात'),
    'O': ('Om Janata Yatayat', '#a7733a', 'ओम जनता यातायात'),
    'M': ('Mahanagar Yatayat', '#dc1d24', 'महानगर यातायात'),
    'Z': ('Samakhusi Yatayat', '#878883', 'सामाखुसी यातायात'),
    'L': ('Gokarneshwor Yatayat', '#19b38d', 'गोकर्णेश्वर यातायात'),
    'E': ('Dhumrabaraha Yatayat', '#e16a30', 'धुम्रबराह यातायात'),
    'B': ('Bhaktapur Buses', '#808f4e', 'भक्तपुरका बसहरू')
}

# Let's inspect which tokens appear in the map
by_prefix = {p: set() for p in operators}

for it in ocr:
    text = it['text']
    # Match any operator code: e.g. S1, S2, N2, T1-T9, etc.
    matches = re.findall(r'([A-Z])([0-9]+(?:\'[0-9]*)?)', text)
    for prefix, num in matches:
        if prefix in by_prefix:
            by_prefix[prefix].add(prefix + num)
            
    # Also ranges like T1-T9, S5-S8
    ranges = re.findall(r'([A-Z])([0-9]+)\s*-\s*([A-Z])?([0-9]+)', text)
    for p1, n1, p2, n2 in ranges:
        if p1 in by_prefix:
            by_prefix[p1].add(f"{p1}{n1}-{p1}{n2}")

print("Route codes detected for each operator:")
for prefix, routes in sorted(by_prefix.items()):
    op_name = operators[prefix][0]
    print(f"[{prefix}] {op_name:25s}: {sorted(routes)}")
