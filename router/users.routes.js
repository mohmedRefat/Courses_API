import express from "express";
import userController from "../controller/users.controller.js";
import VerifyToken from "../middleware/VerifyToken.js";
const router = express.Router();

//* Get all users
router.route("/").get(VerifyToken, userController.GetAllUsers);

//* Register
router.route("/register").post(userController.register);

//* Login
router.route("/login").post(userController.Login);

export default router;
