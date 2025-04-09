import { Request, Response } from "express";
import { userService } from "./user.services";

const createAdmin = async (req: Request, res: Response) => {
  const result = await userService.createAdmin();
  res.send(result);
};

export const userController = {
  createAdmin,
};
