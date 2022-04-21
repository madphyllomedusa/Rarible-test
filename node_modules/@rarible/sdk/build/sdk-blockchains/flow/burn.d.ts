import type { FlowSdk } from "@rarible/flow-sdk";
import type { FlowNetwork } from "@rarible/flow-sdk/build/types";
import type { PrepareBurnRequest, PrepareBurnResponse } from "../../types/nft/burn/domain";
export declare class FlowBurn {
    private sdk;
    private network;
    constructor(sdk: FlowSdk, network: FlowNetwork);
    burn(prepare: PrepareBurnRequest): Promise<PrepareBurnResponse>;
}
