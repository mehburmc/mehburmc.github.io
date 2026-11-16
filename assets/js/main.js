// MehburMC Launcher sitesi: genel davranışlar (menü, galeri, indirme penceresi, yıl)
(() => {
  "use strict";

  // Dil sistemi (i18n.js) bu dosyadan önce yüklenir. Yüklenemezse Türkçe yazılar
  // HTML'de durduğu için sayfa yine çalışır; JavaScript'in yazdığı metinler için
  // anahtarın kendisi yerine boş olmayan bir yedek döner.
  const i18n = window.MMC_I18N || {
    t: (key) => key,
    locale: () => "tr-TR",
  };
  const t = (key, vars) => i18n.t(key, vars);

  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("nav-menu");
  const desktopQuery = window.matchMedia("(min-width: 1041px)");

  // --- Mobil menü ---------------------------------------------------------
  function setMenu(open) {
    if (!header || !toggle) return;
    header.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? toggle.dataset.labelClose : toggle.dataset.labelOpen);
  }

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });

    // Menüdeki bir bağlantıya tıklanınca menü kapanır
    menu.addEventListener("click", (event) => {
      if (event.target.closest("a")) setMenu(false);
    });

    // Esc tuşu menüyü kapatır ve odağı butona geri verir
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && header.classList.contains("is-open")) {
        setMenu(false);
        toggle.focus();
      }
    });

    // Ekran genişleyip masaüstü görünümüne geçilirse menü durumu sıfırlanır
    desktopQuery.addEventListener("change", (event) => {
      if (event.matches) setMenu(false);
    });

    // Dil değişince butonun ekran okuyucu etiketi (Menüyü aç/kapat) yeni dilde yenilenir
    document.addEventListener("mmc:lang", () => setMenu(header.classList.contains("is-open")));
  }

  // --- Kaydırınca menü arka planı -------------------------------------------
  function updateScrolled() {
    header?.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  updateScrolled();
  window.addEventListener("scroll", updateScrolled, { passive: true });

  // --- Fotoğraf galerisi: tıklayınca büyük görüntü (lightbox) -----------------
  // Tarayıcı <dialog> desteklemiyorsa bağlantılar resmi doğrudan açar (yedek davranış).
  const lightbox = document.getElementById("lightbox");
  const shots = Array.from(document.querySelectorAll(".gallery .shot"));

  if (lightbox && typeof lightbox.showModal === "function" && shots.length) {
    const lbImg = lightbox.querySelector(".lightbox-img");
    const lbCaption = lightbox.querySelector(".lightbox-caption");
    let current = 0;
    let opener = null; // pencere kapanınca odağın döneceği küçük resim

    function show(index) {
      current = (index + shots.length) % shots.length; // sondan başa / baştan sona döner
      const shot = shots[current];
      const thumb = shot.querySelector("img");
      lbImg.src = shot.getAttribute("href");
      lbImg.alt = thumb ? thumb.alt : "";
      lbCaption.textContent = shot.dataset.caption || "";
    }

    shots.forEach((shot, index) => {
      shot.addEventListener("click", (event) => {
        event.preventDefault();
        opener = shot;
        show(index);
        lightbox.showModal();
        document.documentElement.classList.add("no-scroll");
      });
    });

    // Kapanış temizliği: kaydırma kilidi kalkar, odak küçük resme döner.
    // Hem doğrudan hem "close" olayından çağrılır; iki kez çalışması zararsızdır.
    function afterClose() {
      document.documentElement.classList.remove("no-scroll");
      if (opener) opener.focus({ preventScroll: true });
      opener = null;
    }
    function closeLightbox() {
      if (lightbox.open) lightbox.close();
      afterClose();
    }

    lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
    lightbox.querySelector(".lightbox-prev").addEventListener("click", () => show(current - 1));
    lightbox.querySelector(".lightbox-next").addEventListener("click", () => show(current + 1));

    // Resmin dışındaki karanlık alana tıklayınca kapanır
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });

    // Ok tuşlarıyla gezinme (Esc'yi tarayıcı kendisi yönetir)
    lightbox.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") show(current - 1);
      if (event.key === "ArrowRight") show(current + 1);
    });

    // Esc ile kapanınca tarayıcı bu olayı gönderir
    lightbox.addEventListener("close", afterClose);

    // Pencere açıkken dil değişirse açıklama yazısı yeni dilde gösterilir
    document.addEventListener("mmc:lang", () => {
      if (lightbox.open) show(current);
    });
  }

  // --- İndirme penceresi (.exe / .deb / .apk seçimi) ----------------------------------
  // Sürüm bilgisi GitHub API'den canlı çekilir. API'ye ulaşılamazsa butonlar GitHub'daki
  // sürümler sayfasına gider. JavaScript yoksa İndir butonları zaten oraya gider.
  const dlDialog = document.getElementById("download-dialog");

  if (dlDialog && typeof dlDialog.showModal === "function") {
    const REPO = "Mehbur07/MehburMC-Launcher";
    const API_URL = `https://api.github.com/repos/${REPO}/releases?per_page=20`;
    const CACHE_KEY = "mmc-releases-v3"; // v3: macOS .dmg eklendi, eski önbellekte yok
    const CACHE_MS = 10 * 60 * 1000; // 10 dakika: GitHub'ın saatlik 60 istek sınırını korur

    // Ekrandaki yazılar i18n.js'teki "dl.*" anahtarlarından gelir
    const PATTERNS = {
      windows: /_x64-setup\.exe$/i,
      linux: /_amd64\.deb$/i,
      android: /-arm64\.apk$/i,
      mac: /_universal\.dmg$/i,
    };

    const statusEl = dlDialog.querySelector("[data-dl-status]");
    const noteEl = dlDialog.querySelector("[data-dl-platform-note]");
    const cmdEl = dlDialog.querySelector("[data-dl-cmd]");
    const copyBtn = dlDialog.querySelector("[data-copy]");
    const options = {
      windows: dlDialog.querySelector('[data-os="windows"]'),
      linux: dlDialog.querySelector('[data-os="linux"]'),
      android: dlDialog.querySelector('[data-os="android"]'),
      mac: dlDialog.querySelector('[data-os="mac"]'),
    };
    let loadPromise = null;
    let opener = null;
    let state = "idle"; // idle | loading | ok | error (dil değişince yazıyı yenilemek için)
    let lastData = null;

    // Ziyaretçinin sistemi: telefon kontrolü önce (Android'in tanıtım yazısında da "Linux" geçer).
    // Android'e .apk önerilir; iPhone/iPad için sürüm yok ("mobile" notu gösterilir).
    function detectPlatform() {
      const ua = navigator.userAgent || "";
      const platform = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || "";
      if (/Android/i.test(ua)) return "android";
      if (/iPhone|iPad|iPod/i.test(ua) || (/Mac/i.test(platform) && navigator.maxTouchPoints > 1)) return "mobile";
      if (/Win/i.test(platform) || /Windows/i.test(ua)) return "windows";
      if (/Mac/i.test(platform) || /Mac OS X/i.test(ua)) return "mac";
      if (/Linux|X11|CrOS/i.test(platform + " " + ua)) return "linux";
      return "unknown";
    }

    function applyPlatform() {
      const platform = detectPlatform();
      Object.entries(options).forEach(([os, card]) => {
        const match = os === platform;
        card.classList.toggle("is-recommended", match);
        card.querySelector(".dl-badge").hidden = !match;
        const btn = card.querySelector("[data-dl-link]");
        btn.classList.toggle("btn-primary", match);
        btn.classList.toggle("btn-ghost", !match);
      });
      // Mac sürümü yayınlanmışsa kartı öne çıkar; yoksa "henüz yok" notu gösterilir
      const macReady = Boolean(lastData && lastData.mac);
      const note = platform === "mobile" ? t("dl.mobile") : platform === "mac" && !macReady ? t("dl.mac") : "";
      noteEl.hidden = !note;
      noteEl.querySelector("span").textContent = note;
    }

    // Tarayıcı hafızası gizli modda çalışmayabilir; hata vermesin
    function readCache() {
      try {
        const saved = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
        if (saved && Date.now() - saved.time < CACHE_MS) return saved.data;
      } catch (e) {
        /* hafıza kullanılamıyor: sorun değil, API'ye sorulur */
      }
      return null;
    }
    function writeCache(data) {
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ time: Date.now(), data }));
      } catch (e) {
        /* hafıza kullanılamıyor: sorun değil */
      }
    }

    // Sürüm listesinden her sistem için en yeni dosyayı bulur
    function pickAssets(releases) {
      const sorted = releases
        .filter((r) => !r.draft)
        .sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
      const result = {};
      Object.entries(PATTERNS).forEach(([os, pattern]) => {
        for (const release of sorted) {
          const asset = (release.assets || []).find((a) => pattern.test(a.name));
          if (asset) {
            const version = (asset.name.match(/[_-](\d+\.\d+\.\d+)[_-]/) || [])[1] || release.tag_name;
            result[os] = {
              name: asset.name,
              size: asset.size,
              url: asset.browser_download_url,
              version,
              date: release.published_at,
            };
            break;
          }
        }
      });
      return result;
    }

    async function loadReleases() {
      const cached = readCache();
      if (cached) return cached;
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 8000);
      try {
        const res = await fetch(API_URL, {
          headers: { Accept: "application/vnd.github+json" },
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`GitHub API ${res.status}`);
        const data = pickAssets(await res.json());
        if (!data.windows && !data.linux && !data.android) throw new Error("Uygun dosya bulunamadı");
        writeCache(data);
        return data;
      } finally {
        clearTimeout(timer);
      }
    }

    // Boyut ve tarih seçili dilin biçimiyle yazılır (5,6 MB / 5.6 MB; 10 Kasım / November 10)
    function formatSize(bytes) {
      return `${(bytes / 1048576).toLocaleString(i18n.locale(), { maximumFractionDigits: 1 })} MB`;
    }
    function formatDate(iso) {
      return new Date(iso).toLocaleDateString(i18n.locale(), { day: "numeric", month: "long", year: "numeric" });
    }

    function render(data) {
      Object.entries(options).forEach(([os, card]) => {
        const asset = data[os];
        // macOS kartı yalnız gerçek bir .dmg varken görünür (diğerleri hep görünür)
        if (os === "mac") card.hidden = !asset;
        if (!asset) return; // bulunamayan sistemin butonu GitHub sayfasına gitmeye devam eder
        card.querySelector("[data-dl-name]").textContent = asset.name;
        card.querySelector("[data-dl-size]").textContent = `v${asset.version} · ${formatSize(asset.size)}`;
        card.querySelector("[data-dl-link]").href = asset.url;
      });
      if (data.linux) {
        // Gerçek komut yazıldı: dil değişince yer tutucu yazıyla ezilmesin
        cmdEl.removeAttribute("data-i18n");
        cmdEl.textContent = `sudo apt install ./${data.linux.name}`;
      }
      const main = data.windows || data.linux || data.android;
      statusEl.textContent = t("dl.latest", { version: main.version, date: formatDate(main.date) });
    }

    function openDialog(trigger) {
      opener = trigger;
      applyPlatform();
      dlDialog.showModal();
      document.documentElement.classList.add("no-scroll");
      if (!loadPromise) {
        state = "loading";
        statusEl.textContent = t("dl.loading");
        loadPromise = loadReleases()
          .then((data) => {
            state = "ok";
            lastData = data;
            render(data);
            applyPlatform(); // Mac sürümü bulunduysa "henüz yok" notu kalkar
          })
          .catch(() => {
            state = "error";
            statusEl.textContent = t("dl.error");
            loadPromise = null; // bir dahaki açılışta yeniden denenir
          });
      }
    }

    // İndir butonları sayfanın genelinden dinlenir: dil değişince yeniden yazılan
    // bağlantılar (ör. kaynak kod uyarısındaki "İndir") da çalışmaya devam eder
    document.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-download]");
      if (!trigger) return;
      event.preventDefault();
      openDialog(trigger);
    });

    // Dil değişince JavaScript'in yazdığı metinler yeni dilde yenilenir
    document.addEventListener("mmc:lang", () => {
      if (state === "ok" && lastData) render(lastData);
      else if (state === "loading") statusEl.textContent = t("dl.loading");
      else if (state === "error") statusEl.textContent = t("dl.error");
      if (dlDialog.open) applyPlatform();
    });

    // Kapanış temizliği: kaydırma kilidi kalkar, odak pencereyi açan butona döner
    // (klavye kullanıcıları için). Hem doğrudan hem "close" olayından çağrılır.
    function afterClose(restoreFocus = true) {
      document.documentElement.classList.remove("no-scroll");
      if (opener && restoreFocus) opener.focus({ preventScroll: true });
      opener = null;
    }
    function closeDialog(restoreFocus = true) {
      if (dlDialog.open) dlDialog.close();
      afterClose(restoreFocus);
    }

    dlDialog.querySelector(".modal-close").addEventListener("click", () => closeDialog());
    dlDialog.addEventListener("click", (event) => {
      if (event.target === dlDialog) closeDialog(); // karanlık alana tıklama
      // Sayfa içi bağlantı (ör. SSS) seçilirse pencere kapanır ve sayfa oraya kayar;
      // odak geri verilmez ki ziyaretçi kaldığı yerden devam etsin
      if (event.target.closest('a[href^="#"]')) closeDialog(false);
    });
    // Esc ile kapanınca tarayıcı bu olayı gönderir
    dlDialog.addEventListener("close", () => afterClose());

    // Linux kurulum komutunu kopyala. Komut önce seçili hale gelir (pano izni gelmezse
    // ziyaretçi Ctrl+C ile kopyalayabilir), sonra panoya yazılması denenir.
    copyBtn.addEventListener("click", async () => {
      const range = document.createRange();
      range.selectNodeContents(cmdEl);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      try {
        await navigator.clipboard.writeText(cmdEl.textContent);
      } catch (e) {
        return; // pano kullanılamıyor: komut seçili kalır
      }
      copyBtn.textContent = t("dl.copied");
      copyBtn.classList.add("is-done");
      setTimeout(() => {
        copyBtn.textContent = t("dl.copy");
        copyBtn.classList.remove("is-done");
      }, 2000);
    });
  }

  // --- Alt bilgideki yıl ----------------------------------------------------
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
})();
