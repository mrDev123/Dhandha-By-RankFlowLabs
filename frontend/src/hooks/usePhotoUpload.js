import { useState } from 'react';
import { uploadBusinessPhoto } from '../services/api';

export function usePhotoUpload() {
  const [analysis, setAnalysis] = useState(null);
  const [status, setStatus] = useState('idle');

  const uploadPhoto = async (blob) => {
    if (!blob) return;

    setStatus('uploading');
    try {
      const result = await uploadBusinessPhoto(blob);
      setAnalysis(result);
      setStatus('done');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return {
    analysis,
    status,
    uploadPhoto
  };
}
