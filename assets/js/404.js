// 404 sayfası: bloklardan "404" yazısı, void'e düşen bloklar ve rastgele espri mesajı
(() => {
  "use strict";

  const i18n = window.MMC_I18N;
  const t = (key) => (i18n ? i18n.t(key) : key);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --- Bloklardan "404" -------------------------------------------------------
  // Her rakam 5 sütun x 7 satırlık bir piksel desenidir ("#" = blok, "." = boşluk)
  const DIGITS = {
    4: ["...#.", "..##.", ".#.#.", "#..#.", "#####", "...#.", "...#."],
    0: [".###.", "#...#", "#..##", "#.#.#", "##..#", "#...#", ".###."],
  };

  const board = document.querySelector(".pixel-404");
  if (board) {
    "404".split("").forEach((char, digitIndex) => {
      const digit = document.createElement("div");
      digit.className = "pixel-digit";
      DIGITS[char].forEach((row, y) => {
        row.split("").forEach((cell, x) => {
          const px = document.createElement("span");
          if (cell === "#") {
            px.className = "px";
            // Bloklar alttan üste, rakam rakam yerine düşer (chunk yükleniyor gibi)
            const delay = digitIndex * 0.12 + (6 - y) * 0.07 + Math.random() * 0.12;
            px.style.animationDelay = `${delay.toFixed(2)}s`;
          }
          digit.appendChild(px);
        });
      });
      board.appendChild(digit);
    });
    board.classList.add("is-built");
  }

  // --- Void'e düşen bloklar ---------------------------------------------------
  const voidEl = document.querySelector(".void");
  if (voidEl && !reduceMotion) {
    const kinds = ["is-cyan", "is-stone", "is-dark", "is-stone", "is-cyan", "is-teal"];
    for (let i = 0; i < 18; i++) {
      const block = document.createElement("span");
      block.className = `fall-block ${kinds[i % kinds.length]}`;
      const size = 10 + Math.round(Math.random() * 26);
      block.style.setProperty("--size", `${size}px`);
      block.style.left = `${(Math.random() * 100).toFixed(1)}%`;
      block.style.animationDuration = `${(9 + Math.random() * 12).toFixed(1)}s`;
      block.style.animationDelay = `${(-Math.random() * 20).toFixed(1)}s`; // eksi: sayfa açılınca hepsi yolda olsun
      block.style.setProperty("--spin", `${Math.round(Math.random() * 360 - 180)}deg`);
      voidEl.appendChild(block);
    }
  }

  // --- Rastgele espri mesajı ve aranan adres ------------------------------------
  const JOKE_COUNT = 7;
  const jokeIndex = 1 + Math.floor(Math.random() * JOKE_COUNT);
  const jokeEl = document.querySelector("[data-nf-joke]");
  function renderJoke() {
    if (jokeEl) jokeEl.textContent = t(`nf.j${jokeIndex}`);
  }
  renderJoke();
  document.addEventListener("mmc:lang", renderJoke); // dil değişince aynı espri yeni dilde

  const pathEl = document.querySelector("[data-nf-path]");
  if (pathEl) {
    // textContent: adresteki yazı sayfaya kod olarak değil, düz metin olarak yazılır
    let path = location.pathname;
    try {
      path = decodeURIComponent(path);
    } catch (e) {
      /* çözülemeyen adres: olduğu gibi göster */
    }
    pathEl.textContent = path.length > 60 ? `${path.slice(0, 57)}…` : path;
  }
})();
