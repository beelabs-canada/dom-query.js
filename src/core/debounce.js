/* ================================== */
/* BASE UTILITIES FUNCTIONS            */
/* ================================== */

define([], function () {
    "use strict";

    /**
     * debounce - create a function that calls func with thisArg and args in specific time (NOTE: this does remember functions so not a good throttle control)
     * @param {*} func 
     * @param {*} wait 
     * @param {*} immediate 
     * @returns 
     */
    
    return function (func, wait, immediate) {
        let timeout;
        return function () {
            let context = this, args = arguments;
            clearTimeout(timeout);
            if (immediate && !timeout) func.apply(context, args);
            timeout = setTimeout(function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            }, wait);
        };
    }
});