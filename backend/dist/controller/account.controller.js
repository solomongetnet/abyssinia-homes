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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const users_model_1 = __importDefault(require("../models/users.model"));
const fetchMyAccount = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(req.user);
}));
const changePassword = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authUserInfo = req.user;
    if (!req.body.oldPassword) {
        res.status(400).json({ message: "Old password is required!" });
        return;
    }
    const userDoc = yield users_model_1.default.findById(authUserInfo._id, "password");
    const passisValid = bcryptjs_1.default.compareSync(req.body.oldPassword, userDoc === null || userDoc === void 0 ? void 0 : userDoc.password);
    if (!passisValid) {
        res.status(400).json({ message: "Old password is incorrect" });
        return;
    }
    const isSamePass = bcryptjs_1.default.compareSync(req.body.newPassword, userDoc.password);
    if (isSamePass) {
        res.status(400).json({
            message: "Your new password is same to your old password please make change on your new password",
        });
        return;
    }
    const salt = bcryptjs_1.default === null || bcryptjs_1.default === void 0 ? void 0 : bcryptjs_1.default.genSaltSync(10);
    const hashPass = bcryptjs_1.default.hashSync(req.body.newPassword, salt);
    yield users_model_1.default.findByIdAndUpdate(authUserInfo._id, {
        $set: { password: hashPass },
    });
    res.json({ status: "success", message: "Password Change Successull" });
}));
const accountController = {
    fetchMyAccount,
    changePassword,
};
exports.default = accountController;
