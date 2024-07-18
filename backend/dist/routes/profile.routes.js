"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const profile_controller_1 = __importDefault(require("../controller/profile.controller"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const router = (0, express_1.Router)();
router.use((0, express_fileupload_1.default)({
    useTempFiles: true,
    tempFileDir: "/tmp/", // Use in-memory storage
}));
router.put("/avatar", auth_middleware_1.authenticateToken, profile_controller_1.default.updateAvatar);
router.delete("/avatar", auth_middleware_1.authenticateToken, profile_controller_1.default.removeAvatar);
router.put("/information", auth_middleware_1.authenticateToken, profile_controller_1.default.updateInformation);
router.put("/email", auth_middleware_1.authenticateToken, profile_controller_1.default.updateEmail);
router.put("/socialMedia", auth_middleware_1.authenticateToken, profile_controller_1.default.updateSocialMedia);
router.put("/avatar", auth_middleware_1.authenticateToken, profile_controller_1.default.updateAvatar);
const profileRouter = router;
exports.default = profileRouter;
