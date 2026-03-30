import { OverlayGuide } from './OverlayGuide';
import { useCamera } from '../hooks/useCamera';

export function CameraCapture({ onCapture }) {
  const { videoRef, canvasRef, streaming, startCamera, capturePhoto } = useCamera();

  const takePhoto = async () => {
    const blob = await capturePhoto();
    if (blob) {
      await onCapture(blob);
    }
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
          {streaming ? 'Restart Camera' : 'Start Camera'}
        </button>
        <button type="button" onClick={takePhoto} disabled={!streaming}>
          Capture & Analyze
        </button>
      </div>
    </section>
  );
}
