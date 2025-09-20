import express from "express";
import router from "./routes";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import cors from "cors";
import notFound from "./middlewares/notFound";
import mongoose from "mongoose";
import config from "./config";

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000", "https://tech-tips-frontend-six.vercel.app"],
  credentials: true,
}));

// Routes
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Error handling
app.use(globalErrorHandler);
app.use(notFound);

// Connect MongoDB (only once, for Vercel lazy connection)
if (mongoose.connection.readyState === 0) {
  mongoose.connect(config.db_url as string)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection failed", err));
}

export default app;
