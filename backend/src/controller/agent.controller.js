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
const property_model_1 = __importDefault(require("../models/property.model"));
const getAgents = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const sort = Number(req.query.sort) || -1;
    const search = req.query.search || "";
    const agents = yield users_model_1.default.find({
        role: "agent",
        $or: [
            { email: { $regex: search, $options: "i" } },
            { username: { $regex: search, $options: "i" } },
            { fullName: { $regex: search, $options: "i" } },
        ],
    })
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: sort });
    const count = yield users_model_1.default.find({
        role: "agent",
        $or: [
            { email: { $regex: search, $options: "i" } },
            { username: { $regex: search, $options: "i" } },
            { fullName: { $regex: search, $options: "i" } },
        ],
    }).countDocuments();
    res.json({
        agents,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        totalCount: count,
    });
}));
const getSingleAgent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const agentUsername = req.params.agentUsername;
    const agentData = yield users_model_1.default.findOne({
        username: agentUsername,
    }).populate("properties");
    if (!agentData) {
        res.status(404);
        throw new Error("We can't found this agent");
    }
    res.json(agentData);
}));
const getAgentProperties = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const agentUsername = req === null || req === void 0 ? void 0 : req.params.agentUsername;
    const agentDoc = yield users_model_1.default.findOne({
        username: agentUsername,
    }).select("_id");
    const properties = yield property_model_1.default.find({ author: agentDoc._id });
    res.json(properties);
}));
const getRecentAgents = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = Number(req.query.limit) || 5;
    const recentAgents = yield users_model_1.default.find({ role: "agent" })
        .sort({ createdAt: -1 })
        .limit(limit).select('fullName avatar email username properties ');
    res.json(recentAgents);
}));
const agentController = {
    getAgents,
    getSingleAgent,
    getAgentProperties,
    getRecentAgents,
};
exports.default = agentController;
