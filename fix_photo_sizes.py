import re
import os

def update_file(filepath):
    if not os.path.exists(filepath): return
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    target = """const getPhotoShapeClasses = (shape: PhotoShape) => {
  if (shape === "circle") return "aspect-square rounded-full w-auto h-full max-h-[160px] sm:max-h-[220px]";
  if (shape === "horizontal") return "aspect-[4/3] w-auto h-full max-h-[160px] sm:max-h-[220px] rounded-2xl";
  return "aspect-[3/4] w-auto h-full max-h-[200px] sm:max-h-[260px] rounded-2xl"; // vertical
};"""

    replacement = """const getPhotoShapeClasses = (shape: PhotoShape) => {
  if (shape === "circle") return "aspect-square rounded-full w-auto h-full max-h-[240px] sm:max-h-[320px] shadow-lg";
  if (shape === "horizontal") return "aspect-[4/3] w-auto h-full max-h-[240px] sm:max-h-[320px] rounded-3xl shadow-xl";
  return "aspect-[3/4] w-auto h-full max-h-[280px] sm:max-h-[380px] rounded-3xl shadow-xl"; // vertical
};"""

    # If already replaced or slightly different, try a regex approach
    if target in content:
        content = content.replace(target, replacement)
    else:
        # Fallback regex
        content = re.sub(
            r'const getPhotoShapeClasses = \(shape: PhotoShape\) => \{[\s\S]*?return "aspect-\[3/4\][^"]*"; // vertical\n\};',
            replacement,
            content
        )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {filepath}")

update_file('src/app/templates/birthday-bash/page.tsx')
update_file('src/app/templates/party-time/page.tsx')
update_file('src/app/templates/elegant-anniversary/page.tsx')
