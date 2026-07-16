import re

with open('src/app/templates/party-time/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

replacements = [
    (r'w-full bg-zinc-950 relative flex flex-col overflow-hidden`\} style=\{\{ color: data\.fontColor \}\}', r'w-full relative flex flex-col overflow-hidden`} style={{ backgroundColor: data.primaryColor, color: data.fontColor }}')
]

for pat, rep in replacements:
    content = re.sub(pat, rep, content)

with open('src/app/templates/party-time/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done party-time")
