"""
Rasterize vector PDF Kathmandu-Bus-Route-Map-by-Subham-Subedi*.pdf
into a high-resolution master PNG (~16,800 x 12,600 px at 432 DPI / 6x scale).
"""
import os
import sys
import glob
import time
import pymupdf

def main():
    start_time = time.time()
    pdf_files = glob.glob("Kathmandu-Bus-Route-Map-by-Subham-Subedi*.pdf")
    if not pdf_files:
        pdf_files = glob.glob("*.pdf")
    if not pdf_files:
        print("Error: No PDF files found in current directory.", file=sys.stderr)
        sys.exit(1)

    pdf_path = pdf_files[0]
    print(f"Loading PDF: {pdf_path}")
    doc = pymupdf.open(pdf_path)
    page = doc[0]
    rect = page.rect
    print(f"Page dimensions: {rect.width} x {rect.height} pt ({rect.width/72:.2f} x {rect.height/72:.2f} inches)")

    # Target: 6x native scale (432 DPI)
    # 2800 * 6 = 16,800 px width
    # 2100 * 6 = 12,600 px height
    scale = 6.0
    dpi = int(scale * 72)
    matrix = pymupdf.Matrix(scale, scale)
    expected_w = int(round(rect.width * scale))
    expected_h = int(round(rect.height * scale))
    print(f"Target DPI: {dpi} (scale {scale}x) -> Expected master dimensions: {expected_w} x {expected_h} px")

    print("Rasterizing vector page (high-quality anti-aliased rendering)...")
    pix = page.get_pixmap(matrix=matrix, alpha=False)

    print(f"Rendered pixmap: {pix.width} x {pix.height} px, {pix.n} channels")
    output_path = "master.png"
    print(f"Saving to {output_path}...")
    pix.save(output_path)

    file_size_mb = os.path.getsize(output_path) / (1024 * 1024)
    elapsed = time.time() - start_time
    print(f"Successfully generated {output_path} ({file_size_mb:.2f} MB) in {elapsed:.2f}s")

if __name__ == "__main__":
    main()
