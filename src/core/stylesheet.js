/* ================================== */
/* STYLESHEET Function           */
/* ================================== */

define([], function () {
    "use strict";

    /**
     * Creates a STYLE element with the specified content.
     * @param  {string} content  The stylesheet content.
     * @return {!Element}  The created STYLE element.
     */
    function _stylesheet(content) {
        let style = document.createElement('style');

        style.appendChild(document.createTextNode(content));

        document.head.appendChild(style);

        return style;
    }

    return {
        css: _stylesheet,
    };
});