#!/usr/bin/env node
/**
 * Generate PNG icons required for Android Chrome PWA install.
 * Requires: python + Pillow (pip install pillow)
 */
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const iconsDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "icons");
const script = `
from PIL import Image, ImageDraw, ImageFont
def make(size, path):
    img = Image.new('RGB', (size, size), (246, 243, 235))
    draw = ImageDraw.Draw(img)
    margin = size // 8
    draw.ellipse([margin, margin, size-margin, size-margin], fill=(179, 106, 69))
    try:
        font = ImageFont.truetype('msyh.ttc', int(size * 0.42))
    except Exception:
        try:
            font = ImageFont.truetype('C:/Windows/Fonts/msyh.ttc', int(size * 0.42))
        except Exception:
            font = ImageFont.load_default()
    text = '\\u98df'
    bbox = draw.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text(((size - tw) / 2, (size - th) / 2 - size * 0.04), text, fill=(246, 243, 235), font=font)
    img.save(path)
make(192, r'${path.join(iconsDir, "icon-192.png").replace(/\\/g, "/")}')
make(512, r'${path.join(iconsDir, "icon-512.png").replace(/\\/g, "/")}')
print('generated pwa png icons')
`;
execSync(`python -c "${script.replace(/"/g, '\\"').replace(/\n/g, ";")}"`, { stdio: "inherit" });
