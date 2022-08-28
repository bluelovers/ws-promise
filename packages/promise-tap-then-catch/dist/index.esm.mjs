function _tapHandler(a) {
  return async (t, ...e) => (await a(t, ...e), t);
}

function _tapCatchHandler(...a) {
  return async (t, ...e) => {
    const n = a.pop();
    return a.length && !a.some((a => t instanceof a)) || await n(t, ...e), Promise.reject(t);
  };
}

function promiseTapThen(a, t) {
  return a.then(_tapHandler(t));
}

function promiseTapCatch(a, ...t) {
  return a.catch(_tapCatchHandler(...t));
}

function promiseTapThenCatch(a, t, e) {
  return a = promiseTapThen(a, t), void 0 !== e ? promiseTapCatch(a, e) : a;
}

function promiseTapLazyBoth(a, t, e) {
  return promiseTapThenCatch(a, t, null != e ? e : t);
}

export { _tapCatchHandler, _tapHandler, promiseTapLazyBoth as default, promiseTapCatch, promiseTapLazyBoth, promiseTapThen, promiseTapThenCatch };
//# sourceMappingURL=index.esm.mjs.map
