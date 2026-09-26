"use strict";

window.NMOnePoint = window.NMOnePoint || {};

window.NMOnePoint.loadComponent = async function loadComponent(mountSelector, url) {
    const mount = document.querySelector(mountSelector);
    if (!mount) {
        return false;
    }

    try {
        const response = await fetch(url, { cache: "no-cache" });
        if (!response.ok) {
            throw new Error("HTTP " + response.status);
        }
        const html = await response.text();
        mount.innerHTML = html;
        return true;
    } catch (error) {
        console.warn("Component failed to load:", url, error);
        return false;
    }
};

window.NMOnePoint.init = async function init() {
    await window.NMOnePoint.loadComponent(
        '[data-component="header"]',
        "components/header.html"
    );
    await window.NMOnePoint.loadComponent(
        '[data-component="footer"]',
        "components/footer.html"
    );

    if (
        window.NMOnePoint.initNavigation &&
        typeof window.NMOnePoint.initNavigation === "function"
    ) {
        try {
            window.NMOnePoint.initNavigation();
        } catch (error) {
            console.warn("Navigation init failed:", error);
        }
    }

    if (
        window.NMOnePoint.initAnimations &&
        typeof window.NMOnePoint.initAnimations === "function"
    ) {
        try {
            window.NMOnePoint.initAnimations();
        } catch (error) {
            console.warn("Animations init failed:", error);
        }
    }

    if (
        window.NMOnePoint.initForms &&
        typeof window.NMOnePoint.initForms === "function"
    ) {
        try {
            window.NMOnePoint.initForms();
        } catch (error) {
            console.warn("Forms init failed:", error);
        }
    }

    const yearPlaces = document.querySelectorAll("[data-year]");
    yearPlaces.forEach((place) => {
        place.textContent = String(new Date().getFullYear());
    });
};

document.addEventListener("DOMContentLoaded", () => {
    console.log("NM OnePoint Services website loaded.");
    window.NMOnePoint.init();
});
