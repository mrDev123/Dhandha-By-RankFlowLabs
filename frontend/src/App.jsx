import { CapturePage } from './pages/CapturePage';
import { usePhotoUpload } from './hooks/usePhotoUpload';

export default function App() {
  const { analysis, status, uploadPhoto } = usePhotoUpload();

  return (
    <main className="app-shell">
      <header>
        <h1>Business Photo Assistant</h1>
        <p>Capture, analyze, and improve your business listing photos.</p>
      </header>

      <CapturePage analysis={analysis} status={status} onCapture={uploadPhoto} />
    </main>
  );
}
