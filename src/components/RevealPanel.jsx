function RevealPanel({ round, wasCorrect, onNext, isLastRound }) {
  return (
    <div className="reveal-panel" aria-live="assertive">
      <p className={wasCorrect ? "reveal-correct" : "reveal-incorrect"}>
        {wasCorrect ? "Correct!" : "Not quite."} This was made by{" "}
        {round.isAI ? "an AI" : "a human"}.
      </p>
      <p className="reveal-explanation">{round.explanation}</p>
      <p className="reveal-source">
        Source: {round.source.name}
        {round.source.author ? ` - ${round.source.author}` : ""}
        {round.source.license ? ` (${round.source.license})` : ""}
      </p>
      <button type="button" onClick={onNext}>
        {isLastRound ? "See final score" : "Next round"}
      </button>
    </div>
  );
}

export default RevealPanel;
