import express from "express";
import mongoose from "mongoose";
import CoursesRouter from "./router/courses.routes.js";
import UserRouter from "./router/users.routes.js";
import "dotenv/config";
import StatusText from "./utils/httpSuccess.js";
const url = process.env.MONGO_URL;

const app = express();
app.use(express.json());

app.use("/api/courses", CoursesRouter);
app.use("/api/users", UserRouter);

mongoose.connect(url).then(() => {
  console.log(`server is running successfully`);
});

app.use((err, req, res, next) => {
  res.status(500).json({ status: StatusText.ERROR, message: err.message });
});

app.listen(3000, () => {
  console.log(`the app is good`);
});
