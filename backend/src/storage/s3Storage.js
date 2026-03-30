export async function uploadToS3({ fileName }) {
  // Placeholder for AWS SDK upload.
  return {
    provider: 's3',
    url: `https://s3.amazonaws.com/example-bucket/${encodeURIComponent(fileName)}`
  };
}
