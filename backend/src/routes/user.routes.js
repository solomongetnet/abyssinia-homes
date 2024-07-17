"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const role_1 = require("../helper/role");
const router = (0, express_1.Router)();
router.get("/", auth_middleware_1.authenticateToken, (0, role_1.roleChecker)(["admin"]), user_controller_1.default.fetchAllUsers);
router.delete("/:userId", auth_middleware_1.authenticateToken, (0, role_1.roleChecker)(["admin"]), user_controller_1.default.deleteUser);
router.get("/dashboard", auth_middleware_1.authenticateToken, user_controller_1.default.fetchDashboard);
router.get("/properties_analysis", auth_middleware_1.authenticateToken, user_controller_1.default.propertiesAnalysis);
const userRouter = router;
exports.default = userRouter;
