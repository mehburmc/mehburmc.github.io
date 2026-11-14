// MehburMC Launcher sitesi: genel davranışlar (menü, kaydırma, yıl)
(() => {
  "use strict";

  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("nav-menu");
  const desktopQuery = window.matchMedia("(min-width: 881px)");

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
  }

  // --- Kaydırınca menü arka planı -------------------------------------------
  function updateScrolled() {
    header?.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  updateScrolled();
  window.addEventListener("scroll", updateScrolled, { passive: true });

  // --- Alt bilgideki yıl ----------------------------------------------------
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
})();
