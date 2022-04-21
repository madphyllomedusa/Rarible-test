"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TupleType = void 0;
const BaseType_1 = require("./BaseType");
class TupleType extends BaseType_1.BaseType {
    constructor(types) {
        super();
        this.types = types;
    }
    getId() {
        return `[${this.types.map((item) => { var _a; return (_a = item === null || item === void 0 ? void 0 : item.getId()) !== null && _a !== void 0 ? _a : "never"; }).join(",")}]`;
    }
    getTypes() {
        return this.types;
    }
}
exports.TupleType = TupleType;
//# sourceMappingURL=TupleType.js.map