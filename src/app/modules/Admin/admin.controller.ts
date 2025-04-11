import { NextFunction, Request, Response } from "express";
import { AdminService } from "./admin.service";
import { adminFilterableFields } from "./admin.constant";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const getAllFromDB = async (req: Request, res: Response) => {
  try {
    // console.log(req.query)
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    // console.log(options);
    const result = await AdminService.getAllFromDB(filters, options);
    res.status(200).json({
      success: true,
      message: "Admin data fetched!",
      meta: result.meta,
      data: result.data,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.name || "Something went wrong",
      error: error,
    });
  }
};

const getSingleIdFromDB = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await AdminService.getSingleIdFromDB(id);
    res.status(200).json({
      success: true,
      message: "Single data fetched!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.name || "Something went wrong",
      error: error,
    });
  }
};

const updateIntoDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const result = await AdminService.updateIntoDB(id, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin data updated!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const result = await AdminService.deleteFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin data deleted!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const AdminController = {
  getAllFromDB,
  getSingleIdFromDB,
  updateIntoDB,
  deleteFromDB,
};
