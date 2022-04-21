import type { RaribleSdk } from "@rarible/protocol-ethereum-sdk";
import type { GenerateTokenIdRequest, TokenId } from "../../types/nft/generate-token-id";
export declare class EthereumTokenId {
    private readonly sdk;
    constructor(sdk: RaribleSdk);
    generateTokenId({ collection, minter }: GenerateTokenIdRequest): Promise<TokenId>;
}
