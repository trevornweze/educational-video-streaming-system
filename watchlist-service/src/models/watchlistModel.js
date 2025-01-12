const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  videoId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  thumbnail: { type: String },
  addedAt: { type: Date, default: Date.now },
});

const watchlistSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  videos: [videoSchema],
  category: { type: String, enum: ['Favorites', 'Watch Later', 'Recommendations'], default: 'Watch Later' },
});

const Watchlist = mongoose.model('Watchlist', watchlistSchema);

module.exports = Watchlist;
