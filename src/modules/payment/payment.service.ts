/* eslint-disable @typescript-eslint/no-explicit-any */
import { TPayment } from "./payment.interface";
import { Payment } from "./payment.model";

// Creates new payment record in database
const savePaymentInfoInDB = async (payload: TPayment) => {
  const result = await Payment.create(payload);
  return result;
};

// Gets payment history with optional email filter
// Uses aggregation to join with user data
const getPaymentHistory = async (query: { userEmail?: string }) => {
  const { userEmail } = query;

  // Base pipeline - joins payment with user info
  const pipeline: any = [
    {
      $lookup: {
        from: "users",
        localField: "email",
        foreignField: "email",
        as: "userInfo",
      },
    },
    // Converts userInfo array to object (since 1:1 relationship)
    {
      $unwind: "$userInfo",
    },
  ];

  // Add email filter if provided
  if (userEmail) {
    pipeline.push({ $match: { email: userEmail } });
  }

  const paymentHistories = await Payment.aggregate(pipeline);
  return paymentHistories;
};

export const paymentServices = {
  savePaymentInfoInDB,
  getPaymentHistory,
};
