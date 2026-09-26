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

    const MOBILE_QUERY = "(max-width: 860px)";

    const isMobile = () =>
        typeof window.matchMedia === "function" &&
        window.matchMedia(MOBILE_QUERY).matches;

    const closeMenu = () => {
        toggle.setAttribute("aria-expanded", "false");
        if (isMobile()) {
            menu.hidden = true;
        }
    };

    if (isMobile()) {
        menu.hidden = true;
    }

    toggle.addEventListener("click", () => {
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!expanded));
        menu.hidden = expanded;
    });

    menu.addEventListener("click", (event) => {
        if (event.target.closest("a[href]")) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    document.addEventListener("click", (event) => {
        if (toggle.getAttribute("aria-expanded") !== "true") {
            return;
        }
        const target = event.target;
        if (
            target &&
            typeof target.closest === "function" &&
            (target.closest("[data-nav-toggle]") || target.closest(".site-nav"))
        ) {
            return;
        }
        closeMenu();
    });

    if (typeof window.matchMedia === "function") {
        window
            .matchMedia(MOBILE_QUERY)
            .addEventListener("change", (event) => {
                if (!event.matches) {
                    toggle.setAttribute("aria-expanded", "false");
                    menu.hidden = false;
                } else {
                    menu.hidden = true;
                }
            });
    }

    const header = document.querySelector(".site-header");
    if (header && typeof window.addEventListener === "function") {
        const updateHeaderState = () => {
            header.classList.toggle("is-scrolled", window.scrollY > 8);
        };
        updateHeaderState();
        window.addEventListener("scroll", updateHeaderState, { passive: true });
    }

    const toTop = document.querySelector("[data-back-to-top]");
    if (toTop && typeof window.addEventListener === "function") {
        const updateToTop = () => {
            toTop.hidden = window.scrollY < 600;
        };
        updateToTop();
        window.addEventListener("scroll", updateToTop, { passive: true });
        toTop.addEventListener("click", () => {
            const reduced =
                typeof window.matchMedia === "function" &&
                window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
        });
    }
};
