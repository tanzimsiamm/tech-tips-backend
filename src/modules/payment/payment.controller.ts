import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import Stripe from "stripe";
import config from "../../config";
import { paymentServices } from "./payment.service";
import AppError from "../../errors/AppError";

// Initialize Stripe with secret key
const stripe = new Stripe(config.stripe_secret as string);

// Create Stripe payment intent
const createPaymentIntent = catchAsync(async (req, res) => {
  try {
    const { totalCost, currency } = req.body;
    
    if (!totalCost || isNaN(totalCost)) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Invalid amount');
    }

    const totalAmount = Math.round(parseFloat(totalCost) * 100);
    
    if (totalAmount < 50) { // Stripe minimum
      throw new AppError(httpStatus.BAD_REQUEST, 'Amount too small');
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: currency || 'usd',
    });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Intent created successfully",
      data: {
        clientSecret: paymentIntent.client_secret
      },
    });
  } catch (err) {
    if (err instanceof Stripe.errors.StripeError) {
      throw new AppError(
        httpStatus.BAD_REQUEST, 
        `Stripe error: ${err.message}`
      );
    }
    throw err;
  }
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
