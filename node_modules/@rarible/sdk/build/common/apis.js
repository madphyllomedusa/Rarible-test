"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApisSdk = void 0;
var tslib_1 = require("tslib");
var ApiClient = tslib_1.__importStar(require("@rarible/api-client"));
var config_1 = require("../config");
function createApisSdk(env, params) {
    if (params === void 0) { params = {}; }
    var config = (0, config_1.getSdkConfig)(env);
    var configuration = new ApiClient.Configuration(tslib_1.__assign({ basePath: config.basePath }, params));
    return {
        collection: new ApiClient.CollectionControllerApi(configuration),
        currency: new ApiClient.CurrencyControllerApi(configuration),
        auction: new ApiClient.AuctionControllerApi(configuration),
        item: new ApiClient.ItemControllerApi(configuration),
        ownership: new ApiClient.OwnershipControllerApi(configuration),
        order: new ApiClient.OrderControllerApi(configuration),
        activity: new ApiClient.ActivityControllerApi(configuration),
    };
}
exports.createApisSdk = createApisSdk;
