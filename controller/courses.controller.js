import Course from "../model/courses.model.js";
import StatusText from "../utils/httpSuccess.js";

let coursesController = {
  GetAllCourses: async (req, res) => {
    const query = req.query;
    let limit = query.limit || 2;
    let page = query.page || 1;
    let skip = (page - 1) * limit;

    const courses = await Course.find({}, { __v: false })
      .limit(limit)
      .skip(skip);

    // JSend: Success
    res.status(200).json({
      status: StatusText.SUCCESS,
      data: {
        courses,
      },
    });
  },

  GetSingleCourse: async (req, res) => {
    try {
      const course = await Course.findById(req.params.courseId);

      if (!course) {
        // JSend: Fail (resource not found)
        return res.status(404).json({
          status: StatusText.FAIL,
          data: {
            course: null,
          },
        });
      }

      // JSend: Success
      res.status(200).json({
        status: "success",
        data: {
          course,
        },
      });
    } catch (err) {
      // JSend: Error (exception)
      res.status(400).json({
        status: StatusText.ERROR,
        message: err.message,
      });
    }
  },

  UpdateCourse: async (req, res) => {
    try {
      const updatedCourse = await Course.findByIdAndUpdate(
        req.params.courseId,
        { $set: req.body },
        { new: true }
      );

      if (!updatedCourse) {
        // JSend: Fail (invalid id)
        return res.status(404).json({
          status: StatusText.FAIL,
          data: {
            course: null,
          },
        });
      }

      // JSend: Success
      res.status(200).json({
        status: StatusText.SUCCESS,
        data: {
          course: updatedCourse,
        },
      });
    } catch (err) {
      // JSend: Error
      res.status(400).json({
        status: StatusText.ERROR,
        message: err.message,
      });
    }
  },

  AddCourse: async (req, res) => {
    try {
      const newCourse = new Course(req.body);
      await newCourse.save();

      // JSend: Success (resource created)
      res.status(201).json({
        status: StatusText.SUCCESS,
        data: {
          course: newCourse,
        },
      });
    } catch (err) {
      // JSend: Error
      res.status(400).json({
        status: StatusText.ERROR,
        message: err.message,
      });
    }
  },

  DeleteCourse: async (req, res) => {
    try {
      const result = await Course.findByIdAndDelete(req.params.courseId);

      if (!result) {
        // JSend: Fail (nothing to delete)
        return res.status(404).json({
          status: StatusText.FAIL,
          data: null,
        });
      }

      // JSend: Success
      res.status(200).json({
        status: StatusText.SUCCESS,
        data: null,
      });
    } catch (err) {
      // JSend: Error
      res.status(400).json({
        status: StatusText.ERROR,
        message: err.message,
      });
    }
  },
};

export default coursesController;
