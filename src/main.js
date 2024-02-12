

/* ================================== */
/* CONFIGURATION                      */
/* ================================== */
requirejs.config({
    "paths": {
        "text": "core/text",
        "query": "core/query"
    },
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

require(["query"], function (Query) {


    // Lets bind to the respective elements
    Query.get("web-component", { matchReappearance: true }).forEach(function (element) {
        // lets see what we need to load
        // TODO: Phase 2 - we can scale to add compound web components (advanced)
        let _component = element.getAttribute("component"),
            component_path = ["component",_component,"load"].join("/");

        require([ component_path ], function (component) {
            if (component && component.handle) {
                component.handle(element);
            }
        });

    });

});