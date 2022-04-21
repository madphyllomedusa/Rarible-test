import type * as ApiClient from "@rarible/api-client";
import type { RequestCurrency, RequestCurrencyAssetType } from "./domain";
export declare function getCurrencyAssetType(currency: RequestCurrency): RequestCurrencyAssetType;
export declare function isRequestCurrencyAssetType(x: RequestCurrency): x is ApiClient.CurrencyId;
export declare function isAssetType(x: RequestCurrency): x is RequestCurrencyAssetType;
export declare function convertCurrencyIdToAssetType(id: ApiClient.CurrencyId): RequestCurrencyAssetType;
export declare function getDataFromCurrencyId(id: ApiClient.CurrencyId): {
    blockchain: ApiClient.Blockchain;
    contract: string;
    tokenId: string;
};
export declare const XTZ: ApiClient.CurrencyId;
