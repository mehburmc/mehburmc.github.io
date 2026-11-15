# MehburMC Launcher: Web Sitesi

[MehburMC Launcher](https://github.com/Mehbur07/MehburMC-Launcher)'ın tanıtım ve indirme sitesi.
Launcher; Windows ve Linux için hafif, reklamsız ve telemetrisiz bir Minecraft Java Edition
launcher'ıdır.

**Canlı site:** https://mehburmc.github.io

> **Durum:** yapım aşamasında. Fazlar ve ilerleme için [ROADMAP.md](ROADMAP.md) dosyasına bak.

## Sitede neler olacak

- **İndir** butonu: Windows (`.exe`) veya Linux (`.deb`) seçimi, her zaman en son sürüm
- Ekran görüntüleri, özellikler, hakkında ve SSS bölümleri
- **Kaynak kod:** GitHub reposuna yönlendirme ve kaynak kodu zip olarak indirme
- Türkçe / İngilizce dil desteği
- Minecraft havasında bir 404 sayfası

## Teknoloji

Düz HTML, CSS ve JavaScript; kurulum veya build adımı yoktur. GitHub Pages üzerinde yayınlanır.

## Klasör yapısı

```
index.html          ana sayfa
404.html            "sayfa bulunamadı" sayfası (GitHub Pages otomatik kullanır)
assets/
  css/style.css     tüm stiller (renk değişkenleri en üstte)
  js/i18n.js        dil sistemi ve İngilizce çeviriler
  js/main.js        menü, galeri ve indirme penceresi
  js/404.js         404 sayfasındaki bloklar ve espri mesajı
  fonts/            gömülü yazı tipleri + lisansları (SIL OFL)
  img/              logo, menü ikonu, sosyal medya önizleme görseli
  img/screenshots/  launcher ekran görüntüleri (tam boy + küçük önizleme)
  icons/            uygulama ve iOS ikonları
kaynak-gorseller/   görsellerin işlenmemiş orijinalleri
scripts/            yardımcı araçlar (görsel üretimi)
favicon.ico         tarayıcı sekmesi ikonu
```

## Bilgisayarda açmak

Herhangi bir basit sunucu yeterli, örneğin:

```bash
python -m http.server 8000
```

Sonra tarayıcıda `http://localhost:8000` adresini aç.

## Çeviri eklemek / değiştirmek

Türkçe metinler doğrudan `index.html` içindedir. Çevrilecek her metnin etiketinde
`data-i18n="anahtar"` bulunur; İngilizcesi `assets/js/i18n.js` dosyasındaki `en` bölümüne aynı
anahtarla yazılır. Resim açıklaması gibi özellikler için `data-i18n-attr="alt:anahtar"` kullanılır.
Belirli bir dille açmak için adrese `?lang=en` veya `?lang=tr` eklenebilir.

## Görselleri yeniden üretmek

Logo veya ekran görüntüleri değişirse (Python, Pillow ve NumPy gerekir):

```bash
python scripts/build-assets.py kaynak-gorseller/logo-original.jpg ../mehbur-launcher .
```

İkinci parametre launcher projesinin klasörüdür; ekran görüntüleri ve uygulama ikonu oradan alınır.

## Lisans

Launcher GPL-3.0 lisanslıdır. Site lisansı yayın öncesinde belirlenecek.
