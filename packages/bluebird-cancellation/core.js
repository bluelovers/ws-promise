"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BluebirdCancellation = exports.BluebirdOrigin = void 0;
const tslib_1 = require("tslib");
const bluebird_1 = (0, tslib_1.__importDefault)(require("bluebird"));
exports.BluebirdOrigin = bluebird_1.default;
exports.BluebirdCancellation = bluebird_1.default.getNewLibraryCopy();
exports.BluebirdCancellation.config({
    cancellation: true
});
exports.default = exports.BluebirdCancellation;
//# sourceMappingURL=core.js.map