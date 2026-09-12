from PIL import Image
import numpy as np
import json

img = Image.open('legends.jpg')
arr = np.array(img)

# Let's see what is in each row
# We have 11 rows:
# Row 0: y ~ 100
# Row 1: y ~ 310
# Row 2: y ~ 515
# Row 3: y ~ 715
# Row 4: y ~ 920
# ...
# Row 10: y ~ 2135

# Let's inspect column 1 (x: 0 to 2200) and column 2 (x: 2100 to 4500)
# Let's sample colors for each of the 22 operators from legends.jpg
col1_ops = [
    ("Samyukta Yatayat", 100),
    ("Nepal Yatayat", 310),
    ("Sajha Yatayat", 515),
    ("Balaju Yatayat", 718),
    ("Kirtipur Yatayat", 920),
    ("Mayur Yatayat", 1125),
    ("Basuki Yatayat", 1325),
    ("Juneli Yatayat", 1528),
    ("Bagmati Yatayat", 1732),
    ("Digo Yatayat", 1936),
    ("Gothatar Yatayat", 2137)
]

col2_ops = [
    ("Budhanilkantha Yatayat", 100),
    ("Tarakeshwor Yatayat", 307),
    ("Riddhi Siddhi Yatayat", 510),
    ("Panchpokhari Yatayat", 714),
    ("Chandragiri Yatayat", 917),
    ("Om Janata Yatayat", 1120),
    ("Mahanagar Yatayat", 1325),
    ("Samakhusi Yatayat", 1525),
    ("Gokarneshwor Yatayat", 1726),
    ("Dhumrabaraha Yatayat", 1934),
    ("Bhaktapur Buses", 2138)
]

def sample_operator_color(x_start, x_end, y_center):
    y_start = max(0, y_center - 80)
    y_end = min(arr.shape[0], y_center + 80)
    sub = arr[y_start:y_end, x_start:x_end]
    
    # We want saturated pixels (color swatches)
    diff = np.max(sub, axis=2).astype(int) - np.min(sub, axis=2).astype(int)
    # Brightness shouldn't be pure white (>240) or pure black (<20)
    brightness = np.mean(sub, axis=2)
    valid = (diff > 35) & (brightness < 240) & (brightness > 20)
    
    if np.sum(valid) > 20:
        pixels = sub[valid]
        # Cluster or median
        med = np.median(pixels, axis=0).astype(int)
        return '#{:02x}{:02x}{:02x}'.format(*med)
    else:
        # Check grey/unsaturated colors (e.g. Samakhusi Yatayat might be grey)
        # Low saturation, but medium brightness
        grey_valid = (diff <= 35) & (brightness > 60) & (brightness < 180)
        if np.sum(grey_valid) > 20:
            med = np.median(sub[grey_valid], axis=0).astype(int)
            return '#{:02x}{:02x}{:02x}'.format(*med)
    return "#000000"

results = {}
print("=== Column 1 ===")
for name, y in col1_ops:
    c = sample_operator_color(700, 2100, y)
    results[name] = c
    print(f"{name:25s} -> {c}")

print("\n=== Column 2 ===")
for name, y in col2_ops:
    c = sample_operator_color(2900, 4450, y)
    results[name] = c
    print(f"{name:25s} -> {c}")
