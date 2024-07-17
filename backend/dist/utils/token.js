"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const generateAccessToken = (payload, expiresIn) => {
    return jsonwebtoken_1.default.sign({ userId: payload.userId, role: payload.role }, accessTokenSecret, {
        expiresIn: expiresIn || "20m",
    });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (userId, expiresIn) => {
    return jsonwebtoken_1.default.sign({ userId }, refreshTokenSecret, {
        expiresIn: expiresIn || "30d",
    });
};
exports.generateRefreshToken = generateRefreshToken;
const generateToken = (round) => {
    return crypto_1.default.randomBytes(round || 20).toString("hex");
};
exports.generateToken = generateToken;
