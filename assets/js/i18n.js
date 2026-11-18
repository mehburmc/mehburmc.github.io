/* =========================================================
   Dil sistemi (TR / EN)

   Nasıl çalışır?
   - Sayfadaki yazıların Türkçesi doğrudan HTML'de durur.
   - data-i18n="anahtar" olan bir yazının İngilizcesi aşağıdaki "en"
     bölümüne aynı anahtarla eklenir. (Yazı küçük HTML parçaları da
     içerebilir: <code>, <strong>, bağlantı vb.)
   - Etiket özellikleri (alt, aria-label vb.) için HTML'de
     data-i18n-attr="özellik:anahtar;özellik2:anahtar2" kullanılır.
   - Yalnızca JavaScript'in yazdığı metinler (indirme penceresinin durum
     yazıları gibi) HTML'de olmadığı için hem "tr" hem "en" bölümündedir.
   - İngilizcesi yazılmamış bir anahtar İngilizce seçiliyken de Türkçe
     görünür (sayfa bozulmaz).

   Dil seçimi sırası: adresteki ?lang=en|tr → daha önce seçilen dil →
   tarayıcının dili (Türkçe değilse İngilizce).
   ========================================================= */
(() => {
  "use strict";

  const STORE_KEY = "mmc-lang";
  const LANGS = ["tr", "en"];

  const STRINGS = {
    // Yalnızca JavaScript'in kullandığı Türkçe metinler
    tr: {
      "dl.loading": "Sürüm bilgisi alınıyor…",
      "dl.latest": "Son sürüm: v{version} · {date}",
      "dl.error": "Sürüm bilgisi şu an alınamadı. Butonlar seni GitHub'daki sürümler sayfasına götürecek.",
      "dl.mobile":
        "MehburMC Launcher'ın iPhone ve iPad sürümü yok. Android telefonlar için .apk, bilgisayarlar için .exe ve .deb sürümleri var.",
      "dl.mac": "macOS sürümü hazırlanıyor. Şimdilik launcher Windows, Linux ve Android'de çalışır.",
      "dl.copy": "Kopyala",
      "dl.copied": "Kopyalandı!",
      // 404 sayfasının rastgele espri mesajları (404.js her açılışta birini seçer)
      "nf.j1": "Sayfa lavlara düştü. Envanter de gitti.",
      "nf.j2": "Render mesafen bu sayfaya yetmiyor.",
      "nf.j3": "Bu seed'de böyle bir sayfa yok.",
      "nf.j4": "Sayfa bedrock'un altında kaldı.",
      "nf.j5": "Biri bu sayfayı kazıp götürmüş; geriye sadece hava bloğu kaldı.",
      "nf.j6": "Sayfa başka bir boyuta ışınlandı.",
      "nf.j7": "Burada bir sayfa vardı, sonra gece oldu.",
    },

    en: {
      // Sayfa bilgileri
      "meta.title": "MehburMC Launcher: A Lightweight, Ad-Free Minecraft Launcher",
      "meta.desc":
        "A lightweight, ad-free and telemetry-free Minecraft Java Edition launcher for Windows and Linux. Manage your mods, skins and friends in one place.",

      // Menü
      skip: "Skip to content",
      "nav.label": "Main menu",
      "nav.home": "MehburMC Launcher home",
      "nav.open": "Open menu",
      "nav.close": "Close menu",
      "nav.features": "Features",
      "nav.screenshots": "Screenshots",
      "nav.about": "About",
      "nav.faq": "FAQ",
      "nav.source": "Source Code",
      "nav.download": "Download",
      "lang.label": "Language",
      "common.close": "Close",

      // Giriş
      "hero.logoAlt": "MehburMC Launcher logo",
      "hero.tagline": "A lightweight, ad-free and telemetry-free Minecraft Java Edition launcher.",
      "hero.sub": "Manage your mods, skins and friends in one place.",
      "hero.download": "Download MehburMC Launcher",
      "hero.shotAlt": "MehburMC Launcher's mod browser: a list of mods from Modrinth",
      "trust.ads": "No ads",
      "trust.telemetry": "No telemetry",
      "trust.open": "Open source",
      "trust.free": "Free",

      // Özellikler
      "features.title": "Features",
      "features.lead": "More than just launching the game: mods, skins and friends in one window.",
      "f.profiles.t": "Profiles",
      "f.profiles.d":
        "Vanilla, Fabric, Quilt, Legacy Fabric, Forge, NeoForge and OptiFine. Every profile has its own mods, saves and config folders.",
      "f.java.t": "Automatic Java",
      "f.java.d": "The launcher downloads the Java version you need (Adoptium Temurin) by itself. Nothing else to install.",
      "f.browser.t": "Mod Browser",
      "f.browser.d":
        "Search Modrinth for mods, modpacks, resource packs and shaders and install them in one click. See updates and import <code>.mrpack</code> files.",
      "f.toggle.d":
        "Turn mods on and off in one click and create mod groups. Copy all mods from one profile to another; for a different game version it finds the right file on Modrinth.",
      "f.skins.d": "A skin and cape library, ready-made collections, a pixel editor with 3D preview and community sharing.",
      "f.friends.t": "Friends",
      "f.friends.d":
        "Add friends by code, chat and start group chats. Voice calls with up to 16 people, plus screen and mod list sharing.",
      "f.library.t": "MehburMC Library",
      "f.library.d": "Mods and packs uploaded by players. Files are scanned automatically and published after moderator approval.",
      "f.servers.t": "Servers",
      "f.servers.d": "Save your favorite servers, see ping and player count, and join in one click.",
      "f.more.t": "And More",
      "f.more.d": "Minecraft news, crash analysis, a theme in any color you like and a Turkish/English interface.",

      // Fotoğraflar
      "shots.title": "Screenshots",
      "shots.lead": "Click an image to enlarge it.",
      "shots.browser.cap": "Mod Browser: search Modrinth and install in one click",
      "shots.browser.alt": "Mod Browser screen",
      "shots.skins.cap": "Skin & Cape: library, collections and 3D preview",
      "shots.skins.alt": "Skin and cape screen",
      "shots.toggle.cap": "Mod Toggle: turn mods on and off, group them and copy them between profiles",
      "shots.toggle.alt": "Mod Toggle screen",
      "shots.friends.cap": "Friends: messaging, group chats and voice calls",
      "shots.friends.alt": "Friends screen",
      "shots.note": "Accounts, friends and messages in the screenshots are sample data.",
      "lb.label": "Screenshot",
      "lb.prev": "Previous image",
      "lb.next": "Next image",

      // İndirme penceresi
      "dl.title": "Download MehburMC Launcher",
      "dl.yours": "Your system",
      "dl.winMeta": "Windows 10 / 11 · 64-bit",
      "dl.winBtn": "Download for Windows (.exe)",
      "dl.linuxBtn": "Download for Linux (.deb)",
      "dl.androidMeta": "Android 7.0+ · arm64 · <code>.apk</code> · beta",
      "dl.androidBtn": "Download for Android (.apk)",
      "dl.androidHint": "Minecraft Java Edition runs on the phone. Open the APK on your phone to install it; allow \"unknown sources\" if asked.",
      "dl.macMeta": "macOS 11+ · Apple Silicon and Intel · <code>.dmg</code> · preview",
      "dl.macBtn": "Download for macOS (.dmg)",
      "dl.macHint": "Drag the app into the Applications folder. If macOS warns on first launch: System Settings → Privacy & Security → <strong>Open Anyway</strong> (macOS 14 and earlier: Control-click → Open).",
      "dl.cmdHint": "To install, open a terminal in the folder with the file and run:",
      "dl.cmdPlaceholder": "sudo apt install ./MehburMC-Launcher_&lt;version&gt;_amd64.deb",
      "dl.allReleases": "All versions and release notes",
      "dl.smartscreen": "What if Windows shows a warning?",
      "dl.loading": "Fetching version info…",
      "dl.latest": "Latest version: v{version} · {date}",
      "dl.error": "Couldn't fetch version info right now. The buttons will take you to the releases page on GitHub.",
      "dl.mobile":
        "There is no iPhone or iPad version of MehburMC Launcher. There is an .apk for Android phones, and .exe and .deb versions for computers.",
      "dl.mac": "The macOS version is on its way. For now the launcher runs on Windows, Linux and Android.",
      "dl.copy": "Copy",
      "dl.copied": "Copied!",

      // Hakkında
      "about.title": "About",
      "about.p1":
        "MehburMC Launcher is a lightweight, no-nonsense way to launch Minecraft Java Edition. It shows no ads and collects no usage data; your game files, mods and worlds stay on your own computer. The game itself is downloaded from Mojang's official servers.",
      "about.p2":
        "Because it's built with Rust and Tauri, the installer is small and memory use is low. When a new version comes out, the launcher lets you know and installs the signed update in one click.",
      "about.privacy": "Privacy policy",
      "about.guide": "User guide (Turkish)",
      "spec.title": "Tech Specs",
      "spec.game": "Game",
      "spec.core": "Core",
      "spec.ui": "Interface",
      "spec.license": "License",
      "req.title": "System Requirements",
      "req.win.os": "Windows 10 or 11 (64-bit)",
      "req.win.webview": "WebView2 (built into Windows 11)",
      "req.linux.os": "Ubuntu 26.04 or MehburOS (64-bit)",
      "req.linux.deb": "<code>.deb</code> package; required packages are installed during setup",
      "req.java": "No Java needed, the launcher installs it",
      "req.net": "An internet connection to download game files",

      // SSS
      "faq.title": "Frequently Asked Questions",
      "faq.lead": "Common questions about installing and using the launcher.",
      "faq.q1": "Is it free?",
      "faq.a1": "Yes, completely free. No ads and no paid features.",
      "faq.q2": "Windows says “Windows protected your PC”. Is it safe?",
      "faq.a2":
        "The launcher doesn't have a code signing certificate yet, so Windows SmartScreen may show an “unrecognized app” warning on first launch. Click <strong>More info → Run anyway</strong> to continue. The source code is public, so you can review it on GitHub.",
      "faq.q3": "Do I need to install Java?",
      "faq.a3": "No. The launcher downloads and installs the Java version (Adoptium Temurin) that your Minecraft version needs.",
      "faq.q4": "Which account do I sign in with?",
      "faq.a4":
        "You can sign in with a MehburMC account (email or Google) or with a local account that stays on this computer only. The game uses offline accounts; there is no Microsoft sign-in.",
      "faq.q5": "How does the launcher update?",
      "faq.a5":
        "When a new version comes out, an <strong>Update</strong> button appears at the top of the launcher. Click it and the signed update is downloaded, verified and installed, so there's no need to download it from this site again.",
      "faq.q6": "I ran into a problem. What should I do?",
      "faq.a6":
        'First check the <a class="text-link" href="https://github.com/Mehbur07/MehburMC-Launcher/blob/main/docs/SORUN_GIDERME.md" rel="noopener">troubleshooting guide</a> (Turkish). If that doesn\'t help, <a class="text-link" href="https://github.com/Mehbur07/MehburMC-Launcher/issues" rel="noopener">open an issue on GitHub</a>.',

      // MehburMC Kütüphane sitesi
      "library.title": "MehburMC Library",
      "library.p":
        "The mods, modpacks, resource packs and shaders the community shares, now on the web too. Search, filter and download without signing in; upload your own with your account.",
      "library.go": "Go to the Library",

      // Kaynak kod
      "source.title": "Source Code",
      "source.p":
        "MehburMC Launcher is an open source project under the GPL-3.0 license. You can read the code, build it on your own computer and contribute.",
      "source.tech": "Technologies used",
      "source.view": "View on GitHub",
      "source.zip": "Download Source Code (.zip)",
      "source.notice":
        'The source code is for developers only and isn\'t needed to play. To use the launcher, use the <a class="text-link" href="https://github.com/Mehbur07/MehburMC-Launcher/releases/latest" data-download>Download</a> button.',

      // Son çağrı
      "cta.title": "Ready to play?",
      "cta.p": "Install it, pick your favorite version and play.",

      // Alt bilgi
      "footer.desc": "A lightweight, ad-free and telemetry-free Minecraft Java Edition launcher for Windows and Linux.",
      "footer.links": "Links",
      "footer.releases": "All Releases",
      "footer.bug": "Report a Bug",
      "footer.license": "License (GPL-3.0)",
      "footer.copy": "The launcher is open source under the GPL-3.0 license.",
      "footer.legal": "Minecraft is a trademark of Mojang AB. MehburMC Launcher is not affiliated with Mojang or Microsoft.",

      // 404 sayfası
      "nf.metaTitle": "404: This chunk failed to load | MehburMC Launcher",
      "nf.metaDesc": "The page you're looking for wasn't found. Press Respawn to return to the MehburMC Launcher home page.",
      "nf.heading": "This chunk failed to load!",
      "nf.text": "The page you're looking for may have fallen into the void. Or it was never generated in this world.",
      "nf.server": "[Server]",
      "nf.looked": "Requested location:",
      "nf.hint": "Respawn takes you to the home page, a.k.a. the spawn point.",
      "nf.j1": "The page fell into lava. The inventory is gone too.",
      "nf.j2": "Your render distance doesn't reach this page.",
      "nf.j3": "There's no such page in this seed.",
      "nf.j4": "The page is stuck below bedrock.",
      "nf.j5": "Someone mined this page away; only air blocks are left.",
      "nf.j6": "The page teleported to another dimension.",
      "nf.j7": "There was a page here, then night fell.",
    },
  };

  // Türkçe metinlerin HTML'deki asılları (dil geri TR yapılınca bunlar kullanılır)
  const originals = new WeakMap();

  function remember(el) {
    if (originals.has(el)) return originals.get(el);
    const saved = { html: el.hasAttribute("data-i18n") ? el.innerHTML : null, attrs: {} };
    parseAttrSpec(el).forEach(([attr]) => {
      saved.attrs[attr] = el.getAttribute(attr);
    });
    originals.set(el, saved);
    return saved;
  }

  // "aria-label:nav.open;alt:hero.logoAlt" → [["aria-label","nav.open"], ["alt","hero.logoAlt"]]
  function parseAttrSpec(el) {
    const spec = el.getAttribute("data-i18n-attr");
    if (!spec) return [];
    return spec
      .split(";")
      .map((pair) => pair.split(":").map((s) => s.trim()))
      .filter((pair) => pair.length === 2 && pair[0] && pair[1]);
  }

  function pickInitialLang() {
    try {
      const fromUrl = new URLSearchParams(location.search).get("lang");
      if (LANGS.includes(fromUrl)) return fromUrl;
    } catch (e) {
      /* adres okunamadı: sonraki seçeneğe geç */
    }
    try {
      const saved = localStorage.getItem(STORE_KEY);
      if (LANGS.includes(saved)) return saved;
    } catch (e) {
      /* tarayıcı hafızası kapalı olabilir */
    }
    const browserLangs = navigator.languages || [navigator.language || ""];
    return browserLangs.some((l) => /^tr\b/i.test(l)) ? "tr" : "en";
  }

  let current = "tr";

  // Bir anahtarın seçili dildeki karşılığı; {ad} yer tutucuları doldurulur
  function t(key, vars) {
    let text = (STRINGS[current] && STRINGS[current][key]) ?? STRINGS.tr[key] ?? key;
    if (vars) {
      Object.entries(vars).forEach(([name, value]) => {
        text = text.split(`{${name}}`).join(String(value));
      });
    }
    return text;
  }

  function apply(lang) {
    current = LANGS.includes(lang) ? lang : "tr";
    const dict = current === "tr" ? null : STRINGS[current];

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const saved = remember(el);
      const value = dict && dict[el.getAttribute("data-i18n")];
      el.innerHTML = value ?? saved.html;
    });

    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      const saved = remember(el);
      parseAttrSpec(el).forEach(([attr, key]) => {
        const value = dict && dict[key];
        el.setAttribute(attr, value ?? saved.attrs[attr]);
      });
    });

    document.documentElement.lang = current;
    document.querySelectorAll("[data-set-lang]").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.dataset.setLang === current));
    });

    // Diğer kodlar (indirme penceresi, menü) yazılarını yenilesin diye haber ver
    document.dispatchEvent(new CustomEvent("mmc:lang", { detail: { lang: current } }));
  }

  function set(lang) {
    apply(lang);
    try {
      localStorage.setItem(STORE_KEY, current);
    } catch (e) {
      /* hafıza kapalı: seçim yalnızca bu sayfa açıkken geçerli */
    }
  }

  // Diğer dosyaların kullanması için
  window.MMC_I18N = {
    t,
    set,
    get lang() {
      return current;
    },
    locale() {
      return current === "tr" ? "tr-TR" : "en-US";
    },
  };

  // Dil düğmeleri
  document.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-set-lang]");
    if (btn) set(btn.dataset.setLang);
  });

  // İlk açılış: Türkçe zaten HTML'de; başka dil seçiliyse uygula
  const initial = pickInitialLang();
  if (initial !== "tr") apply(initial);
  else current = "tr";
})();
