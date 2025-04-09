import express, { Application } from "express";
import cors from "cors";
import { userRoutes } from "./app/modules/User/user.routes";

const app: Application = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send({ Message: "health care server" });
});

app.use("/api/v1/user", userRoutes);

export default app;
