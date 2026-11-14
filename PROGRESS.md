# İlerleme Kaydı

### [2026-11-14 - Mehbur07]
- **Yapılanlar & Kararlar:**
  - Faz 0 (hazırlık) yerelde tamamlandı: proje dosyaları, ROADMAP, görseller (logo, favicon,
    ikonlar, og-image, WebP ekran görüntüleri), `scripts/build-assets.py`
  - Kararlar: düz HTML/CSS/JS; TR/EN; neon cyan + siyah tasarım; İndir butonu `.exe`/`.deb`
    seçimi sunar; kaynak kod butonu `main` zip'ini indirir; 404 sayfası Minecraft havasında
  - İlk yükleme Faz 7'den Faz 0 sonuna alındı (sonraki fazlar PR ile girebilsin diye)
- **Son Commit:** ilk yükleme, commit yok
- **Aktif Branch:** yok (henüz git deposu değil)
- **Sıradaki İlk İş (Next Action):** `mehburmc` organization kararı → ilk yükleme (`/yukle`) →
  Faz 1 (tasarım iskeleti)
- **Bilinen Sorunlar / Dikkat Edilmesi Gerekenler:**
  - `mehburmc.github.io` için GitHub'da `mehburmc` organization'ını kullanıcı açmalı
  - `.deb` dosyaları `-linux` ile biten ön sürümlerde (prerelease); "latest" API'si onları
    göstermez, indirme sistemi buna göre yazılmalı
