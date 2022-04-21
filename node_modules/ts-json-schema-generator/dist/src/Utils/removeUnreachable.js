"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUnreachable = void 0;
function addReachable(definition, definitions, reachable) {
    if (typeof definition === "boolean") {
        return;
    }
    if (definition.$ref) {
        const typeName = decodeURIComponent(definition.$ref.slice(14));
        if (reachable.has(typeName)) {
            return;
        }
        reachable.add(typeName);
        addReachable(definitions[typeName], definitions, reachable);
    }
    else if (definition.anyOf) {
        for (const def of definition.anyOf) {
            addReachable(def, definitions, reachable);
        }
    }
    else if (definition.allOf) {
        for (const def of definition.allOf) {
            addReachable(def, definitions, reachable);
        }
    }
    else if (definition.oneOf) {
        for (const def of definition.oneOf) {
            addReachable(def, definitions, reachable);
        }
    }
    else if (definition.not) {
        addReachable(definition.not, definitions, reachable);
    }
    else if (definition.type === "object") {
        for (const prop in definition.properties || {}) {
            const propDefinition = definition.properties[prop];
            addReachable(propDefinition, definitions, reachable);
        }
        const additionalProperties = definition.additionalProperties;
        if (additionalProperties) {
            addReachable(additionalProperties, definitions, reachable);
        }
    }
    else if (definition.type === "array") {
        const items = definition.items;
        if (Array.isArray(items)) {
            for (const item of items) {
                addReachable(item, definitions, reachable);
            }
        }
        else if (items) {
            addReachable(items, definitions, reachable);
        }
    }
}
function removeUnreachable(rootTypeDefinition, definitions) {
    if (!rootTypeDefinition) {
        return definitions;
    }
    const reachable = new Set();
    addReachable(rootTypeDefinition, definitions, reachable);
    const out = {};
    for (const def of reachable) {
        out[def] = definitions[def];
    }
    return out;
}
exports.removeUnreachable = removeUnreachable;
//# sourceMappingURL=removeUnreachable.js.map