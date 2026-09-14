import pymupdf
import re

doc = pymupdf.open('Kathmandu_Bus_Route_Map.ai')

# Check for AIPrivateData in PDF objects
ai_private_xrefs = []
for xref in range(1, doc.xref_length()):
    key_type = doc.xref_get_key(xref, "Type")
    if "PieceInfo" in str(doc.xref_object(xref)):
        print(f"Found PieceInfo at xref {xref}: {doc.xref_object(xref)[:200]}")
    # Search for layer names in strings
    obj_str = doc.xref_object(xref)
    if "Illustrator" in obj_str or "Layer" in obj_str:
        pass

# Now let's test creating a "No-Text" version by stripping BT ... ET blocks from the content stream!
stream = doc.xref_stream(61).decode('latin1')
print(f"Original stream length: {len(stream)} bytes")

# Remove all BT ... ET blocks (Text)
no_text_stream = re.sub(r'\bBT\b.*?\bET\b', '', stream, flags=re.DOTALL)
print(f"No-text stream length: {len(no_text_stream)} bytes (removed {len(stream) - len(no_text_stream)} bytes of text)")

# Update xref 61 with no_text_stream in a copy of the document
doc.update_stream(61, no_text_stream.encode('latin1'))

# Save modified PDF to scratch
doc.save('scratch/Kathmandu_Bus_Route_Map_NO_TEXT.pdf')
print("Saved scratch/Kathmandu_Bus_Route_Map_NO_TEXT.pdf successfully!")

# Render a preview of the no-text map!
doc_notext = pymupdf.open('scratch/Kathmandu_Bus_Route_Map_NO_TEXT.pdf')
p_notext = doc_notext[0]
pix = p_notext.get_pixmap(dpi=150)
pix.save('scratch/preview_routes_no_text.png')
print("Saved scratch/preview_routes_no_text.png at 150 DPI:", pix.width, pix.height)
