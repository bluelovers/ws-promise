"use strict";
/**
 * Created by user on 2020/5/6.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.supportAllSettled = void 0;
function supportAllSettled(lib) {
    // @ts-ignore
    return typeof lib.allSettled === 'function';
}
exports.supportAllSettled = supportAllSettled;
//# sourceMappingURL=supportAllSettled.js.map