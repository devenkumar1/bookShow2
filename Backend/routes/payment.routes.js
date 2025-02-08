import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import Payment from '../models/payment.model.js';
import ticket from '../models/ticket.model.js';
import show from '../models/show.model.js';
import User from '../models/user.model.js';

const router = express.Router();
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create payment order
router.post('/create-order', async (req, res) => {
  const { userId, amount, currency, method } = req.body;

  if (!amount || !userId || !currency || !method) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const options = {
    amount: amount * 100, // Convert to paise
    currency,
    receipt: `order_${Date.now()}`,
  };



  const razorpayOrder = await razorpay.orders.create(options);             
  try {

    const newPayment = new Payment({
      userId,
      amount,
      status: 'pending',
      method,
      razorpayOrderId: razorpayOrder.id,
      transactionId: `txn_${Date.now()}`, 
  });
  
  const existingPayment = await Payment.findOne({ razorpayOrderId: razorpayOrder.id });
if (existingPayment) {
    return res.status(400).json({ error: 'Payment already exists for this order' });
}
    await newPayment.save();

    res.status(201).json({
      message: 'Payment order created successfully',
      orderId: razorpayOrder.id,
      amount: options.amount,
      currency,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Verify payment
router.post('/verify-payment', async (req, res) => {
  const { orderId, paymentId, signature, userId, showId, quantity, totalPrice } = req.body;

  if (!orderId || !paymentId || !signature || !userId || !showId || !quantity || !totalPrice) {
    return res.status(400).json({ error: 'Missing required fields for signature verification' });
  }

  const body = `${orderId}|${paymentId}`;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex');

  if (expectedSignature === signature) {
    try {
      const existingPayment = await Payment.findOne({ razorpayOrderId: orderId });

      if (!existingPayment) {
        return res.status(404).json({ error: 'Payment record not found' });
      }

      if (existingPayment.status === 'success') {
        return res.status(400).json({ error: 'Payment already verified' });
      }

      existingPayment.status = 'success';
      existingPayment.transactionId = paymentId;
      await existingPayment.save();

      const ticketData = new ticket({
        userId,
        showId,
        quantity,
        totalPrice,
      });
      await ticketData.save();

      const Show = await show.findById(showId);
      if (!Show) {
        return res.status(404).json({ error: 'Show not found' });
      }

      Show.availableSeats -= quantity;
      await Show.save();

      // Update the user's bookedTickets array
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      user.bookedTickets.push(ticketData._id);
      await user.save();

      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error during payment verification' });
    }
  } else {
    res.status(400).json({ error: 'Payment verification failed' });
  }
});

export default router;

