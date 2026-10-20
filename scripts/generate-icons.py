import os
import math
from PIL import Image, ImageDraw

def create_quizlab_icon(size):
    # Create image with RGBA
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Rounded background with amber-orange gradient
    corner_radius = int(size * 0.22)
    # Create gradient background
    bg = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    bg_draw = ImageDraw.Draw(bg)
    
    # Draw vertical/diagonal gradient
    for y in range(size):
        r_ratio = y / size
        # Color from #FBBF24 (251, 191, 36) -> #F97316 (249, 115, 22) -> #EA580C (234, 88, 12)
        if r_ratio < 0.5:
            t = r_ratio * 2
            r = int(251 + (249 - 251) * t)
            g = int(191 + (115 - 191) * t)
            b = int(36 + (22 - 36) * t)
        else:
            t = (r_ratio - 0.5) * 2
            r = int(249 + (234 - 249) * t)
            g = int(115 + (88 - 115) * t)
            b = int(22 + (12 - 22) * t)
        bg_draw.line([(0, y), (size, y)], fill=(r, g, b, 255))
    
    # Rounded mask
    mask = Image.new("L", (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle([(0, 0), (size, size)], radius=corner_radius, fill=255)
    
    img.paste(bg, (0, 0), mask)
    
    # Draw Science Flask Icon on top
    # Flask points scaled to size
    icon_draw = ImageDraw.Draw(img)
    stroke_w = max(2, int(size * 0.055))
    dark_color = (12, 10, 9, 255) # #0C0A09
    
    # Dimensions for flask
    cx = size // 2
    top_y = int(size * 0.22)
    neck_bottom_y = int(size * 0.42)
    base_y = int(size * 0.78)
    neck_w = int(size * 0.12)
    base_w = int(size * 0.52)
    
    # Rim top line
    rim_w = int(size * 0.18)
    icon_draw.line([(cx - rim_w // 2, top_y), (cx + rim_w // 2, top_y)], fill=dark_color, width=stroke_w)
    
    # Neck left and right
    icon_draw.line([(cx - neck_w // 2, top_y), (cx - neck_w // 2, neck_bottom_y)], fill=dark_color, width=stroke_w)
    icon_draw.line([(cx + neck_w // 2, top_y), (cx + neck_w // 2, neck_bottom_y)], fill=dark_color, width=stroke_w)
    
    # Cone body
    icon_draw.line([(cx - neck_w // 2, neck_bottom_y), (cx - base_w // 2, base_y)], fill=dark_color, width=stroke_w)
    icon_draw.line([(cx + neck_w // 2, neck_bottom_y), (cx + base_w // 2, base_y)], fill=dark_color, width=stroke_w)
    
    # Base bottom
    icon_draw.line([(cx - base_w // 2, base_y), (cx + base_w // 2, base_y)], fill=dark_color, width=stroke_w)
    
    # Fluid level line inside flask
    fluid_y = int(size * 0.62)
    fluid_w = int(size * 0.36)
    icon_draw.line([(cx - fluid_w // 2, fluid_y), (cx + fluid_w // 2, fluid_y)], fill=dark_color, width=stroke_w)
    
    return img

def main():
    # 1. Generate web / pwa icons
    os.makedirs("public", exist_ok=True)
    icon_192 = create_quizlab_icon(192)
    icon_192.save("public/icon-192.png")
    icon_512 = create_quizlab_icon(512)
    icon_512.save("public/icon-512.png")
    icon_512.save("public/icon-maskable.png")
    icon_180 = create_quizlab_icon(180)
    icon_180.save("public/apple-icon.png")
    
    # 2. Android mipmaps
    android_res = "android/app/src/main/res"
    if os.path.exists(android_res):
        sizes = {
            "mipmap-mdpi": 48,
            "mipmap-hdpi": 72,
            "mipmap-xhdpi": 96,
            "mipmap-xxhdpi": 144,
            "mipmap-xxxhdpi": 192,
        }
        for folder, sz in sizes.items():
            dir_path = os.path.join(android_res, folder)
            os.makedirs(dir_path, exist_ok=True)
            ic = create_quizlab_icon(sz)
            ic.save(os.path.join(dir_path, "ic_launcher.png"))
            ic.save(os.path.join(dir_path, "ic_launcher_round.png"))
            
    print("Icons generated successfully!")

if __name__ == "__main__":
    main()
