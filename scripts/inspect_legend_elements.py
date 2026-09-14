import pymupdf

doc = pymupdf.open('Kathmandu_Bus_Route_Map.ai')
p = doc[0]

# Check OCG layers
ocgs = doc.get_ocgs()
print("OCGs:", ocgs)

# In AI file:
# 1. Title block: x > 1100, y < 200
# 2. Bottom-left block: x < 500, y > 850
# 3. Bottom-right operator list: x > 950, y > 800

title_rect = pymupdf.Rect(1100, 20, 1560, 200)
legend_left_rect = pymupdf.Rect(20, 850, 520, 1200)
legend_right_rect = pymupdf.Rect(950, 800, 1560, 1200)

print("Title text:")
print(repr(p.get_text(clip=title_rect)))

print("\nLegend Left text:")
print(repr(p.get_text(clip=legend_left_rect)[:200]))

print("\nLegend Right text:")
print(repr(p.get_text(clip=legend_right_rect)[:200]))
