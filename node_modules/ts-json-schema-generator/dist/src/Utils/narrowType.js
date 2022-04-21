"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.narrowType = void 0;
const EnumType_1 = require("../Type/EnumType");
const UnionType_1 = require("../Type/UnionType");
const derefType_1 = require("./derefType");
function narrowType(type, predicate) {
    const derefed = derefType_1.derefType(type);
    if (derefed instanceof UnionType_1.UnionType || derefed instanceof EnumType_1.EnumType) {
        let changed = false;
        const types = [];
        for (const sub of derefed.getTypes()) {
            const derefedSub = derefType_1.derefType(sub);
            const narrowed = narrowType(derefedSub, predicate);
            if (narrowed !== undefined) {
                if (narrowed === derefedSub) {
                    types.push(sub);
                }
                else {
                    types.push(narrowed);
                    changed = true;
                }
            }
            else {
                changed = true;
            }
        }
        if (changed) {
            if (types.length === 0) {
                return undefined;
            }
            else if (types.length === 1) {
                return types[0];
            }
            else {
                return new UnionType_1.UnionType(types);
            }
        }
        return type;
    }
    return predicate(derefed) ? type : undefined;
}
exports.narrowType = narrowType;
//# sourceMappingURL=narrowType.js.map