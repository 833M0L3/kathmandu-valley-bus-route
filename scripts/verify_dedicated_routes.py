import xml.etree.ElementTree as ET

tree = ET.parse('Kathmandu_Bus_Route_Map.svg')
root = tree.getroot()

all_ids = set(elem.get('id') for elem in root.iter() if elem.get('id'))

test_ids = [
    ('Sajha Yatayat', 'S1', 'Sajha_Yatayat_Lele_-_RNAC_', 'Lele – Lagankhel – RNAC'),
    ('Sajha Yatayat', 'S2', 'Sajha_Yatayat_Lubhu_Lamatar_-_RNAC_', 'Lubhu / Lamatar – RNAC'),
    ('Sajha Yatayat', 'S3', 'Sajha_Yatayat_Bungamati_-_RNAC_', 'Bungamati – Jawalakhel – RNAC'),
    ('Sajha Yatayat', 'S4', 'Sajha_Yatayat_Nagdhunga_-_Airport_', 'Nagdhunga – Kalanki – Airport'),
    ('Sajha Yatayat', 'S5', 'Sajha_Yatayat_Budhanilkantha_-_Nagdhunga_Checkpost_', 'Budhanilkantha – Kalanki – Nagdhunga Checkpost'),
    ('Sajha Yatayat', 'S6', 'Sajha_Yatayat_Lagankhel_-_Naya_Bus_Park_', 'Lagankhel – Ratnapark – Naya Bus Park'),
    ('Sajha Yatayat', 'S7', 'Sajha_Yatayat_Lagankhel_-_Budhanilkantha_', 'Lagankhel – Ratnapark – Budhanilkantha'),
    ('Sajha Yatayat', 'S8', 'Sajha_Yatayat_Godawari_', 'Godawari – Lagankhel – Ratnapark'),
    
    ('Nepal Yatayat', 'N1', 'Nepal_Yatayat_Mulpani_', 'Balkhu – Ratnapark – Mulpani'),
    ('Nepal Yatayat', 'N2', 'Nepal_yatayat_Har_Har_Mahadev_', 'Balkhu – Ratnapark – Har Har Mahadev'),
    ('Nepal Yatayat', 'N3', 'Nepal_Yatayat_Kapan_-_Tikathali_', 'Kapan – Ratnapark – Tikathali'),
    
    ('Mahanagar Yatayat', 'M1', 'Mahanagar_Yatayat_Ringroad_', 'Ring Road Circular Expressway (Clockwise & Counter-Clockwise)'),
    ('Mahanagar Yatayat', 'M2', 'Mahanagar_Yatayat_Thankot_-_Dhulikhel_', 'Thankot – Kalanki – Koteshwor – Banepa – Dhulikhel'),
    
    ('Bhaktapur Buses', 'B1', 'Bhaktapur_Kamalbinayak_', 'Kamalbinayak – Thimi – Ratnapark / Gongabu'),
    ('Bhaktapur Buses', 'B2', 'Bhaktapur_Chyamasingh_', 'Chyamasingh – Kalanki & Ratnapark'),
    ('Bhaktapur Buses', 'B3', 'Bhaktapur_Bode_', 'Bode – Thimi – Ratnapark'),
    ('Bhaktapur Buses', 'B4', 'Bhaktapur_Mini_Bus_Park_Old_Route_Tallo_Bus_Park_Near_Siddha_Pokhari_', 'Old Route Tallo Bus Park (Siddha Pokhari)'),
    ('Bhaktapur Buses', 'B5', 'Bhaktapur_Mini_Bus_Park_New_Route_Gate_Cheu_Ko_', 'New Route Gate Cheu'),
    
    ('Tarakeshwor Yatayat', 'T1', 'Tarakeshor_Yatayat_Kavresthali_T1_and_T10', 'Kavresthali – RNAC (T1 / T10)'),
    ('Tarakeshwor Yatayat', 'T2', 'Tarakeshwor_Yatayat_Phutung_Sangla_', 'Phutung / Sangla – RNAC'),
    ('Tarakeshwor Yatayat', 'T3', 'Tarakeshwor_Yatayat_Buddha_Dhara_', 'Buddha Dhara – RNAC'),
    ('Tarakeshwor Yatayat', 'T4', 'Tarakeshwor_Yatayat_Jitpur_Phedi_', 'Jitpur Phedi – RNAC'),
    ('Tarakeshwor Yatayat', 'T5', 'Tarakeshwor_Yatayat_Tinpiple_', 'Tinpiple – RNAC'),
    ('Tarakeshwor Yatayat', 'T6', 'Tarakeshwor_Yatayat_Basnettar_', 'Basnettar – RNAC'),
    ('Tarakeshwor Yatayat', 'T7', 'Tarakeshwor_Yatayat_Dhital_Chowk_Lolang_01', 'Dhital Chowk / Lolang 01 – RNAC'),
    ('Tarakeshwor Yatayat', 'T8', 'Tarakeshwor_Yatayat_Dhital_Chowk_Lolang_02', 'Dhital Chowk / Lolang 02 – RNAC'),
    ('Tarakeshwor Yatayat', 'T9', 'Tarakeshwor_Yatayat_Goldhunga_', 'Goldhunga – RNAC'),
    
    ('Samakhusi Yatayat', 'SK1', 'Samakhusi_Yatayat_Manamaiju_-_RNAC_', 'Manamaiju – RNAC'),
    ('Samakhusi Yatayat', 'SK2', 'Samakhusi_Yatayat_Jhor_Waterfall_-_Bhotahiti_', 'Jhor Waterfall – Bhotahiti'),
    ('Samakhusi Yatayat', 'SK3', 'Samakhusi_Yatayat_Bhatkekopul_-_RNAC_', 'Bhatkekopul – RNAC'),
    
    ('Digo Yatayat', 'D1-Go', 'Digo_Yatayat_Go', 'Digo Yatayat Outbound'),
    ('Digo Yatayat', 'D1-Ret', 'Digo_Yatayat_Return', 'Digo Yatayat Inbound'),
    ('Digo Yatayat', 'D1-Loop', 'Galkopakha', 'Digo Yatayat Galkopakha Loop'),
    
    ('Budhanilkantha Yatayat', 'A1', 'Budhanilkantha_Yatayat_A1_Jadibuti', 'Budhanilkantha – Chabahil – Jadibuti'),
    ('Budhanilkantha Yatayat', 'A2', 'Budhanilkantha_Yatayat_A2_Kalanki', 'Budhanilkantha – Balaju – Kalanki'),
    ('Budhanilkantha Yatayat', 'A3', 'Budhanilkantha_Yatayat_A3_Jamal', 'Budhanilkantha – Lazimpat – Ratnapark (Jamal)'),
]

valid = 0
for op, code, tid, desc in test_ids:
    if tid in all_ids:
        valid += 1
    else:
        print(f"FAILED: {op} {code} {tid}")

print(f"Verified: {valid}/{len(test_ids)} dedicated sub-routes exist in SVG!")
