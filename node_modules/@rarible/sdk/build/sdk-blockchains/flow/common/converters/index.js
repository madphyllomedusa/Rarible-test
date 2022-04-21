"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertFlowUnionAddress = exports.convertFlowCollectionId = exports.convertFlowContractAddress = exports.convertFlowItemId = exports.convertFlowOrderId = exports.toFlowParts = exports.convertToFlowAddress = exports.getFungibleTokenName = exports.parseOrderId = exports.parseFlowAddressFromUnionAddress = exports.parseFlowItemIdFromUnionItemId = exports.getFlowCollection = void 0;
var tslib_1 = require("tslib");
var flow_sdk_1 = require("@rarible/flow-sdk");
var api_client_1 = require("@rarible/api-client");
var types_1 = require("@rarible/types");
var blockchains_1 = require("@rarible/types/build/blockchains");
var bn_1 = require("@rarible/utils/build/bn");
var FLOW_COLLECTION_REGEXP = /^FLOW:A\.0*x*[0-9a-f]{16}\.[A-Za-z_]{3,}/;
/**
 * Get flow collection from union collection
 * @param collection - e.g. "FLOW:A.0xabcdef0123456789.ContractName", contract address can be unprefixed
 */
function getFlowCollection(collection) {
    if (FLOW_COLLECTION_REGEXP.test(collection)) {
        var raw = collection.split(":")[1];
        return (0, flow_sdk_1.toFlowContractAddress)(raw);
    }
    throw new Error("Invalid collection");
}
exports.getFlowCollection = getFlowCollection;
var FLOW_ITEM_ID_REGEXP = /^FLOW:A\.0*x*[0-9a-f]{16}\.[A-Za-z]{3,}:[0-9]{1,}/;
/**
 * Parse union item id
 * @param unionItemId - e.g. "FLOW:A.0xabcdef0123456789.ContractName:123", contract address can be unprefixed
 * @returns blockchain, collectionId, itemId
 */
function parseFlowItemIdFromUnionItemId(unionItemId) {
    if (FLOW_ITEM_ID_REGEXP.test(unionItemId)) {
        var _a = tslib_1.__read(unionItemId.split(":"), 3), blockchain = _a[0], collectionId = _a[1], itemId = _a[2];
        if (!collectionId) {
            throw new Error("Invalid collection id, identifier is empty");
        }
        if (!itemId) {
            throw new Error("Invalid item id, identifier is empty");
        }
        if (blockchain === api_client_1.Blockchain.FLOW) {
            return {
                blockchain: api_client_1.Blockchain.FLOW,
                contract: (0, flow_sdk_1.toFlowContractAddress)(collectionId),
                itemId: itemId,
            };
        }
        throw new Error("Invalid item id, \"".concat(blockchain, "\" is not FLOW item"));
    }
    throw new Error("Invalid item ID");
}
exports.parseFlowItemIdFromUnionItemId = parseFlowItemIdFromUnionItemId;
var FLOW_MAKER_ID_REGEXP = /^FLOW:0*x*[0-9a-f]{16}/;
/**
 * Get maker account address
 * @param maker - "FLOW:0xabcdef0123456789", address can be unprefixed
 */
function parseFlowAddressFromUnionAddress(maker) {
    if (FLOW_MAKER_ID_REGEXP.test(maker)) {
        return (0, types_1.toFlowAddress)(maker.split(":")[1]);
    }
    throw new Error("Invalid maker");
}
exports.parseFlowAddressFromUnionAddress = parseFlowAddressFromUnionAddress;
var FLOW_ORDER_ID_REGEXP = /^FLOW:[0-9]{1,}/;
/**
 *
 * @param id - "FLOW:{any count of digits}"
 */
function parseOrderId(id) {
    if (FLOW_ORDER_ID_REGEXP.test(id)) {
        return parseInt(id.split(":")[1]);
    }
    throw new Error("Invalid order ID");
}
exports.parseOrderId = parseOrderId;
var FLOW_FT_CONTRACT_REGEXP = /^FLOW:A\.0*x*[0-9a-f]{16}\.[A-Za-z]{3,}/;
/**
 * Get fungible token name
 * @param contract - e.g. "FLOW:A.0xabcdef0123456789.ContractName", contract address can be unprefixed
 */
function getFungibleTokenName(contract) {
    if (FLOW_FT_CONTRACT_REGEXP.test(contract)) {
        var _a = tslib_1.__read(contract.split("."), 3), name_1 = _a[2];
        switch (name_1) {
            case "FlowToken":
                return "FLOW";
            case "FUSD":
                return "FUSD";
            default:
                throw new Error("Unsupported contract ID: ".concat(contract));
        }
    }
    throw new Error("Unsupported contract ID: ".concat(contract));
}
exports.getFungibleTokenName = getFungibleTokenName;
function convertToFlowAddress(contractAddress) {
    if (!(0, blockchains_1.isBlockchainSpecified)(contractAddress)) {
        throw new Error("Not a union or contract address: " + contractAddress);
    }
    var _a = tslib_1.__read(contractAddress.split(":"), 2), blockchain = _a[0], address = _a[1];
    if (blockchain !== api_client_1.Blockchain.FLOW) {
        throw new Error("Not an Flow address");
    }
    return (0, types_1.toFlowAddress)(address);
}
exports.convertToFlowAddress = convertToFlowAddress;
function toFlowParts(parts) {
    return (parts === null || parts === void 0 ? void 0 : parts.map(function (p) {
        return {
            account: convertToFlowAddress(p.account),
            value: (0, types_1.toBigNumber)((0, bn_1.toBn)(p.value).dividedBy(10000).toString()),
        };
    })) || [];
}
exports.toFlowParts = toFlowParts;
function convertFlowOrderId(orderId) {
    return (0, types_1.toOrderId)("".concat(api_client_1.Blockchain.FLOW, ":").concat(orderId));
}
exports.convertFlowOrderId = convertFlowOrderId;
function convertFlowItemId(itemId) {
    return (0, types_1.toItemId)("".concat(api_client_1.Blockchain.FLOW, ":").concat(itemId));
}
exports.convertFlowItemId = convertFlowItemId;
function convertFlowContractAddress(contractAddress) {
    return (0, types_1.toContractAddress)("".concat(api_client_1.Blockchain.FLOW, ":").concat(contractAddress));
}
exports.convertFlowContractAddress = convertFlowContractAddress;
function convertFlowCollectionId(contractAddress) {
    return (0, types_1.toCollectionId)("".concat(api_client_1.Blockchain.FLOW, ":").concat(contractAddress));
}
exports.convertFlowCollectionId = convertFlowCollectionId;
function convertFlowUnionAddress(address) {
    return (0, types_1.toUnionAddress)("".concat(api_client_1.Blockchain.FLOW, ":").concat(address));
}
exports.convertFlowUnionAddress = convertFlowUnionAddress;
