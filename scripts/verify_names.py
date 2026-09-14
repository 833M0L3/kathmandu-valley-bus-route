import re

with open('src/data/legendData.js', encoding='utf-8') as f:
    legend_text = f.read()
with open('src/data/dedicatedRoutesData.js', encoding='utf-8') as f:
    dedicated_text = f.read()

legend_names = re.findall(r'name:\s*["\']([^"\']+)["\']', legend_text)
dedicated_keys = re.findall(r'"([^"]+)":\s*\[', dedicated_text)

print('Legend names:', legend_names)
print('Dedicated keys:', dedicated_keys)
print("\nMismatches:")
for dk in dedicated_keys:
    if dk not in legend_names:
        print('In dedicated but not in legend:', repr(dk))
for ln in legend_names:
    if any(k.split()[0].lower() in ln.lower() for k in dedicated_keys) and ln not in dedicated_keys:
        print('Potential match in legend not in dedicated:', repr(ln))
