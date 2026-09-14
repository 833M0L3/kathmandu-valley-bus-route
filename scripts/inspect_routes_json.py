import json

with open('routes_data/routes.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

routes_json = data.get('data', [])
print(f"Loaded {len(routes_json)} routes from routes.json")
operators = set(r.get('operatorName') for r in routes_json)
print(f"Operators: {operators}")
for r in routes_json[:10]:
    print(f"- {r['name']} ({r.get('operatorName')}) | stops: {r.get('stopCount')} | dist: {r.get('distanceMeters')/1000:.1f}km")
