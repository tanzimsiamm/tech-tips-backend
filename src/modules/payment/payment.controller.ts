import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import Stripe from "stripe";
import config from "../../config";
import { paymentServices } from "./payment.service";

const stripe = new Stripe(config.stripe_secret as string);

const createPaymentIntent = catchAsync(async (req, res) => {
  const { totalCost, currency } = req.body;
  const convertedCost: number = parseInt(totalCost);
  const totalAmount = convertedCost * 100;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount,
    currency,
  });
  const clientSecret = paymentIntent.client_secret;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Intent Created successfully",
    data: clientSecret,
  });
});

const savePaymentInfo = catchAsync(async (req, res) => {
  const result = await paymentServices.savePaymentInfoInDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment info saved successfully",
    data: result,
  });
});

const getPaymentHistory = catchAsync(async (req, res) => {
  const result = await paymentServices.getPaymentHistory(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "History retrieved successfully",
    data: result,
  });
});

export const paymentControllers = {
  createPaymentIntent,
  savePaymentInfo,
  getPaymentHistory,
};
