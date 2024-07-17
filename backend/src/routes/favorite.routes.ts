import { Router } from "express";
import favoriteController from "../controller/favorite.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

router.get("/", authenticateToken, favoriteController.getFavoriteProperties);

router.put(
  "/add/:propertyId",
  authenticateToken,
  favoriteController.addToFavorite
);

router.put(
  "/remove/:propertyId",
  authenticateToken,
  favoriteController.removeFromFavorite
);

const favoriteRoutes = router;
export default favoriteRoutes;
