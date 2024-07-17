"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
// Configure Multer storage
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        if (fs_1.default.existsSync("./src/uploads")) {
            cb(null, "./src/uploads");
        }
        else {
            fs_1.default.mkdir("./src/uploads", (err) => {
                if (err)
                    return;
                cb(null, "./src/uploads");
            });
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + Math.floor(Math.random() * 100 * 200));
    },
});
exports.upload = (0, multer_1.default)({ storage });
