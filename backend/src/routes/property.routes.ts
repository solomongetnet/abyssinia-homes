import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import propertiesController from "../controller/property.controller";
import { jsonParser } from "../middleware/parser";
import { roleChecker } from "../helper/role";

const router = Router();


router.get("/", propertiesController.getProperties);
router.get("/nearby", propertiesController.getNearbyProperties);
router.get("/features", propertiesController.getFeaturesProperties);
router.get("/single/:id", propertiesController.getSingleProperty);
router.post(
  "/",
  authenticateToken,
  jsonParser("data"),
  roleChecker(["agent", "admin"], "Agent only can post new property!"),
  propertiesController.createProperty
);
router.put("/edit/:id", authenticateToken, propertiesController.updateProperty);
router.delete(
  "/delete/:id",
  authenticateToken,
  propertiesController.deleteProperty
);
router.get(
  "/my_properties",
  authenticateToken,
  propertiesController.getMyProperties
);

const propertyRoutes = router;
export default propertyRoutes;
