const express = require('express');
const router = express.Router();
const axios = require('axios');

// Get user's watchlist
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const response = await axios.get(`${process.env.WATCHLIST_SERVICE_URL}/watchlist/${userId}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

// Add video to watchlist
router.post('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const response = await axios.post(`${process.env.WATCHLIST_SERVICE_URL}/watchlist/${userId}`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

// Remove video from watchlist
router.delete('/:userId/:videoId', async (req, res) => {
  try {
    const { userId, videoId } = req.params;
    const response = await axios.delete(`${process.env.WATCHLIST_SERVICE_URL}/watchlist/${userId}/${videoId}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

module.exports = router;
