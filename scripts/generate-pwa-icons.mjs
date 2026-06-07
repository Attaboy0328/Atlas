#!/usr/bin/env node
/**
 * Generate PNG icons from mascot source (or fallback to legacy glyph).
 * Requires: python + Pillow (pip install pillow)
 */
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const iconsDir = path.join(root, "icons");
const sourceCandidates = [
  path.join(root, "assets", "shiyangzhixing-icon-source.png"),
  path.join(root, "icons", "icon-source.png")
];
const source = sourceCandidates.find((candidate) => fs.existsSync(candidate));

const script = source
  ? `
from PIL import Image
from pathlib import Path
src = Path(r'${source.replace(/\\/g, "/")}')
icons = Path(r'${iconsDir.replace(/\\/g, "/")}')
im = Image.open(src).convert('RGBA')
w, h = im.size
side = min(w, h)
left = (w - side) // 2
top = (h - side) // 2
im = im.crop((left, top, left + side, top + side))
for size, name in [(192, 'icon-192.png'), (512, 'icon-512.png')]:
    im.resize((size, size), Image.Resampling.LANCZOS).save(icons / name, optimize=True)
print('generated pwa png icons from mascot source')
`
  : `
from PIL import Image, ImageDraw, ImageFont
def make(size, path):
    img = Image.new('RGB', (size, size), (246, 243, 235))
    draw = ImageDraw.Draw(img)
    margin = size // 8
    draw.ellipse([margin, margin, size-margin, size-margin], fill=(179, 106, 69))
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
print('generated fallback pwa png icons')
`;

execSync(`python -c "${script.replace(/"/g, '\\"').replace(/\n/g, ";")}"`, { stdio: "inherit" });
