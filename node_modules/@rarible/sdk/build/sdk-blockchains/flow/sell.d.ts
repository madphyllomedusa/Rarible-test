import type { FlowSdk } from "@rarible/flow-sdk";
import type { Order, OrderId } from "@rarible/api-client";
import type * as OrderCommon from "../../types/order/common";
import type { CurrencyType } from "../../common/domain";
import type { IApisSdk } from "../../domain";
import type { PrepareSellInternalResponse } from "../../types/order/sell/domain";
export declare class FlowSell {
    private readonly sdk;
    private readonly apis;
    static supportedCurrencies: CurrencyType[];
    constructor(sdk: FlowSdk, apis: IApisSdk);
    getPreparedOrder(request: OrderId): Promise<Order>;
    sell(): Promise<PrepareSellInternalResponse>;
    update(request: OrderCommon.PrepareOrderUpdateRequest): Promise<OrderCommon.PrepareOrderUpdateResponse>;
}
