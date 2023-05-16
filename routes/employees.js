const express = require('express');
const EmployeesController = require('../app/controllers/EmployeesController');
const router = express.Router();

router.post('/store', async (req, res) => {
    EmployeesController.store(req, res);
});
router.get('/total-income', async (req, res) => {
    EmployeesController.getEmployeeEarnings(req, res);
});
router.get('/', async (req, res) => {
    EmployeesController.getAllUser(req, res);
});

module.exports = router;