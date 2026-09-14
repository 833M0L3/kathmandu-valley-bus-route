import pymupdf

doc_ai = pymupdf.open('Kathmandu_Bus_Route_Map.ai')
doc_pdf = pymupdf.open('Kathmandu-Bus-Route-Map-by-Subham-Subedi (4).pdf')

d_ai = doc_ai[0].get_drawings()
d_pdf = doc_pdf[0].get_drawings()

# Exclude drawings that span the whole page (background rectangles)
def filter_content_drawings(drawings, w, h):
    content = []
    for d in drawings:
        r = d['rect']
        # if rectangle covers > 90% of page, it's background
        if (r.x1 - r.x0) > 0.9 * w and (r.y1 - r.y0) > 0.9 * h:
            continue
        content.append(d)
    return content

c_ai = filter_content_drawings(d_ai, 1584.0, 1224.0)
c_pdf = filter_content_drawings(d_pdf, 2800.0, 2100.0)

def bbox(drawings):
    min_x = min(d['rect'].x0 for d in drawings)
    min_y = min(d['rect'].y0 for d in drawings)
    max_x = max(d['rect'].x1 for d in drawings)
    max_y = max(d['rect'].y1 for d in drawings)
    return min_x, min_y, max_x, max_y, max_x - min_x, max_y - min_y

print("Content drawings in AI:", len(c_ai), bbox(c_ai))
print("Content drawings in PDF:", len(c_pdf), bbox(c_pdf))
