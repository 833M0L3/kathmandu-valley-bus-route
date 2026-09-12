import json
from PIL import Image
import numpy as np

img = Image.open('legends.jpg')
arr = np.array(img)

with open('scratch/legends.jpg.json') as f:
    items = json.load(f)

print(f"Total detected items in legends.jpg: {len(items)}")
for it in items:
    text = it['text']
    box = it['box']
    score = it['score']
    # If it looks like a bus name
    if 'yatayat' in text.lower() or 'buses' in text.lower():
        xs = [p[0] for p in box]
        ys = [p[1] for p in box]
        min_x, max_x = int(min(xs)), int(max(xs))
        min_y, max_y = int(min(ys)), int(max(ys))
        
        # In legends.jpg, the color swatch or circle is usually to the left or right of the text
        # Let's see what is to the left of the text: x in [min_x - 300, min_x]
        print(f"\nOperator: {text} (box: [{min_x}, {min_y}, {max_x}, {max_y}])")
