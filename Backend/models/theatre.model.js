import mongoose from "mongoose";

const theatreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    state:{
      type: String,
      required: true,
    },
    city:{
      type: String,
      required: true,
    },
    totalSeats: {
      type: Number,
      required: true,
    },
    contact: {
      type: String,
      required:true
    },
    shows: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "show",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const theatre = mongoose.model("theatre", theatreSchema);
export default theatre;