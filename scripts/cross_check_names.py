import re

with open('src/data/legendData.js', 'r', encoding='utf-8') as f:
    ltxt = f.read()

services = re.findall(r'name:\s*"([^"]+)"', ltxt)

with open('src/data/dedicatedRoutesData.js', 'r', encoding='utf-8') as f:
    dtxt = f.read()

with open('src/components/MapViewer.jsx', 'r', encoding='utf-8') as f:
    mtxt = f.read()

print(f"Total services in legendData.js: {len(services)}")
for s in services:
    in_dedicated = (f'"{s}"' in dtxt) or (f"'{s}'" in dtxt)
    in_mapviewer = (f"'{s}'" in mtxt) or (f'"{s}"' in mtxt)
    status = "OK" if (in_mapviewer and (in_dedicated or s not in ["Sajha Yatayat", "Nepal Yatayat", "Mahanagar Yatayat", "Bhaktapur Buses", "Tarakeshwar Yatayat", "Tarakeshwor Yatayat", "Samakhusi Yatayat", "Digo Yatayat"])) else "CHECK!"
    print(f"{s:30s} | In MapViewer: {str(in_mapviewer):5s} | In Dedicated: {str(in_dedicated):5s} | {status}")
