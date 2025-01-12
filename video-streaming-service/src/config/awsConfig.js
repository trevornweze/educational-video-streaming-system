const AWS = require('aws-sdk');

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();
const elasticTranscoder = new AWS.ElasticTranscoder();
const cloudFront = new AWS.CloudFront();

module.exports = { s3, elasticTranscoder, cloudFront };
