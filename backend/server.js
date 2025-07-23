import express from "express";
import connectDB from "./Database/db.js";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import blogRouter from "./routes/blog.route.js";
import commentRouter from "./routes/comment.route.js";

import cors from "cors";

import cookieParser from "cookie-parser";

import path from "path";

//.env
dotenv.config();

const app = express();
app.use(express.json());
// for get cookies
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/comment", commentRouter);

//! for create file Dist in frontend
const _dirname = path.resolve();

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get(",", (_, res) => {
  res.sendFile(path.resolve(_dirname, "frontend ", "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectDB();
  console.log(`server is running on port ${PORT}`);
});
