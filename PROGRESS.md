# İlerleme Kaydı

### [2026-11-14 - Mehbur07]
- **Yapılanlar & Kararlar:**
  - İlk yükleme: `mehburmc/mehburmc.github.io` reposu (private) oluşturuldu, Faz 0 doğrudan
    `main`'e gönderildi; About açıklaması, topic'ler ve Dependabot uyarıları eklendi
  - Faz 1 (tasarım iskeleti) `feature/design-system` branch'i ve PR ile `main`'e alındı:
    renkler, altıgen arka plan, gömülü yazı tipleri, butonlar, menü (mobilde açılır), alt bilgi
  - Logo arka planı şeffaflaştırıldı; Türkçe büyük harf sorunu (WİNDOWS/GİTHUB) giderildi
  - 1440 / 390 / 320 px genişlikte tarayıcıda test edildi, yatay taşma yok
- **Son Commit:** 2cb801c chore: initial project setup with brand assets
- **Aktif Branch:** main
- **Sıradaki İlk İş (Next Action):** Repo görünürlüğü kararı (public → GitHub Pages yayını ve
  koruma kuralı), ardından Faz 2 (içerik bölümleri)
- **Bilinen Sorunlar / Dikkat Edilmesi Gerekenler:**
  - Repo private ve organization ücretsiz planda: GitHub Pages yayını ve `main` koruma kuralı
    (ruleset) bu durumda kullanılamıyor; repo public yapılınca ikisi de açılabilir
  - `.deb` dosyaları `-linux` ile biten ön sürümlerde (prerelease); Faz 3'te dikkate alınmalı

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
