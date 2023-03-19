const express = require('express');
const PayRatesController = require('../app/controllers/PayRatesController');
const router = express.Router();

router.get('/', async (req, res) => {
    PayRatesController.getAllPayRates(req, res);
});

router.post('/store', async (req, res) => {
    PayRatesController.store(req, res);
});

module.exports = router;