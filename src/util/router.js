/**
 * Convert an object to key=value&key=value notation.
 */
function serialize(obj) {

    const parts = [];

    Object.keys(obj).forEach(key => {

        parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);

    });

    return parts.join('&');

}

/**
 * Convert a serialzed string to an object.
 */
function deserialize(str) {

    const obj = {};

    const parts = decodeURIComponent(str).split('&');

    parts.forEach(part => {

        part = part.split('=');

        if (part[0]) {

            obj[part[0]] = part[1];

        }

    });

    return obj;

}

const hashchange = () => router.load();

/**
 * Start listening for URL changes
 */
function bindHashEvent() {

    router.unbound--;

    if (router.unbound < 1) {

        router.unbound = 0;

        window.addEventListener('hashchange', hashchange);

    }

}

/**
 * Stop listening for URL changes
 */
function unbindHashEvent() {

    router.unbound++;

    window.removeEventListener('hashchange', hashchange);

}

/**
 * Take either an object or a serialized string,
 * and return an object.
 */
function normalize(params) {

    if (typeof params === 'string') {

        params = deserialize(params);

    }

    return params;

}

/**
 * Handles the given parameters, and runs the
 * provided callback for changing the URL without
 * reloading the app.
 */
function changeURL(params, callback) {

    params = normalize(params);

    Object.assign(router.params, params);

    unbindHashEvent();

    callback();

    setTimeout(bindHashEvent);

    return router.load;

}

const router = {

    unbound: 1,

    /**
     * Reload the app.
     */
    load(params) {

        params = normalize(params);

        setTimeout(() => {

            const currentHash = location.hash.substring(1);

            router.params = params || deserialize(currentHash);

            const newHash = serialize(router.params);

            if (currentHash === newHash) {

                router.app(router.params);

            } else {

                location.hash = newHash;

            }

        });

    },

    /**
     * Register the app with the router, and run it.
     */
    init(app) {

        router.app = app;

        bindHashEvent();

        router.load();

    },

    /**
     * Remove the provided keys from the URL
     */
    clear(...args) {

        args.forEach(arg => {

            delete router.params[arg];

        });

        return router.set(router.params);

    },

    /**
     * Add the provided keys to the URL
     */
    set(params) {

        return changeURL(params, () => {

            location.hash = serialize(router.params);

        });

    },

    /**
     * Replace the current URL without adding
     * a browser history entry
     */
    replace(params) {

        return changeURL(params, () => {

            location.replace(`${location.pathname}#${serialize(router.params)}`);

        });

    }
};

export default router;
