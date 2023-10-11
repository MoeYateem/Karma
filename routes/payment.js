const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/create', paymentController.createPaymentAJAX);
router.get('/history', paymentController.viewPaymentHistory);

module.exports = router;
