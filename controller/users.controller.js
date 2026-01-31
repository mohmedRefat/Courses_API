import User from "../model/users.model.js";
import StatusText from "../utils/httpSuccess.js";
import bcrypt from "bcryptjs";
import GenerateToken from "../utils/generateTokenJwt.js";
import "dotenv/config";

const userController = {
  GetAllUsers: async (req, res) => {
    const query = req.query;
    let limit = query.limit || 2;
    let page = query.page || 1;
    let skip = (page - 1) * limit;

    const users = await User.find({}, { __v: false, Password: false })
      .limit(limit)
      .skip(skip);

    // JSend: Success
    res.status(200).json({
      status: StatusText.SUCCESS,
      data: {
        users,
      },
    });
  },
  register: async (req, res, next) => {
    const { firstName, lastName, Email, Password, role } = req.body;

    const oldUser = await User.findOne({ Email: Email });
    if (oldUser) {
      const error = res.status(400).json({
        status: StatusText.FAIL,
        message: "User Already Exist",
        code: 400,
        data: null,
      });
      return error;
    }
    //*Hashing password
    const HashedPassword = await bcrypt.hash(Password, 8);

    const newUser = new User({
      firstName,
      lastName,
      Email,
      Password: HashedPassword,
      role,
    });

    const token = await GenerateToken({
      Email: newUser.Email,
      id: newUser._id,
    });
    newUser.token = token;
    await newUser.save();

    res.status(201).json({
      status: StatusText.SUCCESS,
      data: {
        user: newUser,
      },
    });
  },
  Login: async (req, res) => {
    const { Email, Password } = req.body;

    const user = await User.findOne({ Email: Email });
    if (!user) {
      return res.status(400).json({
        status: StatusText.FAIL,
        user: "User is Not Found",
      });
    }
    const MatchedPassword = await bcrypt.compare(Password, user.Password);
    if (user && MatchedPassword) {
      //*Login successfully
      const token = await GenerateToken({ Email: user.Email, id: user._id });

      return res.json({
        status: StatusText.SUCCESS,
        data: { token },
      });
    } else {
      return res.json({
        status: StatusText.ERROR,
        Code: 500,
        user: "Something went Wrong",
      });
    }
  },
};
export default userController;
