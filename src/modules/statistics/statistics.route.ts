import express from "express";
import auth from "../../middlewares/auth";
import { statisticsController } from "./statistics.controller";
const router = express.Router();

// get admin statistics
router.get("/", auth("admin"), statisticsController.getStatistics);

export const StatisticsRoutes = router;
