import { analyzeImageQuality } from '../services/imageAnalysis.js';
import { storeImageMetadata } from '../db/imageModel.js';
import { uploadToStorage } from '../storage/index.js';

async function persistUploadedPhoto(file, extra = {}) {
  const storageResult = await uploadToStorage({
    buffer: file.buffer,
    mimeType: file.mimetype,
    fileName: file.originalname
  });

  const savedRecord = await storeImageMetadata({
    imageUrl: storageResult.url,
    mimeType: file.mimetype,
    originalName: file.originalname,
    createdAt: new Date().toISOString(),
    ...extra
  });

  return {
    storageResult,
    savedRecord
  };
}

export async function uploadPhotoHandler(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: 'Image file is required' });
  }

  const { storageResult, savedRecord } = await persistUploadedPhoto(req.file);

  return res.status(201).json({
    id: savedRecord.id,
    imageUrl: storageResult.url,
    message: 'Image uploaded successfully'
  });
}

export async function analyzePhotoHandler(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: 'Photo file is required' });
  }

  const analysis = await analyzeImageQuality(req.file.buffer);

  const { storageResult } = await persistUploadedPhoto(req.file, {
    metrics: analysis.metrics,
    suggestions: analysis.suggestions
  });

  return res.status(201).json({ imageUrl: storageResult.url, ...analysis });
}
