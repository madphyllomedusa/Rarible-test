import type * as ApiClient from "@rarible/api-client";
import type { Action } from "@rarible/action";
export declare type CurrencyType = {
    blockchain: ApiClient.Blockchain;
    type: CurrencySubType;
};
export declare type CurrencySubType = "NATIVE" | "ERC20" | "TEZOS_FT";
export interface AbstractPrepareResponse<Id, In, Out> {
    submit: Action<Id, In, Out>;
}
export declare type RequestCurrency = ApiClient.CurrencyId | RequestCurrencyAssetType;
export declare type RequestCurrencyAssetType = ApiClient.EthErc20AssetType | ApiClient.EthEthereumAssetType | ApiClient.FlowAssetTypeFt | ApiClient.TezosXTZAssetType | ApiClient.TezosFTAssetType | ApiClient.SolanaNftAssetType | ApiClient.SolanaSolAssetType;
