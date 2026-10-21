import os
import math
from PIL import Image, ImageDraw

def create_gradient_badge(size, is_round=False):
    """Creates the QuizLab flame badge with flask icon at given size."""
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    
    # 1. Background gradient
    bg = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    bg_draw = ImageDraw.Draw(bg)
    
    for y in range(size):
        r_ratio = y / size
        # #FBBF24 (251, 191, 36) -> #F97316 (249, 115, 22) -> #EA580C (234, 88, 12)
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
    
    # Mask
    mask = Image.new("L", (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    if is_round:
        mask_draw.ellipse([(0, 0), (size - 1, size - 1)], fill=255)
    else:
        corner_radius = int(size * 0.22)
        mask_draw.rounded_rectangle([(0, 0), (size - 1, size - 1)], radius=corner_radius, fill=255)
    
    img.paste(bg, (0, 0), mask)
    
    # 2. Draw Science Flask
    icon_draw = ImageDraw.Draw(img)
    stroke_w = max(2, int(size * 0.058))
    dark_color = (12, 10, 9, 255) # #0C0A09
    
    cx = size // 2
    top_y = int(size * 0.22)
    neck_bottom_y = int(size * 0.42)
    base_y = int(size * 0.78)
    neck_w = int(size * 0.12)
    base_w = int(size * 0.52)
    
    # Rim top line
    rim_w = int(size * 0.18)
    icon_draw.line([(cx - rim_w // 2, top_y), (cx + rim_w // 2, top_y)], fill=dark_color, width=stroke_w)
    
    # Neck
    icon_draw.line([(cx - neck_w // 2, top_y), (cx - neck_w // 2, neck_bottom_y)], fill=dark_color, width=stroke_w)
    icon_draw.line([(cx + neck_w // 2, top_y), (cx + neck_w // 2, neck_bottom_y)], fill=dark_color, width=stroke_w)
    
    # Cone body
    icon_draw.line([(cx - neck_w // 2, neck_bottom_y), (cx - base_w // 2, base_y)], fill=dark_color, width=stroke_w)
    icon_draw.line([(cx + neck_w // 2, neck_bottom_y), (cx + base_w // 2, base_y)], fill=dark_color, width=stroke_w)
    
    # Base bottom
    icon_draw.line([(cx - base_w // 2, base_y), (cx + base_w // 2, base_y)], fill=dark_color, width=stroke_w)
    
    # Fluid level line
    fluid_y = int(size * 0.62)
    fluid_w = int(size * 0.36)
    icon_draw.line([(cx - fluid_w // 2, fluid_y), (cx + fluid_w // 2, fluid_y)], fill=dark_color, width=stroke_w)
    
    return img

def create_adaptive_foreground(canvas_size):
    """
    Android adaptive icon foreground has 108dp canvas with inner 72dp safe area (66.6%).
    We center the QuizLab badge inside that safe area.
    """
    canvas = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
    # Badge takes 64% of canvas size to comfortably sit inside the safe zone
    badge_size = int(canvas_size * 0.64)
    badge = create_gradient_badge(badge_size, is_round=False)
    
    offset = (canvas_size - badge_size) // 2
    canvas.paste(badge, (offset, offset), badge)
    return canvas

def create_splash_screen(width, height):
    """Creates a dark branded splash screen with glowing QuizLab icon in the center."""
    img = Image.new("RGBA", (width, height), (12, 10, 9, 255)) # #0C0A09
    
    # Logo size ~ min(width, height) * 0.28
    logo_size = int(min(width, height) * 0.28)
    if logo_size < 96:
        logo_size = 96
    if logo_size > 320:
        logo_size = 320
        
    badge = create_gradient_badge(logo_size, is_round=False)
    x = (width - logo_size) // 2
    y = (height - logo_size) // 2
    img.paste(badge, (x, y), badge)
    return img

def main():
    print("Generating Web and PWA icons...")
    os.makedirs("public", exist_ok=True)
    create_gradient_badge(192).save("public/icon-192.png")
    create_gradient_badge(512).save("public/icon-512.png")
    create_gradient_badge(512).save("public/icon-maskable.png")
    create_gradient_badge(180).save("public/apple-icon.png")
    
    print("Generating Android Launcher & Adaptive Mipmaps...")
    android_res = "android/app/src/main/res"
    if os.path.exists(android_res):
        # Standard legacy icon sizes and adaptive foreground sizes
        # mdpi: 48 / 108
        # hdpi: 72 / 162
        # xhdpi: 96 / 216
        # xxhdpi: 144 / 324
        # xxxhdpi: 192 / 432
        densities = {
            "mipmap-mdpi": (48, 108),
            "mipmap-hdpi": (72, 162),
            "mipmap-xhdpi": (96, 216),
            "mipmap-xxhdpi": (144, 324),
            "mipmap-xxxhdpi": (192, 432),
        }
        for folder, (icon_sz, fg_sz) in densities.items():
            dir_path = os.path.join(android_res, folder)
            os.makedirs(dir_path, exist_ok=True)
            
            # Legacy standard icon
            ic = create_gradient_badge(icon_sz, is_round=False)
            ic.save(os.path.join(dir_path, "ic_launcher.png"))
            
            # Legacy round icon
            ic_round = create_gradient_badge(icon_sz, is_round=True)
            ic_round.save(os.path.join(dir_path, "ic_launcher_round.png"))
            
            # Modern Adaptive icon foreground
            ic_fg = create_adaptive_foreground(fg_sz)
            ic_fg.save(os.path.join(dir_path, "ic_launcher_foreground.png"))
            print(f"Generated {folder}: ic_launcher({icon_sz}), ic_launcher_round({icon_sz}), ic_launcher_foreground({fg_sz})")
        
        # Remove old capacitor vector files that override mipmaps
        old_vectors = [
            os.path.join(android_res, "drawable-v24", "ic_launcher_foreground.xml"),
            os.path.join(android_res, "drawable", "ic_launcher_background.xml"),
        ]
        for p in old_vectors:
            if os.path.exists(p):
                os.remove(p)
                print(f"Removed legacy vector override: {p}")
                
        # Set adaptive icon background color to #0C0A09
        bg_xml_path = os.path.join(android_res, "values", "ic_launcher_background.xml")
        with open(bg_xml_path, "w", encoding="utf-8") as f:
            f.write('<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <color name="ic_launcher_background">#0C0A09</color>\n</resources>\n')
        print("Updated ic_launcher_background.xml to #0C0A09")
        
        # Splash screens
        print("Generating branded dark splash screens...")
        splash_dir = os.path.join(android_res, "drawable")
        os.makedirs(splash_dir, exist_ok=True)
        create_splash_screen(480, 800).save(os.path.join(splash_dir, "splash.png"))
        
        splash_sizes = {
            "drawable-land-mdpi": (480, 320),
            "drawable-land-hdpi": (800, 480),
            "drawable-land-xhdpi": (1280, 720),
            "drawable-land-xxhdpi": (1600, 960),
            "drawable-land-xxxhdpi": (1920, 1280),
            "drawable-port-mdpi": (320, 480),
            "drawable-port-hdpi": (480, 800),
            "drawable-port-xhdpi": (720, 1280),
            "drawable-port-xxhdpi": (960, 1600),
            "drawable-port-xxxhdpi": (1280, 1920),
        }
        for folder, (w, h) in splash_sizes.items():
            dir_path = os.path.join(android_res, folder)
            os.makedirs(dir_path, exist_ok=True)
            create_splash_screen(w, h).save(os.path.join(dir_path, "splash.png"))
            print(f"Generated splash for {folder} ({w}x{h})")
            
    print("All assets successfully generated!")

if __name__ == "__main__":
    main()
