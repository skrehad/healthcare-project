import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send({
    message: "Route is working",
  });
});

export const userRoutes = router;
