const express = require('express');
const EmployeeController = require('../app/controllers/EmployeeController');
const router = express.Router();

router.post('/store', async (req, res) => {
    EmployeeController.store(req, res);
});
router.get('/', async (req, res) => {
    EmployeeController.getAllUser(req, res);
});

module.exports = router;