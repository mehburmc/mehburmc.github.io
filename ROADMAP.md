# Yol Haritası

MehburMC Launcher'ın tanıtım ve indirme sitesi. GitHub Pages üzerinde, düz HTML/CSS/JS ile
yapılır (build adımı yok).

- **Adres:** `mehburmc.github.io` (GitHub'da `mehburmc` organization'ı açılınca). Yedek plan:
  `mehbur07.github.io/mmc-site`
- **Tasarım:** neon cyan + siyah, logodaki soluk altıgen deseni; yazı tipleri launcher ile aynı
  (Orbitron, Rajdhani)
- **Dil:** TR / EN
- **Launcher reposu:** [Mehbur07/MehburMC-Launcher](https://github.com/Mehbur07/MehburMC-Launcher)

Her faz ayrı bir branch'te yapılır ve Pull Request ile `main`'e girer.

## Faz 0: Hazırlık ✅
- Klasör yapısı, `.gitignore`, `.gitattributes`, README, CHANGELOG, PROGRESS, ROADMAP
- Logo: hero için kenarları şeffaflaşan WebP (1200 / 640 px), menü ikonu (64 / 128 px)
- Favicon (`favicon.ico`), uygulama ikonları (192 / 512 px), iOS ikonu (180 px)
- Discord/sosyal medya önizleme görseli (`og-image.jpg`, 1200×630)
- 4 ekran görüntüsü WebP'ye çevrildi (tam boy + küçük önizleme)
- Görseller `scripts/build-assets.py` ile yeniden üretilebilir
- İlk yükleme: `mehburmc/mehburmc.github.io` reposu (doğrudan `main`)

## Faz 1: Tasarım iskeleti (`feature/design-system`) ✅
- Renk değişkenleri launcher'ın kendi temasıyla birebir aynı (`#00f0ff` neon cyan, `#05070a` zemin)
- Altıgen desenli sabit arka plan + üstte hafif cyan ışık, neon parlama efektleri
- Yazı tipleri siteye gömülü: Orbitron (marka yazısı), Rajdhani (başlık/buton), Inter (metin)
- Bileşenler: buton (dolu / çerçeveli / büyük), kart, etiket (chip), bölüm başlığı
- Menü: kaydırınca koyulaşır; 1040 px altında hamburger menü (Esc ile kapanır)
- Alt bilgi: bağlantılar, lisans, "Mojang/Microsoft ile bağlantılı değildir" notu
- Logo arka planı şeffaflaştırıldı (sayfada dikdörtgen izi kalmıyor)
- Geçici giriş bölümü ve bölüm yer tutucuları (Faz 2'de dolacak)
- Test: 1440 px masaüstü, 390 px ve 320 px telefon genişliğinde yatay taşma yok

## Faz 2: İçerik bölümleri (`feature/sections`) ✅
- Giriş: logo, slogan, **İndir** + GitHub butonları, güven maddeleri, çerçeveli ekran görüntüsü
- Özellikler: 9 kart (Profiller, Otomatik Java, Mod Tarayıcı, Mod Toggle, Skin & Cape,
  Arkadaşlar, MehburMC Kütüphanesi, Sunucular, Ve Dahası), özgün çizim ikonlar
- Fotoğraflar: 2×2 galeri + lightbox (ok tuşları, Esc, dışarı tıklayınca kapanır;
  JavaScript yoksa resim doğrudan açılır)
- Hakkında + teknik bilgiler kartı + Windows/Linux sistem gereksinimleri
- SSS: 6 soru (ücretsiz mi, SmartScreen uyarısı, Java, hesap, güncelleme, sorun bildirme)
- Kaynak kod: "GitHub'da Gör", "Kaynak Kodu İndir (.zip)" (`main`), GPL-3.0 ve
  "oynamak için gerekmez" uyarısı
- Sayfa sonu çağrısı ("Oyuna hazır mısın?")
- Bilgiler launcher'ın kendi belgelerinden (README, KULLANIM, GIZLILIK) alındı

## Faz 3: İndirme sistemi (`feature/downloads`) ✅
- Tüm İndir butonları açılır pencere (modal) açar: Windows `.exe` / Linux `.deb`; dosya adı,
  sürüm ve boyut
- Ziyaretçinin sistemine uyan seçenek "Senin sistemin" etiketiyle öne çıkar; telefon ve macOS
  ziyaretçilerine bilgi notu gösterilir
- Linux kurulum komutu + "Kopyala" butonu (pano izni yoksa komut seçili kalır)
- Veriler GitHub API'den canlı çekilir. `.exe` normal sürümde, `.deb` ise `-linux` ile biten
  ön sürümde (prerelease) durduğu için ikisi ayrı ayrı aranır
- Sonuç 10 dakika tarayıcı hafızasında tutulur (saatlik 60 istek sınırını korur)
- API'ye ulaşılamazsa butonlar GitHub'daki sürümler sayfasına gider; JavaScript yoksa da öyle
- Test: Windows / Linux / Android senaryoları, API erişilemez durumu, Kopyala ve SSS bağlantısı

## Faz 4: TR/EN dil desteği (`feature/i18n`) ✅
- Türkçe metinler HTML'de, İngilizceleri `assets/js/i18n.js` içinde (`data-i18n` anahtarlarıyla);
  112 anahtarın hepsinin İngilizcesi var
- Menüde TR / EN düğmesi; seçim hatırlanır
- Dil seçim sırası: `?lang=en|tr` → kayıtlı seçim → tarayıcı dili (Türkçe değilse İngilizce)
- Sayfa başlığı, açıklaması, `<html lang>`, resim açıklamaları ve ekran okuyucu etiketleri de çevrilir
- İndirme penceresinin yazıları, tarih ve boyut biçimi seçili dile göre (10 Kasım / November 10)
- İndir butonları sayfa genelinden dinlenir; dil değişince yeniden yazılan bağlantılar da çalışır
- Dil düğmesi menüye sığsın diye hamburger menü sınırı 880 px → 1040 px
- Test: EN'de Türkçe satır kalmadı, TR → EN → TR birebir aynı, tarayıcı dili ve `?lang` çalışıyor

## Faz 5: 404 sayfası (`feature/404`)
- Minecraft havası: "Bu chunk yüklenemedi!", piksel yazı tipi, düşen piksel bloklar
- Her açılışta rastgele espri mesajı, **Respawn** butonu (ana sayfaya döner)
- Görseller tamamen özgün çizim, Mojang'a ait görsel (creeper vb.) kullanılmaz

## Faz 6: SEO, performans ve erişilebilirlik (`chore/seo-perf`)
- Başlık/açıklama, Open Graph etiketleri, sitemap, robots
- Tembel yükleme (lazy loading), Lighthouse kontrolü
- Klavyeyle gezinme, "az hareket" tercihinde animasyonların kısılması

## Faz 7: Yayın kontrolü
- Canlı sitede tüm butonlar ve indirme linkleri denenir
- `v1.0.0` tag'i + CHANGELOG
- (İsteğe bağlı) Launcher README'sine site linki, ayrı PR ile

## İleride (plan dışı)
- Portable zip seçeneği, sürüm notları sayfası, indirme sayacı, Discord linki, özel alan adı
