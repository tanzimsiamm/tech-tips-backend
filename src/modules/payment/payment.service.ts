/* eslint-disable @typescript-eslint/no-explicit-any */
import { TPayment } from "./payment.interface";
import { Payment } from "./payment.model";

const savePaymentInfoInDB = async (payload: TPayment) => {
  const result = await Payment.create(payload);
  return result;
};

const getPaymentHistory = async (query: { userEmail?: string }) => {
  const { userEmail } = query;

  const pipeline: any = [
    {
      $lookup: {
        from: "users",
        localField: "email",
        foreignField: "email",
        as: "userInfo",
      },
    },
    {
      $unwind: "$userInfo",
    },
  ];

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
