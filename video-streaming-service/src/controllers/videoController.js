const { uploadVideoToS3, transcodeVideo, generateSignedUrl } = require('../services/videoService');

// Controller function to handle video upload
const uploadVideo = async (req, res) => {
  try {
    const { videoFile } = req.files;
    const videoUrl = await uploadVideoToS3(videoFile);  // Upload video to S3
    res.status(200).json({ message: 'Video uploaded successfully', url: videoUrl });

    await transcodeVideo(videoFile.name);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Controller function to get signed URL for video streaming
const streamVideo = async (req, res) => {
  try {
    const { videoKey } = req.params;  // Get video key from URL params
    const signedUrl = generateSignedUrl(videoKey);  // Generate signed URL
    res.status(200).json({ message: 'Streaming video', signedUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { uploadVideo, streamVideo };
