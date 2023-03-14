const express = require('express');
const PayRatesController = require('../app/controllers/PayRatesController');
const router = express.Router();

router.post('/store', async (req, res) => {
    PayRatesController.store(req, res);
});

module.exports = router;