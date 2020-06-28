
/// polyfill for older browsers, aka IE 11
require( 'es6-shim' );
require( 'whatwg-fetch' );

/// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
if (!Array.prototype.includes) {
  Array.prototype.includes = function (searchElement /*, fromIndex*/ ) {
    let O = Object(this);
    let len = parseInt(O.length, 10) || 0;
    if (len === 0) {
      return false;
    }
    let n = parseInt(arguments[1], 10) || 0;
    let k;
    if (n >= 0) {
      k = n;
    } else {
      k = len + n;
      if (k < 0) {k = 0;}
    }
    let currentElement;
    while (k < len) {
      currentElement = O[k];
      if (searchElement === currentElement ||
         (searchElement !== searchElement && currentElement !== currentElement)) { // NaN !== NaN
        return true;
      }
      k++;
    }
    return false;
  };
}
