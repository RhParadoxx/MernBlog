import express from "express";

import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";
import {
  createBlog,
  deleteBlog,
  dislikeBlog,
  getAllBlogs,
  getMyTotalBlogLikes,
  getOwnBlogs,
  getPublishedBlog,
  likeBlog,
  togglePublishBlog,
  updateBlog,
} from "../controllers/blog.controller.js";

const blogRouter = express.Router();

blogRouter.post("/", isAuthenticated, createBlog);
blogRouter.put("/:blogId", isAuthenticated, singleUpload, updateBlog);
blogRouter.get("/get-own-blogs", isAuthenticated, getOwnBlogs);
blogRouter.delete("/delete/:id", isAuthenticated, deleteBlog);
blogRouter.get("/:id/like", isAuthenticated, likeBlog);
blogRouter.get("/:id/dislike", isAuthenticated, dislikeBlog);
blogRouter.get("/my-blogs/likes", isAuthenticated, getMyTotalBlogLikes);
blogRouter.get("/get-published-blogs", getPublishedBlog);
blogRouter.patch("/:blogId", togglePublishBlog);
blogRouter.get("/get-all-blogs", getAllBlogs);

export default blogRouter;
