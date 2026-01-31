import express from "express";
import coursesController from "../controller/courses.controller.js";
import VerifyToken from "../middleware/VerifyToken.js";
const router = express.Router();

router
  .route("/")
  .get(coursesController.GetAllCourses)
  .post(VerifyToken, coursesController.AddCourse);
router
  .route("/:courseId")
  .get(coursesController.GetSingleCourse)
  .patch(coursesController.UpdateCourse)
  .delete(
    VerifyToken,
    IsAllowed("ADMIN", "MANGER"),
    coursesController.DeleteCourse,
  );

export default router;
