import type { RaribleSdk } from "@rarible/protocol-ethereum-sdk";
import { Action } from "@rarible/action";
import { BlockchainEthereumTransaction } from "@rarible/sdk-transaction";
import type { EthereumNetwork } from "@rarible/protocol-ethereum-sdk/build/types";
import type { PrepareTransferRequest, TransferRequest } from "../../types/nft/transfer/domain";
export declare class EthereumTransfer {
    private sdk;
    private network;
    constructor(sdk: RaribleSdk, network: EthereumNetwork);
    transfer(prepare: PrepareTransferRequest): Promise<{
        multiple: boolean;
        maxAmount: import("@rarible/types").BigNumber;
        submit: Action<"transfer", TransferRequest, BlockchainEthereumTransaction>;
    }>;
}
