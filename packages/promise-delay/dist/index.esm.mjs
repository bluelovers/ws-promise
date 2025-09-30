function promiseDelay(e, n) {
  return new Promise((function(o) {
    setTimeout((function() {
      o(n);
    }), e);
  }));
}

function promiseDelayReject(e, n) {
  return new Promise((function(o, t) {
    setTimeout((function() {
      t(n);
    }), e);
  }));
}

export { promiseDelay as default, promiseDelay, promiseDelayReject };
//# sourceMappingURL=index.esm.mjs.map
