"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNewProperty = void 0;
const validateNewProperty = (body) => {
    let error = undefined;
    if (!body.title ||
        !body.description ||
        !body.builtYear ||
        !body.propertyType ||
        !body.propertyStatus ||
        !body.price.amount ||
        !body.price.currency ||
        !body.location.country ||
        !body.location.city ||
        !body.location.address ||
        !body.size) {
        error = "Invalid Request";
    }
    else {
        error = undefined;
    }
    return { error };
};
exports.validateNewProperty = validateNewProperty;
