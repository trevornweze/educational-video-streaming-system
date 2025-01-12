const express = require('express');
const router = express.Router();
const axios = require('axios');

// Upload video route
router.post('/upload', async (req, res) => {
  try {
    const response = await axios.post(`${process.env.VIDEO_SERVICE_URL}/upload`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

// Get video streaming URL
router.get('/stream/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${process.env.VIDEO_SERVICE_URL}/stream/${id}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

module.exports = router;
