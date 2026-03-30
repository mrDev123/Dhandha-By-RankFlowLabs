import { useState } from 'react';
import { OverlayGuide } from './OverlayGuide';
import { useCamera } from '../hooks/useCamera';

export function CameraCapture({ onCapture }) {
  const {
    videoRef,
    canvasRef,
    streaming,
    cameraError,
    startCamera,
    stopCamera,
    capturePhoto
  } = useCamera();

  const [previewUrl, setPreviewUrl] = useState('');

  const takePhoto = async () => {
    const blob = await capturePhoto();

    if (!blob) {
      return;
    }

    const objectUrl = URL.createObjectURL(blob);
    setPreviewUrl(objectUrl);

    await onCapture(blob);
  };

  return (
    <section className="camera-card">
      <h2>1) Capture Photo</h2>

      <div className="preview-wrapper">
        <video ref={videoRef} autoPlay playsInline muted className="preview" />
        <OverlayGuide />
      </div>
      <canvas ref={canvasRef} hidden />

      <div className="controls">
        <button type="button" onClick={startCamera}>
          {streaming ? 'Restart Camera' : 'Open Camera'}
        </button>
        <button type="button" onClick={takePhoto} disabled={!streaming}>
          Capture Image
        </button>
        <button type="button" onClick={stopCamera} disabled={!streaming}>
          Stop Camera
        </button>
      </div>

      {cameraError ? <p role="alert">{cameraError}</p> : null}

      {previewUrl ? (
        <div>
          <h3>Captured Preview</h3>
          <img src={previewUrl} alt="Captured business" className="preview" />
        </div>
      ) : null}
    </section>
  );
}
