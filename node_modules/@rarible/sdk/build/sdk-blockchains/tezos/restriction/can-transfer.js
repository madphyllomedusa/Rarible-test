"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TezosCanTransfer = void 0;
var tslib_1 = require("tslib");
var common_1 = require("../common");
var TezosCanTransfer = /** @class */ (function () {
    function TezosCanTransfer(provider) {
        this.provider = provider;
        this.canTransfer = this.canTransfer.bind(this);
    }
    TezosCanTransfer.prototype.canTransfer = function (itemId, from, to) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var provider, parsed, contract, tokenId, body, response, result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        provider = (0, common_1.getRequiredProvider)(this.provider);
                        parsed = itemId.split(":");
                        contract = parsed[1];
                        tokenId = parsed[2];
                        body = {
                            "chain_id": "NetXZSsxBpMQeAT",
                            "contract": contract,
                            "entrypoint": "can_transfer",
                            "gas": "100000",
                            "input": {
                                "prim": "Pair",
                                "args": [
                                    { "int": tokenId },
                                    {
                                        "prim": "Pair",
                                        "args": [
                                            { "string": (0, common_1.convertUnionAddress)(from) },
                                            { "string": (0, common_1.convertUnionAddress)(to) },
                                        ],
                                    },
                                ],
                            },
                            "payer": this.provider.config.transfer_proxy,
                            "source": this.provider.config.transfer_proxy,
                            "unparsing_mode": "Readable",
                        };
                        return [4 /*yield*/, window.fetch("".concat(provider.tezos.tk.rpc.getRpcUrl(), "/chains/main/blocks/head/helpers/scripts/run_view"), {
                                method: "POST",
                                headers: {
                                    "Accept": "application/json",
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(body),
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        result = _a.sent();
                        if (result.data.string === "") {
                            return [2 /*return*/, { success: true }];
                        }
                        return [2 /*return*/, { success: false, reason: getReasonMessage(result.data.string) }];
                }
            });
        });
    };
    return TezosCanTransfer;
}());
exports.TezosCanTransfer = TezosCanTransfer;
var REASONS_MESSAGES = {
    "ARCHETYPE_QUOTA_REACHED": "You have reached the maximum amount of Digits you can own of this Edition, " +
        "please visit [quartz.ubisoft.com](https://quartz.ubisoft.com) for more information.",
    "TO_RESTRICTED": "You can't trade this Digit at the moment, please visit " +
        "[quartz.ubisoft.com](https://quartz.ubisoft.com) for more information.",
};
function getReasonMessage(code) {
    if (!(code in REASONS_MESSAGES)) {
        return REASONS_MESSAGES["TO_RESTRICTED"];
    }
    return REASONS_MESSAGES[code];
}
