import type { RaribleSdk } from "@rarible/protocol-ethereum-sdk";
import { Action } from "@rarible/action";
import type { Address, ContractAddress, UnionAddress } from "@rarible/types";
import { BlockchainEthereumTransaction } from "@rarible/sdk-transaction";
import type { EthereumNetwork } from "@rarible/protocol-ethereum-sdk/build/types";
import type { CreateCollectionRequest, EthereumCreateCollectionAsset } from "../../types/nft/deploy/domain";
import type { CreateEthereumCollectionResponse } from "./common";
export declare class EthereumCreateCollection {
    private sdk;
    private network;
    private readonly blockchain;
    constructor(sdk: RaribleSdk, network: EthereumNetwork);
    convertOperatorsAddresses(operators: UnionAddress[]): Address[];
    private convertResponse;
    startCreateCollection(asset: EthereumCreateCollectionAsset): Promise<CreateEthereumCollectionResponse>;
    createCollection: Action<"send-tx", CreateCollectionRequest<import("../../types/nft/deploy/domain").CreateCollectionBlockchains>, {
        tx: BlockchainEthereumTransaction;
        address: ContractAddress;
    }>;
}
