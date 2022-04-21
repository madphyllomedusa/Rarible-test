import type { ContractAddress, UnionAddress } from "@rarible/types";
import type { ItemId, OrderId } from "@rarible/api-client";
import type { PublicKey } from "@solana/web3.js";
export declare function extractAddress(address: UnionAddress | ContractAddress | OrderId | ItemId | string): string;
export declare function extractPublicKey(address: UnionAddress | ContractAddress | OrderId | ItemId | string): PublicKey;
