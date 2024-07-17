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
exports.sendPasswordResetEmail = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const nodemailer_1 = __importDefault(require("nodemailer"));
// Load the HTML email template
const templatePath = path_1.default.join(__dirname, "../..", "src", "templates", "reset-password-email.html");
const emailTemplate = fs_1.default.readFileSync(templatePath, "utf-8");
const sendPasswordResetEmail = (email, resetToken, fullName, expireIn) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    const resetLink = `${process.env.FRONTEND_URL}/auth/reset-password/${resetToken}`;
    const mailOptions = {
        from: `Abyssinia Homes, ${process.env.EMAIL_USER}`,
        to: email,
        subject: "Password Reset Request",
        html: emailTemplate
            .replace("{{fullName}}", fullName.split(" ")[0])
            .replace("{{resetLink}}", resetLink)
            .replace("{{expireIn}}", expireIn || "1 hour"),
    };
    const res = yield transporter.sendMail(mailOptions);
    return res;
});
exports.sendPasswordResetEmail = sendPasswordResetEmail;
