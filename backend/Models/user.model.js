import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
    },

    lastName: {
      type: String,
      require: true,
    },
    
    email: {
      type: String,
      require: true,
      unique: true,
    },

    password: {
      type: String,
      require: true,
    },

    bio: {
      type: String,
      default: "",
    },

    occupation: {
      type: String,
      default: "",
    },

    photoUrl: {
      type: String,
      default: "",
    },
    
    instagram: { type: String, default: "" },
    faceBook: { type: String, default: "" },
    twitter: { type: String, default: "" },
    telegram: { type: String, default: "" },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
