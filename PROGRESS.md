# İlerleme Kaydı

### [2026-11-15 - Mehbur07]
- **Yapılanlar & Kararlar:**
  - Faz 6 (SEO, performans, erişilebilirlik) `chore/seo-perf` branch'i ve PR ile `main`'e alındı
  - Open Graph/Twitter kartı, canonical, yapılandırılmış veri, sitemap, robots, webmanifest;
    hreflang bilerek eklenmedi (iki dil aynı adreste JavaScript ile değişiyor)
  - Logo için doğru `sizes` + 720/960 ara boylar; giriş ekran görüntüsü lazy; Inter latin-ext
    U+0100–017F'ye küçültüldü (85 → 14 KB, fontTools ile geçici venv'de)
  - Lighthouse telefon: performans 85 → 96, LCP 4,0 → 2,6 sn; diğer kategoriler ve masaüstü 100
- **Son Commit:** 94f23c9 Merge pull request #5 from mehburmc/feature/404
- **Aktif Branch:** main
- **Sıradaki İlk İş (Next Action):** Faz 7: canlı sitede tüm buton/indirme kontrolü, `v1.0.0`
  tag'i + CHANGELOG sürüm başlığı
- **Bilinen Sorunlar / Dikkat Edilmesi Gerekenler:**
  - `scripts/build-assets.py` Inter küçültmesini içermez; launcher'dan font yeniden kopyalanırsa
    `pyftsubset ... --unicodes="U+0100-017F" --layout-features='*' --flavor=woff2` tekrar uygulanmalı
  - Önbellek süresini GitHub Pages belirliyor (10 dk); Lighthouse uyarısı düzeltilemez
  - `sitemap.xml` içindeki `lastmod` elle güncelleniyor
  - m07-site'daki "MehburMC Launcher-Site" kartı `feature/mmc-site-card` branch'inde, bu
    oturumun geçici klasöründeki worktree'de; oturum kapanırsa kaybolabilir

### [2026-11-15 - Mehbur07]
- **Yapılanlar & Kararlar:**
  - Faz 5 (404 sayfası) `feature/404` branch'i ve PR ile `main`'e alındı: bloklardan "404",
    void'e düşen bloklar, 7 espriden rastgele biri, aranan adres, Respawn butonu, TR/EN
  - 404 sayfasındaki yollar kökten başlıyor (`/assets/...`); GitHub Pages sayfayı her adreste gösterir
  - TR/EN düğmesi kullanıcının referansına (m07-site) göre yeniden tasarlandı; aynı PR'da ayrı commit
  - Test için GitHub Pages gibi davranan yerel sunucu kullanıldı (olmayan adreste 404.html + 404 kodu)
- **Son Commit:** 326f6d6 Merge pull request #4 from mehburmc/feature/i18n
- **Aktif Branch:** main
- **Sıradaki İlk İş (Next Action):** Faz 6: SEO, performans ve erişilebilirlik
  (Open Graph etiketleri, sitemap, robots, Lighthouse)
- **Bilinen Sorunlar / Dikkat Edilmesi Gerekenler:**
  - 404 espri mesajları `i18n.js` içinde (`nf.j1`–`nf.j7`, hem tr hem en); sayı değişirse
    `404.js` içindeki `JOKE_COUNT` da güncellenmeli
  - m07-site'daki "MehburMC Launcher-Site" kartı `feature/mmc-site-card` branch'inde
    (geçici worktree) yüklenmeyi bekliyor

### [2026-11-15 - Mehbur07]
- **Yapılanlar & Kararlar:**
  - Faz 4 (TR/EN dil desteği) `feature/i18n` branch'i ve PR ile `main`'e alındı
  - Türkçe metinler HTML'de, İngilizceleri `assets/js/i18n.js` içinde (112 anahtar, hepsi çevrildi);
    menüde TR / EN düğmesi, seçim hatırlanıyor
  - Dil seçim sırası: `?lang=` → kayıtlı seçim → tarayıcı dili (Türkçe değilse İngilizce)
  - İndir butonları sayfa genelinden dinleniyor (dil değişince yeniden yazılan bağlantılar da çalışsın)
  - Hamburger menü sınırı 880 px → 1040 px (dil düğmesiyle menü 881-920 px'te taşıyordu)
- **Son Commit:** bc7b576 Merge pull request #3 from mehburmc/feature/downloads
- **Aktif Branch:** main
- **Sıradaki İlk İş (Next Action):** Faz 5: Minecraft havasında 404 sayfası
- **Bilinen Sorunlar / Dikkat Edilmesi Gerekenler:**
  - Yeni metin eklerken `data-i18n` anahtarı ve `i18n.js` içindeki İngilizcesi birlikte eklenmeli
  - Kullanım kılavuzu ve sorun giderme rehberi yalnızca Türkçe (İngilizce sitede "(Turkish)" notu var)
  - m07-site'daki "MehburMC Launcher-Site" kartı `feature/mmc-site-card` branch'inde
    (geçici worktree) yüklenmeyi bekliyor

### [2026-11-15 - Mehbur07]
- **Yapılanlar & Kararlar:**
  - Faz 3 (indirme sistemi) `feature/downloads` branch'i ve PR ile `main`'e alındı
  - İndir butonları `.exe` / `.deb` seçim penceresi açıyor; sürüm, dosya adı ve boyut GitHub
    API'den canlı geliyor, sonuç 10 dakika tarayıcı hafızasında tutuluyor
  - Ziyaretçinin sistemi algılanıyor (Windows / Linux öne çıkar; telefon ve macOS'a bilgi notu)
  - API'ye ulaşılamazsa veya JavaScript yoksa butonlar GitHub'daki sürümler sayfasına gidiyor
  - Pencere kapanış temizliği "close" olayına bağlı bırakılmadı (headless testte olay gelmedi);
    lightbox da aynı şekilde düzeltildi
- **Son Commit:** 324db2f Merge pull request #2 from mehburmc/feature/sections
- **Aktif Branch:** main
- **Sıradaki İlk İş (Next Action):** Faz 4: TR/EN dil desteği (main.js içindeki `TEXT`
  yazıları da çevrilmeli)
- **Bilinen Sorunlar / Dikkat Edilmesi Gerekenler:**
  - GitHub API saatlik 60 istek sınırı (ziyaretçi IP'si başına); önbellek bunu hafifletiyor
  - `.deb` dosyaları `-linux` ile biten ön sürümlerde (prerelease); bu düzen değişirse
    `PATTERNS` güncellenmeli
  - m07-site'daki "MehburMC Launcher-Site" kartı `feature/mmc-site-card` branch'inde
    (geçici worktree) yüklenmeyi bekliyor

### [2026-11-14 - Mehbur07]
- **Yapılanlar & Kararlar:**
  - Repo public yapıldı; GitHub Pages açıldı (https://mehburmc.github.io) ve `main` koruma
    kuralı (ruleset) eklendi
  - Faz 2 (içerik bölümleri) `feature/sections` branch'i ve PR ile `main`'e alındı: giriş,
    9 özellik kartı, lightbox'lı galeri, hakkında + gereksinimler, SSS, kaynak kod, son çağrı
  - İçerik launcher'ın kendi belgelerinden alındı; doğrulanamayan iddialar yazılmadı
    ("Veri toplamaz" yerine "Telemetri yok")
  - Türkçe büyük harf sorunu İngilizce kelimelerde `lang="en"` ile çözülüyor (SKIN, .ZIP)
- **Son Commit:** c1632da Merge pull request #1 from mehburmc/feature/design-system
- **Aktif Branch:** main
- **Sıradaki İlk İş (Next Action):** Faz 3: İndir butonu → `.exe` / `.deb` seçim penceresi
  (GitHub API'den canlı sürüm bilgisi)
- **Bilinen Sorunlar / Dikkat Edilmesi Gerekenler:**
  - İndir butonları şimdilik GitHub'daki son sürüm sayfasına gidiyor (Faz 3'te değişecek)
  - `.deb` dosyaları `-linux` ile biten ön sürümlerde (prerelease); "latest" API'si onları göstermez
  - m07-site'daki "MehburMC Launcher-Site" kartı `feature/mmc-site-card` branch'inde
    (geçici worktree) yüklenmeyi bekliyor

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
