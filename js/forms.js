"use strict";

window.NMOnePoint = window.NMOnePoint || {};

window.NMOnePoint.initForms = function initForms() {
    const forms = document.querySelectorAll("form[data-contact-form]");
    if (!forms.length) {
        return;
    }

    forms.forEach((form) => {
        form.setAttribute("novalidate", "novalidate");
        const status = form.querySelector("[data-form-status]");

        const showStatus = (message) => {
            if (!status) {
                return;
            }
            status.textContent = message;
            status.hidden = false;
        };

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            if (!form.checkValidity()) {
                showStatus("Please complete the highlighted fields before sending.");
                const firstInvalid = form.querySelector(":invalid");
                if (firstInvalid && typeof firstInvalid.focus === "function") {
                    firstInvalid.focus();
                }
                return;
            }
            showStatus(
                "Thank you. This demonstration form does not send messages anywhere yet — contact details will be published here once verified."
            );
            form.reset();
        });
    });
};
