import type { Collection, CollectionId } from "@rarible/api-client";
import type { TokenId } from "../generate-token-id";
export declare type PrepareMintRequest = {
    tokenId?: TokenId;
} & (HasCollection | HasCollectionId);
export declare type HasCollection = {
    collection: Collection;
};
export declare type HasCollectionId = {
    collectionId: CollectionId;
};
