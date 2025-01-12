const express = require('express');
const { uploadVideo, streamVideo } = require('../controllers/videoController');
const videoRouter = express.Router();

videoRouter.post('/upload', uploadVideo);

// GET request to stream a video using a signed URL
videoRouter.get('/stream/:video', streamVideo);

module.exports = videoRouter;
