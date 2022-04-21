import * as web3 from "@solana/web3.js";
export declare function isPublicKey(x: any): x is web3.PublicKey;
export declare function isPrivateKey(x: any): x is web3.Keypair;
export declare function toPublicKey(key: string): web3.PublicKey;
export declare function sleep(ms: number): Promise<void>;
export declare function getUnixTs(): number;
