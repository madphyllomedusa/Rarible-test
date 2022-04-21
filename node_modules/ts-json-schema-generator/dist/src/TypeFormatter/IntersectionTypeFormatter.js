"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntersectionTypeFormatter = void 0;
const DefinitionType_1 = require("../Type/DefinitionType");
const IntersectionType_1 = require("../Type/IntersectionType");
const allOfDefinition_1 = require("../Utils/allOfDefinition");
const uniqueArray_1 = require("../Utils/uniqueArray");
class IntersectionTypeFormatter {
    constructor(childTypeFormatter) {
        this.childTypeFormatter = childTypeFormatter;
    }
    supportsType(type) {
        return type instanceof IntersectionType_1.IntersectionType;
    }
    getDefinition(type) {
        const types = type.getTypes();
        return types.length > 1
            ? types.reduce(allOfDefinition_1.getAllOfDefinitionReducer(this.childTypeFormatter), {
                type: "object",
                additionalProperties: false,
            })
            : this.childTypeFormatter.getDefinition(types[0]);
    }
    getChildren(type) {
        return uniqueArray_1.uniqueArray(type.getTypes().reduce((result, item) => {
            const slice = item instanceof DefinitionType_1.DefinitionType ? 1 : 0;
            return [...result, ...this.childTypeFormatter.getChildren(item).slice(slice)];
        }, []));
    }
}
exports.IntersectionTypeFormatter = IntersectionTypeFormatter;
//# sourceMappingURL=IntersectionTypeFormatter.js.map