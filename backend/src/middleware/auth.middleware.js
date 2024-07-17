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
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_model_1 = __importDefault(require("../models/users.model"));
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const authenticateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Geting token from authraiztion header or cookies 👇🏼
    const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    // req.cookies.token ||
    if (!token) {
        res.status(403).json({
            message: "Token not available please login again!",
        });
        return;
    }
    try {
        // Decodingtoken 👇🏼
        const decoded = jsonwebtoken_1.default.verify(token, ACCESS_TOKEN_SECRET);
        delete decoded.iat;
        delete decoded.exp;
        // Get user profile then send to next middleware👇🏼
        const userId = decoded.userId;
        const userDoc = yield users_model_1.default.findById(userId).select("+favorites -properties");
        // Check user is available 👇🏼
        if (!userDoc) {
            res.status(401).json({ status: "error", message: "User not found" });
            return;
        }
        // @ts-ignore
        req.user = userDoc;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Please login", err: error === null || error === void 0 ? void 0 : error.message });
    }
});
exports.authenticateToken = authenticateToken;
