"use strict";

window.NMOnePoint = window.NMOnePoint || {};

window.NMOnePoint.initAnimations = function initAnimations() {
    const items = document.querySelectorAll("[data-reveal]");
    if (!items.length) {
        return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    if (!("IntersectionObserver" in window)) {
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.setAttribute("data-revealed", "true");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    items.forEach((item) => observer.observe(item));
};
