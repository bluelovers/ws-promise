"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allSettled = allSettled;
const tslib_1 = require("tslib");
///<reference lib="es2020" />
const bluebird_1 = tslib_1.__importDefault(require("bluebird"));
const normalizePromiseSettledResult_1 = require("./lib/normalizePromiseSettledResult");
const profilly_1 = require("./lib/profilly");
function allSettled(values, options) {
    var _a;
    // @ts-ignore
    return (0, profilly_1.profillyBluebirdInspection)((_a = options === null || options === void 0 ? void 0 : options.promise) !== null && _a !== void 0 ? _a : bluebird_1.default)(values)
        .map(promise => (0, normalizePromiseSettledResult_1.normalizePromiseSettledResult)(promise));
}
exports.default = allSettled;
//# sourceMappingURL=index.js.map