import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import userController from "../controller/user.controller";
import { roleChecker } from "../helper/role";

const router = Router();

router.get(
  "/",
  authenticateToken,
  roleChecker(["admin"]),
  userController.fetchAllUsers
);
router.delete(
  "/:userId",
  authenticateToken,
  roleChecker(["admin"]),
  userController.deleteUser
);
router.get("/dashboard", authenticateToken, userController.fetchDashboard);
router.get(
  "/properties_analysis",
  authenticateToken,
  userController.propertiesAnalysis
);
const userRouter = router;
export default userRouter;
