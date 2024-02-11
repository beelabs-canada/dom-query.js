

/* ================================== */
/* CONFIGURATION                      */
/* ================================== */
requirejs.config({
    "config": {
        "i18n": {
            "locale": (document.documentElement.lang) ? document.documentElement.lang : "en"
        }
    },
    "waitSeconds": 1
});

/* ================================== */
/* MAIN                               */
/* ================================== */

require(["utils"], function (Toolbox) {

    // Lets bind to the respective elements
    Toolbox.query("[data-query]", { matchReappearance: true }).forEach(function (element) {

    });

});