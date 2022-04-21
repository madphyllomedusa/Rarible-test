import type { FlowSdk } from "@rarible/flow-sdk";
import type { FlowNetwork } from "@rarible/flow-sdk/build/types";
import type { IApisSdk } from "../../domain";
import type { PrepareFillRequest, PrepareFillResponse } from "../../types/order/fill/domain";
export declare class FlowBuy {
    private sdk;
    private readonly apis;
    private network;
    constructor(sdk: FlowSdk, apis: IApisSdk, network: FlowNetwork);
    private getPreparedOrder;
    private getFlowNftContract;
    private getFlowCurrency;
    buy(request: PrepareFillRequest): Promise<PrepareFillResponse>;
}
