import pymupdf
from PIL import Image
import numpy as np

# Load clean-map.jpg
clean_img = Image.open('clean-map.jpg')
w_target, h_target = clean_img.size
print(f"clean-map.jpg size: {w_target} x {h_target}")

# Load AI file
doc_ai = pymupdf.open('Kathmandu_Bus_Route_Map.ai')
p_ai = doc_ai[0]
w_ai, h_ai = p_ai.rect.width, p_ai.rect.height
print(f"AI artboard: {w_ai} x {h_ai}")

# Earlier affine fit:
# X_map = 7.226156 * X_ai + 0.708289 * Y_ai - 357.730470
# Y_map = 0.026503 * X_ai + 7.191555 * Y_ai + 68.110848
# Notice: cross terms 0.708 and 0.026 are nearly zero (or slight skew).
# sx = 7.226, sy = 7.192.
# If we render AI at scale sx=7.226 (DPI = 7.226 * 72 = 520.3)
dpi = 7.226 * 72
pix = p_ai.get_pixmap(dpi=dpi)
print(f"Rendered AI at {dpi:.1f} DPI: size={pix.width} x {pix.height}")

# Let's check a patch of Ratnapark in clean-map vs AI
# Ratnapark in clean-map is around x=4410, y=4145
crop_clean = clean_img.crop((4200, 3950, 4600, 4350))
crop_clean.save('scratch/align_clean_ratnapark.png')

# In AI, at this scale:
# Ratnapark center in AI was: (594, 564)
# With sx=7.226, sy=7.192, tx=-358, ty=+68:
# x_in_ai_pix = 594 * 7.226 = 4292
# To match clean-map x=4410:
# tx = 4410 - 4292 = +118
print("Saved scratch/align_clean_ratnapark.png")
