"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const account_controller_1 = __importDefault(require("../controller/account.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.get("/me", auth_middleware_1.authenticateToken, account_controller_1.default === null || account_controller_1.default === void 0 ? void 0 : account_controller_1.default.fetchMyAccount);
router.put("/changePassword", auth_middleware_1.authenticateToken, account_controller_1.default === null || account_controller_1.default === void 0 ? void 0 : account_controller_1.default.changePassword);
const accountRouter = router;
exports.default = accountRouter;
