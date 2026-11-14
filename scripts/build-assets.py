"""Site görsellerini (logo, ikonlar, og-image, ekran görüntüleri) kaynak dosyalardan üretir."""
import shutil
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

LOGO_SRC = Path(sys.argv[1])          # kullanıcının gönderdiği 2048px logo (jpg)
LAUNCHER = Path(sys.argv[2])          # mehbur-launcher klasörü
SITE = Path(sys.argv[3])              # mmc-site klasörü

ICON_SRC = LAUNCHER / "src-tauri/icons/icon.png"
SHOTS_SRC = LAUNCHER / "docs/screenshots"

img_dir = SITE / "assets/img"
shot_dir = img_dir / "screenshots"
icon_dir = SITE / "assets/icons"
raw_dir = SITE / "kaynak-gorseller"
for d in (img_dir, shot_dir, icon_dir, raw_dir):
    d.mkdir(parents=True, exist_ok=True)

# 0) Orijinali sakla (kaynak zaten bu dosyaysa kopyalamaya gerek yok)
raw_logo = raw_dir / "logo-original.jpg"
if not raw_logo.exists() or not LOGO_SRC.samefile(raw_logo):
    shutil.copy2(LOGO_SRC, raw_logo)
logo = Image.open(LOGO_SRC).convert("RGB")
print("logo", logo.size)

# 1) Hero logosu: koyu arka plan logodan "çıkarılır" (şeffaf yapılır), böylece logo sayfa
#    arka planında dikdörtgen izi bırakmaz. Parlak kısımlar (harfler, parlama) kalır.
box = (60, 380, 1980, 1670)
FLOOR = np.array([30, 42, 50], dtype=np.float32)  # arka plandaki en açık gri-mavi ton
px = np.asarray(logo.crop(box)).astype(np.float32)
h, w = px.shape[:2]
# Arka plan tonu çıkarılır, kalan değer 0-255 aralığına geri yayılır
lifted = np.clip(px - FLOOR, 0, None) * 255.0 / (255.0 - FLOOR)
# Saydamlık = pikselin en parlak kanalı (siyah → tamamen şeffaf)
alpha = lifted.max(axis=2)
# Renk saydamlığa bölünür: koyu zemin üstünde orijinal parlaklıkta görünür
color = np.clip(lifted * 255.0 / np.maximum(alpha, 1.0)[..., None], 0, 255)
# Kenarlarda iz kalmasın diye yumuşak elips maske de uygulanır
mask = Image.new("L", (w, h), 0)
ImageDraw.Draw(mask).ellipse((-w * 0.06, -h * 0.08, w * 1.06, h * 1.08), fill=255)
mask = np.asarray(mask.filter(ImageFilter.GaussianBlur(min(w, h) * 0.07))).astype(np.float32)
alpha = alpha * mask / 255.0
# Gözle görülmeyecek kadar silik pikseller tamamen temizlenir (dosya boyutu küçülür)
faint = alpha < 4
alpha[faint] = 0
color[faint] = 0
badge = Image.fromarray(np.dstack([color, alpha]).astype(np.uint8), "RGBA")
for width in (1200, 640):
    out = badge.resize((width, round(h * width / w)), Image.LANCZOS)
    out.save(img_dir / f"logo-{width}.webp", "WEBP", quality=80, method=6)

# 2) Navbar için küçük yuvarlak köşeli ikon (launcher ikonundan)
icon = Image.open(ICON_SRC).convert("RGBA")
print("icon", icon.size)
for s in (64, 128):
    icon.resize((s, s), Image.LANCZOS).save(img_dir / f"icon-{s}.webp", "WEBP", quality=90, method=6)

# 3) Favicon ve uygulama ikonları
icon.save(SITE / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
for s in (192, 512):
    icon.resize((s, s), Image.LANCZOS).save(icon_dir / f"icon-{s}.png", optimize=True)
# iOS kendi köşelerini yuvarlar; şeffaflık istemez -> orijinalden kare kırpım
cx, cy, half = 1018, 1024, 785
apple = logo.crop((cx - half, cy - half, cx + half, cy + half)).resize((180, 180), Image.LANCZOS)
apple.save(icon_dir / "apple-touch-icon.png", optimize=True)

# 4) Open Graph (Discord/Twitter önizleme) görseli 1200x630
og_h = round(2048 * 630 / 1200)
top = 1024 - og_h // 2
og = logo.crop((0, top, 2048, top + og_h)).resize((1200, 630), Image.LANCZOS)
og.save(img_dir / "og-image.jpg", "JPEG", quality=86, optimize=True, progressive=True)

# 5) Ekran görüntüleri: tam boy + küçük önizleme (thumbnail)
for p in sorted(SHOTS_SRC.glob("*.png")):
    im = Image.open(p).convert("RGB")
    print("shot", p.name, im.size)
    full_w = min(im.width, 1600)
    im.resize((full_w, round(im.height * full_w / im.width)), Image.LANCZOS).save(
        shot_dir / f"{p.stem}.webp", "WEBP", quality=85, method=6)
    im.resize((640, round(im.height * 640 / im.width)), Image.LANCZOS).save(
        shot_dir / f"{p.stem}-thumb.webp", "WEBP", quality=80, method=6)

print("tamam")
