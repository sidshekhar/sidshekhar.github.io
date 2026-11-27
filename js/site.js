/* sidshekhar.com — theme toggle, scroll reveal, click-to-load YouTube. */
(function () {
  "use strict";

  var root = document.documentElement;

  /* ---------- Theme ---------- */
  var STORAGE_KEY = "theme";
  var THEME_COLORS = { light: "#fff1e5", dark: "#000000" };
  var toggle = document.querySelector(".theme-toggle");
  var themeMeta = document.querySelector('meta[name="theme-color"]');

  function applyTheme(theme) {
    root.dataset.theme = theme;
    if (themeMeta) themeMeta.setAttribute("content", THEME_COLORS[theme]);
    if (toggle) toggle.setAttribute("aria-pressed", String(theme === "dark"));
  }

  // The inline head script already set data-theme; sync the button + meta.
  applyTheme(root.dataset.theme || "dark");

  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (e) {}
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealItems = document.querySelectorAll(".reveal");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!("IntersectionObserver" in window) || reduceMotion) {
    revealItems.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    function makeObserver(threshold) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: threshold, rootMargin: "0px 0px -8% 0px" }
      );
      return io;
    }
    // An element taller than the viewport can never show 10% of itself, so it
    // would stay hidden forever. Those get a zero threshold instead.
    var ioShort = makeObserver(0.1);
    var ioTall = makeObserver(0);
    revealItems.forEach(function (el) {
      var tall = el.getBoundingClientRect().height > window.innerHeight * 0.9;
      (tall ? ioTall : ioShort).observe(el);
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


  /* ---------- Link hover preview (mouse only) ---------- */
  var peek = document.getElementById("peek");
  if (peek && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    var pImg = peek.querySelector(".peek__img");
    var pSite = peek.querySelector(".peek__site");
    var pTitle = peek.querySelector(".peek__title");
    var pDesc = peek.querySelector(".peek__desc");
    var current = null;

    function place(x, y) {
      var w = peek.offsetWidth, h = peek.offsetHeight, pad = 16;
      var left = Math.min(x + pad, window.innerWidth - w - 8);
      var top = y + pad + h > window.innerHeight ? y - h - pad : y + pad;
      peek.style.left = Math.max(8, left) + "px";
      peek.style.top = Math.max(8, top) + "px";
    }
    function show(a, e) {
      current = a;
      var img = a.dataset.img;
      peek.classList.toggle("has-img", !!img);
      if (img) pImg.src = img;
      var t = a.querySelector(".t");
      pTitle.textContent = (t || a).textContent.trim();
      pSite.textContent = a.dataset.site || "";
      pDesc.textContent = a.dataset.desc || "";
      place(e.clientX, e.clientY);
      peek.classList.add("is-on");
    }
    function hide() {
      current = null;
      peek.classList.remove("is-on");
    }
    document.querySelectorAll("a[data-site]").forEach(function (a) {
      a.addEventListener("mouseenter", function (e) { show(a, e); });
      a.addEventListener("mousemove", function (e) { if (current === a) place(e.clientX, e.clientY); });
      a.addEventListener("mouseleave", hide);
    });
    window.addEventListener("scroll", hide, { passive: true });
  }

  /* ---------- Hide logos that fail to load ---------- */
  document.querySelectorAll("img.fav, img.logo").forEach(function (img) {
    img.addEventListener("error", function () { img.remove(); });
  });

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
