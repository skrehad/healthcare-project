import express from "express";
import { AdminController } from "./admin.controller";

const router = express.Router();

router.get("/", AdminController.getAllFromDB);
router.get("/:id", AdminController.getSingleIdFromDB);
router.patch("/:id", AdminController.updateIntoDB);
router.delete("/:id", AdminController.deleteFromDB);

export const AdminRoutes = router;
