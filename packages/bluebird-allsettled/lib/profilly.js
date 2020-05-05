"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profillyBluebirdInspection = void 0;
const supportAllSettled_1 = require("./supportAllSettled");
const cache = new WeakMap();
function profillyBluebirdInspection(lib) {
    if (supportAllSettled_1.supportAllSettled(lib)) {
        return lib.allSettled;
    }
    if (!cache.has(lib)) {
        const fn = (values) => values.map(promise => {
            var _a, _b, _c;
            if (lib.is(promise)) {
                return (_c = (_b = (_a = promise).reflect) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : lib.resolve(promise).reflect();
            }
            throw new TypeError(`promise not a PromiseLike, ${promise}`);
        });
        cache.set(lib, fn);
    }
    return cache.get(lib);
}
exports.profillyBluebirdInspection = profillyBluebirdInspection;
//# sourceMappingURL=profilly.js.map