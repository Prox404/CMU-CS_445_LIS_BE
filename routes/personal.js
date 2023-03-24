const express = require('express');
const PersonalController = require('../app/controllers/PersonalController');
const router = express.Router();

router.get('/', async (req, res) => {
    PersonalController.getAllPersonal(req, res);
});

module.exports = router;