"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareFlowRoyalties = void 0;
var bn_1 = require("@rarible/utils/build/bn");
var types_1 = require("@rarible/types");
var converters_1 = require("../converters");
function prepareFlowRoyalties(royalty) {
    if (royalty && royalty.length > 0) {
        return royalty.map(function (r) {
            if ((0, bn_1.toBn)(r.value).gt(10000)) {
                throw new Error("Value for royalty too big");
            }
            var account = (0, converters_1.parseFlowAddressFromUnionAddress)(r.account);
            return {
                account: account,
                value: (0, types_1.toBigNumber)((0, bn_1.toBn)(r.value).div(10000).toString()),
            };
        });
    }
    return [];
}
exports.prepareFlowRoyalties = prepareFlowRoyalties;
