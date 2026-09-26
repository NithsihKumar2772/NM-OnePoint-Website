"use strict";

window.NMOnePoint = window.NMOnePoint || {};

window.NMOnePoint.initNavigation = function initNavigation() {
    const nav = document.querySelector('[aria-label="Primary"]');
    if (!nav) {
        return;
    }

    const links = nav.querySelectorAll("a[href]");
    if (!links.length) {
        return;
    }

    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    links.forEach((link) => {
        const href = link.getAttribute("href");
        if (!href) {
            return;
        }
        const target = href.split("/").pop().split("#")[0];
        if (target === currentPage || (currentPage === "" && target === "index.html")) {
            link.setAttribute("aria-current", "page");
        }
    });

    const toggle = document.querySelector("[data-nav-toggle]");
    const menu = document.querySelector("[data-nav-menu]");
    if (!toggle || !menu) {
        return;
    }

    toggle.addEventListener("click", () => {
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!expanded));
        menu.hidden = expanded;
    });
};
