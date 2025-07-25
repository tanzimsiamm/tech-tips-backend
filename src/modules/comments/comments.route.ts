import express from "express";
import auth from "../../middlewares/auth";
import { commentController } from "./comments.controller";

const router = express.Router();

// Public routes
router.get("/:postId", auth("user", "admin"), commentController.getComments);

// Protected routes (require authentication)
router.post("/", auth("admin", "user"), commentController.addComment);
router.patch(
  "/:commentId",
  auth("admin", "user"),
  commentController.updateComment
);
router.delete(
  "/:commentId",
  auth("user", "admin"),
  commentController.deleteComment
);

export const CommentRoutes = router;
