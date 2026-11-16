# Değişiklik Günlüğü

Bu dosya [Keep a Changelog](https://keepachangelog.com/tr-TR/1.1.0/) biçimini,
sürümler [Semantic Versioning](https://semver.org/lang/tr/) kuralını izler.

## [Unreleased]

### Eklendi
- İndirme penceresine Android seçeneği eklendi: .exe ve .deb'in yanında artık .apk de indirilebiliyor
  (GitHub'daki en yeni `-arm64.apk` dosyası). Android telefondan girenlere .apk önerilir; iPhone/iPad
  notu ve macOS notu buna göre güncellendi. Pencere üç seçeneğe göre genişletildi.
- Girişteki platform etiketine Android eklendi: "Windows · Linux · Android".

## [1.0.0] - 2026-11-16

Sitenin ilk yayın sürümü: https://mehburmc.github.io

### Eklendi
- Proje iskeleti, yol haritası (ROADMAP) ve README oluşturuldu.
- Logo, favicon, uygulama ikonları, sosyal medya önizleme görseli ve launcher ekran görüntüleri
  siteye uygun boyut ve formatlarda (WebP) hazırlandı.
- Sitenin tasarım iskeleti kuruldu: neon cyan-siyah renkler, altıgen desenli arka plan,
  gömülü yazı tipleri, butonlar, menü (telefonda açılır menü) ve alt bilgi.
- Sitenin içerik bölümleri eklendi: özellikler, büyüyen fotoğraf galerisi, hakkında,
  sistem gereksinimleri, sık sorulan sorular ve kaynak kod indirme bölümü.
- İndir butonu artık Windows (.exe) ve Linux (.deb) arasında seçim sunan bir pencere açıyor;
  sürüm ve dosya boyutu GitHub'dan canlı geliyor, ziyaretçinin sistemi otomatik öne çıkıyor.
- Site artık Türkçe ve İngilizce: menüdeki TR / EN düğmesiyle dil değişiyor, ilk açılışta
  tarayıcının dili seçiliyor ve tercih hatırlanıyor.
- Minecraft havasında bir 404 sayfası eklendi: bloklardan "404", void'e düşen bloklar, rastgele
  espri mesajı ve ana sayfaya döndüren Respawn butonu.
- Site linki paylaşılınca logolu önizleme kartı çıkıyor; arama motorları için site haritası ve
  uygulama bilgileri eklendi.
- Sitenin kodu GPL-3.0 lisansıyla yayınlandı; logo, ekran görüntüleri ve yazı tipleri bu lisansa
  dahil değil.

### Değişti
- TR/EN dil düğmesinin görünümü sadeleştirildi (köşeli kutu, eş genişlikli yazı).
- Sayfa telefonda daha hızlı açılıyor: logo ve yazı tipi dosyaları küçültüldü (Lighthouse 85 → 96).

[Unreleased]: https://github.com/mehburmc/mehburmc.github.io/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/mehburmc/mehburmc.github.io/releases/tag/v1.0.0
