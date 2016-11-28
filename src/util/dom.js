import html from './html';

let selector;

/**
 * Attach an event listener to the matched elements
 */
function addEvent(els) {

  return (event, handler) => {

    els.forEach(el => el.addEventListener(event, e => {

      return handler(u(el), e);

    }));

    return u(els);

  };

}

/**
 * Set inner or outer HTML on the matched elements
 */
function setHtml(els, position) {

  return content => {

    const result = html.render(content);

    els.forEach(el => {

      el[position + 'HTML'] = result;

    });

    return u(selector);

  };

}

/**
 * Add, remove, or toggle a class on the matched elements
 */
function changeClass(els, action) {

  return c => {

    els.forEach(el => {

      // Force reflow before changing classList
      // to ensure that CSS transitions will work as expected
      // https://gist.github.com/paulirish/5d52fb081b3570c81e3a
      el.getClientRects();

      el.classList[action](c);

    });

    return decorate(els);

  };

}

/**
 * Adds DOM API abstractions to the given object
 */
function decorate(els, obj = els[0] || {}) {

  return Object.assign(obj, {
    // Get the value of an attribute
    attr: key => els[0].getAttribute(key),
    // Get the value of a data attribute
    data: key => els[0].getAttribute(`data-${key}`),
    // Attach an event listener to all matched elements
    on: addEvent(els),
    // Set the innerHTML of all matched elements
    innerHtml: setHtml(els, 'inner'),
    // Set the outerHTML of all matched elements
    outerHtml: setHtml(els, 'outer'),
    // Add a class to all matched elements
    addClass: changeClass(els, 'add'),
    // Remove a class from all matched elements
    removeClass: changeClass(els, 'remove'),
    // Toggle a class on all matched elements
    toggleClass: changeClass(els, 'toggle')

  });

}

/**
 * Accepts a selector, DOM node, array of DOM nodes,
 * or a NodeList, and returns the first matched element,
 * decorated with methods that act on *all* matched nodes.
 */
function u(_selector) {

  selector = _selector;

  let elementArray = [];

  if (typeof selector === 'string') {

    elementArray = document.querySelectorAll(selector);

  } else if (selector.forEach) {

    elementArray = selector;

  } else {

    elementArray.push(selector);
    
  }

  return decorate(elementArray);

}

export default u;
