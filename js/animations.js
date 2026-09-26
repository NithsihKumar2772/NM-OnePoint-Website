"use strict";

window.NMOnePoint = window.NMOnePoint || {};

window.NMOnePoint.initAnimations = function initAnimations() {
    const reducedMotion =
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* Reduced motion: leave content fully visible, skip all animation. */
    if (reducedMotion || !("IntersectionObserver" in window)) {
        return;
    }

    document.documentElement.classList.add("has-js-anim");

    const revealItems = document.querySelectorAll("[data-reveal]");
    if (revealItems.length) {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const delay = parseInt(
                            entry.target.getAttribute("data-delay") || "0",
                            10
                        );
                        if (!isNaN(delay) && delay > 0) {
                            entry.target.style.transitionDelay = delay + "ms";
                        }
                        entry.target.setAttribute("data-revealed", "true");
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
        );

        revealItems.forEach((item) => revealObserver.observe(item));
    }

    const counters = document.querySelectorAll("[data-count]");
    if (!counters.length) {
        return;
    }

    const animateCount = (element) => {
        const target = parseInt(element.getAttribute("data-count"), 10);
        if (isNaN(target)) {
            return;
        }
        const duration = 1100;
        const start = performance.now();
        const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const padded = String(Math.round(target * eased)).padStart(2, "0");
            element.textContent = padded;
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    };

    const counterObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCount(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.4 }
    );

    counters.forEach((counter) => counterObserver.observe(counter));
};
