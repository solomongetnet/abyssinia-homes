import { Router,  } from "express";
import authController from "../controller/auth.controller";

const router = Router();

router.post("/signup", authController.register);
router.post("/login", authController.login);
router.get("/refresh-token", authController.refreshToken);
router.post("/logout", authController.logout);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password/:resetToken", authController.resetPassword);

const authRouter = router;
export default authRouter;
