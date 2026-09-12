import fitz

doc = fitz.open('Kathmandu-Bus-Route-Map-by-Subham-Subedi (4).pdf')
page = doc[0]
all_words = page.get_text('words')

for badge in ['D1', 'Y1', 'Y2', 'O1', 'E1', 'A1', 'A2', 'A3']:
    rects = page.search_for(badge)
    print(f'=== Badge: {badge} (found {len(rects)}) ===')
    for r in rects:
        # ignore legend table at x < 500, y > 1200
        if r.y0 > 1200:
            continue
        surrounding = fitz.Rect(r.x0 - 40, r.y0 - 20, r.x1 + 40, r.y1 + 20)
        nearby_words = [w[4] for w in all_words if fitz.Rect(w[:4]).intersects(surrounding)]
        text_preview = " ".join(nearby_words)
        print(f'  at ({r.x0:.1f}, {r.y0:.1f}) -> {text_preview}')
