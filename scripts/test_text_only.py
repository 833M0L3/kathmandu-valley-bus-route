import pymupdf
import re

doc = pymupdf.open('Kathmandu_Bus_Route_Map.ai')
stream = doc.xref_stream(61).decode('latin1')

# Extract all BT ... ET blocks
bt_blocks = re.findall(r'\bBT\b.*?\bET\b', stream, flags=re.DOTALL)
print(f"Total BT...ET blocks: {len(bt_blocks)}")

# A text-only stream contains setup, graphics state, and all BT...ET blocks
# Keep header before /OC /MC0
header_match = re.search(r'^(.*?)/OC\s+/MC0\s+BDC', stream, flags=re.DOTALL)
header = header_match.group(1) if header_match else ''

text_only_stream = header + "\n" + "\n".join(bt_blocks)

doc.update_stream(61, text_only_stream.encode('latin1'))
doc.save('scratch/Kathmandu_Bus_Route_Map_TEXT_ONLY.pdf')
print("Saved scratch/Kathmandu_Bus_Route_Map_TEXT_ONLY.pdf!")

doc_text = pymupdf.open('scratch/Kathmandu_Bus_Route_Map_TEXT_ONLY.pdf')
p_text = doc_text[0]
pix = p_text.get_pixmap(dpi=150)
pix.save('scratch/preview_text_only.png')
print("Saved scratch/preview_text_only.png:", pix.width, pix.height)
