// Sourav Vij — Portfolio interactions
(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Footer year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Nav: solid background once scrolled
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile menu
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  const setMenu = (open) => {
    links.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  toggle.addEventListener("click", () => setMenu(!links.classList.contains("is-open")));
  links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  // Count-up numbers
  const countUp = (el) => {
    const to = Number(el.dataset.to);
    if (reduceMotion) { el.textContent = to; return; }
    const start = performance.now();
    const dur = 1400;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      entry.target.querySelectorAll(".count").forEach(countUp);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  // Lightbox gallery — covers declare images as "src::caption|src::caption"
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightboxImg");
  const lbCap = document.getElementById("lightboxCap");
  let slides = [];
  let idx = 0;
  const show = (i) => {
    idx = (i + slides.length) % slides.length;
    const [src, cap = ""] = slides[idx];
    lbImg.src = src;
    lbImg.alt = cap;
    lbCap.textContent = slides.length > 1 ? `${cap}  (${idx + 1}/${slides.length})` : cap;
  };
  document.querySelectorAll("[data-gallery]").forEach((el) => {
    el.addEventListener("click", () => {
      slides = el.dataset.gallery.split("|").map((s) => s.split("::"));
      lb.classList.toggle("is-single", slides.length < 2);
      show(0);
      lb.showModal();
    });
  });
  lb.querySelector(".lightbox__close").addEventListener("click", () => lb.close());
  lb.querySelector(".lightbox__prev").addEventListener("click", () => show(idx - 1));
  lb.querySelector(".lightbox__next").addEventListener("click", () => show(idx + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) lb.close(); });
  lb.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") show(idx + 1);
    if (e.key === "ArrowLeft") show(idx - 1);
  });

  // Work filters
  const chips = document.querySelectorAll(".chip");
  const cards = document.querySelectorAll("#workGrid .card");
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const f = chip.dataset.filter;
      chips.forEach((c) => {
        const active = c === chip;
        c.classList.toggle("is-active", active);
        c.setAttribute("aria-selected", String(active));
      });
      cards.forEach((card) => {
        const show = f === "all" || card.dataset.cat.split(" ").includes(f);
        card.classList.toggle("is-hidden", !show);
        // Wide cards collapse to normal width when filtered, so the grid stays tidy
        card.classList.toggle("card--wide-off", f !== "all");
        if (show) card.classList.add("is-visible");
      });
    });
  });
})();
