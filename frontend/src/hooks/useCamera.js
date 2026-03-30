import { useRef, useState } from 'react';

export function useCamera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [streaming, setStreaming] = useState(false);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: 'environment' } }
    });

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      setStreaming(true);
    }
  };

  const capturePhoto = () =>
    new Promise((resolve) => {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (!video || !canvas) {
        resolve(null);
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.9);
    });

  return {
    videoRef,
    canvasRef,
    streaming,
    startCamera,
    capturePhoto
  };
}
