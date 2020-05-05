"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allSettled = void 0;
///<reference lib="es2020" />
const bluebird_1 = __importDefault(require("bluebird"));
function allSettled(values, options) {
    var _a;
    // @ts-ignore
    return ((_a = options === null || options === void 0 ? void 0 : options.promise) !== null && _a !== void 0 ? _a : bluebird_1.default).allSettled(values)
        .map(promise => {
        if (promise.isFulfilled()) {
            return {
                status: "fulfilled",
                //reason: void 0 as never,
                value: promise.value(),
            };
        }
        else {
            return {
                status: "rejected",
                reason: promise.reason(),
            };
        }
    });
}
exports.allSettled = allSettled;
exports.default = allSettled;
//# sourceMappingURL=index.js.map