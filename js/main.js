/* =========================================
   J-CODE SERVICES — Main JS
   ========================================= */

(function () {
  "use strict";

  /* -----------------------------------------
     MOBILE NAV TOGGLE
     ----------------------------------------- */

  var navToggle = document.getElementById("nav-toggle");
  var siteNav = document.getElementById("site-nav");

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = siteNav.classList.toggle("open");
      navToggle.classList.toggle("active", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    // Close menu when a nav link is clicked
    siteNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        siteNav.classList.remove("open");
        navToggle.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* -----------------------------------------
     HEADER SCROLL EFFECT
     ----------------------------------------- */

  var header = document.getElementById("site-header");
  var lastScrollY = 0;

  function onScroll() {
    var currentScrollY = window.scrollY;

    if (currentScrollY > 60) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* -----------------------------------------
     SCROLL REVEAL ANIMATIONS
     ----------------------------------------- */

  var revealElements = document.querySelectorAll(
    ".section-label, .about-grid, .services-intro, .services-grid, .work-intro, .work-grid, .project-card, .service-card, .meta-item, .journey-intro, .journey-timeline, .timeline-item, .contact-grid, .contact-form, .site-footer"
  );

  revealElements.forEach(function (el, i) {
    el.classList.add("reveal");
    // Stagger delays
    if (i % 3 === 1) el.classList.add("reveal-delay-1");
    if (i % 3 === 2) el.classList.add("reveal-delay-2");
  });

  // Intersection Observer for scroll reveals
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealElements.forEach(function (el) {
    observer.observe(el);
  });

  /* -----------------------------------------
     ACTIVE NAV HIGHLIGHTING
     ----------------------------------------- */

  var navLinks = document.querySelectorAll(".site-nav a");
  var sections = [];

  navLinks.forEach(function (link) {
    var targetId = link.getAttribute("href");
    if (targetId && targetId.charAt(0) === "#") {
      var target = document.querySelector(targetId);
      if (target) {
        sections.push({ link: link, target: target });
      }
    }
  });

  function highlightNav() {
    var scrollPos = window.scrollY + 120;

    sections.forEach(function (item) {
      var top = item.target.offsetTop;
      var bottom = top + item.target.offsetHeight;

      if (scrollPos >= top && scrollPos < bottom) {
        item.link.classList.add("active");
      } else {
        item.link.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", highlightNav, { passive: true });
  highlightNav();

  /* -----------------------------------------
     CONTACT FORM VALIDATION
     ----------------------------------------- */

  var contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      // Honeypot check: if filled, it's a bot — silently block
      var honeypot = contactForm.querySelector("input[name=\"company\"]");
      if (honeypot && honeypot.value !== "") {
        e.preventDefault();
        return false;
      }

      // Validate fields are not just whitespace
      var name = contactForm.querySelector("input[name=\"name\"]");
      var email = contactForm.querySelector("input[name=\"email\"]");
      var message = contactForm.querySelector("textarea[name=\"message\"]");

      var errors = [];

      if (!name.value.trim() || name.value.trim().length < 2) {
        errors.push("name");
        name.style.borderColor = "#e74c3c";
      } else {
        name.style.borderColor = "";
      }

      if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        errors.push("email");
        email.style.borderColor = "#e74c3c";
      } else {
        email.style.borderColor = "";
      }

      if (!message.value.trim() || message.value.trim().length < 10) {
        errors.push("message");
        message.style.borderColor = "#e74c3c";
      } else {
        message.style.borderColor = "";
      }

      if (errors.length > 0) {
        e.preventDefault();
        return false;
      }
    });
  }
})();
