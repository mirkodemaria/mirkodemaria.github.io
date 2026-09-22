(function (document, window) {
  "use strict";

  var links = document.querySelectorAll("[data-section-link]");
  var sections = [];
  var ticking = false;

  Array.prototype.forEach.call(links, function (link) {
    var section = document.getElementById(link.getAttribute("data-section-link"));

    if (section) {
      sections.push(section);
    }
  });

  if (!sections.length) {
    return;
  }

  function updateActiveLink() {
    var currentSection = null;
    var threshold = Math.min(180, window.innerHeight * 0.3);

    Array.prototype.forEach.call(sections, function (section) {
      if (section.getBoundingClientRect().top <= threshold) {
        currentSection = section.id;
      }
    });

    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      currentSection = sections[sections.length - 1].id;
    }

    Array.prototype.forEach.call(links, function (link) {
      var isCurrent = link.getAttribute("data-section-link") === currentSection;

      if (isCurrent) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    ticking = false;
  }

  function requestUpdate() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(updateActiveLink);
    }
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  window.addEventListener("hashchange", requestUpdate);
  updateActiveLink();
})(document, window);