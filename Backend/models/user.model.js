import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allow users without Google ID (manual signups)
    },
    githubId: {
      type: String,
      unique: true,
      sparse: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true, // Ensures one account per email
      required: true,
    },
    password: {
      type: String,
      min: 6,
      default: null, // Optional for OAuth users
    },
    phonenumber: {
      type: Number,
      default: null,
    },
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
    profilePic: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png", // Default for manual signup
    },
    bookedTickets: [
      {
        type: Schema.Types.ObjectId,
        ref: "tickets",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
