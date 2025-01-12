const { createWatchlist, addVideoToWatchlist, removeVideoFromWatchlist, getWatchlistsByUser } = require('../services/watchlistService');

const createWatchlistController = async (req, res) => {
  const { userId, name, category } = req.body;
  try {
    const result = await createWatchlist(userId, name, category);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addVideoController = async (req, res) => {
  const { userId, watchlistId, video } = req.body;
  try {
    const result = await addVideoToWatchlist(userId, watchlistId, video);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeVideoController = async (req, res) => {
  const { userId, watchlistId, videoId } = req.params;
  try {
    const result = await removeVideoFromWatchlist(userId, watchlistId, videoId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getWatchlistsController = async (req, res) => {
  const { userId } = req.params;
  try {
    const watchlists = await getWatchlistsByUser(userId);
    res.status(200).json(watchlists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createWatchlistController, addVideoController, removeVideoController, getWatchlistsController };
