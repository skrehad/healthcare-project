import express from "express";
import { userRoutes } from "../app/modules/User/user.routes";
import { AdminRoutes } from "../app/modules/Admin/admin.routes";
import { AuthRoutes } from "../app/modules/Auth/auth.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
