function RevealPanel({ round, wasCorrect, onNext, isGameOver }) {
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
      <button type="button" className="btn-primary" onClick={onNext}>
        {isGameOver ? "See final score" : "Next round"}
      </button>
    </div>
  );
}

export default RevealPanel;
