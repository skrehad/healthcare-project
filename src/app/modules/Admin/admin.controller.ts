import { NextFunction, Request, RequestHandler, Response } from "express";
import { AdminService } from "./admin.service";
import { adminFilterableFields } from "./admin.constant";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";

const getAllFromDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
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
  }
);

const getSingleIdFromDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await AdminService.getSingleIdFromDB(id);
    res.status(200).json({
      success: true,
      message: "Single data fetched!",
      data: result,
    });
  }
);

const updateIntoDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await AdminService.updateIntoDB(id, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin data updated!",
      data: result,
    });
  }
);

const deleteFromDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await AdminService.deleteFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin data deleted!",
      data: result,
    });
  }
);

const softDeleteFromDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AdminService.softDeleteFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin data deleted!",
      data: result,
    });
  }
);

export const AdminController = {
  getAllFromDB,
  getSingleIdFromDB,
  updateIntoDB,
  deleteFromDB,
  softDeleteFromDB,
};
