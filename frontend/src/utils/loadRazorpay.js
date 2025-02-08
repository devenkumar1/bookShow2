import axios from 'axios';

const razorpay_key = process.env.RAZORPAY_KEY_ID;
const backend_url = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(window.Razorpay);
    } else {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(window.Razorpay);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    }
  });
};

export const initiatePayment = async (amount, userEmail, userId, showId, quantity, totalPrice) => {
  try {
    const Razorpay = await loadRazorpay();
    if (!Razorpay) throw new Error('Failed to load Razorpay SDK');

    const { data } = await axios.post(`${backend_url}/api/create-order`, {
      amount,
      userId,
      currency: 'INR',
      method: 'upi',
    });

    if (!data || !data.orderId) throw new Error('Order creation failed');

    return new Promise((resolve, reject) => {
      const options = {
        key: razorpay_key,
        amount: data.amount,
        currency: 'INR',
        name: 'Movie Booking',
        description: 'Movie Ticket Payment',
        order_id: data.orderId,
        handler: async (response) => {
          try {
            const verifyRes = await axios.post(`${backend_url}/api/verify-payment`, {
              orderId: data.orderId,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              userId,
              showId,
              quantity,
              totalPrice,
            });

            if (verifyRes.data.success) {
              resolve({ success: true, orderId: data.orderId, paymentId: response.razorpay_payment_id, signature: response.razorpay_signature });
            } else {
              reject('Payment verification failed');
            }
          } catch (error) {
            reject('Payment verification failed');
          }
        },
        prefill: { email: userEmail },
        theme: { color: '#3399cc' },
      };

      const paymentObject = new Razorpay(options);
      paymentObject.open();
      paymentObject.on('payment.failed', () => reject('Payment failed'));
    });
  } catch (error) {
    console.error('Payment error:', error);
    throw error;
  }
};
