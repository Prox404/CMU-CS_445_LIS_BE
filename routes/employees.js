const express = require('express');
const EmployeesController = require('../app/controllers/EmployeesController');
const router = express.Router();

router.post('/store', async (req, res) => {
    EmployeesController.store(req, res);
});
router.get('/total-income', async (req, res) => {
    EmployeesController.getEmployeeEarnings(req, res);
});
router.get('/total-vacation-day', async (req, res) => {
    EmployeesController.getTotalVacationDays(req, res);
});
router.get('/average-benefit-plan', async (req, res) => {
    EmployeesController.calculateAverageBenefitsPaid(req, res);
});
router.get('/', async (req, res) => {
    EmployeesController.getAllUser(req, res);
});

router.get('/check-hiring-anniversary', async (req, res) => {
    EmployeesController.checkHiringAnniversary(req, res);
});

router.get('/check-vacation-days', async (req, res) => {
    EmployeesController.checkVacationDays(req, res);
});

router.get('/get-employee-within-month', async (req, res) => {
    EmployeesController.getEmployeesWithBirthdays(req, res);
});

module.exports = router;