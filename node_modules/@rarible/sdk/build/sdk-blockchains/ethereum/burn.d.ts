import type { RaribleSdk } from "@rarible/protocol-ethereum-sdk";
import { Action } from "@rarible/action";
import { BlockchainEthereumTransaction } from "@rarible/sdk-transaction";
import type { EthereumNetwork } from "@rarible/protocol-ethereum-sdk/build/types";
import type { BurnRequest, PrepareBurnRequest } from "../../types/nft/burn/domain";
export declare class EthereumBurn {
    private sdk;
    private network;
    constructor(sdk: RaribleSdk, network: EthereumNetwork);
    burn(prepare: PrepareBurnRequest): Promise<{
        multiple: boolean;
        maxAmount: import("@rarible/types").BigNumber;
        submit: Action<"burn", BurnRequest, void | BlockchainEthereumTransaction>;
    }>;
}
