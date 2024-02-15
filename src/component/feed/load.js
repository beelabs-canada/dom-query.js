


define(['mustache', 'text!component/feed/template.html', 'core/fetch'], function (Stache, Template, Fetch) {
    "use strict";

    const _handle = (element) => {
        const nodes = Fetch.get(element);

        _command.nodes.forEach((el) => console.log(el.getAttribute('data-src')))

        //}, _command.scope.querySelectorAll(_command.selector))
        //element.innerHTML = Stache.render(Template, {});
    }

    return {
        handle: _handle
    }
});