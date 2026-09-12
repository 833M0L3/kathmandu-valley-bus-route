"""
Scan clean-map.jpg using RapidOCR sliding windows to pinpoint the exact locations
of all transit hubs, city centers, neighborhoods, and stations.
"""
import os
import json
import time
import numpy as np
from PIL import Image
from rapidocr_onnxruntime import RapidOCR

Image.MAX_IMAGE_PIXELS = None

IMAGE_PATH = "clean-map.jpg"
OUTPUT_JSON = "scratch/map_ocr_all.json"
TARGETS_JSON = "scratch/matched_targets.json"

TARGET_KEYWORDS = {
    'kathmandu': ['काठमाडौँ', 'काठमाडौं', 'काठमाण्डौ', 'kathmandu'],
    'lalitpur': ['ललितपुर', 'पाटन', 'lalitpur', 'patan'],
    'bhaktapur': ['भक्तपुर', 'bhaktapur'],
    'kalanki': ['कलङ्की', 'कलंकी', 'kalanki'],
    'koteshwor': ['कोटेश्वर', 'koteshwor'],
    'ratnapark': ['रत्नपार्क', 'ratnapark', 'ratna park'],
    'gongabu': ['गोंगबु', 'गोंगबू', 'बसपार्क', 'नयाँ बसपार्क', 'gongabu', 'buspark'],
    'airport': ['विमानस्थल', 'एयरपोर्ट', 'airport', 'tribhuvan'],
    'chabahil': ['चाबहिल', 'chabahil'],
    'boudha': ['बौद्ध', 'boudha', 'bouddha'],
    'thimi': ['थिमी', 'मध्यपुर', 'thimi'],
    'kirtipur': ['कीर्तिपुर', 'kirtipur'],
    'baneshwor': ['बानेश्वर', 'नयाँ बानेश्वर', 'baneshwor'],
    'balaju': ['बालाजु', 'balaju'],
    'maharajgunj': ['महाराजगञ्ज', 'महाराजगन्ज', 'maharajgunj'],
    'balkhu': ['बल्खु', 'balkhu'],
    'thamel': ['ठमेल', 'thamel'],
    'jawalakhel': ['जावलाखेल', 'jawalakhel'],
    'swayambhu': ['स्वयम्भू', 'स्वयम्भु', 'swayambhu'],
    'budhanilkantha': ['बुढानीलकण्ठ', 'budhanilkantha'],
    'thankot': ['थानकोट', 'thankot'],
    'suryabinayak': ['सूर्यविनायक', 'suryabinayak'],
    'sundarijal': ['सुन्दरीजल', 'sundarijal'],
    'lagankhel': ['लगनखेल', 'lagankhel'],
    'satdobato': ['सातदोबाटो', 'satdobato'],
    'kalimati': ['कालीमाटी', 'kalimati'],
    'tripureshwor': ['त्रिपुरेश्वर', 'tripureshwor'],
    'maitighar': ['माइतीघर', 'maitighar'],
    'sankhamul': ['शंखमूल', 'sankhamul'],
    'jorpati': ['जोरपाटी', 'jorpati'],
}

def main():
    print(f"Loading {IMAGE_PATH}...")
    img = Image.open(IMAGE_PATH)
    w, h = img.size
    print(f"Image dimensions: {w} x {h} px")

    ocr = RapidOCR()
    
    # We only need to scan the active transit bowl area:
    # x from 1200 to 11000, y from 1200 to 7600
    win_w = 1600
    win_h = 1600
    step_x = 1300
    step_y = 1300

    xs = list(range(1200, min(w, 11000), step_x))
    ys = list(range(1200, min(h, 7600), step_y))
    total_windows = len(xs) * len(ys)
    print(f"Scanning transit area in {total_windows} overlapping windows ({len(xs)} cols x {len(ys)} rows)...")

    all_detections = []
    idx = 0
    t0 = time.time()

    for y0 in ys:
        for x0 in xs:
            idx += 1
            x1 = min(w, x0 + win_w)
            y1 = min(h, y0 + win_h)
            
            crop = img.crop((x0, y0, x1, y1))
            crop_np = np.array(crop)

            results, _ = ocr(crop_np)
            if results:
                for item in results:
                    box, text, score = item[0], item[1], item[2]
                    try:
                        score_float = float(score)
                    except:
                        score_float = 0.5
                    
                    # Convert to global coordinates
                    box_global = [[float(pt[0] + x0), float(pt[1] + y0)] for pt in box]
                    cx = sum(pt[0] for pt in box_global) / 4.0
                    cy = sum(pt[1] for pt in box_global) / 4.0

                    all_detections.append({
                        'text': str(text).strip(),
                        'score': score_float,
                        'center': [round(cx, 1), round(cy, 1)],
                        'box': [[round(pt[0], 1), round(pt[1], 1)] for pt in box_global]
                    })

            if idx % 10 == 0 or idx == total_windows:
                elapsed = time.time() - t0
                print(f"Progress: {idx}/{total_windows} windows ({idx/total_windows*100:.1f}%) - {len(all_detections)} text elements found ({elapsed:.1f}s)")

    print(f"\nTotal raw detections: {len(all_detections)}")

    # Save all raw detections
    os.makedirs("scratch", exist_ok=True)
    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(all_detections, f, ensure_ascii=False, indent=2)
    print(f"Saved all detections to {OUTPUT_JSON}")

    # Match target places
    matched = {}
    for key, keywords in TARGET_KEYWORDS.items():
        candidates = []
        for det in all_detections:
            t_lower = det['text'].lower()
            for kw in keywords:
                if kw.lower() in t_lower:
                    candidates.append({
                        'matched_keyword': kw,
                        'text': det['text'],
                        'score': det['score'],
                        'center': det['center'],
                    })
                    break
        
        # Sort candidates by score descending
        candidates.sort(key=lambda c: c['score'], reverse=True)
        matched[key] = candidates
        print(f"Target '{key}': {len(candidates)} candidate matches")
        for c in candidates[:3]:
            print(f"   -> '{c['text']}' at {c['center']} (conf: {c['score']:.2f})")

    with open(TARGETS_JSON, "w", encoding="utf-8") as f:
        json.dump(matched, f, ensure_ascii=False, indent=2)
    print(f"\nSaved matched targets to {TARGETS_JSON}")

if __name__ == "__main__":
    main()
