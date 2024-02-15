/* ================================== */
/* Get Function                       */
/* ================================== */

define([], function () {
    "use strict";

    /**
     */
    function _get(element) {

        let scope = (element.hasAttribute("scope") && element.getAttribute("scope") !== 'this') ? document : element;

        // we can exit if there is no query
        if (!element.hasAttribute('query')) {
            return { scope: element };
        }

        let [selector, transform] = element.getAttribute('query').split("?");

        // 


        if (transform) {
            command.transform = transform;
        }

        command.selector = selector;

        command.nodes = command.scope.querySelectorAll(command.selector)

        // lets load up the functions

        return command;
    }

    return {
        get: _command,
    };
});