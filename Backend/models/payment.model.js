import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
  },
  amount: {
      type: Number,
      required: true,
  },
  status: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending',
  },
  method: {
      type: String,
      required: true,
  },
  razorpayOrderId: {
      type: String,
      required: true,
  },
  transactionId: {
      type: String,
      default: 'pending', // Remove unique constraint if it exists
  },
});


const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
