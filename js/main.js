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

window.NMOnePoint.escapeHtml = function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
};

window.NMOnePoint.serviceIcons = {
    briefcase:
        '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18"/></svg>',
    cpu:
        '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2"/><rect x="10" y="10" width="4" height="4"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/></svg>',
    cube:
        '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 2l8 4.5v9L12 20l-8-4.5v-9L12 2z"/><path d="M12 11L4 6.5M12 11l8-4.5M12 11v9"/></svg>',
    globe:
        '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14 0 18M12 3c-3 3.5-3 14 0 18"/></svg>'
};

window.NMOnePoint.renderServices = async function renderServices() {
    const grid = document.querySelector("[data-services-grid]");
    if (!grid) {
        return;
    }

    const escapeHtml = window.NMOnePoint.escapeHtml;

    try {
        const response = await fetch("data/services.json", { cache: "no-cache" });
        if (!response.ok) {
            throw new Error("HTTP " + response.status);
        }
        const data = await response.json();
        const services = data && Array.isArray(data.services) ? data.services : [];
        if (!services.length) {
            return;
        }
        const ctaHref = grid.getAttribute("data-services-href") || "services.html";
        const ctaLabel = grid.getAttribute("data-services-cta") || "Learn more";
        grid.innerHTML = services
            .map(
                (service) =>
                    '<article class="card service-card" data-reveal>' +
                    '<span class="service-icon" aria-hidden="true">' +
                    (window.NMOnePoint.serviceIcons[service.icon] || "") +
                    "</span>" +
                    "<h3>" + escapeHtml(service.title || "Service") + "</h3>" +
                    "<p>" + escapeHtml(service.tagline || "") + "</p>" +
                    "<ul class=\"card-list\">" +
                    (Array.isArray(service.items) ? service.items : [])
                        .map((item) => "<li>" + escapeHtml(item) + "</li>")
                        .join("") +
                    "</ul>" +
                    '<a href="' + escapeHtml(ctaHref) + '">' + escapeHtml(ctaLabel) + "</a>" +
                    "</article>"
            )
            .join("");
    } catch (error) {
        console.warn("Services failed to load:", error);
    }
};

window.NMOnePoint.renderProjects = async function renderProjects() {
    const grid = document.querySelector("[data-projects-grid]");
    if (!grid) {
        return;
    }

    const escapeHtml = window.NMOnePoint.escapeHtml;

    try {
        const response = await fetch("data/projects.json", { cache: "no-cache" });
        if (!response.ok) {
            throw new Error("HTTP " + response.status);
        }
        const data = await response.json();
        const projects = data && Array.isArray(data.projects) ? data.projects : [];
        if (!projects.length) {
            return;
        }
        grid.innerHTML = projects
            .map(
                (project) =>
                    '<article class="card" data-reveal' +
                    (project.category
                        ? ' data-category="' + escapeHtml(project.category) + '"'
                        : "") +
                    ">" +
                    "<h3>" + escapeHtml(project.title || "Project") + "</h3>" +
                    "<p>" + escapeHtml(project.summary || "") + "</p>" +
                    '<a href="projects.html">View project</a>' +
                    "</article>"
            )
            .join("");
    } catch (error) {
        console.warn("Projects failed to load:", error);
    }
};

window.NMOnePoint.renderFaq = async function renderFaq() {
    const list = document.querySelector("[data-faq-list]");
    if (!list) {
        return;
    }

    const escapeHtml = window.NMOnePoint.escapeHtml;

    try {
        const response = await fetch("data/faq.json", { cache: "no-cache" });
        if (!response.ok) {
            throw new Error("HTTP " + response.status);
        }
        const data = await response.json();
        const faqs = data && Array.isArray(data.faqs) ? data.faqs : [];
        if (!faqs.length) {
            return;
        }
        list.innerHTML = faqs
            .map(
                (faq, index) =>
                    '<div class="faq-item" data-reveal>' +
                    '<button type="button" class="faq-question" aria-expanded="false" aria-controls="faq-answer-' + index + '" id="faq-question-' + index + '">' +
                    "<span>" + escapeHtml(faq.question || "Question") + "</span>" +
                    '<span class="faq-marker" aria-hidden="true">+</span>' +
                    "</button>" +
                    '<div class="faq-answer" id="faq-answer-' + index + '" role="region" aria-labelledby="faq-question-' + index + '" hidden>' +
                    "<p>" + escapeHtml(faq.answer || "") + "</p>" +
                    "</div>" +
                    "</div>"
            )
            .join("");
    } catch (error) {
        console.warn("FAQ failed to load:", error);
    }
};

window.NMOnePoint.initFaq = function initFaq() {
    const list = document.querySelector("[data-faq-list]");
    if (!list) {
        return;
    }

    list.addEventListener("click", (event) => {
        const button = event.target.closest(".faq-question");
        if (!button) {
            return;
        }
        const answer = document.getElementById(
            button.getAttribute("aria-controls")
        );
        const expanded = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!expanded));
        if (answer) {
            answer.hidden = expanded;
        }
    });
};

window.NMOnePoint.initProjectFilters = async function initProjectFilters() {
    const bar = document.querySelector("[data-project-filters]");
    const grid = document.querySelector("[data-projects-grid]");
    if (!bar || !grid) {
        return;
    }

    const escapeHtml = window.NMOnePoint.escapeHtml;

    let categories = [];
    try {
        const response = await fetch("data/projects.json", { cache: "no-cache" });
        if (response.ok) {
            const data = await response.json();
            const projects = data && Array.isArray(data.projects) ? data.projects : [];
            categories = Array.from(
                new Set(
                    projects
                        .map((project) => project && project.category)
                        .filter((category) => typeof category === "string" && category)
                )
            );
        }
    } catch (error) {
        console.warn("Project filters failed to load:", error);
    }

    if (!categories.length) {
        return;
    }

    bar.hidden = false;
    bar.innerHTML =
        '<button type="button" class="filter-chip" data-filter="all" aria-pressed="true">All</button>' +
        categories
            .map(
                (category) =>
                    '<button type="button" class="filter-chip" data-filter="' +
                    escapeHtml(category) +
                    '" aria-pressed="false">' +
                    escapeHtml(category) +
                    "</button>"
            )
            .join("");

    bar.addEventListener("click", (event) => {
        const chip = event.target.closest("[data-filter]");
        if (!chip) {
            return;
        }
        bar.querySelectorAll("[data-filter]").forEach((other) => {
            other.setAttribute(
                "aria-pressed",
                String(other === chip ? "true" : "false")
            );
        });
        const active = chip.getAttribute("data-filter");
        grid.querySelectorAll("[data-category]").forEach((card) => {
            card.hidden = active !== "all" && card.getAttribute("data-category") !== active;
        });
    });
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
        window.NMOnePoint.renderServices &&
        typeof window.NMOnePoint.renderServices === "function"
    ) {
        try {
            await window.NMOnePoint.renderServices();
        } catch (error) {
            console.warn("Services render failed:", error);
        }
    }

    if (
        window.NMOnePoint.renderProjects &&
        typeof window.NMOnePoint.renderProjects === "function"
    ) {
        try {
            await window.NMOnePoint.renderProjects();
        } catch (error) {
            console.warn("Projects render failed:", error);
        }
    }

    if (
        window.NMOnePoint.renderFaq &&
        typeof window.NMOnePoint.renderFaq === "function"
    ) {
        try {
            await window.NMOnePoint.renderFaq();
        } catch (error) {
            console.warn("FAQ render failed:", error);
        }
    }

    if (
        window.NMOnePoint.initFaq &&
        typeof window.NMOnePoint.initFaq === "function"
    ) {
        try {
            window.NMOnePoint.initFaq();
        } catch (error) {
            console.warn("FAQ init failed:", error);
        }
    }

    if (
        window.NMOnePoint.initProjectFilters &&
        typeof window.NMOnePoint.initProjectFilters === "function"
    ) {
        try {
            await window.NMOnePoint.initProjectFilters();
        } catch (error) {
            console.warn("Project filters failed:", error);
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
