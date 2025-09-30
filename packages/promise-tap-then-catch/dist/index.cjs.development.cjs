'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * @see https://github.com/sindresorhus/p-tap#ptaptaphandler
 */
function _tapHandler(handler) {
  return async (value, ...argv) => {
    await handler(value, ...argv);
    return value;
  };
}
/**
 * @see https://github.com/sindresorhus/p-tap#ptapcatchtaphandler
 */
function _tapCatchHandler(...inputs) {
  return async (value, ...argv) => {
    const handler = inputs.pop();
    if (!inputs.length || inputs.some(ec => value instanceof ec)) {
      await handler(value, ...argv);
    }
    return Promise.reject(value);
  };
}
/**
 * Essentially like .then(), except that the value passed in is the value returned.
 * @see http://bluebirdjs.com/docs/api/tap.html
 */
function promiseTapThen(promise, handler) {
  return promise.then(_tapHandler(handler));
}
/**
 * .tapCatch is a convenience method for reacting to errors without handling them with promises - similar to finally but only called on rejections. Useful for logging errors.
 * @see http://bluebirdjs.com/docs/api/tapCatch.html
 */
function promiseTapCatch(promise, ...inputs) {
  return promise.catch(_tapCatchHandler(...inputs));
}
function promiseTapThenCatch(promise, handlerThen, handlerCatch) {
  promise = promiseTapThen(promise, handlerThen);
  if (typeof handlerCatch !== 'undefined') {
    return promiseTapCatch(promise, handlerCatch);
  }
  return promise;
}
function promiseTapLazyBoth(promise, handlerThen, handlerCatch) {
  return promiseTapThenCatch(promise, handlerThen, handlerCatch !== null && handlerCatch !== void 0 ? handlerCatch : handlerThen);
}

exports._tapCatchHandler = _tapCatchHandler;
exports._tapHandler = _tapHandler;
exports.default = promiseTapLazyBoth;
exports.promiseTapCatch = promiseTapCatch;
exports.promiseTapLazyBoth = promiseTapLazyBoth;
exports.promiseTapThen = promiseTapThen;
exports.promiseTapThenCatch = promiseTapThenCatch;
//# sourceMappingURL=index.cjs.development.cjs.map
