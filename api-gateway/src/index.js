const express = require('express');
const bodyParser = require('body-parser');
const authenticationRoutes = require('./routes/authenticationRoutes');
const videoRoutes = require('./routes/videoRoutes');
const watchlistRoutes = require('./routes/watchlistRoutes');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authenticationRoutes);
app.use('/videos', videoRoutes);
app.use('/watchlist', watchlistRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('API Gateway is up and running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
