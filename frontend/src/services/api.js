const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export async function uploadBusinessPhoto(photoBlob) {
  const formData = new FormData();
  formData.append('photo', photoBlob, `business-photo-${Date.now()}.jpg`);

  const response = await fetch(`${API_BASE_URL}/api/photos/analyze`, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    throw new Error('Unable to upload and analyze image');
  }

  return response.json();
}
