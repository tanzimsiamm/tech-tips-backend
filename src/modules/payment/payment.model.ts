import { Schema, model } from "mongoose";
import { TPayment } from "./payment.interface";

const PaymentSchema = new Schema<TPayment>(
  {
    email: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    membersShip: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Payment = model<TPayment>("Payment", PaymentSchema);
