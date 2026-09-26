"use strict";

window.NMOnePoint = window.NMOnePoint || {};

window.NMOnePoint.initForms = function initForms() {
    const forms = document.querySelectorAll("form[data-contact-form]");
    if (!forms.length) {
        return;
    }

    forms.forEach((form) => {
        form.setAttribute("novalidate", "novalidate");
        form.addEventListener("submit", (event) => {
            if (!form.checkValidity()) {
                event.preventDefault();
                const firstInvalid = form.querySelector(":invalid");
                if (firstInvalid && typeof firstInvalid.focus === "function") {
                    firstInvalid.focus();
                }
            }
        });
    });
};
