/* ================================== */
/* BASE UTILITIES FUNCTIONS            */
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

    /**
     * debounce - create a function that calls func with thisArg and args in specific time (NOTE: this does remember functions so not a good throttle control)
     * @param {*} func 
     * @param {*} wait 
     * @param {*} immediate 
     * @returns 
     */
    function _debounce(func, wait, immediate) {
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

    /**
     * throttle - that limits calls to "func" to once every given timeframe.
     * @param {*} func 
     * @param {*} timeFrame 
     * @returns 
     */
    function _throttle(func, timeFrame) {
        let lastTime = 0;
        return function (...args) {
            let now = new Date();
            if (now - lastTime >= timeFrame) {
                func(...args);
                lastTime = now;
            }
        };
    }

    /**
     * Checks if value is an empty object or collection. - null safe
     * @param {*} obj 
     * @returns 
     */
    function _empty(obj) {
        return [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length

    }

    /**
     * merge objects from a default state to a new state with passed new values
     * @param {*} defaults 
     * @param {*} overrides 
     * @returns 
     */
    function _merge(defaults, overrides) {
        return Object.assign({}, defaults, overrides);
    }

    /**
     * check if key exists in an object
     * @param {*} obj 
     * @param {*} key 
     * @returns 
     */
    function _has(obj, key) {
        let keyParts = key.split('.');

        return !!obj && (
            keyParts.length > 1
                ? has(obj[key.split('.')[0]], keyParts.slice(1).join('.'))
                : hasOwnProperty.call(obj, key)
        );
    };

    function querySelectorPerpetual(selector, options) {
        var defaultOptions = {
            matchExisting: true,
            matchReappearance: false
        };

        options = Object.assign(defaultOptions, options || {});

        var target = document.querySelector("body");

        var operations = [];
        var existingElementsInScope = [];

        // Add a function to the operations array
        function addOperation(name, func) {
            operations.push({ name: name, func: func });
            existingElementsInScope = existingElementsInScope[name](func);
        }

        // Apply operations to an element
        function applyOperations(element) {
            operations.forEach(function (operation) {
                Array.prototype[operation.name].call([element], operation.func);
            });
        }

        // Singleton MutationObserver
        if (!querySelectorPerpetual.observer) {
            querySelectorPerpetual.observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    Array.prototype.forEach.call(mutation.addedNodes, function (node) {
                        if (node.nodeType === Node.ELEMENT_NODE && node.matches(selector)) {
                            if (!options.matchReappearance && node._querySelectorPerpetual) {
                                return;
                            }
                            node._querySelectorPerpetual = true;
                            applyOperations(node);
                        }
                    });
                });
            });

            querySelectorPerpetual.observer.observe(target, {
                childList: true,
                subtree: true
            });
        }

        // Match existing elements
        if (options.matchExisting) {
            Array.prototype.forEach.call(document.querySelectorAll(selector), function (element) {
                if (!options.matchReappearance && element._querySelectorPerpetual) {
                    return;
                }
                element._querySelectorPerpetual = true;
                existingElementsInScope.push(element);
                applyOperations(element);
            });
        }

        // Return an object with chainable array-like functions
        return {
            forEach: function (func) {
                addOperation("forEach", func);
                return this;
            },
            map: function (func) {
                addOperation("map", func);
                return this;
            },
            reduce: function (func) {
                addOperation("reduce", func);
                return this;
            },
            filter: function (func) {
                addOperation("filter", func);
                return this;
            },
            every: function (func) {
                addOperation("every", func);
                return this;
            },
            some: function (func) {
                addOperation("some", func);
                return this;
            },
            find: function (func) {
                addOperation("find", func);
                return this;
            }
        };
    }

    return {
        css: _stylesheet,
        debouce: _debounce,
        throttle: _throttle,
        empty: _empty,
        merge: _merge,
        has: _has,
        query: querySelectorPerpetual
    };
});