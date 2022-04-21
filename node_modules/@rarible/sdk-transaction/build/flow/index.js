"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainFlowTransaction = void 0;
var tslib_1 = require("tslib");
var api_client_1 = require("@rarible/api-client");
var BlockchainFlowTransaction = /** @class */ (function () {
    function BlockchainFlowTransaction(transaction, network) {
        this.transaction = transaction;
        this.network = network;
        this.blockchain = api_client_1.Blockchain.FLOW;
    }
    BlockchainFlowTransaction.prototype.hash = function () {
        return this.transaction.txId;
    };
    BlockchainFlowTransaction.prototype.wait = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, {
                        blockchain: this.blockchain,
                        hash: this.transaction.txId,
                    }];
            });
        });
    };
    BlockchainFlowTransaction.prototype.getTxLink = function () {
        switch (this.network) {
            case "mainnet": return "https://flowscan.org/transaction/".concat(this.hash());
            case "testnet": return "https://testnet.flowscan.org/".concat(this.hash());
            case "emulator": return "";
            default: throw new Error("Unsupported transaction network");
        }
    };
    return BlockchainFlowTransaction;
}());
exports.BlockchainFlowTransaction = BlockchainFlowTransaction;
