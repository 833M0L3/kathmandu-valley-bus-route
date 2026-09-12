from PIL import Image

img = Image.open('legends.jpg')
print(f"legends.jpg dimensions: {img.size}, mode: {img.mode}")

img_extra = Image.open('legends-extra.jpg')
print(f"legends-extra.jpg dimensions: {img_extra.size}, mode: {img_extra.mode}")
