function ScoreBar({ roundIndex, totalRounds, score }) {
  const progress = ((roundIndex + 1) / totalRounds) * 100;

  return (
    <div className="score-bar" aria-live="polite">
      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={roundIndex + 1}
        aria-valuemin={0}
        aria-valuemax={totalRounds}
        aria-label={`Round ${roundIndex + 1} of ${totalRounds}`}
      >
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <span className="score-value">Score: {score}</span>
    </div>
  );
}

export default ScoreBar;
