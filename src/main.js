

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

require(["utils"], function (Util) {


    // Lets bind to the respective elements
    Util.query("web-component", { matchReappearance: true }).forEach(function (element) {
        // lets see what we need to load
        let _component = element.getAttribute("component");

        require([`plugin/${_component}/load`], function (component) {
            if (component && component.handle) {
                component.handle(element);
            }
        });

    });

});