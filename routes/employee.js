const express = require('express');
const EmployeeController = require('../app/controllers/EmployeeController');
const router = express.Router();

router.post('/store', async (req, res) => {
    EmployeeController.store(req, res);
});

module.exports = router;