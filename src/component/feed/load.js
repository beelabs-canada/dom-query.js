


define(['text!component/feed/template.html'], function (html) {
    "use strict";

    const _handle = (element) => {
        element.innerHTML = html
    }

    return {
        handle: _handle
    }
});