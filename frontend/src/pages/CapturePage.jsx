import { CameraCapture } from '../components/CameraCapture';
import { QualityReport } from '../components/QualityReport';

export function CapturePage({ analysis, status, onCapture }) {
  return (
    <>
      <CameraCapture onCapture={onCapture} />
      <QualityReport analysis={analysis} status={status} />
    </>
  );
}
