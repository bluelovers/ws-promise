function _tapHandler(handler) {
  return async (value, ...argv) => {
    await handler(value, ...argv);
    return value;
  };
}
function _tapCatchHandler(...inputs) {
  return async (value, ...argv) => {
    const handler = inputs.pop();

    if (!inputs.length || inputs.some(ec => value instanceof ec)) {
      await handler(value, ...argv);
    }

    return Promise.reject(value);
  };
}
function promiseTapThen(promise, handler) {
  return promise.then(_tapHandler(handler));
}
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

export { _tapCatchHandler, _tapHandler, promiseTapLazyBoth as default, promiseTapCatch, promiseTapLazyBoth, promiseTapThen, promiseTapThenCatch };
//# sourceMappingURL=index.esm.mjs.map
