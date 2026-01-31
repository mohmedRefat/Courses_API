import mongoose from "mongoose";

const coursesSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },

  price: {
    type: Number,
    require: true,
  },
});

export default mongoose.model(`Course`, coursesSchema);


