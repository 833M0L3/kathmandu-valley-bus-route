import pymupdf
import re

doc = pymupdf.open('Kathmandu_Bus_Route_Map.ai')
p = doc[0]

ocgs = doc.get_ocgs()
print("=== OCGs (Layers) ===")
for k, v in ocgs.items():
    print(f"Xref {k}: name={v.get('name')}, on={v.get('on')}, intent={v.get('intent')}")

# In PDF syntax, page content stream uses marked content:
# /OC /MC0 BDC ... EMC (Grids)
# /OC /MC1 BDC ... EMC (Background)
# /OC /MC2 BDC ... EMC (Bus Route Map)
# /OC /MC3 BDC ... EMC (Layer 4)

# Let's inspect the page content stream
stream = doc.xref_stream(61).decode('latin1')
print(f"\nTotal content stream length: {len(stream)} bytes")

# Find all /OC marked content blocks
pattern = re.compile(r'/OC\s+/(\w+)\s+BDC(.*?)EMC', re.DOTALL)
matches = pattern.findall(stream)
print(f"Total /OC marked content blocks: {len(matches)}")

mc_stats = {}
for tag, content in matches:
    if tag not in mc_stats:
        mc_stats[tag] = {"length": 0, "has_text": 0, "text_commands": 0, "path_commands": 0}
    mc_stats[tag]["length"] += len(content)
    # Check text commands (BT ... ET, Tj, TJ, ')
    bt_count = len(re.findall(r'\bBT\b', content))
    mc_stats[tag]["has_text"] += bt_count
    # Check path commands (m, l, c, re, f, s, S, B, b)
    path_count = len(re.findall(r'\b[mlcrefsSBb]\b', content))
    mc_stats[tag]["path_commands"] += path_count

# Map MC tags to layer names from page resources
# Earlier we saw: <</MC0 55 0 R/MC1 56 0 R/MC2 57 0 R/MC3 58 0 R>>
mc_to_name = {
    "MC0": ocgs.get(55, {}).get('name', '55'),
    "MC1": ocgs.get(56, {}).get('name', '56'),
    "MC2": ocgs.get(57, {}).get('name', '57'),
    "MC3": ocgs.get(58, {}).get('name', '58'),
}

print("\n=== Layer Content Analysis ===")
for tag, stats in sorted(mc_stats.items()):
    name = mc_to_name.get(tag, tag)
    print(f"Tag /{tag} -> Layer '{name}':")
    print(f"  Stream bytes: {stats['length']:,}")
    print(f"  Text blocks (BT..ET): {stats['has_text']}")
    print(f"  Path commands (m/l/c/s): {stats['path_commands']}")

# Also check text outside any /OC block:
outside_text = len(re.findall(r'\bBT\b', re.sub(r'/OC\s+/\w+\s+BDC.*?EMC', '', stream, flags=re.DOTALL)))
print(f"\nText blocks outside any /OC layer: {outside_text}")
