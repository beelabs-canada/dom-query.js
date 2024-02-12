/* ================================== */
/* BASE UTILITIES FUNCTIONS            */
/* ================================== */

define([], function () {
    "use strict";

    function _query(selector, options) {
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
        if (!_query.observer) {
            _query.observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    Array.prototype.forEach.call(mutation.addedNodes, function (node) {
                        if (node.nodeType === Node.ELEMENT_NODE && node.matches(selector)) {
                            if (!options.matchReappearance && node.__query) {
                                return;
                            }
                            node.__query = true;
                            applyOperations(node);
                        }
                    });
                });
            });

            _query.observer.observe(target, {
                childList: true,
                subtree: true
            });
        }

        // Match existing elements
        if (options.matchExisting) {
            Array.prototype.forEach.call(document.querySelectorAll(selector), function (element) {
                if (!options.matchReappearance && element.__query) {
                    return;
                }
                element.__query = true;
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
        get: _query
    }

});