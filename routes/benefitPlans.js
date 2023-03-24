const express = require('express');
const BenefitPlansController = require('../app/controllers/BenefitPlansController');
const router = express.Router();

router.get('/', async (req, res) => {
    BenefitPlansController.getAllBenefitPlans(req, res);
});

router.post('/store', async (req, res) => {
    BenefitPlansController.store(req, res);
});

module.exports = router;