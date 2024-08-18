"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FORCE_LAYOUT_TYPE_MAP = exports.LAYOUT_MESSAGE = void 0;
/** layout message type */
exports.LAYOUT_MESSAGE = {
    // run layout
    RUN: "LAYOUT_RUN",
    // layout ended with success
    END: "LAYOUT_END",
    // layout error
    ERROR: "LAYOUT_ERROR",
    // layout tick, used in force directed layout
    TICK: "LAYOUT_TICK",
    GPURUN: "GPU_LAYOUT_RUN",
    GPUEND: "GPU_LAYOUT_END"
};
exports.FORCE_LAYOUT_TYPE_MAP = {
    'gForce': true,
    'force2': true,
    'fruchterman': true,
    'forceAtlas2': true,
    'force': true,
    'graphin-force': true,
};
//# sourceMappingURL=constants.js.map