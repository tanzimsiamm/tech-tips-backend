import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import Stripe from "stripe";
import config from "../../config";
import { paymentServices } from "./payment.service";

// Initialize Stripe with secret key
const stripe = new Stripe(config.stripe_secret as string);

// Create Stripe payment intent
const createPaymentIntent = catchAsync(async (req, res) => {
  const { totalCost, currency } = req.body;
  const totalAmount = parseInt(totalCost) * 100; // Convert to cents

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount,
    currency,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Intent created successfully",
    data: paymentIntent.client_secret,
  });
});

// Save payment record to database
const savePaymentInfo = catchAsync(async (req, res) => {
  const result = await paymentServices.savePaymentInfoInDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment info saved successfully",
    data: result,
  });
});

// Retrieve payment history with optional filtering
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
