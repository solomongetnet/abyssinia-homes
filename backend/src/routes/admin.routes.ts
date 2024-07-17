import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import { roleChecker } from "../helper/role";
import adminController from "../controller/admin-controller";

const router = Router();

router.get(
  "/dashboard",
  authenticateToken,
  roleChecker(["admin"]),
  adminController.fetchDashboard
);
router.get(
  "/properties_analysis",
  authenticateToken,
  roleChecker(["admin"]),
  adminController.propertiesAnalysis
);



const adminRouter = router;
export default adminRouter;
