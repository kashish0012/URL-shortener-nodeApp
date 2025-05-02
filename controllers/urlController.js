const { nanoid } = require('nanoid');
const URL = require('../models/urlModel');

async function handleGenerateShortenUrl(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ error: 'URL is required' });
    }
    const shortID = nanoid(8);
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });

    return res.status(201).render('home', { id: shortID });
}

async function handleGetShortenUrl(req, res) {
    const shortId = req.params.shortId;
    await URL.findOneAndUpdate(
        { shortId: shortId },
        { $push: { visitHistory: { timestamp: Date.now() } } },
    ).then((url) => {
        if (!url) {
            return res.status(404).json({ error: 'URL not found' });
        }
        return res.status(200).redirect(url.redirectURL);
    }).catch((error) => {
        res.status(500).json({ error: 'Internal server error' });
        console.log(error);
    });
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    await URL.findOne({ shortId: shortId }).then((url) => {
        if (!url) {
            return res.status(404).json({ error: 'URL not found' });
        }
        return res.status(200).json({totalVisits: url.visitHistory.length, analytics: url.visitHistory });
    }).catch((error) => {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    });

}

module.exports = {
    handleGenerateShortenUrl,
    handleGetShortenUrl,
    handleGetAnalytics,
}