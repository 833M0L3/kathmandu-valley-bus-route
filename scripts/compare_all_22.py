import re
import json

with open('src/data/legendData.js', encoding='utf-8') as f:
    text = f.read()

ops = re.findall(r'code:\s*"([A-Z])",\s*name:\s*"([^"]+)",.*?corridor:\s*"([^"]+)"', text, re.DOTALL)

for code, name, corridor in ops:
    print(f"[{code}] {name}: {corridor}")
