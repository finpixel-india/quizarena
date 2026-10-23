import os
from PIL import Image, ImageDraw

def draw_flask(draw, cx, cy, height, stroke_w, color=(12, 10, 9, 255)):
    """Draws the clean QuizLab science flask centered at (cx, cy)."""
    # Scale dimensions based on height
    # Total flask height is H
    # Top rim: y = cy - height * 0.50
    # Neck bottom: y = cy - height * 0.15
    # Base bottom: y = cy + height * 0.50
    top_y = cy - int(height * 0.48)
    neck_bottom_y = cy - int(height * 0.15)
    base_y = cy + int(height * 0.48)
    
    neck_w = int(height * 0.22)
    base_w = int(height * 0.88)
    rim_w = int(height * 0.36)
    fluid_y = cy + int(height * 0.18)
    fluid_w = int(height * 0.58)
    
    # 1. Top rim line
    draw.line([(cx - rim_w // 2, top_y), (cx + rim_w // 2, top_y)], fill=color, width=stroke_w)
    
    # 2. Neck vertical lines
    draw.line([(cx - neck_w // 2, top_y), (cx - neck_w // 2, neck_bottom_y)], fill=color, width=stroke_w)
    draw.line([(cx + neck_w // 2, top_y), (cx + neck_w // 2, neck_bottom_y)], fill=color, width=stroke_w)
    
    # 3. Slanted body lines
    draw.line([(cx - neck_w // 2, neck_bottom_y), (cx - base_w // 2, base_y)], fill=color, width=stroke_w)
    draw.line([(cx + neck_w // 2, neck_bottom_y), (cx + base_w // 2, base_y)], fill=color, width=stroke_w)
    
    # 4. Base bottom line
    draw.line([(cx - base_w // 2, base_y), (cx + base_w // 2, base_y)], fill=color, width=stroke_w)
    
    # 5. Liquid level line inside
    draw.line([(cx - fluid_w // 2, fluid_y), (cx + fluid_w // 2, fluid_y)], fill=color, width=stroke_w)
    
    # Rounded joints at bottom corners
    r = stroke_w // 2
    for corner_x, corner_y in [(cx - base_w // 2, base_y), (cx + base_w // 2, base_y),
                               (cx - rim_w // 2, top_y), (cx + rim_w // 2, top_y)]:
        draw.ellipse([(corner_x - r, corner_y - r), (corner_x + r, corner_y + r)], fill=color)

def create_gradient_canvas(size):
    """Creates a 45-degree sunset gradient from #FBBF24 to #F97316 to #EA580C."""
    bg = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    bg_draw = ImageDraw.Draw(bg)
    diag = size * 1.414
    for y in range(size):
        for x in range(size):
            pos = (x + y) / (2.0 * size) # 0.0 at top-left, 1.0 at bottom-right
            if pos < 0.5:
                t = pos * 2.0
                r = int(251 + (249 - 251) * t)
                g = int(191 + (115 - 191) * t)
                b = int(36 + (22 - 36) * t)
            else:
                t = (pos - 0.5) * 2.0
                r = int(249 + (234 - 249) * t)
                g = int(115 + (88 - 115) * t)
                b = int(22 + (12 - 22) * t)
            bg.putpixel((x, y), (r, g, b, 255))
    return bg

def create_adaptive_foreground(size):
    """
    Android Adaptive Icon Foreground:
    Total size is 108dp (size x size). Safe zone is inner 66% (72dp).
    We place the flask inside the safe zone.
    """
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    flask_h = int(size * 0.44) # Safe within 0.66 safe zone
    stroke_w = max(3, int(size * 0.038))
    draw_flask(draw, size // 2, size // 2, flask_h, stroke_w, color=(12, 10, 9, 255))
    return img

def create_legacy_icon(size, is_round=False):
    """Full-bleed gradient icon for legacy launchers."""
    canvas = create_gradient_canvas(size)
    mask = Image.new("L", (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    if is_round:
        mask_draw.ellipse([(0, 0), (size - 1, size - 1)], fill=255)
    else:
        radius = int(size * 0.22)
        mask_draw.rounded_rectangle([(0, 0), (size - 1, size - 1)], radius=radius, fill=255)
    
    out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    out.paste(canvas, (0, 0), mask)
    
    draw = ImageDraw.Draw(out)
    flask_h = int(size * 0.54)
    stroke_w = max(2, int(size * 0.046))
    draw_flask(draw, size // 2, size // 2, flask_h, stroke_w, color=(12, 10, 9, 255))
    return out

def create_splash_screen(w, h):
    """Creates a dark obsidian splash screen with a circular QuizLab badge in the center."""
    img = Image.new("RGBA", (w, h), (12, 10, 9, 255)) # #0C0A09
    badge_size = min(w, h) // 4
    if badge_size < 80: badge_size = 80
    if badge_size > 260: badge_size = 260
    
    badge = create_legacy_icon(badge_size, is_round=True)
    x = (w - badge_size) // 2
    y = (h - badge_size) // 2
    img.paste(badge, (x, y), badge)
    return img

def main():
    print("Generating Web/PWA icons...")
    os.makedirs("public", exist_ok=True)
    create_legacy_icon(192, is_round=False).save("public/icon-192.png")
    create_legacy_icon(512, is_round=False).save("public/icon-512.png")
    create_legacy_icon(512, is_round=True).save("public/icon-maskable.png")
    create_legacy_icon(180, is_round=False).save("public/apple-icon.png")

    android_res = "android/app/src/main/res"
    if os.path.exists(android_res):
        print("Configuring full-bleed Adaptive Icon background drawable...")
        drawable_dir = os.path.join(android_res, "drawable")
        os.makedirs(drawable_dir, exist_ok=True)
        bg_xml_path = os.path.join(drawable_dir, "ic_launcher_background.xml")
        # Full-bleed 135deg gradient shape
        with open(bg_xml_path, "w", encoding="utf-8") as f:
            f.write('''<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android"
    android:shape="rectangle">
    <gradient
        android:type="linear"
        android:angle="135"
        android:startColor="#FBBF24"
        android:centerColor="#F97316"
        android:endColor="#EA580C" />
</shape>
''')
        print("Created full-bleed gradient: " + bg_xml_path)

        # Ensure anydpi-v26 files reference @drawable/ic_launcher_background
        v26_dir = os.path.join(android_res, "mipmap-anydpi-v26")
        os.makedirs(v26_dir, exist_ok=True)
        adaptive_content = '''<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@drawable/ic_launcher_background"/>
    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
</adaptive-icon>
'''
        with open(os.path.join(v26_dir, "ic_launcher.xml"), "w", encoding="utf-8") as f:
            f.write(adaptive_content)
        with open(os.path.join(v26_dir, "ic_launcher_round.xml"), "w", encoding="utf-8") as f:
            f.write(adaptive_content)
        print("Updated mipmap-anydpi-v26 XML definitions.")

        # Densities: (standard size, adaptive foreground size)
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
            
            # 1. Full-bleed round icon (for circular launchers like Samsung One UI, Pixel)
            create_legacy_icon(icon_sz, is_round=True).save(os.path.join(dir_path, "ic_launcher_round.png"))
            
            # 2. Standard squircle icon
            create_legacy_icon(icon_sz, is_round=False).save(os.path.join(dir_path, "ic_launcher.png"))
            
            # 3. Adaptive foreground with flask in safe zone
            create_adaptive_foreground(fg_sz).save(os.path.join(dir_path, "ic_launcher_foreground.png"))
            print(f"Generated {folder}: round({icon_sz}), standard({icon_sz}), adaptive_fg({fg_sz})")

        # Branded dark splash screens
        print("Generating splash screens...")
        create_splash_screen(480, 800).save(os.path.join(drawable_dir, "splash.png"))
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
            print(f"Generated splash for {folder}")

    print("All professional icon & splash assets successfully generated!")

if __name__ == "__main__":
    main()
