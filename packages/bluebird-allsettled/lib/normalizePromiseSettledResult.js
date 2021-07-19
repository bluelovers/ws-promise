"use strict";
/**
 * Created by user on 2020/5/6.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizePromiseSettledResult = void 0;
function normalizePromiseSettledResult(promise) {
    var _a, _b;
    if ((_a = promise.isFulfilled) === null || _a === void 0 ? void 0 : _a.call(promise)) {
        return {
            status: "fulfilled",
            //reason: void 0 as never,
            value: promise.value(),
        };
    }
    else if ((_b = promise.isRejected) === null || _b === void 0 ? void 0 : _b.call(promise)) {
        return {
            status: "rejected",
            reason: promise.reason(),
            //value: void 0 as never,
        };
    }
    throw new TypeError(`promise not a Bluebird.Inspection, ${promise}`);
}
exports.normalizePromiseSettledResult = normalizePromiseSettledResult;
exports.default = normalizePromiseSettledResult;
//# sourceMappingURL=normalizePromiseSettledResult.js.map