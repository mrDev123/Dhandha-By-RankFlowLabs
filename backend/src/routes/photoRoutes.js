import { Router } from 'express';
import { analyzePhotoHandler } from '../controllers/photoController.js';
import { uploadPhotoMiddleware } from '../middleware/uploadMiddleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const photoRoutes = Router();

photoRoutes.post('/analyze', uploadPhotoMiddleware.single('photo'), asyncHandler(analyzePhotoHandler));
