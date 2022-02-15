function promiseTapThen(promise, handler) {
  return promise.then(async (value, ...argv) => {
    await handler(value, ...argv);
    return value;
  });
}
function promiseTapCatch(promise, ...inputs) {
  return promise.catch(async (value, ...argv) => {
    const handler = inputs.pop();

    if (!inputs.length || inputs.some(ec => value instanceof ec)) {
      await handler(value, ...argv);
    }

    return Promise.reject(value);
  });
}
function promiseTapThenCatch(promise, handlerThen, handlerCatch) {
  promise = promiseTapThen(promise, handlerThen);

  if (typeof handlerCatch !== 'undefined') {
    return promiseTapCatch(promise, handlerCatch);
  }

  return promise;
}

export { promiseTapThenCatch as default, promiseTapCatch, promiseTapThen, promiseTapThenCatch };
//# sourceMappingURL=index.esm.mjs.map
