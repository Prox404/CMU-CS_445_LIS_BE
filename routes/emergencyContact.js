const express = require('express');
const EmergencyContactsController = require('../app/controllers/EmergencyContactsController');
const router = express.Router();

router.get('/', async (req, res) => {
    EmergencyContactsController.getAllEmploymentContact(req, res);
});

router.post('/store', async (req, res) => {
    EmergencyContactsController.store(req, res);
});

module.exports = router;