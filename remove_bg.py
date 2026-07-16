import os
import math
from PIL import Image

def remove_background(image_path):
    try:
        img = Image.open(image_path).convert("RGBA")
        datas = img.getdata()
        
        # Get the color of the top-left pixel
        corner_pixel = datas[0]
        bg_r, bg_g, bg_b, _ = corner_pixel
        
        new_data = []
        for item in datas:
            r, g, b, a = item
            
            # Calculate distance to background color
            dist = math.sqrt((r - bg_r)**2 + (g - bg_g)**2 + (b - bg_b)**2)
            
            if dist < 40:
                # Close to background color -> transparent
                # Alpha depends on distance (smooth edges)
                alpha = int((dist / 40) * 255)
                new_data.append((r, g, b, alpha))
            else:
                new_data.append(item)

        img.putdata(new_data)
        img.save(image_path, "PNG")
        print(f"Successfully processed {image_path}")
    except Exception as e:
        print(f"Failed to process {image_path}: {e}")

images_to_process = [
    'public/images/peacock_motif.png',
    'public/images/mandala.png',
    'public/images/wedding_knot.png'
]

for img_path in images_to_process:
    if os.path.exists(img_path):
        remove_background(img_path)
    else:
        print(f"File not found: {img_path}")
