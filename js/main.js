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
        '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14 0 18M12 3c-3 3.5-3 14 0 18"/></svg>',
    filetext:
        '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M6 2h9l5 5v15H6z"/><path d="M14 2v6h6M9 13l2 2 4-4"/></svg>'
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
        const fullList = grid.getAttribute("data-services-full") === "true";
        const sizeById = {
            "engineering-bim": "bento-lg",
            "business-tax": "bento-md",
            "gis": "bento-wide",
            "online-government": "bento-half",
            "it-support": "bento-half",
        };
        const maxItems = 5;
        grid.innerHTML = services
            .map((service, index) => {
                const items = Array.isArray(service.items) ? service.items : [];
                const shown = fullList ? items : items.slice(0, maxItems);
                const hidden = items.length - shown.length;
                return (
                    '<article class="bento-card ' +
                    (sizeById[service.id] || "bento-half") +
                    '" data-reveal="up" data-delay="' +
                    (index % 3) * 100 +
                    '">' +
                    '<div class="bento-top">' +
                    '<span class="bento-num" aria-hidden="true">' +
                    String(index + 1).padStart(2, "0") +
                    "</span>" +
                    '<span class="bento-icon" aria-hidden="true">' +
                    (window.NMOnePoint.serviceIcons[service.icon] || "") +
                    "</span>" +
                    "</div>" +
                    "<h3>" + escapeHtml(service.title || "Service") + "</h3>" +
                    "<p class=\"bento-tag\">" + escapeHtml(service.tagline || "") + "</p>" +
                    '<ul class="bento-list">' +
                    shown
                        .map((item) => "<li>" + escapeHtml(item) + "</li>")
                        .join("") +
                    "</ul>" +
                    (hidden > 0
                        ? '<p class="bento-more">+' + hidden + " more services</p>"
                        : "") +
                    '<a class="bento-link" href="' + escapeHtml(ctaHref) + '">' +
                    escapeHtml(ctaLabel) +
                    '<span class="bento-arrow" aria-hidden="true">&rarr;</span>' +
                    "</a>" +
                    "</article>"
                );
            })
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

window.NMOnePoint.slugify = function slugify(name) {
    return String(name)
        .toLowerCase()
        .replace(/&/g, "")
        .replace(/[()/]/g, " ")
        .normalize("NFKD")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/[\s_]+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
};

window.NMOnePoint.buildServiceIndex = async function buildServiceIndex() {
    if (window.NMOnePoint._serviceIndex) {
        return window.NMOnePoint._serviceIndex;
    }
    const response = await fetch("data/services.json", { cache: "no-cache" });
    if (!response.ok) {
        throw new Error("HTTP " + response.status);
    }
    const data = await response.json();
    const categories = data && Array.isArray(data.services) ? data.services : [];
    const used = {};
    const index = [];
    categories.forEach((category) => {
        const items = Array.isArray(category.items) ? category.items : [];
        items.forEach((name) => {
            let slug = window.NMOnePoint.slugify(name);
            if (used[slug]) {
                slug = category.id + "-" + slug;
            }
            used[slug] = true;
            index.push({
                name: name,
                categoryId: category.id,
                categoryTitle: category.title,
                tagline: category.tagline,
                icon: category.icon,
                slug: slug,
            });
        });
    });
    window.NMOnePoint._serviceIndex = { categories: categories, index: index };
    return window.NMOnePoint._serviceIndex;
};

window.NMOnePoint.detailUrl = function detailUrl(slug) {
    return "service.html?service=" + encodeURIComponent(slug);
};

window.NMOnePoint.categoryUrl = function categoryUrl(key) {
    return "category.html?category=" + encodeURIComponent(key);
};

/* Navigation display taxonomy: 6 dropdown labels mapped onto the 5 genuine
   data categories. Labels use the exact approved names; anchors reuse the
   existing category IDs; service membership references slugs (no duplicated
   catalogue data). Coverage: 9 + 2 + 6 + 10 + 6 + 6 = 39 services. */

window.NMOnePoint.NAV_GROUPS = [
    {
        key: "bim-services",
        label: "BIM Services",
        anchor: "services.html#cat-engineering-bim",
        slugs: [
            "autocad-2d-drafting-design",
            "bim-modeling-lod-100-500",
            "revit-architecture-modeling",
            "revit-structure-modeling",
            "revit-mep-modeling",
            "as-built-bim-modeling",
            "clash-detection",
            "quantity-take-off-boq",
            "shop-drawings",
        ],
    },
    {
        key: "laser-scanning",
        label: "Laser Scanning",
        anchor: "services.html#cat-engineering-bim",
        slugs: ["scan-to-bim-services", "point-cloud-to-bim"],
    },
    {
        key: "geospatial",
        label: "Geospatial",
        anchor: "services.html#cat-gis",
        slugs: [
            "qgis-mapping-spatial-analysis",
            "arcgis-data-management-analysis",
            "land-use-land-cover-mapping",
            "geospatial-data-creation-editing",
            "vector-raster-data-processing",
            "custom-gis-project-support",
        ],
    },
    {
        key: "business-tax",
        label: "Business & Tax Services",
        anchor: "services.html#cat-business-tax",
        slugs: [
            "gst-registration",
            "gst-monthly-return-filing",
            "gst-annual-return-filing",
            "udyam-msme-registration",
            "lut-letter-of-undertaking-registration",
            "professional-tax-registration-government-of-karnataka",
            "pan-card-application",
            "tan-registration",
            "iec-registration",
            "digital-signature-dsc",
        ],
    },
    {
        key: "online-government",
        label: "Online Government & Digital",
        anchor: "services.html#cat-online-government",
        slugs: [
            "government-job-online-applications",
            "online-government-pan-card-application",
            "passport-application-assistance",
            "pf-provident-fund-withdrawal-application-assistance",
            "online-bank-account-opening-assistance",
            "all-online-e-sevai-services",
        ],
    },
    {
        key: "computer-repair",
        label: "Computer System Repair & IT",
        anchor: "services.html#cat-it-support",
        slugs: [
            "computer-system-repair-troubleshooting",
            "os-update-optimization-windows",
            "software-installation-all-types",
            "virus-removal-system-cleanup",
            "data-backup-recovery-assistance",
            "hardware-diagnostics-performance-tuning",
        ],
    },
];

window.NMOnePoint.buildNavGroups = async function buildNavGroups() {
    const built = await window.NMOnePoint.buildServiceIndex();
    const bySlug = {};
    built.index.forEach((service) => {
        bySlug[service.slug] = service;
    });
    const seen = {};
    let covered = 0;
    const groups = window.NMOnePoint.NAV_GROUPS.map((group) => {
        const items = [];
        group.slugs.forEach((slug) => {
            const service = bySlug[slug];
            if (!service) {
                console.warn("Nav group references unknown slug:", slug);
                return;
            }
            if (seen[slug]) {
                console.warn("Nav slug covered twice:", slug);
                return;
            }
            seen[slug] = true;
            covered += 1;
            items.push(service);
        });
        return { key: group.key, label: group.label, anchor: group.anchor, items: items };
    });
    if (covered !== built.index.length) {
        console.warn(
            "Nav groups cover " + covered + " of " + built.index.length + " services."
        );
    }
    return groups;
};

window.NMOnePoint.renderMegaMenu = async function renderMegaMenu() {
    const menu = document.querySelector("[data-mega-menu]");
    if (!menu) {
        return;
    }

    const escapeHtml = window.NMOnePoint.escapeHtml;

    try {
        const groups = await window.NMOnePoint.buildNavGroups();
        if (!groups.length) {
            throw new Error("empty catalogue");
        }
        menu.innerHTML =
            '<div class="mega-panel" data-drop-panel>' +
            groups
                .map(
                    (group) =>
                        '<a class="drop-cat-link" href="' + escapeHtml(window.NMOnePoint.categoryUrl(group.key)) + '">' +
                        escapeHtml(group.label) +
                        "</a>"
                )
                .join("") +
            "</div>";
    } catch (error) {
        console.warn("Mega menu failed to load:", error);
        const toggle = document.querySelector("[data-mega-toggle]");
        if (toggle) {
            toggle.hidden = true;
        }
    }
};

window.NMOnePoint.renderServiceDirectory = async function renderServiceDirectory() {
    const mount = document.querySelector("[data-service-directory]");
    if (!mount) {
        return;
    }

    const escapeHtml = window.NMOnePoint.escapeHtml;

    try {
        const built = await window.NMOnePoint.buildServiceIndex();
        if (!built.categories.length) {
            return;
        }
        const byCategory = {};
        built.index.forEach((service) => {
            if (!byCategory[service.categoryId]) {
                byCategory[service.categoryId] = [];
            }
            byCategory[service.categoryId].push(service);
        });
        mount.innerHTML = built.categories
            .map(
                (category, index) =>
                    '<section class="dir-cat" id="cat-' + escapeHtml(category.id) + '" aria-labelledby="dir-title-' + escapeHtml(category.id) + '" data-dir-cat>' +
                    '<div class="dir-cat-head">' +
                    '<span class="bento-num" aria-hidden="true">' + String(index + 1).padStart(2, "0") + "</span>" +
                    '<span class="bento-icon" aria-hidden="true">' + (window.NMOnePoint.serviceIcons[category.icon] || "") + "</span>" +
                    "<div><h3 id=\"dir-title-" + escapeHtml(category.id) + "\">" + escapeHtml(category.title) + "</h3>" +
                    "<p>" + escapeHtml(category.tagline || "") + "</p></div>" +
                    "</div>" +
                    '<ul class="dir-list">' +
                    (byCategory[category.id] || [])
                        .map(
                            (service) =>
                                '<li data-dir-item><a href="' + escapeHtml(window.NMOnePoint.detailUrl(service.slug)) + '">' +
                                escapeHtml(service.name) +
                                '<span aria-hidden="true">&rarr;</span></a></li>'
                        )
                        .join("") +
                    "</ul>" +
                    "</section>"
            )
            .join("");

        const search = document.querySelector("[data-service-search]");
        const emptyNote = document.querySelector("[data-directory-empty]");
        if (search) {
            search.addEventListener("input", () => {
                const query = search.value.trim().toLowerCase();
                let visible = 0;
                mount.querySelectorAll("[data-dir-cat]").forEach((section) => {
                    let sectionVisible = 0;
                    section.querySelectorAll("[data-dir-item]").forEach((item) => {
                        const match =
                            !query ||
                            item.textContent.toLowerCase().indexOf(query) !== -1;
                        item.hidden = !match;
                        if (match) {
                            sectionVisible += 1;
                        }
                    });
                    section.hidden = sectionVisible === 0;
                    visible += sectionVisible;
                });
                if (emptyNote) {
                    emptyNote.hidden = visible !== 0;
                }
            });
        }
    } catch (error) {
        console.warn("Service directory failed to load:", error);
    }
};

window.NMOnePoint.renderServiceDetail = async function renderServiceDetail() {
    const mount = document.querySelector("[data-service-detail]");
    if (!mount) {
        return;
    }

    const escapeHtml = window.NMOnePoint.escapeHtml;
    const params = new URLSearchParams(window.location.search || "");
    const slug = params.get("service") || "";

    try {
        const built = await window.NMOnePoint.buildServiceIndex();
        const service = built.index.filter((item) => item.slug === slug)[0];

        if (!service) {
            mount.innerHTML =
                '<p class="eyebrow">Service detail</p>' +
                "<h1>Service not found</h1>" +
                '<p class="section-lead">The requested service could not be matched. Browse the <a href="services.html">full service directory</a> or <a href="contact.html">contact NM OnePoint</a>.</p>';
            return;
        }

        const siblings = built.index.filter(
            (item) => item.categoryId === service.categoryId && item.slug !== service.slug
        );
        const position =
            built.index
                .filter((item) => item.categoryId === service.categoryId)
                .map((item) => item.slug)
                .indexOf(service.slug) + 1;
        const categoryCount = built.index.filter(
            (item) => item.categoryId === service.categoryId
        ).length;

        document.title = service.name + " | NM OnePoint Services";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute(
                "content",
                service.name + " — " + service.categoryTitle + " at NM OnePoint Services. One Point. Multiple Solutions."
            );
        }

        mount.innerHTML =
            '<nav class="detail-crumb" aria-label="Breadcrumb"><a href="index.html">Home</a> <span aria-hidden="true">/</span> <a href="services.html">Services</a> <span aria-hidden="true">/</span> <a href="services.html#cat-' + escapeHtml(service.categoryId) + '">' + escapeHtml(service.categoryTitle) + "</a></nav>" +
            '<p class="eyebrow">' + escapeHtml(service.categoryTitle) + "</p>" +
            "<h1>" + escapeHtml(service.name) + "</h1>" +
            '<p class="section-lead">' + escapeHtml(service.tagline || "") + "</p>" +
            "<h2>Service overview</h2>" +
            "<p>" + escapeHtml(service.name) + " is service " + position + " of " + categoryCount + " in " + escapeHtml(service.categoryTitle) + " at NM OnePoint Services. Scope, deliverables and timelines are agreed with the Client &amp; Operations team before work begins.</p>" +
            "<h2>How to proceed</h2>" +
            "<ol class=\"detail-steps\">" +
            "<li><strong>Share the requirement.</strong> Describe what you need — business, engineering, online, or a mix.</li>" +
            "<li><strong>Agree the scope.</strong> Deliverables and timelines are confirmed before work begins.</li>" +
            "<li><strong>Delivery &amp; follow-up.</strong> Agreed outputs are handed over with support for follow-up questions.</li>" +
            "</ol>" +
            '<div class="cta-actions">' +
            '<a class="btn btn-primary" href="contact.html">Discuss this service <span class="btn-arrow" aria-hidden="true">&rarr;</span></a>' +
            '<a class="btn btn-dark" href="https://wa.me/919443273957?text=' + encodeURIComponent("Hello NM OnePoint, I would like to discuss: " + service.name) + '" rel="noopener">WhatsApp</a>' +
            "</div>" +
            (siblings.length
                ? '<div class="detail-siblings"><h2>More in ' + escapeHtml(service.categoryTitle) + "</h2><ul>" +
                  siblings
                      .map(
                          (sibling) =>
                              '<li><a href="' + escapeHtml(window.NMOnePoint.detailUrl(sibling.slug)) + '">' +
                              escapeHtml(sibling.name) +
                              "</a></li>"
                      )
                      .join("") +
                  "</ul></div>"
                : "");
    } catch (error) {
        console.warn("Service detail failed to load:", error);
        mount.innerHTML =
            "<h1>Service detail</h1>" +
            '<p class="section-lead">Service information could not be loaded. See the <a href="services.html">service directory</a>.</p>';
    }
};

window.NMOnePoint.renderCategoryDetail = async function renderCategoryDetail() {
    const mount = document.querySelector("[data-category-detail]");
    if (!mount) {
        return;
    }

    const escapeHtml = window.NMOnePoint.escapeHtml;
    const params = new URLSearchParams(window.location.search || "");
    const key = params.get("category") || "";

    try {
        const groups = await window.NMOnePoint.buildNavGroups();
        const group = groups.filter((item) => item.key === key)[0];

        if (!group) {
            mount.innerHTML =
                '<p class="eyebrow">Service category</p>' +
                "<h1>Category not found</h1>" +
                '<p class="section-lead">The requested category could not be matched. Browse the <a href="services.html">full service directory</a>.</p>';
            return;
        }

        const built = await window.NMOnePoint.buildServiceIndex();
        const firstCategoryId = group.items.length ? group.items[0].categoryId : "";
        const dataCategory = built.categories.filter((cat) => cat.id === firstCategoryId)[0] || {};
        const tagline = dataCategory.tagline || "";

        document.title = group.label + " | NM OnePoint Services";
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute(
                "content",
                group.label + " at NM OnePoint Services: " + group.items.length + " listed services. One Point. Multiple Solutions."
            );
        }

        mount.innerHTML =
            '<nav class="detail-crumb" aria-label="Breadcrumb"><a href="index.html">Home</a> <span aria-hidden="true">/</span> <a href="services.html">Services</a> <span aria-hidden="true">/</span> <span>' + escapeHtml(group.label) + "</span></nav>" +
            '<p class="eyebrow">' + group.items.length + ' listed services</p>' +
            "<h1>" + escapeHtml(group.label) + "</h1>" +
            (tagline ? '<p class="section-lead">' + escapeHtml(tagline) + "</p>" : "") +
            '<ul class="dir-list">' +
            group.items
                .map(
                    (service) =>
                        '<li data-dir-item><a href="' + escapeHtml(window.NMOnePoint.detailUrl(service.slug)) + '">' +
                        escapeHtml(service.name) +
                        '<span aria-hidden="true">&rarr;</span></a></li>'
                )
                .join("") +
            "</ul>" +
            '<div class="cta-actions">' +
            '<a class="btn btn-primary" href="contact.html">Discuss these services <span class="btn-arrow" aria-hidden="true">&rarr;</span></a>' +
            '<a class="btn btn-dark" href="https://wa.me/919443273957" rel="noopener">WhatsApp</a>' +
            "</div>";
    } catch (error) {
        console.warn("Category detail failed to load:", error);
        mount.innerHTML =
            "<h1>Service category</h1>" +
            '<p class="section-lead">Category information could not be loaded. See the <a href="services.html">service directory</a>.</p>';
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
        window.NMOnePoint.renderMegaMenu &&
        typeof window.NMOnePoint.renderMegaMenu === "function"
    ) {
        try {
            await window.NMOnePoint.renderMegaMenu();
        } catch (error) {
            console.warn("Mega menu render failed:", error);
        }
    }

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
        window.NMOnePoint.renderServiceDirectory &&
        typeof window.NMOnePoint.renderServiceDirectory === "function"
    ) {
        try {
            await window.NMOnePoint.renderServiceDirectory();
        } catch (error) {
            console.warn("Service directory render failed:", error);
        }
    }

    if (
        window.NMOnePoint.renderServiceDetail &&
        typeof window.NMOnePoint.renderServiceDetail === "function"
    ) {
        try {
            await window.NMOnePoint.renderServiceDetail();
        } catch (error) {
            console.warn("Service detail render failed:", error);
        }
    }

    if (
        window.NMOnePoint.renderCategoryDetail &&
        typeof window.NMOnePoint.renderCategoryDetail === "function"
    ) {
        try {
            await window.NMOnePoint.renderCategoryDetail();
        } catch (error) {
            console.warn("Category detail render failed:", error);
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
