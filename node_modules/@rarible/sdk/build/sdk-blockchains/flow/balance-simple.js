"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSimpleFlowFungibleBalance = void 0;
var tslib_1 = require("tslib");
var flow_sdk_1 = require("@rarible/flow-sdk");
var env_1 = require("@rarible/flow-sdk/build/config/env");
var bn_1 = require("@rarible/utils/build/bn");
var get_flow_currency_from_asset_type_1 = require("./common/get-flow-currency-from-asset-type");
var converters_1 = require("./common/converters");
function getSimpleFlowFungibleBalance(network, address, assetType) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var flowAddress, currency, balance;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    flowAddress = (0, converters_1.parseFlowAddressFromUnionAddress)(address);
                    currency = (0, get_flow_currency_from_asset_type_1.getFlowCurrencyFromAssetType)(assetType);
                    return [4 /*yield*/, (0, flow_sdk_1.getFungibleBalanceSimple)({
                            network: env_1.ENV_CONFIG[network].network,
                            address: flowAddress,
                            currency: currency,
                        })];
                case 1:
                    balance = _a.sent();
                    return [2 /*return*/, (0, bn_1.toBn)(balance)];
            }
        });
    });
}
exports.getSimpleFlowFungibleBalance = getSimpleFlowFungibleBalance;
