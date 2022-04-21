import type { FlowSdk } from "@rarible/flow-sdk";
import type * as OrderCommon from "../../types/order/common";
import type { CurrencyType } from "../../common/domain";
import type { PrepareBidRequest, PrepareBidResponse, PrepareBidUpdateResponse } from "../../types/order/bid/domain";
export declare class FlowBid {
    private sdk;
    static supportedCurrencies: CurrencyType[];
    constructor(sdk: FlowSdk);
    private getConvertableValue;
    bid(prepare: PrepareBidRequest): Promise<PrepareBidResponse>;
    update(prepareRequest: OrderCommon.PrepareOrderUpdateRequest): Promise<PrepareBidUpdateResponse>;
}
