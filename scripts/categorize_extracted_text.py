import json
import re

with open('scratch/ai_extracted_text.json', encoding='utf-8') as f:
    data = json.load(f)

items = data['items']

# Categorize items
# Font size ~ 1.3 -> route badges (e.g. 'S1', 'T4', 'N2', 'T1 - T9', etc.)
# Font size ~ 2.0 -> stop / landmark names
# Font size >= 9.0 -> Legend headings & operator titles

badges = []
places = []
legend_titles = []
roads_or_other = []

badge_pattern = re.compile(r'^[A-Z][0-9]+(\'|\s*-\s*[A-Z]?[0-9]+|\s*[A-Z][0-9]+)*$')

for it in items:
    txt = it['text']
    size = it['size']
    bbox = it['bbox']
    
    # Legend area check: legend in AI is in the lower-left corner
    # Let's check bbox
    x0, y0, x1, y1 = bbox

    if size >= 8.0:
        legend_titles.append(it)
    elif size <= 1.5 or badge_pattern.match(txt):
        badges.append(it)
    elif size >= 1.8 and size <= 2.5:
        places.append(it)
    else:
        roads_or_other.append(it)

print(f"Total items: {len(items)}")
print(f"Badges: {len(badges)}")
print(f"Places / Stops: {len(places)}")
print(f"Legend Titles: {len(legend_titles)}")
print(f"Roads / Other: {len(roads_or_other)}")

print("\nSample places (first 30):")
for p in places[:30]:
    print(f"  {p['text']:35s} bbox={p['bbox']}")

print("\nSample badges (first 20):")
for b in badges[:20]:
    print(f"  {b['text']:20s} bbox={b['bbox']}")

print("\nSample legend titles:")
for l in legend_titles:
    print(f"  {l['text']:30s} size={l['size']} bbox={l['bbox']}")
