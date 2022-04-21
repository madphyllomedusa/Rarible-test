import { Blockchain } from "@rarible/api-client";
import type { EthereumTransaction } from "@rarible/ethereum-provider";
import type { EthereumNetwork } from "@rarible/protocol-ethereum-sdk/build/types";
import type { IBlockchainTransaction } from "../domain";
export declare class BlockchainEthereumTransaction implements IBlockchainTransaction {
    transaction: EthereumTransaction;
    network: EthereumNetwork;
    blockchain: Blockchain;
    constructor(transaction: EthereumTransaction, network: EthereumNetwork);
    private getBlockchain;
    hash(): import("@rarible/api-client").Word;
    wait(): Promise<{
        blockchain: Blockchain;
        hash: import("@rarible/api-client").Word;
    }>;
    getTxLink(): string;
}
