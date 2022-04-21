"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthereumTokenId = void 0;
var tslib_1 = require("tslib");
var common_1 = require("./common");
var EthereumTokenId = /** @class */ (function () {
    function EthereumTokenId(sdk) {
        this.sdk = sdk;
        this.generateTokenId = this.generateTokenId.bind(this);
    }
    EthereumTokenId.prototype.generateTokenId = function (_a) {
        var collection = _a.collection, minter = _a.minter;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var nftTokenId;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.sdk.apis.nftCollection.generateNftTokenId({
                            collection: (0, common_1.convertToEthereumAddress)(collection),
                            minter: (0, common_1.convertToEthereumAddress)(minter),
                        })];
                    case 1:
                        nftTokenId = _b.sent();
                        return [2 /*return*/, {
                                tokenId: nftTokenId.tokenId.toString(),
                                signature: nftTokenId.signature,
                            }];
                }
            });
        });
    };
    return EthereumTokenId;
}());
exports.EthereumTokenId = EthereumTokenId;
