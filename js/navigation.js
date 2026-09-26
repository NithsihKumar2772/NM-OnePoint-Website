"use strict";

window.NMOnePoint = window.NMOnePoint || {};

window.NMOnePoint.initMegaMenu = function initMegaMenu() {
    const item = document.querySelector(".nav-item-has-mega");
    if (!item) {
        return;
    }
    const toggle = item.querySelector("[data-mega-toggle]");
    const menu = item.querySelector("[data-mega-menu]");
    if (!toggle || !menu) {
        return;
    }

    const isMobile = () =>
        typeof window.matchMedia === "function" &&
        window.matchMedia("(max-width: 860px)").matches;

    const setMega = (open) => {
        item.classList.toggle("mega-open", open);
        toggle.setAttribute("aria-expanded", String(open));
        menu.querySelectorAll("[data-mega-cat-toggle]").forEach((catToggle) => {
            if (!open && isMobile()) {
                catToggle.setAttribute("aria-expanded", "false");
                const col = catToggle.closest(".drop-cat");
                if (col) {
                    col.classList.remove("open");
                }
            }
        });
    };

    toggle.addEventListener("click", (event) => {
        event.stopPropagation();
        setMega(!item.classList.contains("mega-open"));
    });

    menu.addEventListener("click", (event) => {
        const catToggle = event.target.closest("[data-mega-cat-toggle]");
        if (catToggle) {
            const col = catToggle.closest(".drop-cat");
            const open = catToggle.getAttribute("aria-expanded") === "true";
            catToggle.setAttribute("aria-expanded", String(!open));
            if (col) {
                col.classList.toggle("open", !open);
            }
            return;
        }
        if (event.target.closest("a[href]")) {
            setMega(false);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && item.classList.contains("mega-open")) {
            setMega(false);
            toggle.focus();
        }
    });

    document.addEventListener("click", (event) => {
        if (!item.classList.contains("mega-open")) {
            return;
        }
        if (event.target.closest(".nav-item-has-mega")) {
            return;
        }
        setMega(false);
    });
};

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
    const currentHash =
        typeof window.location.hash === "string" ? window.location.hash : "";
    links.forEach((link) => {
        const href = link.getAttribute("href");
        if (!href || /^(https?:|mailto:|tel:)/.test(href)) {
            return;
        }
        const parts = href.split("#");
        const target = parts[0].split("/").pop().split("#")[0] || "index.html";
        if (target !== currentPage) {
            return;
        }
        if (parts.length > 1) {
            if ("#" + parts[1] === currentHash) {
                link.setAttribute("aria-current", "page");
            }
            return;
        }
        if (!currentHash) {
            link.setAttribute("aria-current", "page");
        }
    });

    const toggle = document.querySelector("[data-nav-toggle]");
    const menu = document.querySelector("[data-nav-menu]");
    if (!toggle || !menu) {
        return;
    }

    if (
        window.NMOnePoint.initMegaMenu &&
        typeof window.NMOnePoint.initMegaMenu === "function"
    ) {
        try {
            window.NMOnePoint.initMegaMenu();
        } catch (error) {
            console.warn("Mega menu init failed:", error);
        }
    }

    const MOBILE_QUERY = "(max-width: 860px)";

    const isMobile = () =>
        typeof window.matchMedia === "function" &&
        window.matchMedia(MOBILE_QUERY).matches;

    const closeMenu = () => {
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
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
        document.body.classList.toggle("menu-open", !expanded && isMobile());
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
                    document.body.classList.remove("menu-open");
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
