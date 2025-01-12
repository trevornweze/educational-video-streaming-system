const express = require('express');
const fileUpload = require('express-fileupload');  // For file upload handling
const videoRoutes = require('./routes/videoRoutes');

const app = express();

// Middleware to parse JSON requests and file uploads
app.use(express.json());
app.use(fileUpload());

// API routes
app.use('/api/videos', videoRoutes);

module.exports = app;
