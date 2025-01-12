const Watchlist = require('../models/watchlistModel');

const createWatchlist = async (userId, name, category) => {
  const newWatchlist = new Watchlist({
    userId,
    name,
    category,
    videos: [],
  });

  try {
    await newWatchlist.save();
    return { success: true, message: 'Watchlist created successfully', watchlist: newWatchlist };
  } catch (error) {
    throw new Error('Error creating watchlist: ' + error.message);
  }
};

const addVideoToWatchlist = async (userId, watchlistId, video) => {
  try {
    const watchlist = await Watchlist.findOne({ userId, _id: watchlistId });
    if (!watchlist) {
      throw new Error('Watchlist not found');
    }

    watchlist.videos.push(video);
    await watchlist.save();
    return { success: true, message: 'Video added to watchlist', watchlist };
  } catch (error) {
    throw new Error('Error adding video to watchlist: ' + error.message);
  }
};

const removeVideoFromWatchlist = async (userId, watchlistId, videoId) => {
  try {
    const watchlist = await Watchlist.findOne({ userId, _id: watchlistId });
    if (!watchlist) {
      throw new Error('Watchlist not found');
    }

    watchlist.videos = watchlist.videos.filter((video) => video.videoId !== videoId);
    await watchlist.save();
    return { success: true, message: 'Video removed from watchlist', watchlist };
  } catch (error) {
    throw new Error('Error removing video from watchlist: ' + error.message);
  }
};

const getWatchlistsByUser = async (userId) => {
  try {
    const watchlists = await Watchlist.find({ userId });
    return watchlists;
  } catch (error) {
    throw new Error('Error fetching watchlists: ' + error.message);
  }
};

module.exports = { createWatchlist, addVideoToWatchlist, removeVideoFromWatchlist, getWatchlistsByUser };
