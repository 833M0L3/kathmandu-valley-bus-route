from PIL import Image
import numpy as np

img = Image.open('legends.jpg')
w, h = img.size

# Let's inspect a horizontal slice across y=450 to 570 (Sajha Yatayat)
slice_img = img.crop((0, 440, 2100, 580))
slice_img.save('scratch/crop_sajha.png')
print("Saved scratch/crop_sajha.png")

# Let's inspect the colors across columns in that row
arr = np.array(slice_img)
# Find areas that are distinctly colored (saturation > threshold)
# In RGB, saturation can be approximated as max(R,G,B) - min(R,G,B)
diff = np.max(arr, axis=2).astype(int) - np.min(arr, axis=2).astype(int)
colored_pixels = arr[diff > 50]
if len(colored_pixels) > 0:
    median_color = np.median(colored_pixels, axis=0).astype(int)
    hex_color = '#{:02x}{:02x}{:02x}'.format(*median_color)
    print(f"Detected swatch color for Sajha: {hex_color} (RGB: {median_color})")
