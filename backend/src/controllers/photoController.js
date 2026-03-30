import { analyzeImageQuality } from '../services/imageAnalysis.js';
import { storeImageMetadata } from '../db/imageModel.js';
import { uploadToStorage } from '../storage/index.js';

export async function analyzePhotoHandler(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: 'Photo file is required' });
  }

  const storageResult = await uploadToStorage({
    buffer: req.file.buffer,
    mimeType: req.file.mimetype,
    fileName: req.file.originalname
  });

  const analysis = await analyzeImageQuality(req.file.buffer);

  await storeImageMetadata({
    imageUrl: storageResult.url,
    metrics: analysis.metrics,
    suggestions: analysis.suggestions,
    createdAt: new Date().toISOString()
  });

  return res.status(201).json({ imageUrl: storageResult.url, ...analysis });
}
