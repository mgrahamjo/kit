const ESCAPE_MAP = {
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&apos;'
  },

  /**
   * Flag for marking strings as escaped
   */
  MAGIC_FLAG = '&zwnj;',

  /**
   * Regex for removing the magic flag
   */
  FLAG_REGEX = new RegExp(MAGIC_FLAG, 'g');

/**
 * Convert a string, number, or array into a string
 */
function stringify(value) {

  return Array.isArray(value) ? value.map(v => {

    return v.toString();

  }).join('') : value.toString();

}

/**
 * HTML escape a string unless it has been marked safe
 */
function htmlEscape(value) {

  value = stringify(value);

  if (value.indexOf(MAGIC_FLAG) === 0) {

    return value;

  }

  return value.replace(/[<>'"]/g, c => {

    return ESCAPE_MAP[c];

  });

}

/**
 * Template string tag for HTML escaping
 */
function escape(strings, ...values) {

  return MAGIC_FLAG + strings.map((string, i) => {
    
    return string + (values[i] === undefined ? '' : htmlEscape(values[i]));

  }).join('');

}

/**
 * Remove the magic flags
 */
function render(html) {

  return html.toString().replace(FLAG_REGEX, '');
  
}

export default {
  escape,
  render
};
