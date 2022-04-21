import type { ItemId, UnionAddress } from "@rarible/types";
export declare type CanTransferResult = {
    success: true;
} | {
    success: false;
    reason: string;
};
export declare type IRestrictionSdk = {
    canTransfer: (itemId: ItemId, from: UnionAddress, to: UnionAddress) => Promise<CanTransferResult>;
};
