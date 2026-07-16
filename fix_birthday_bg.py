import re

with open('src/app/templates/birthday-bash/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

replacements = [
    (r'w-full bg-\[\#111\] relative flex flex-col`\} style=\{\{ color: data\.fontColor \}\}', r'w-full relative flex flex-col`} style={{ backgroundColor: data.primaryColor, color: data.fontColor }}'),
    (r'w-full bg-\[\#fdfbf7\] relative flex flex-col`\} style=\{\{ color: data\.fontColor \}\}', r'w-full relative flex flex-col`} style={{ backgroundColor: data.primaryColor, color: data.fontColor }}'),
    (r'w-full bg-zinc-950 relative flex flex-col`\} style=\{\{ color: data\.fontColor \}\}', r'w-full relative flex flex-col`} style={{ backgroundColor: data.primaryColor, color: data.fontColor }}'),
    (r'w-full bg-zinc-900 relative flex flex-col border-\[12px\] shadow-inner`\} style=\{\{ borderColor: data\.primaryColor, color: data\.fontColor \}\}', r'w-full relative flex flex-col border-[12px] shadow-inner`} style={{ backgroundColor: data.primaryColor, borderColor: data.primaryColor, color: data.fontColor }}'),
    (r'w-full bg-\[\#f4eadd\] relative flex flex-col`\} style=\{\{ color: data\.fontColor \}\}', r'w-full relative flex flex-col`} style={{ backgroundColor: data.primaryColor, color: data.fontColor }}'),
    (r'w-full bg-white relative flex flex-col p-6 sm:p-10 border border-zinc-100`\} style=\{\{ color: data\.fontColor \}\}', r'w-full relative flex flex-col p-6 sm:p-10 border border-zinc-100`} style={{ backgroundColor: data.primaryColor, color: data.fontColor }}'),
    (r'w-full bg-slate-50 relative flex flex-col overflow-hidden`\} style=\{\{ color: data\.fontColor \}\}', r'w-full relative flex flex-col overflow-hidden`} style={{ backgroundColor: data.primaryColor, color: data.fontColor }}'),
    (r'w-full relative flex flex-col bg-indigo-950 overflow-hidden`\} style=\{\{ color: data\.fontColor \}\}', r'w-full relative flex flex-col overflow-hidden`} style={{ backgroundColor: data.primaryColor, color: data.fontColor }}')
]

for pat, rep in replacements:
    content = re.sub(pat, rep, content)

with open('src/app/templates/birthday-bash/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done birthday-bash")
