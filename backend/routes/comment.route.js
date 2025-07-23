import express from "express";

import { isAuthenticated } from "../middleware/isAuthenticated.js";
import {
  createComment,
  deleteComment,
  editComment,
  getAllCommentsOnMyBlogs,
  getCommentsOfPost,
  likeComment,
} from "../controllers/comment.controller.js";

const commentRouter = express.Router();

commentRouter.post("/:id/create", isAuthenticated, createComment);

commentRouter.delete("/:id/delete", isAuthenticated, deleteComment);
commentRouter.put("/:id/edit", isAuthenticated, editComment);
commentRouter.get("/:id/comment/all", getCommentsOfPost);
commentRouter.get("/:id/like", isAuthenticated, likeComment);
commentRouter.get("/my-blogs/comments", isAuthenticated, getAllCommentsOnMyBlogs);

export default commentRouter;
