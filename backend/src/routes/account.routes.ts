import { Router } from "express";
import accountController from "../controller/account.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

router.get("/me", authenticateToken, accountController?.fetchMyAccount);
router.put(
  "/changePassword",
  authenticateToken,
  accountController?.changePassword
);

const accountRouter = router;
export default accountRouter;
