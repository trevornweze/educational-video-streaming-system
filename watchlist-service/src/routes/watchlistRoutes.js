const express = require('express');
const { createWatchlistController, addVideoController, removeVideoController, getWatchlistsController } = require('../controllers/watchlistController');
const watchlistRouter = express.Router();

watchlistRouter.post('/', createWatchlistController);

watchlistRouter.post('/:watchlistId/videos', addVideoController);

watchlistRouter.delete('/:watchlistId/videos/:videoId', removeVideoController);

watchlistRouter.get('/user/:userId', getWatchlistsController);

module.exports = watchlistRouter;
