import express from "express";
import { AdminController } from "./admin.controller";
import { adminValidationSchemas } from "./admin.validations";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma";

const router = express.Router();

router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AdminController.getAllFromDB
);
router.get(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AdminController.getSingleIdFromDB
);
router.patch(
  "/:id",
  validateRequest(adminValidationSchemas.update),
  AdminController.updateIntoDB
);
router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AdminController.deleteFromDB
);
router.delete(
  "/soft/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AdminController.softDeleteFromDB
);

export const AdminRoutes = router;
