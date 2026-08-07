/* =========================================================
   TRICHODERMA — script.js
   Vanilla JavaScript only. No frameworks, no backend calls.
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Init AOS (optional animation library) ---------- */
  if (window.AOS) {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
    });
  }

  /* ---------- Navbar: glass state on scroll ---------- */
  var navbar = document.getElementById("mainNavbar");
  function handleNavbarScroll() {
    if (window.scrollY > 30) {
      navbar.classList.add("is-scrolled");
    } else {
      navbar.classList.remove("is-scrolled");
    }
  }
  window.addEventListener("scroll", handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  /* Collapse mobile menu after a link is clicked */
  var navLinks = document.querySelectorAll(".navbar-collapse .nav-link");
  var bsCollapseEl = document.getElementById("navContent");
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (bsCollapseEl.classList.contains("show") && window.bootstrap) {
        var collapseInstance = window.bootstrap.Collapse.getOrCreateInstance(bsCollapseEl);
        collapseInstance.hide();
      }
    });
  });

  /* ---------- Active nav link highlight on scroll (scrollspy-lite) ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll("section[id]"));
  var navAnchors = Array.prototype.slice.call(document.querySelectorAll(".navbar-collapse .nav-link"));

  function updateActiveLink() {
    var scrollPos = window.scrollY + 140;
    var currentId = "";
    sections.forEach(function (sec) {
      if (scrollPos >= sec.offsetTop) {
        currentId = sec.id;
      }
    });
    navAnchors.forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + currentId);
    });
  }
  window.addEventListener("scroll", updateActiveLink, { passive: true });
  updateActiveLink();

  /* ---------- Back to top button ---------- */
  var backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener(
      "scroll",
      function () {
        backToTop.classList.toggle("is-visible", window.scrollY > 500);
      },
      { passive: true }
    );
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Gallery lightbox (vanilla JS, no plugins) ---------- */
  var galleryItems = document.querySelectorAll(".gallery-item");
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxCaption = document.getElementById("lightboxCaption");
  var lightboxClose = document.getElementById("lightboxClose");

  function openLightbox(src, caption) {
    lightboxImg.setAttribute("src", src);
    lightboxCaption.textContent = caption || "";
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  galleryItems.forEach(function (item) {
    item.addEventListener("click", function () {
      var img = item.querySelector("img");
      var caption = item.getAttribute("data-caption") || "";
      openLightbox(img.getAttribute("src"), caption);
    });
    item.setAttribute("tabindex", "0");
    item.setAttribute("role", "button");
    item.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        item.click();
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });

  /* ---------- Reveal-on-scroll fallback (used if AOS is not loaded) ---------- */
  if (!window.AOS) {
    var revealTargets = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );
      revealTargets.forEach(function (t) {
        observer.observe(t);
      });
    } else {
      revealTargets.forEach(function (t) {
        t.classList.add("is-visible");
      });
    }
  }

  /* ---------- Current year in footer ---------- */
  var yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
