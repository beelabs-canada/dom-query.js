/* ================================== */
/* BASE UTILITIES FUNCTIONS            */
/* ================================== */

define([], function () {
    "use strict";

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

    function _get_command(element) {

        let _command = { scope: element, selector: false, transform: false };

        // we can exit if there is no query
        if (!element.hasAttribute('query')) {
            return _command;
        }

        let [_query, transform] = element.getAttribute('query').split("?");
        let [scope, selector] = _query.split('!');

        if (scope !== '.') {
            _command.scope = document;
        }

        if (transform) {
            _command.transform = transform;
        }

        _command.selector = selector;

        return _command
    };

    return {
        empty: _empty,
        merge: _merge,
        has: _has,
        command: _get_command
    };
});