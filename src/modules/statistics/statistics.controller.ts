import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { statisticsServices } from "./statistics.service";

const getStatistics = catchAsync(async (req, res) => {
  const result = await statisticsServices.getStatisticsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Statistics retrieved successfully",
    data: result,
  });
});

export const statisticsController = {
  getStatistics,
};
