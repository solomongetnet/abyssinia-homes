"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const favorite_controller_1 = __importDefault(require("../controller/favorite.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.get("/", auth_middleware_1.authenticateToken, favorite_controller_1.default.getFavoriteProperties);
router.put("/add/:propertyId", auth_middleware_1.authenticateToken, favorite_controller_1.default.addToFavorite);
router.put("/remove/:propertyId", auth_middleware_1.authenticateToken, favorite_controller_1.default.removeFromFavorite);
const favoriteRoutes = router;
exports.default = favoriteRoutes;
