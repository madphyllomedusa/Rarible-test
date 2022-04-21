"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnnotatedTypeFormatter = exports.makeNullable = void 0;
const AnnotatedType_1 = require("../Type/AnnotatedType");
function makeNullable(def) {
    const union = def.oneOf || def.anyOf;
    if (union && union.filter((d) => d.type === "null").length === 0) {
        union.push({ type: "null" });
    }
    else if (def.type && def.type !== "object") {
        if (Array.isArray(def.type)) {
            if (def.type.indexOf("null") === -1) {
                def.type.push("null");
            }
        }
        else if (def.type !== "null") {
            def.type = [def.type, "null"];
        }
        if (def.enum && def.enum.indexOf(null) === -1) {
            def.enum.push(null);
        }
    }
    else {
        const subdef = {};
        if ("anyOf" in def) {
            for (const d of def.anyOf) {
                if (d.type === "null") {
                    return def;
                }
            }
        }
        for (const key of Object.keys(def)) {
            if (key !== "description" && key !== "title" && key !== "default") {
                subdef[key] = def[key];
                delete def[key];
            }
        }
        def.anyOf = [subdef, { type: "null" }];
    }
    return def;
}
exports.makeNullable = makeNullable;
class AnnotatedTypeFormatter {
    constructor(childTypeFormatter) {
        this.childTypeFormatter = childTypeFormatter;
    }
    supportsType(type) {
        return type instanceof AnnotatedType_1.AnnotatedType;
    }
    getDefinition(type) {
        const def = {
            ...this.childTypeFormatter.getDefinition(type.getType()),
            ...type.getAnnotations(),
        };
        if ("$ref" in def && "type" in def) {
            delete def["$ref"];
        }
        if (type.isNullable()) {
            return makeNullable(def);
        }
        return def;
    }
    getChildren(type) {
        return this.childTypeFormatter.getChildren(type.getType());
    }
}
exports.AnnotatedTypeFormatter = AnnotatedTypeFormatter;
//# sourceMappingURL=AnnotatedTypeFormatter.js.map