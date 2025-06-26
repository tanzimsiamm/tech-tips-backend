import express from "express";
import auth from "../../middlewares/auth";
import { paymentControllers } from "./payment.controller";
const router = express.Router();

// create payment intent for user
router.post("/create-payment-intent", paymentControllers.createPaymentIntent);

// save payment history
router.post("/", auth("user", "admin"), paymentControllers.savePaymentInfo);

// // get paymenet history
router.get("/", auth("user", "admin"), paymentControllers.getPaymentHistory);

export const PaymentRoutes = router;
