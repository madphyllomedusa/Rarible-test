"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFlowCurrencyFromAssetType = void 0;
var converters_1 = require("./converters");
function getFlowCurrencyFromAssetType(assetType) {
    if (assetType["@type"] === "FLOW_FT") {
        return (0, converters_1.getFungibleTokenName)(assetType.contract);
    }
    throw new Error("Invalid asset type");
}
exports.getFlowCurrencyFromAssetType = getFlowCurrencyFromAssetType;
