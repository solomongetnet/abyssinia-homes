"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const users_model_1 = __importDefault(require("../models/users.model"));
const property_model_1 = __importDefault(require("../models/property.model"));
const addToFavorite = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = req.user._id;
    const user = yield users_model_1.default.findById(userId).select("+favorites");
    const property = yield property_model_1.default.findById(req.params.propertyId);
    if (!property) {
        res.status(404);
        throw new Error("Property not found");
    }
    if (!((_a = user === null || user === void 0 ? void 0 : user.favorites) === null || _a === void 0 ? void 0 : _a.includes(req.params.propertyId))) {
        const result = yield users_model_1.default.findOneAndUpdate(userId, {
            $push: { favorites: property._id },
        }, { new: true });
        res.json({ message: "Added to favorite successfully" });
        return;
    }
    res.status(400).json({ message: "Added before" });
}));
const removeFromFavorite = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userId = req.user._id;
    const user = yield users_model_1.default.findById(userId).select("+favorites");
    const propertyId = req.params.propertyId;
    if ((_b = user === null || user === void 0 ? void 0 : user.favorites) === null || _b === void 0 ? void 0 : _b.includes(propertyId)) {
        yield users_model_1.default.findOneAndUpdate(userId, {
            $pull: { favorites: propertyId },
        });
        res.json({ message: "Removed from favorite successfully" });
        return;
    }
    res.json({ message: "Removed before" });
}));
const getFavoriteProperties = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const UserDoc = yield users_model_1.default.findById(req.user._id).select("favorites");
    const favorites = yield property_model_1.default.find({
        _id: { $in: UserDoc.favorites },
    })
        .limit(limit * 1)
        .skip((page - 1) * limit);
    const count = yield property_model_1.default.find({
        _id: { $in: UserDoc.favorites },
    }).countDocuments();
    res.json({
        favorites,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        totalCount: count,
    });
}));
const favoriteController = {
    addToFavorite,
    removeFromFavorite,
    getFavoriteProperties,
};
exports.default = favoriteController;
