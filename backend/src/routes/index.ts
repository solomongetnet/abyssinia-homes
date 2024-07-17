import { Router } from "express";
import authRouter from "./auth.routes";
import accountRouter from "./account.routes";
import profileRouter from "./profile.routes";
import propertyRoutes from "./property.routes";
import userRouter from "./user.routes";
import agentRouter from "./agent.routes";
import favoriteRoutes from "./favorite.routes";
import adminRouter from "./admin.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/account", accountRouter);
router.use("/property", propertyRoutes);
router.use("/favorite", favoriteRoutes);
router.use("/profile", profileRouter);
router.use("/user", userRouter);
router.use("/agent", agentRouter);
router.use("/admin", adminRouter);

const rootRouter = router;
export default rootRouter;
