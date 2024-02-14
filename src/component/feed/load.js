


define(['mustache', 'text!component/feed/template.html', 'utils'], function (Stache, Template, Utils) {
    "use strict";

    const _handle = (element) => {
        const _command = Utils.command(element);

        const nodes = _command.scope.querySelectorAll(_command.selector);

        nodes.forEach((el) => console.log(el.getAttribute('data-src')))

        //}, _command.scope.querySelectorAll(_command.selector))
        //element.innerHTML = Stache.render(Template, {});
    }

    return {
        handle: _handle
    }
});