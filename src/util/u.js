import html from './html';
import u from './dom';

/**
 * Template string tag for HTML escaping
 */
u.html = html.escape;

/**
 * Unique ID for associating an event handler with an element
 */
let index = 0;

/**
 * Returns a unique attribute, and adds an 
 * event handler to the associated element.
 */
u.on = (event, handler) => {

  const id = index++;

  requestAnimationFrame(() => {

    u(`[data-uid="${id}"]`).on(event, handler);

  });

  return `data-uid=${id}`;

};

window.u = u;

export default u;
