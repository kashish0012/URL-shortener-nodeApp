const express = require('express');
const { handleGenerateShortenUrl, handleGetShortenUrl, handleGetAnalytics } = require('../controllers/urlController');

const router = express.Router();
router.post('/', handleGenerateShortenUrl);
router.get('/:shortId', handleGetShortenUrl);
router.get('/analytics/:shortId', handleGetAnalytics);

module.exports = router;