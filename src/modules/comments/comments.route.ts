import express from "express";
import auth from "../../middlewares/auth";
import { commentController } from "./comments.controller";
const router = express.Router();

router.get("/:postId", auth("user", "admin"), commentController.getComments);
router.delete(
  "/:commentId",
  auth("user", "admin"),
  commentController.deleteComment
);
router.patch(
  "/:commentId",
  auth("admin", "user"),
  commentController.updateComment
);

// add comments
router.post("/", auth("admin", "user"), commentController.addComment);

export const CommentRoutes = router;
