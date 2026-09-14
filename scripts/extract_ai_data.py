import pymupdf
import json
import sys
import os

def inspect_ai():
    ai_path = 'Kathmandu_Bus_Route_Map.ai'
    if not os.path.exists(ai_path):
        print(f"File not found: {ai_path}")
        return

    doc = pymupdf.open(ai_path)
    page = doc[0]
    rect = page.rect
    print(f"Artboard dimensions (points): width={rect.width}, height={rect.height}")

    # Extract all text blocks
    # "blocks" format: (x0, y0, x1, y1, text, block_no, block_type)
    blocks = page.get_text("blocks")
    print(f"Total text blocks: {len(blocks)}")

    # Extract all words
    # "words" format: (x0, y0, x1, y1, word, block_no, line_no, word_no)
    words = page.get_text("words")
    print(f"Total words: {len(words)}")

    # Extract raw text with detailed font & size information
    text_page = page.get_text("dict")
    total_spans = 0
    font_stats = {}
    
    extracted_items = []

    for block in text_page.get("blocks", []):
        if block.get("type") == 0: # text block
            for line in block.get("lines", []):
                for span in line.get("spans", []):
                    total_spans += 1
                    font = span.get("font", "unknown")
                    size = round(span.get("size", 0), 1)
                    text = span.get("text", "").strip()
                    bbox = span.get("bbox", [])
                    color = span.get("color", 0)

                    font_key = f"{font} ({size}pt)"
                    font_stats[font_key] = font_stats.get(font_key, 0) + 1

                    if text:
                        extracted_items.append({
                            "text": text,
                            "bbox": [round(b, 2) for b in bbox],
                            "font": font,
                            "size": size,
                            "color": color
                        })

    print(f"Total spans: {total_spans}")
    print(f"Extracted non-empty text items: {len(extracted_items)}")
    print("\nTop fonts & sizes:")
    for k, v in sorted(font_stats.items(), key=lambda x: -x[1])[:10]:
        print(f"  {k}: {v} spans")

    # Check for Adobe Illustrator COM availability
    has_com = False
    try:
        import win32com.client
        app = win32com.client.Dispatch("Illustrator.Application")
        has_com = True
        print(f"\nAdobe Illustrator COM is AVAILABLE! App name: {app.Name}, Version: {app.Version}")
    except Exception as e:
        print(f"\nAdobe Illustrator COM not available or not running ({e}). Will use direct vector extraction via PyMuPDF.")

    # Save extracted text data to scratch for inspection
    os.makedirs("scratch", exist_ok=True)
    with open("scratch/ai_extracted_text.json", "w", encoding="utf-8") as f:
        json.dump({
            "artboard": {"width": rect.width, "height": rect.height},
            "item_count": len(extracted_items),
            "items": extracted_items
        }, f, ensure_ascii=False, indent=2)
    print("Saved scratch/ai_extracted_text.json successfully.")

if __name__ == "__main__":
    inspect_ai()
