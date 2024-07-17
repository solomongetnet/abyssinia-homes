"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const agent_controller_1 = __importDefault(require("../controller/agent.controller"));
const router = (0, express_1.Router)();
router.get("/", agent_controller_1.default.getAgents);
router.get("/single/:agentUsername", agent_controller_1.default.getSingleAgent);
router.get("/properties/:agentUsername", agent_controller_1.default.getAgentProperties);
router.get("/recent", agent_controller_1.default.getRecentAgents);
const agentRouter = router;
exports.default = agentRouter;
