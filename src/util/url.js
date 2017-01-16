let params,
    app,
    preventReload;

function parseQueryString() {

    params = {};

    const parts = decodeURIComponent(location.hash).substring(1).split('&');

    parts.forEach(part => {

        part = part.split('=');

        if (part[0] && part[1]) {

            params[part[0]] = part[1];

        }

    });

}

function serializeParams() {

    const parts = [];

    Object.keys(params).forEach(key => {

        parts.push(`${key}=${params[key]}`);

    });

    return parts.join('&');

}

function url(key) {

    return key ? params[key] : params;

}

url.refresh = () => {

    parseQueryString();

    app(params);

};

url.setApp = _app => {

    app = _app;

    url.refresh();

};

url.set = (keys, _preventReload) => {

    Object.keys(keys).forEach(key => {

        params[key] = keys[key];

    });

    preventReload = _preventReload;

    window.location.hash = serializeParams();

    preventReload = false;

};

// Shim for oldURL and newURL in IE
if (!window.HashChangeEvent) {
    let lastURL = document.URL;
    window.addEventListener('hashchange', e => {
        Object.defineProperty(e, 'oldURL', {enumerable: true, configurable: true, value: lastURL});
        Object.defineProperty(e, 'newURL', {enumerable: true, configurable: true, value: document.URL});
        lastURL = document.URL;
    });
}

window.addEventListener('hashchange', e => {

    if (!preventReload && e.newURL !== e.oldURL) {

        setTimeout(url.refresh);

    }

});

export default url;
