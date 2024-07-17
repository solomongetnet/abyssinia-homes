"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controller/auth.controller"));
const router = (0, express_1.Router)();
router.post("/signup", auth_controller_1.default.register);
router.post("/login", auth_controller_1.default.login);
router.get("/refresh-token", auth_controller_1.default.refreshToken);
router.post("/logout", auth_controller_1.default.logout);
router.post("/forgot-password", auth_controller_1.default.forgotPassword);
router.post("/reset-password/:resetToken", auth_controller_1.default.resetPassword);
const authRouter = router;
exports.default = authRouter;
