import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import profileController from "../controller/profile.controller";
import fileUpload from "express-fileupload";

const router = Router();

router.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/", // Use in-memory storage
  })
);

router.put("/avatar", authenticateToken, profileController.updateAvatar);

router.delete("/avatar", authenticateToken, profileController.removeAvatar);

router.put(
  "/information",
  authenticateToken,
  profileController.updateInformation
);
router.put("/email", authenticateToken, profileController.updateEmail);
router.put(
  "/socialMedia",
  authenticateToken,
  profileController.updateSocialMedia
);
router.put("/avatar", authenticateToken, profileController.updateAvatar);

const profileRouter = router;
export default profileRouter;
