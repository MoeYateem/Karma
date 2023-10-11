const bcrypt = require('bcrypt');
const db = require('../config/database');

// Function to validate the Luhn algorithm
function validateLuhnAlgorithm(cardNumber) {
  const digits = cardNumber.replace(/\s/g, '').split('').map(Number);

  for (let i = digits.length - 2; i >= 0; i -= 2) {
    digits[i] *= 2;
    if (digits[i] > 9) {
      digits[i] -= 9;
    }
  }

  const sum = digits.reduce((acc, val) => acc + val, 0);

  return sum % 10 === 0;
}

module.exports = {
  createPaymentAJAX: async (req, res) => {
    try {
      console.log('Received payment request:', req.body);
      const { cardNumber, cvv, cardHolderName, expirationMonth, expirationYear } = req.body;
      console.log('Payment data:', cardNumber, cvv, cardHolderName, expirationMonth, expirationYear);

      if (!/^\d{3}$/.test(cvv)) {
        console.error('Invalid CVV');
        return res.status(400).json({ error: 'Invalid CVV' });
      }

      // Check Luhn algorithm validation
      const isLuhnValid = validateLuhnAlgorithm(cardNumber);
      if (!isLuhnValid) {
        console.error('Invalid credit card data (Luhn algorithm)');
        return res.status(400).json({ error: 'Invalid credit card data (Luhn algorithm)' });
      }

      const hashedCardNumber = await bcrypt.hash(cardNumber, 10);
      const hashedCvv = await bcrypt.hash(cvv, 10);

      const query =
        'INSERT INTO credit_cards (card_number, cvv, card_holder_name, expiration_month, expiration_year) VALUES ($1, $2, $3, $4, $5)';
      await db.query(query, [
        hashedCardNumber,
        hashedCvv,
        cardHolderName,
        expirationMonth,
        expirationYear,
      ]);

      console.log('Payment created successfully');
      res.status(201).json({ message: 'Payment created successfully' });
    } catch (error) {
      console.error('Error in createPaymentAJAX:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  viewPaymentHistory: async (req, res) => {
    try {
      res.status(200).json(/* Payment history data */);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};
