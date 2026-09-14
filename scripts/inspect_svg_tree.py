import xml.etree.ElementTree as ET

tree = ET.parse('Kathmandu_Bus_Route_Map.svg')
root = tree.getroot()

def print_tree(elem, depth=0):
    tag = elem.tag.split('}')[-1]
    eid = elem.get('id', '')
    id_str = f' id="{eid}"' if eid else ''
    
    if tag in ['g', 'svg']:
        children = list(elem)
        child_tags = {}
        for c in children:
            ctag = c.tag.split('}')[-1]
            child_tags[ctag] = child_tags.get(ctag, 0) + 1
        summary = ', '.join(f'{k}: {v}' for k, v in child_tags.items())
        print('  ' * depth + f'<{tag}{id_str}> ({len(children)} items -> {summary})')
        for child in children:
            if child.tag.endswith('g'):
                print_tree(child, depth + 1)

print_tree(root)
