"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XTZ = exports.getDataFromCurrencyId = exports.convertCurrencyIdToAssetType = exports.isAssetType = exports.isRequestCurrencyAssetType = exports.getCurrencyAssetType = void 0;
var tslib_1 = require("tslib");
var types_1 = require("@rarible/types");
var api_client_1 = require("@rarible/api-client");
var types_2 = require("@rarible/types");
var common_1 = require("../sdk-blockchains/ethereum/common");
function getCurrencyAssetType(currency) {
    if (isRequestCurrencyAssetType(currency)) {
        return convertCurrencyIdToAssetType(currency);
    }
    else if (isAssetType(currency)) {
        return currency;
    }
    else {
        throw new Error("Unrecognized RequestCurrency ".concat(JSON.stringify(currency)));
    }
}
exports.getCurrencyAssetType = getCurrencyAssetType;
function isRequestCurrencyAssetType(x) {
    return typeof x === "string" && !!(0, types_1.toCurrencyId)(x);
}
exports.isRequestCurrencyAssetType = isRequestCurrencyAssetType;
function isAssetType(x) {
    return typeof x === "object" && "@type" in x;
}
exports.isAssetType = isAssetType;
function convertCurrencyIdToAssetType(id) {
    var _a = getDataFromCurrencyId(id), blockchain = _a.blockchain, contract = _a.contract, tokenId = _a.tokenId;
    if ((0, common_1.isEVMBlockchain)(blockchain)) {
        if (contract === types_1.ZERO_ADDRESS) {
            return {
                "@type": "ETH",
                blockchain: blockchain,
            };
        }
        return {
            "@type": "ERC20",
            contract: (0, types_2.toContractAddress)("".concat(blockchain, ":").concat(contract)),
        };
    }
    if (blockchain === api_client_1.Blockchain.FLOW) {
        return {
            "@type": "FLOW_FT",
            contract: (0, types_2.toContractAddress)(id),
        };
    }
    if (blockchain === api_client_1.Blockchain.TEZOS) {
        if (id === exports.XTZ) {
            return {
                "@type": "XTZ",
            };
        }
        return {
            "@type": "TEZOS_FT",
            contract: (0, types_2.toContractAddress)("TEZOS:".concat(contract)),
            tokenId: tokenId ? (0, types_2.toBigNumber)(tokenId) : undefined,
        };
    }
    if (blockchain === api_client_1.Blockchain.SOLANA) {
        if (contract === types_1.ZERO_ADDRESS) {
            return {
                "@type": "SOLANA_SOL",
            };
        }
        return {
            "@type": "SOLANA_NFT",
            itemId: (0, types_1.toItemId)("SOLANA:" + contract),
        };
    }
    throw new Error("Unsupported currency type: ".concat(id));
}
exports.convertCurrencyIdToAssetType = convertCurrencyIdToAssetType;
function getDataFromCurrencyId(id) {
    var _a = tslib_1.__read(id.split(":"), 3), blockchain = _a[0], contract = _a[1], tokenId = _a[2];
    if (!(blockchain in api_client_1.Blockchain)) {
        throw new Error("Unsupported blockchain: ".concat(id));
    }
    return {
        blockchain: blockchain,
        contract: contract,
        tokenId: tokenId,
    };
}
exports.getDataFromCurrencyId = getDataFromCurrencyId;
exports.XTZ = "TEZOS:tz1Ke2h7sDdakHJQh8WX4Z372du1KChsksyU";
