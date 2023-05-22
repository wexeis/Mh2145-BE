import mongoose from "mongoose";

const contactusSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: false
    },
    Message: {
      type: String,
      required: false
    },
    email: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true
  }
);

const contactModels = mongoose.model("contactModel", contactusSchema);

export default contactModels;
