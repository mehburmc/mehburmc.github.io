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

    lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
    lightbox.querySelector(".lightbox-prev").addEventListener("click", () => show(current - 1));
    lightbox.querySelector(".lightbox-next").addEventListener("click", () => show(current + 1));

    // Resmin dışındaki karanlık alana tıklayınca kapanır
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) lightbox.close();
    });

    // Ok tuşlarıyla gezinme (Esc'yi tarayıcı kendisi yönetir)
    lightbox.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") show(current - 1);
      if (event.key === "ArrowRight") show(current + 1);
    });

    lightbox.addEventListener("close", () => {
      document.documentElement.classList.remove("no-scroll");
      opener?.focus();
    });
  }

  // --- Alt bilgideki yıl ----------------------------------------------------
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
})();
