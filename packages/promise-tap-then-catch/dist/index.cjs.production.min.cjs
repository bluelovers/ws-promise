"use strict";

function _tapHandler(e) {
  return async (a, ...t) => (await e(a, ...t), a);
}

function _tapCatchHandler(...e) {
  return async (a, ...t) => {
    const p = e.pop();
    return e.length && !e.some((e => a instanceof e)) || await p(a, ...t), Promise.reject(a);
  };
}

function promiseTapThen(e, a) {
  return e.then(_tapHandler(a));
}

function promiseTapCatch(e, ...a) {
  return e.catch(_tapCatchHandler(...a));
}

function promiseTapThenCatch(e, a, t) {
  return e = promiseTapThen(e, a), void 0 !== t ? promiseTapCatch(e, t) : e;
}

function promiseTapLazyBoth(e, a, t) {
  return promiseTapThenCatch(e, a, null != t ? t : a);
}

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports._tapCatchHandler = _tapCatchHandler, exports._tapHandler = _tapHandler, 
exports.default = promiseTapLazyBoth, exports.promiseTapCatch = promiseTapCatch, 
exports.promiseTapLazyBoth = promiseTapLazyBoth, exports.promiseTapThen = promiseTapThen, 
exports.promiseTapThenCatch = promiseTapThenCatch;
//# sourceMappingURL=index.cjs.production.min.cjs.map
