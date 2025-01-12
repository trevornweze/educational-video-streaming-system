const { s3, elasticTranscoder, cloudFront } = require('../config/awsConfig');

// Service function to upload video to S3
const uploadVideoToS3 = async (file) => {
  const uploadParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `videos/${file.name}`,
    Body: file.data,
    ContentType: file.mimetype,
    ACL: 'public-read',
  };

  try {
    const data = await s3.upload(uploadParams).promise();
    return data.Location;
  } catch (error) {
    console.error('Error uploading video to S3:', error);
    throw new Error('Video upload failed');
  }
};

// Service function to start transcoding
const transcodeVideo = async (s3Key) => {
  const params = {
    PipelineId: process.env.ELASTIC_TRANSCODER_PIPELINE_ID,
    Input: {
      Key: s3Key,
    },
    Output: {
      Key: `transcoded/${s3Key}`,
      PresetId: '1351620000001-000010',
    },
  };

  try {
    const data = await elasticTranscoder.createJob(params).promise();
    return data.Job.Id; 
  } catch (error) {
    console.error('Error transcoding video:', error);
    throw new Error('Transcoding failed');
  }
};

// Service function to generate a signed URL for video streaming
const generateSignedUrl = (s3Key) => {
  const params = {
    url: `https://${process.env.CLOUDFRONT_DISTRIBUTION_DOMAIN}/${s3Key}`,
    expires: Math.floor(Date.now() / 1000) + 3600,
  };

  return cloudFront.getSignedUrl(params);
};

module.exports = { uploadVideoToS3, transcodeVideo, generateSignedUrl };
