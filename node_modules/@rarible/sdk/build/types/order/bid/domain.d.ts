import type { AssetType, CollectionId, CurrencyId } from "@rarible/api-client";
import type { BigNumberValue } from "@rarible/utils";
import type { PrepareOrderRequest, PrepareOrderResponse, PrepareOrderUpdateRequest, PrepareOrderUpdateResponse, UnionPart } from "../common";
export declare type PrepareBidResponse = PrepareOrderResponse & GetConvertableValueFunction;
export declare type PrepareBidUpdateResponse = PrepareOrderUpdateResponse & GetConvertableValueFunction;
export declare type GetConvertableValueFunction = {
    getConvertableValue(request: GetConvertableValueRequest): Promise<GetConvertableValueResult>;
};
export declare type GetConvertableValueRequest = {
    assetType?: AssetType;
    currencyId?: CurrencyId;
    price: BigNumberValue;
    amount: number;
    originFees: UnionPart[];
};
export declare type GetConvertableValueResult = {
    type: "insufficient" | "convertable";
    currency: AssetType;
    value: BigNumberValue;
} | undefined;
export declare type IBid = (request: PrepareBidRequest) => Promise<PrepareBidResponse>;
export declare type IBidUpdate = (request: PrepareOrderUpdateRequest) => Promise<PrepareBidUpdateResponse>;
export declare type PrepareBidRequest = PrepareOrderRequest | {
    collectionId: CollectionId;
};
export declare type ConvertCurrencyRequest = {
    price: BigNumberValue;
};
