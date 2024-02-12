/* ================================== */
/* BASE UTILITIES FUNCTIONS            */
/* ================================== */

define([], function () {
    "use strict";

    /**
     * throttle - that limits calls to "func" to once every given timeframe.
     * @param {*} func 
     * @param {*} timeFrame 
     * @returns 
     */
    return function (func, timeFrame) {
        let lastTime = 0;
        return function (...args) {
            let now = new Date();
            if (now - lastTime >= timeFrame) {
                func(...args);
                lastTime = now;
            }
        };
    }
});