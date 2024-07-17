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
const token_1 = require("../utils/token");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const send_password_reset_email_1 = require("../helper/send-password-reset-email");
const register = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, fullName, password, email, phoneNumber } = req.body;
    // Check If Request Is invalid
    if (!username || !fullName || !password || !email || !phoneNumber) {
        res.status(400);
        throw new Error("Invalid Request");
    }
    // Check If Username Was Taken
    const isUsernameTaken = yield users_model_1.default.exists({ username });
    if (isUsernameTaken) {
        res.status(400);
        throw new Error("Username Is Aleardy Taken");
    }
    // Check If Email Was Taken
    const isEmailTaken = yield users_model_1.default.exists({ email });
    if (isEmailTaken) {
        res.status(400);
        throw new Error("This Email Is Aleardy Registerd");
    }
    // Check If Phone Number Was Taken
    const isPhoneNumberTaken = yield users_model_1.default.exists({ phoneNumber });
    if (isPhoneNumberTaken) {
        res.status(400);
        throw new Error("This Phone number Is Aleardy Registerd");
    }
    // Hashing Password
    const salt = bcryptjs_1.default === null || bcryptjs_1.default === void 0 ? void 0 : bcryptjs_1.default.genSaltSync(10);
    const hashedPassword = bcryptjs_1.default.hashSync(password, salt);
    const newUser = yield users_model_1.default.create(Object.assign(Object.assign({}, req.body), { password: hashedPassword, role: req.body.role || "user" }));
    if (!newUser) {
        throw new Error("Something Went Wrong Please Try Again");
    }
    res.status(201).json({ message: "Your Account Created Successfully" });
}));
const login = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Check If Request Is Valid
    if (!email || !password) {
        res.status(400);
        throw new Error("Invalid Request");
    }
    // Know If User Is Exists
    // If User exists Retriev User Doc
    const UserDoc = yield users_model_1.default.findOne({ email }, "role email password");
    if (!UserDoc) {
        res.status(404);
        throw new Error("Email or Passowrd are wrong");
    }
    // Check If Requested Password is correct
    const hashedPass = UserDoc === null || UserDoc === void 0 ? void 0 : UserDoc.password;
    const isPassOk = bcryptjs_1.default.compareSync(req.body.password, hashedPass);
    if (!isPassOk) {
        res.status(400);
        throw new Error("Email or Passowrd are wrong");
    }
    // Generate Token then Send Refresh Token Via Cookie and send  accessToken as a response
    const refreshToken = (0, token_1.generateRefreshToken)(UserDoc._id);
    const accessToken = (0, token_1.generateAccessToken)({
        userId: UserDoc._id,
        role: UserDoc.role,
    });
    // Set refresh token as a HTTP-only cookie
    res
        .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    })
        .json({ token: accessToken, message: "Login Successfully" });
}));
const refreshToken = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get refresh token from httpOnly Cookie and check it is available
    const _refreshToken = req.cookies.refreshToken;
    if (!_refreshToken) {
        res.status(401);
        return;
    }
    // Decoded the resfresh token to get result
    const decoded = jsonwebtoken_1.default.verify(_refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const userDoc = yield users_model_1.default.findById(decoded === null || decoded === void 0 ? void 0 : decoded.userId).select('role');
    if (!userDoc) {
        res.status(401);
        throw new Error("Can't find this account");
    }
    // Generate new accessToke then send for the client in as a json
    const accessToken = (0, token_1.generateAccessToken)({
        userId: decoded.userId,
        role: userDoc.role,
    });
    res.json({ token: accessToken });
}));
const logout = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("refreshToken").json({ message: "Logout Successfull" });
}));
const forgotPassword = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    if (!email) {
        res.status(400);
        throw new Error("Email is requried");
    }
    const user = yield users_model_1.default.findOne({ email });
    if (!user) {
        res.status(404);
        throw new Error("User by this email not found");
    }
    // Generate reset token and expiry
    const resetToken = (0, token_1.generateToken)(40);
    user.resetToken = resetToken;
    user.resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour
    yield user.save();
    // Send email with password reset link
    try {
        yield (0, send_password_reset_email_1.sendPasswordResetEmail)(user.email, resetToken, user.fullName);
        res.json({ message: "Password reset link sent to gmail" });
    }
    catch (err) {
        res.status(500).json({ message: "Some error occured please try again" });
    }
}));
const resetPassword = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newPassword = req.body.newPassword;
    const resetToken = req.params.resetToken;
    if (!newPassword) {
        res.status(400);
        throw new Error("New password is required!");
    }
    if (!resetToken) {
        res.status(400);
        throw new Error("Invaild request");
    }
    // Check token is expire and if it is available
    const user = yield users_model_1.default.findOne({
        resetToken,
        resetTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
        res.status(400);
        throw new Error("Reset token is invalid or has expired please try again");
    }
    // Hashing password
    const salt = bcryptjs_1.default === null || bcryptjs_1.default === void 0 ? void 0 : bcryptjs_1.default.genSaltSync(10);
    const hashedPassword = bcryptjs_1.default.hashSync(newPassword, salt);
    // Update user's password andd remove resetToken from user document
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    yield user.save();
    res.status(200).json({ message: "Password reset successfully" });
}));
const authController = {
    register,
    login,
    refreshToken,
    logout,
    forgotPassword,
    resetPassword,
};
exports.default = authController;
