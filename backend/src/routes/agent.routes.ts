import { Router } from "express";
import agentController from "../controller/agent.controller";

const router = Router();

router.get("/", agentController.getAgents);
router.get("/single/:agentUsername", agentController.getSingleAgent);
router.get("/properties/:agentUsername", agentController.getAgentProperties);
router.get("/recent", agentController.getRecentAgents);
router.get("/feature", agentController.getFeatureAgents);

const agentRouter = router;
export default agentRouter;
