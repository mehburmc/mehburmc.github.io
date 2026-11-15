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

## Faz 5: 404 sayfası (`feature/404`) ✅
- Minecraft havası: "Bu chunk yüklenemedi!"; "404" yazısı cyan bloklardan çizilir ve bloklar
  açılışta yukarıdan düşüp yerine oturur (JavaScript yoksa düz yazı)
- Arka planda void'e düşen, dönen bloklar ("animasyonları azalt" açıksa gösterilmez)
- Oyun içi sohbet satırı: 7 espriden rastgele biri + aranan adres
- **Respawn** butonu (ana sayfaya döner) ve launcher indirme butonu; TR/EN desteği
- Yollar kökten başlar (`/assets/...`): GitHub Pages sayfayı `/a/b/c` gibi adreslerde de gösterir
- Görseller tamamen özgün çizim, Mojang'a ait görsel (creeper vb.) kullanılmaz
- Ayrıca: TR/EN düğmesi m07-site'taki düğmenin yapısına göre yeniden tasarlandı

## Faz 6: SEO, performans ve erişilebilirlik (`chore/seo-perf`) ✅
- Open Graph + Twitter kartı (paylaşım önizlemesi), canonical adres, yapılandırılmış veri
  (SoftwareApplication), `sitemap.xml`, `robots.txt`, `site.webmanifest`
- Dil alternatifi (hreflang) eklenmedi: iki dil aynı adreste JavaScript ile değişiyor
- Logo için doğru `sizes` + 720/960 px ara boylar (telefon 219 KB yerine 95 KB indiriyor)
- Girişteki ekran görüntüsü tembel yükleniyor (lazy loading)
- Inter'in Türkçe harf dosyası Latin Genişletilmiş-A'ya küçültüldü: 85 KB → 14 KB
- 404 sayfasına açıklama eklendi (SEO puanı `noindex` yüzünden bilerek düşük kalır)
- Lighthouse (telefon): performans 85 → 96, LCP 4,0 → 2,6 sn, toplam 592 → 406 KB;
  erişilebilirlik, en iyi uygulamalar ve SEO 100. Masaüstü: hepsi 100
- Klavye ve "az hareket" desteği önceki fazlarda eklenmişti; Lighthouse erişilebilirlik 100

## Faz 7: Yayın kontrolü (`chore/release-v1.0.0`)
- Canlı sitede gerçek tarayıcıyla 50 kontrol yapıldı, hepsi geçti: 4 İndir butonunun hepsi
  pencereyi açıyor; Windows / Linux / macOS / Android'de doğru seçenek veya bilgi notu çıkıyor;
  pencere X, Esc ve dışarı tıklamayla kapanıyor; Kopyala, menü bağlantıları, hamburger menü,
  lightbox, SSS, TR/EN (hatırlama ve `?lang=en`), 404 sayfası ve Respawn çalışıyor; konsol
  hatası ve yüklenemeyen dosya yok
- İndirme dosyaları tamamen indirildi: `.exe` (5,6 MB), `.deb` (7,9 MB) ve kaynak kod `.zip`
  sağlam, boyutlar GitHub'daki bilgilerle aynı
- Sitedeki 9 GitHub bağlantısı, 28 site dosyası, paylaşım görseli, `sitemap.xml`, `robots.txt`
  ve `site.webmanifest` yanıt veriyor
- Sitenin kodu GPL-3.0 (`LICENSE`); logo, ekran görüntüleri ve yazı tipleri lisansa dahil değil
- CHANGELOG `1.0.0` başlığına taşındı; `v1.0.0` tag'i PR merge edildikten sonra atılacak
- Launcher README'sine site linki: launcher reposunda ayrı PR

## İleride (plan dışı)
- Portable zip seçeneği, sürüm notları sayfası, indirme sayacı, Discord linki, özel alan adı
