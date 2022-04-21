"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthereumBurn = void 0;
var tslib_1 = require("tslib");
var action_1 = require("@rarible/action");
var types_1 = require("@rarible/types");
var sdk_transaction_1 = require("@rarible/sdk-transaction");
var common_1 = require("./common");
var EthereumBurn = /** @class */ (function () {
    function EthereumBurn(sdk, network) {
        this.sdk = sdk;
        this.network = network;
        this.burn = this.burn.bind(this);
    }
    EthereumBurn.prototype.burn = function (prepare) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, domain, contract, tokenId, item, collection;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!prepare.itemId) {
                            throw new Error("ItemId has not been specified");
                        }
                        _a = tslib_1.__read(prepare.itemId.split(":"), 3), domain = _a[0], contract = _a[1], tokenId = _a[2];
                        if (!(0, common_1.isEVMBlockchain)(domain)) {
                            throw new Error("Not an ethereum item: ".concat(prepare.itemId));
                        }
                        return [4 /*yield*/, this.sdk.apis.nftItem.getNftItemById({
                                itemId: "".concat(contract, ":").concat(tokenId),
                            })];
                    case 1:
                        item = _b.sent();
                        return [4 /*yield*/, this.sdk.apis.nftCollection.getNftCollectionById({
                                collection: item.contract,
                            })];
                    case 2:
                        collection = _b.sent();
                        return [2 /*return*/, {
                                multiple: collection.type === "ERC1155",
                                maxAmount: item.supply,
                                submit: action_1.Action.create({
                                    id: "burn",
                                    run: function (request) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                        var amount, tx;
                                        return tslib_1.__generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    amount = (request === null || request === void 0 ? void 0 : request.amount) !== undefined ? (0, types_1.toBigNumber)(request.amount.toFixed()) : undefined;
                                                    return [4 /*yield*/, this.sdk.nft.burn({
                                                            assetType: {
                                                                contract: item.contract,
                                                                tokenId: item.tokenId,
                                                            },
                                                            amount: amount,
                                                            creators: (0, common_1.toEthereumParts)(request === null || request === void 0 ? void 0 : request.creators),
                                                        })];
                                                case 1:
                                                    tx = _a.sent();
                                                    return [2 /*return*/, tx && new sdk_transaction_1.BlockchainEthereumTransaction(tx, this.network)];
                                            }
                                        });
                                    }); },
                                }),
                            }];
                }
            });
        });
    };
    return EthereumBurn;
}());
exports.EthereumBurn = EthereumBurn;
