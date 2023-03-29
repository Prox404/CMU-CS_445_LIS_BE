const express = require('express');
const JobHistoryController = require('../app/controllers/JobHistoryController');
const router = express.Router();

router.get('/', async (req, res) => {
    JobHistoryController.getAllJobHistory(req, res);
});

router.post('/store', async (req, res) => {
    JobHistoryController.store(req, res);
});

module.exports = router;