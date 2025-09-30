"use strict";

function promiseDelay(e, t) {
  return new Promise((function(o) {
    setTimeout((function() {
      o(t);
    }), e);
  }));
}

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = promiseDelay, exports.promiseDelay = promiseDelay, exports.promiseDelayReject = function promiseDelayReject(e, t) {
  return new Promise((function(o, r) {
    setTimeout((function() {
      r(t);
    }), e);
  }));
};
//# sourceMappingURL=index.cjs.production.min.cjs.map
