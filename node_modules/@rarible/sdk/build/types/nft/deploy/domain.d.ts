import type * as ApiClient from "@rarible/api-client";
import type { IBlockchainTransaction } from "@rarible/sdk-transaction";
import type { ContractAddress, UnionAddress } from "@rarible/types";
import type { Action } from "@rarible/action";
export declare type CreateCollectionRequest<T extends CreateCollectionBlockchains = CreateCollectionBlockchains> = {
    blockchain: T;
    asset: CreateCollectionAsset[T];
};
export interface CreateCollectionAsset extends Record<CreateCollectionBlockchains, DeployTokenAsset> {
    [ApiClient.Blockchain.ETHEREUM]: EthereumCreateCollectionAsset;
    [ApiClient.Blockchain.TEZOS]: TezosCreateCollectionTokenAsset;
    [ApiClient.Blockchain.SOLANA]: SolanaCreateCollectionTokenAsset;
}
export declare type CreateCollectionBlockchains = ApiClient.Blockchain.ETHEREUM | ApiClient.Blockchain.POLYGON | ApiClient.Blockchain.TEZOS | ApiClient.Blockchain.SOLANA;
export declare type DeployTokenAsset = EthereumCreateCollectionAsset | TezosCreateCollectionTokenAsset | SolanaCreateCollectionTokenAsset;
export declare type SolanaCreateCollectionTokenAsset = {
    arguments: {
        metadataURI: string;
    };
};
export declare type TezosCreateCollectionTokenAsset = {
    assetType: "NFT" | "MT";
    arguments: {
        name: string;
        symbol: string;
        contractURI: string;
        isUserToken: boolean;
    };
};
export declare type EthereumCreateCollectionAsset = {
    assetType: "ERC721" | "ERC1155";
    arguments: CreatePrivateCollectionArguments | CreatePublicCollectionArguments;
};
export declare type CreatePublicCollectionArguments = {
    name: string;
    symbol: string;
    baseURI: string;
    contractURI: string;
    isUserToken: false;
};
export declare type CreatePrivateCollectionArguments = Omit<CreatePublicCollectionArguments, "isUserToken"> & {
    isUserToken: true;
    operators: UnionAddress[];
};
export declare type CreateCollectionResponse = {
    tx: IBlockchainTransaction;
    address: ContractAddress;
};
export declare type ICreateCollection = Action<"send-tx", CreateCollectionRequest, CreateCollectionResponse>;
