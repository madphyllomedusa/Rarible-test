import type { OrderId } from "@rarible/api-client";
import type { IBlockchainTransaction } from "@rarible/sdk-transaction";
import type { Action } from "@rarible/action";
export declare type CancelOrderRequest = {
    orderId: OrderId;
};
export declare type ICancel = Action<"send-tx", CancelOrderRequest, IBlockchainTransaction>;
