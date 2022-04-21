import type { FlowSdk } from "@rarible/flow-sdk";
import type { FlowNetwork } from "@rarible/flow-sdk/build/types";
import type { PrepareMintResponse } from "../../types/nft/mint/domain";
import type { PrepareMintRequest } from "../../types/nft/mint/prepare-mint-request.type";
import type { IApisSdk } from "../../domain";
import type { CommonTokenMetadataResponse, PreprocessMetaRequest } from "../../types/nft/mint/preprocess-meta";
export declare class FlowMint {
    private readonly sdk;
    private readonly apis;
    private network;
    constructor(sdk: FlowSdk, apis: IApisSdk, network: FlowNetwork);
    prepare(prepareRequest: PrepareMintRequest): Promise<PrepareMintResponse>;
    preprocessMeta(meta: PreprocessMetaRequest): CommonTokenMetadataResponse;
}
