"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrencies = void 0;
var api_client_1 = require("@rarible/api-client");
function getCurrencies() {
    return [{ blockchain: api_client_1.Blockchain.SOLANA, type: "NATIVE" }];
}
exports.getCurrencies = getCurrencies;
