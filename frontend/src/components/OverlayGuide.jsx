const alignmentTips = [
  'Align storefront edges with vertical guides',
  'Keep business name/sign centered in the box',
  'Avoid tilt and keep horizon straight'
];

export function OverlayGuide() {
  return (
    <div className="overlay-guide" aria-hidden="true">
      <div className="safe-area">
        <div className="rule-of-thirds rule-of-thirds--v1" />
        <div className="rule-of-thirds rule-of-thirds--v2" />
        <div className="rule-of-thirds rule-of-thirds--h1" />
        <div className="rule-of-thirds rule-of-thirds--h2" />
        <span className="target-label">Align business front here</span>
      </div>

      <div className="overlay-instructions">
        <p className="overlay-title">Photo alignment guide</p>
        <ul>
          {alignmentTips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
