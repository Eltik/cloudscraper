"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zlib = __importStar(require("zlib"));
const decompress_1 = __importDefault(require("brotli/decompress"));
const brotli = {
    isAvailable: false,
};
function optional(require) {
    try {
        brotli.decompress = function (buf) {
            // eslint-disable-next-line no-undef
            return Buffer.from((0, decompress_1.default)(buf));
        };
        return typeof decompress_1.default === "function";
    }
    catch (error) {
        // Don't throw an exception if the module is not installed
        if (error.code !== "MODULE_NOT_FOUND") {
            throw error;
        }
    }
    return false;
}
// Check for node's built-in brotli support
if (typeof zlib.brotliDecompressSync === "function") {
    brotli.decompress = function (buf) {
        return zlib.brotliDecompressSync(buf);
    };
    brotli.isAvailable = true;
    // eslint-disable-next-line no-undef
}
else if (optional(require)) {
    brotli.isAvailable = true;
}
exports.default = brotli;
