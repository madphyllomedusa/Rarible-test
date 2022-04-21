"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractPublicKey = exports.extractAddress = void 0;
var solana_common_1 = require("@rarible/solana-common");
function extractAddress(address) {
    return address.slice(address.indexOf(":") + 1);
}
exports.extractAddress = extractAddress;
function extractPublicKey(address) {
    return (0, solana_common_1.toPublicKey)(extractAddress(address));
}
exports.extractPublicKey = extractPublicKey;
