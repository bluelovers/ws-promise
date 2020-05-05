"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allSettled = void 0;
///<reference lib="es2020" />
const bluebird_1 = __importDefault(require("bluebird"));
const normalizePromiseSettledResult_1 = require("./lib/normalizePromiseSettledResult");
const profilly_1 = require("./lib/profilly");
function allSettled(values, options) {
    var _a;
    // @ts-ignore
    return profilly_1.profillyBluebirdInspection((_a = options === null || options === void 0 ? void 0 : options.promise) !== null && _a !== void 0 ? _a : bluebird_1.default)(values)
        .map(promise => normalizePromiseSettledResult_1.normalizePromiseSettledResult(promise));
}
exports.allSettled = allSettled;
exports.default = allSettled;
//# sourceMappingURL=index.js.map