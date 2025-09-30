"use strict";
/**
 * Created by user on 2020/5/6.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.supportAllSettled = supportAllSettled;
function supportAllSettled(lib) {
    // @ts-ignore
    return typeof lib.allSettled === 'function';
}
//# sourceMappingURL=supportAllSettled.js.map