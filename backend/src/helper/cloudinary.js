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
exports.extractPublicIdFromUrl = exports.uploader = void 0;
const path_1 = __importDefault(require("path"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const url_1 = __importDefault(require("url"));
const uploader = (path, folder) => __awaiter(void 0, void 0, void 0, function* () { return yield cloudinary_1.default.uploader.upload(path, { folder }); });
exports.uploader = uploader;
// Function to extract public_id from secure_url
const extractPublicIdFromUrl = (secureUrl, folderName) => {
    const parsedUrl = url_1.default.parse(secureUrl);
    const pathComponents = parsedUrl.pathname.split("/");
    // The public_id in Cloudinary is typically the second last component in the path
    if (pathComponents.length >= 2) {
        const witouthExt = path_1.default.basename(pathComponents[pathComponents.length - 1], path_1.default.extname(pathComponents[pathComponents.length - 1]));
        return folderName + "/" + witouthExt;
    }
    else {
        return null;
    }
};
exports.extractPublicIdFromUrl = extractPublicIdFromUrl;
