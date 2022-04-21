import type { FlowSdk } from "@rarible/flow-sdk";
import type { FlowNetwork } from "@rarible/flow-sdk/build/types";
import type { IApisSdk } from "../../domain";
import type { ICancel } from "../../types/order/cancel/domain";
export declare class FlowCancel {
    private sdk;
    private apis;
    private network;
    constructor(sdk: FlowSdk, apis: IApisSdk, network: FlowNetwork);
    readonly cancel: ICancel;
}
