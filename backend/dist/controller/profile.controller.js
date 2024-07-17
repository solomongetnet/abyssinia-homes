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
const promises_1 = require("fs/promises");
const cloudinary_1 = require("../helper/cloudinary");
const cloudinary_2 = __importDefault(require("../config/cloudinary"));
const updateAvatar = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = req.user._id;
    // remove avatar is user have avatar before
    if (!!req.user.avatar) {
        const publicId = (0, cloudinary_1.extractPublicIdFromUrl)(req.user.avatar, "avatar");
        yield cloudinary_2.default.api.delete_resources(publicId);
    }
    // get path from request then upload using custom function the get newPath from cloudinary
    const path = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
    const newPath = yield (0, cloudinary_1.uploader)(path, "avatar");
    // Remove from this server after uploaded on cloudinary
    yield (0, promises_1.unlink)(path);
    yield users_model_1.default.findByIdAndUpdate(userId, { avatar: newPath.secure_url });
    res.json({ message: "Avatar Updated Successfully" });
}));
const removeAvatar = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    if (!req.user.avatar) {
        res.status(400);
        throw new Error("There is no avatar to remove!");
    }
    // Extract public key from scure url and delete avatar
    const publicId = (0, cloudinary_1.extractPublicIdFromUrl)(req.user.avatar, "avatar");
    yield cloudinary_2.default.uploader.destroy(publicId);
    yield users_model_1.default.findByIdAndUpdate(userId, { avatar: "" });
    res.json({ message: "Avatar removed successfully" });
}));
const updateInformation = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.fullName) || !((_b = req.body) === null || _b === void 0 ? void 0 : _b.phoneNumber) || !((_c = req.body) === null || _c === void 0 ? void 0 : _c.username)) {
        res.status(400);
        throw new Error("Invalid Request");
    }
    const userDoc = yield users_model_1.default.find({
        username: req.body.username,
    });
    yield users_model_1.default.findByIdAndUpdate(req === null || req === void 0 ? void 0 : req.user._id, Object.assign({}, req.body), { new: true });
    res.json({ message: "Information Updated Successfull" });
}));
const updateEmail = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    const newEmail = req.body.email;
    const oldEmail = req.user.email;
    if (!newEmail) {
        res.status(400);
        throw new Error("Email Address Is Required");
    }
    if (newEmail === oldEmail) {
        res.status(400);
        throw new Error("Please Make Change");
    }
    const isEmailTaken = yield users_model_1.default.findOne({
        email: newEmail,
    });
    if (isEmailTaken) {
        res.status(409);
        throw new Error("Email Already Taken Please Make Change");
    }
    const updated = yield users_model_1.default.findByIdAndUpdate(userId, {
        $set: { email: newEmail },
    }, { new: true });
    res.json({ message: "Email Updated Successfull" });
}));
const updateSocialMedia = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield users_model_1.default.findByIdAndUpdate(req.user._id, {
        socialMedia: Object.assign({}, req.body),
    });
    res.json({ message: "Social Media Updated Successfull" });
}));
const profileController = {
    updateAvatar,
    removeAvatar,
    updateSocialMedia,
    updateEmail,
    updateInformation,
};
exports.default = profileController;
