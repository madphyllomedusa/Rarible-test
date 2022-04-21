"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFlowBaseFee = void 0;
function getFlowBaseFee(sdk) {
    return parseInt(sdk.order.getProtocolFee().sellerFee.value);
}
exports.getFlowBaseFee = getFlowBaseFee;
