"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
require("colors");
const error_handler_1 = __importDefault(require("./middleware/error-handler"));
const not_found_1 = require("./middleware/not-found");
const routes_1 = __importDefault(require("./routes"));
const db_1 = __importDefault(require("./config/db"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const server = (0, express_1.default)();
// Middleware
server.use(express_1.default.static("public"));
server.use((0, helmet_1.default)());
server.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
server.use((0, cookie_parser_1.default)());
server.use(express_1.default.json());
server.get("/", (req, res) => {
    res.json({
        message: "Server is running",
    });
});
// Custom Middlewares
server.use((req, res, next) => {
    console.log(req.url);
    next();
});
server.use(routes_1.default);
server.use(not_found_1.notFound);
server.use(error_handler_1.default);
const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Server is runnig on http://localhost:${PORT}.`.bgBlue.white);
    // Connecting Database After Connection Of Server
    (0, db_1.default)();
});
