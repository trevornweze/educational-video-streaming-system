const express = require('express');
const bodyParser = require('body-parser');
const watchlistRoutes = require('./routes/watchlistRoutes');
const connectDB = require('./config/dbConfig');

const app = express();

app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

app.use('/api/watchlists', watchlistRoutes);

module.exports = app;
