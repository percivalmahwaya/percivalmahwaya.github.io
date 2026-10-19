/* site.js — theme toggle + mobile nav. Everything here is enhancement only:
   the pages render and navigate correctly with this file absent (invariant 5). */

(function () {
  "use strict";

  // --- theme -------------------------------------------------------------
  // The stamp itself is applied by the inline script in <head> before first
  // paint (ADR 0002). This only handles switching it afterwards.
  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");

  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function activeTheme() {
    return root.dataset.theme || (systemPrefersDark() ? "dark" : "light");
  }

  function label() {
    if (!toggle) return;
    var next = activeTheme() === "dark" ? "light" : "dark";
    toggle.setAttribute("aria-label", "Switch to " + next + " theme");
  }

  if (toggle) {
    label();
    toggle.addEventListener("click", function () {
      var next = activeTheme() === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      // Can throw in a private window or with site data blocked (invariant 7).
      try { localStorage.setItem("theme", next); } catch (e) {}
      label();
    });
  }

  // Follow the OS while the reader has made no explicit choice.
  if (window.matchMedia) {
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    var onChange = function () { if (!root.dataset.theme) label(); };
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }

  // --- mobile nav --------------------------------------------------------
  var burger = document.getElementById("burger");
  var nav = document.getElementById("nav");

  if (burger && nav) {
    var setOpen = function (open) {
      nav.dataset.open = open ? "true" : "false";
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    };

    burger.addEventListener("click", function () {
      setOpen(nav.dataset.open !== "true");
    });

    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") setOpen(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.dataset.open === "true") {
        setOpen(false);
        burger.focus();
      }
    });
  }

  var clock = document.getElementById("clock");
  if (clock && window.Intl) {
    var tick = function () {
      var d = new Date();
      var fmt = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Warsaw", hour: "2-digit", minute: "2-digit",
        timeZoneName: "short", hour12: false
      });
      clock.textContent = fmt.format(d).replace("GMT+", "UTC+");
    };
    tick();
    setInterval(tick, 30000);
  }
})();
