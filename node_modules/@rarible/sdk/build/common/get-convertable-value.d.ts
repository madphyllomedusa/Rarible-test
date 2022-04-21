import type { UnionAddress } from "@rarible/types";
import type { BigNumberValue } from "@rarible/utils";
import BigNumber from "bignumber.js";
import type { GetConvertableValueResult } from "../types/order/bid/domain";
import type { RequestCurrency, RequestCurrencyAssetType } from "./domain";
export declare function getCommonConvertableValue(getBalance: (address: UnionAddress, currency: RequestCurrency) => Promise<BigNumberValue>, walletAddress: UnionAddress, valueWithFee: BigNumber, from: RequestCurrencyAssetType, to: RequestCurrencyAssetType): Promise<GetConvertableValueResult>;
