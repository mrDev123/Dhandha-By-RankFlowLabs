import { uploadToFirebase } from './firebaseStorage.js';
import { uploadToS3 } from './s3Storage.js';

export async function uploadToStorage(file) {
  const provider = process.env.STORAGE_PROVIDER || 'firebase';

  if (provider === 's3') {
    return uploadToS3(file);
  }

  return uploadToFirebase(file);
}
