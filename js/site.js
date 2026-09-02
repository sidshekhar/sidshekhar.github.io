/* sidshekhar.com — theme toggle, scroll reveal, click-to-load YouTube. */
(function () {
  "use strict";

  var root = document.documentElement;

  /* ---------- Theme ---------- */
  var STORAGE_KEY = "theme";
  var THEME_COLORS = { light: "#f8f4f1", dark: "#161311" };
  var darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  var toggle = document.querySelector(".theme-toggle");
  var themeMeta = document.querySelector('meta[name="theme-color"]');

  function storedTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    if (themeMeta) themeMeta.setAttribute("content", THEME_COLORS[theme]);
    if (toggle) toggle.setAttribute("aria-pressed", String(theme === "dark"));
  }

  // The inline head script already set data-theme; sync the button + meta.
  applyTheme(root.dataset.theme || (darkQuery.matches ? "dark" : "light"));

  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (e) {}
    });
  }

  // Follow the OS until the visitor picks a theme explicitly.
  function onSystemChange(e) {
    if (!storedTheme()) applyTheme(e.matches ? "dark" : "light");
  }
  if (darkQuery.addEventListener) darkQuery.addEventListener("change", onSystemChange);
  else if (darkQuery.addListener) darkQuery.addListener(onSystemChange);

  /* ---------- Reveal on scroll ---------- */
  var revealItems = document.querySelectorAll(".reveal");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!("IntersectionObserver" in window) || reduceMotion) {
    revealItems.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
    );
    revealItems.forEach(function (el) {
      io.observe(el);
    });
  }

  /* ---------- Timeline progress line ---------- */
  var chapters = document.querySelectorAll(".chapter");
  if (chapters.length) {
    var ticking = false;
    function updateTimeline() {
      ticking = false;
      var anchor = window.innerHeight * 0.55; // the line fills up to this point in the viewport
      chapters.forEach(function (ch) {
        var r = ch.getBoundingClientRect();
        var f = Math.max(0, Math.min(1, (anchor - r.top) / r.height));
        ch.style.setProperty("--fill", (f * 100).toFixed(1) + "%");
        ch.classList.toggle("is-passed", f > 0);
      });
    }
    function requestTimeline() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateTimeline);
      }
    }
    window.addEventListener("scroll", requestTimeline, { passive: true });
    window.addEventListener("resize", requestTimeline);
    updateTimeline();
  }

  /* ---------- Click-to-load YouTube embed ---------- */
  document.querySelectorAll(".yt[data-id]").forEach(function (box) {
    var link = box.querySelector(".yt__link");
    if (!link) return;
    link.addEventListener("click", function (e) {
      e.preventDefault();
      var img = link.querySelector("img");
      var iframe = document.createElement("iframe");
      iframe.src =
        "https://www.youtube-nocookie.com/embed/" + box.dataset.id + "?autoplay=1&rel=0";
      iframe.title = img && img.alt ? img.alt : "YouTube video";
      iframe.allow = "autoplay; encrypted-media; picture-in-picture";
      iframe.allowFullscreen = true;
      box.innerHTML = "";
      box.appendChild(iframe);
    });
  });
})();
