import express from "express";
import { ReviewController } from "./review.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { ReviewValidation } from "./review.validation";
import { UserRole } from "../../../generated/prisma";

const router = express.Router();

router.get("/", ReviewController.getAllFromDB);

router.post(
  "/",
  auth(UserRole.PATIENT),
  validateRequest(ReviewValidation.create),
  ReviewController.insertIntoDB
);

export const ReviewRoutes = router;
