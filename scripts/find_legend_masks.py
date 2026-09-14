import pymupdf

doc = pymupdf.open('Kathmandu_Bus_Route_Map.ai')
p = doc[0]

# Search for key phrases in the 3 legend sections:
# 1. Title
r_title = p.search_for("Kathmandu Bus Route Map")
print("Title rect:", r_title)

# 2. Bottom left
r_bl1 = p.search_for("Bus Services")
r_bl2 = p.search_for("Subham Subedi")
r_bl3 = p.search_for("PKMC - Padma Kanya")
print("Bottom left rects:", r_bl1, r_bl2, r_bl3)

# 3. Bottom right
r_br1 = p.search_for("Samyukta Yatayat")
r_br2 = p.search_for("High-quality PDF available at")
print("Bottom right rects:", r_br1, r_br2)

# Check all text blocks in bottom-left and bottom-right
blocks = p.get_text("blocks")
bl_blocks = [b for b in blocks if b[0] < 500 and b[1] > 900]
br_blocks = [b for b in blocks if b[0] > 950 and b[1] > 800]
tr_blocks = [b for b in blocks if b[0] > 1100 and b[1] < 200]

print(f"\nBottom-left blocks ({len(bl_blocks)}):")
for b in bl_blocks:
    print(f"  ({b[0]:.1f}, {b[1]:.1f}, {b[2]:.1f}, {b[3]:.1f}): {repr(b[4][:40])}")

print(f"\nBottom-right blocks ({len(br_blocks)}):")
for b in br_blocks:
    print(f"  ({b[0]:.1f}, {b[1]:.1f}, {b[2]:.1f}, {b[3]:.1f}): {repr(b[4][:40])}")

print(f"\nTop-right blocks ({len(tr_blocks)}):")
for b in tr_blocks:
    print(f"  ({b[0]:.1f}, {b[1]:.1f}, {b[2]:.1f}, {b[3]:.1f}): {repr(b[4][:40])}")
