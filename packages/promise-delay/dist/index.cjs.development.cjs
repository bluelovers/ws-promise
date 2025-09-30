'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function promiseDelay(ms, value) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(value);
    }, ms);
  });
}
function promiseDelayReject(ms, value) {
  return new Promise(function (_resolve, reject) {
    setTimeout(function () {
      reject(value);
    }, ms);
  });
}

exports.default = promiseDelay;
exports.promiseDelay = promiseDelay;
exports.promiseDelayReject = promiseDelayReject;
//# sourceMappingURL=index.cjs.development.cjs.map
