// Florie & Maxime — 12.06.2027
// Navigation par onglets, accordéon FAQ, animations d'apparition.
// Vanilla JS, aucune dépendance externe.

(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----------------------------------------------------------
     Onglets
  ---------------------------------------------------------- */
  var tabList = document.querySelector(".tabs");
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".tab"));
  var panels = Array.prototype.slice.call(document.querySelectorAll(".panel"));

  function activateTab(id, opts) {
    opts = opts || {};
    var found = false;

    tabs.forEach(function (tab) {
      var isMatch = tab.dataset.tab === id;
      if (isMatch) found = true;
      tab.classList.toggle("active", isMatch);
      tab.setAttribute("aria-selected", isMatch ? "true" : "false");
      tab.tabIndex = isMatch ? 0 : -1;
    });

    if (!found) return;

    panels.forEach(function (panel) {
      panel.classList.toggle("active", panel.id === "panel-" + id);
    });

    if (opts.updateHash !== false) {
      history.replaceState(null, "", "#" + id);
    }

    if (opts.scroll !== false) {
      window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
    }

    var activeTabEl = tabList.querySelector('.tab[data-tab="' + id + '"]');
    if (activeTabEl) {
      activeTabEl.scrollIntoView({
        behavior: prefersReduced ? "auto" : "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      activateTab(tab.dataset.tab);
    });
  });

  // Navigation clavier (flèches gauche/droite) selon le pattern ARIA "tabs"
  tabList.addEventListener("keydown", function (e) {
    if (["ArrowRight", "ArrowLeft", "Home", "End"].indexOf(e.key) === -1) return;
    var currentIndex = tabs.findIndex(function (t) {
      return t.classList.contains("active");
    });
    var nextIndex = currentIndex;

    if (e.key === "ArrowRight") nextIndex = (currentIndex + 1) % tabs.length;
    if (e.key === "ArrowLeft") nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    if (e.key === "Home") nextIndex = 0;
    if (e.key === "End") nextIndex = tabs.length - 1;

    e.preventDefault();
    tabs[nextIndex].focus();
    activateTab(tabs[nextIndex].dataset.tab, { scroll: false });
  });

  // État initial : on lit le hash de l'URL s'il correspond à un onglet valide
  var initialId = (location.hash || "").replace("#", "");
  var isValid = tabs.some(function (t) { return t.dataset.tab === initialId; });
  activateTab(isValid ? initialId : "programme", { updateHash: false, scroll: false });

  window.addEventListener("hashchange", function () {
    var id = location.hash.replace("#", "");
    activateTab(id, { updateHash: false });
  });

  /* ----------------------------------------------------------
     Accordéon FAQ
  ---------------------------------------------------------- */
  document.querySelectorAll(".faq__question").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var expanded = btn.getAttribute("aria-expanded") === "true";
      var panel = document.getElementById(btn.getAttribute("aria-controls"));
      btn.setAttribute("aria-expanded", String(!expanded));
      if (panel) panel.hidden = expanded;
    });
  });

  /* ----------------------------------------------------------
     Apparition au scroll
  ---------------------------------------------------------- */
  var revealTargets = document.querySelectorAll(".chapter, .card, .faq__item");

  if (!prefersReduced && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ----------------------------------------------------------
     Garde-fou : liens marqués comme placeholders
  ---------------------------------------------------------- */
  document.querySelectorAll('[data-placeholder="true"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      if (link.getAttribute("href") === "#") {
        e.preventDefault();
        alert("Pensez à remplacer ce lien par le vôtre dans index.html avant la mise en ligne !");
      }
    });
  });
})();
