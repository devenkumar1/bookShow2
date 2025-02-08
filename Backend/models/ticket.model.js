import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  showId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "show",
  },
  paymentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "payment",
  },
  status: {
    type: String,
    enum: ["booked", "cancelled"],
    required: true,
  },
  bookedAt: {
    type: Date,
    default: Date.now,
  },
});

const ticket = mongoose.model("ticket", ticketSchema);
export default ticket;
