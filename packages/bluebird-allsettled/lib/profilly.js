"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profillyBluebirdInspection = profillyBluebirdInspection;
const supportAllSettled_1 = require("./supportAllSettled");
const cache = new WeakMap();
function profillyBluebirdInspection(lib) {
    if ((0, supportAllSettled_1.supportAllSettled)(lib)) {
        return lib.allSettled;
    }
    if (!cache.has(lib)) {
        const fn = (values) => lib.all(values.map((promise) => {
            var _a, _b, _c;
            if (lib.is(promise)) {
                return (_c = (_b = (_a = promise).reflect) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : lib.resolve(promise).reflect();
            }
            throw new TypeError(`promise not a PromiseLike, ${promise}`);
        }));
        cache.set(lib, fn);
    }
    return cache.get(lib);
}
//# sourceMappingURL=profilly.js.map