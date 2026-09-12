"""
Analyze OCR results from clean-map.jpg and extract the exact coordinates of key places.
"""
import json

def main():
    with open("scratch/map_ocr_all.json", encoding="utf-8") as f:
        data = json.load(f)

    print(f"Total detections: {len(data)}")

    search_terms = {
        'Kathmandu': ['kathmandu', 'काठमाडौ'],
        'Lalitpur': ['lalitpur', 'ललितपुर'],
        'Patan': ['patan', 'पाटन'],
        'Bhaktapur': ['bhaktapur', 'भक्तपुर'],
        'Kalanki': ['kalanki', 'कलङ्की', 'कलंकी'],
        'Koteshwor': ['koteshwor', 'कोटेश्वर'],
        'Ratnapark': ['ratnapark', 'ratna park', 'रत्नपार्क'],
        'Gongabu/New Bus Park': ['gongabu', 'bus park', 'buspark', 'बसपार्क', 'नयाँ बसपार्क'],
        'Airport': ['airport', 'विमानस्थल'],
        'Chabahil': ['chabahil', 'चाबहिल'],
        'Boudha': ['boudha', 'bouddha', 'बौद्ध'],
        'Baneshwor': ['baneshwor', 'बानेश्वर'],
        'Balaju': ['balaju', 'बालाजु'],
        'Maharajgunj': ['maharaj', 'महाराज'],
        'Balkhu': ['balkhu', 'बल्खु'],
        'Thamel': ['thamel', 'ठमेल'],
        'Jawalakhel': ['jawalakhel', 'जावलाखेल'],
        'Lagankhel': ['lagankhel', 'लगनखेल'],
        'Satdobato': ['satdobato', 'सातदोबाटो'],
        'Kirtipur': ['kirtipur', 'कीर्तिपुर'],
        'Thimi': ['thimi', 'थिमी'],
        'Swayambhu': ['swayambhu', 'स्वयम्भू', 'स्वयम्भु'],
        'Budhanilkantha': ['budhanilkantha', 'बुढानीलकण्ठ'],
        'Thankot': ['thankot', 'थानकोट'],
        'Suryabinayak': ['suryabinayak', 'सूर्यविनायक'],
        'Sundarijal': ['sundarijal', 'सुन्दरी'],
        'Kalimati': ['kalimati', 'कालीमाटी'],
        'Tripureshwor': ['tripureshwor', 'त्रिपुरेश्वर'],
        'Maitighar': ['maitighar', 'माइतीघर'],
        'Singhadurbar': ['singha', 'durbar', 'सिंहदरबार'],
        'Durbarmarg': ['durbar', 'मार्ग'],
        'Jorpati': ['jorpati', 'जोरपाटी'],
        'Chakrapath/Ring Road': ['ring road', 'रिंग रोड', 'चक्रपथ'],
    }

    results = {}
    for place, terms in search_terms.items():
        matches = []
        for d in data:
            t = d['text'].lower()
            for kw in terms:
                if kw.lower() in t:
                    matches.append(d)
                    break
        matches.sort(key=lambda m: m['score'], reverse=True)
        results[place] = matches
        print(f"\n=== {place} ({len(matches)} matches) ===")
        for m in matches[:4]:
            print(f"  '{m['text']}' @ center: {m['center']} (conf: {m['score']:.2f})")

    with open("scratch/place_analysis.json", "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    main()
