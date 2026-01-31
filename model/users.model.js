import mongoose from "mongoose";
import validator from "validator";
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Filed must be a valid Email"],
  },
  Password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  jwt: {
    type: String,
  },
  roles: {
    type: String,
    enum: ["USER", "ADMIN", "MANGER"],
    default: "USER",
  },
});

export default mongoose.model(`User`, userSchema);
