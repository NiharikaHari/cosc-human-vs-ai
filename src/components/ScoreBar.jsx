function ScoreBar({ roundIndex, totalRounds, score }) {
  return (
    <div className="score-bar" aria-live="polite">
      <span>
        Round {roundIndex + 1} of {totalRounds}
      </span>
      <span>Score: {score}</span>
    </div>
  );
}

export default ScoreBar;
