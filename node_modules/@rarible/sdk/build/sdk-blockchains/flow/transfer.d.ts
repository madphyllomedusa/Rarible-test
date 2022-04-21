import { Action } from "@rarible/action";
import { BlockchainFlowTransaction } from "@rarible/sdk-transaction";
import type { FlowSdk } from "@rarible/flow-sdk";
import type { FlowNetwork } from "@rarible/flow-sdk/build/types";
import type { PrepareTransferRequest, TransferRequest } from "../../types/nft/transfer/domain";
export declare class FlowTransfer {
    private sdk;
    private network;
    constructor(sdk: FlowSdk, network: FlowNetwork);
    transfer(prepare: PrepareTransferRequest): Promise<{
        multiple: boolean;
        maxAmount: import("@rarible/types/build/big-number").BigNumber;
        submit: Action<"transfer", Omit<TransferRequest, "amount">, BlockchainFlowTransaction>;
    }>;
}
