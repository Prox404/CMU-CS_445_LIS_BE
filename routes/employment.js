const express = require('express');
const EmploymentController = require('../app/controllers/EmploymentController');
const router = express.Router();

router.post('/store', async (req, res) => {
    EmploymentController.store(req, res);
});
router.get('/', async (req, res) => {
    EmploymentController.getAllEmployment(req, res);
});

module.exports = router;