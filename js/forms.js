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
                "Thank you. This form does not send messages anywhere yet — please reach NM OnePoint directly at nmonepointservices@gmail.com or on 94432 73957."
            );
            form.reset();
        });
    });
};
