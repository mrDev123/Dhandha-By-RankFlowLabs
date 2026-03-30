const loadingMessages = {
  idle: 'Capture a photo to get quality analysis.',
  uploading: 'Uploading photo and analyzing quality…',
  error: 'Something went wrong. Please try again.',
  done: null
};

export function QualityReport({ analysis, status }) {
  const message = loadingMessages[status];

  if (message) {
    return (
      <section className="report-card">
        <h2>2) Quality Report</h2>
        <p>{message}</p>
      </section>
    );
  }

  return (
    <section className="report-card">
      <h2>2) Quality Report</h2>
      <ul>
        <li>Blur score: {analysis.metrics.blurScore}</li>
        <li>Lighting score: {analysis.metrics.lightingScore}</li>
        <li>Composition score: {analysis.metrics.compositionScore}</li>
      </ul>
      <h3>Suggested improvements</h3>
      <ul>
        {analysis.suggestions.map((suggestion) => (
          <li key={suggestion}>{suggestion}</li>
        ))}
      </ul>
    </section>
  );
}
