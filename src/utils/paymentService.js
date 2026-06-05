export function processPayment(amount, courseTitle, studentDetails) {
  return new Promise((resolve, reject) => {
    console.log('%c💳 Processing Payment...', 'color: #6c5ce7; font-weight: bold', {
      amount: `$${amount}`,
      course: courseTitle,
      student: studentDetails,
      gateway: 'Stripe',
    });

    setTimeout(() => {
      const paymentResult = {
        success: true,
        transactionId: `TXN-${Date.now()}`,
        invoiceId: `INV-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
        amount,
        course: courseTitle,
        status: 'completed',
        timestamp: new Date().toISOString(),
        method: 'Credit Card',
      };

      console.log('%c✅ Payment Successful!', 'color: #00b894; font-weight: bold', paymentResult);
      resolve(paymentResult);
    }, 1500);
  });
}

export function processRefund(transactionId, amount) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`%c🔄 Refund processed for ${transactionId}: $${amount}`, 'color: #e17055');
      resolve({ success: true, transactionId, amount, status: 'refunded' });
    }, 1000);
  });
}

export const PAYMENT_GATEWAYS = {
  stripe: {
    name: 'Stripe',
    supportedCards: ['Visa', 'Mastercard', 'Amex', 'Discover'],
    fee: '2.9% + $0.30',
  },
  razorpay: {
    name: 'Razorpay',
    supportedCards: ['Visa', 'Mastercard', 'RuPay', 'Amex'],
    fee: '2.0%',
  },
};
