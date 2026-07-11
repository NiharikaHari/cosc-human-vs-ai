import { useEffect, useState } from "react";
import { fetchPersonalBest, submitScore } from "../api.js";

function EndScreen({
  name,
  score,
  totalRounds,
  outcome,
  deviceId,
  onPlayAgain,
  onViewLeaderboard,
  onViewSources,
  onReturnHome,
}) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [previousBest, setPreviousBest] = useState(undefined);

  useEffect(() => {
    fetchPersonalBest(deviceId)
      .then((data) => setPreviousBest(data.best))
      .catch(() => setPreviousBest(null));
  }, [deviceId]);

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    try {
      await submitScore({ name: name || "Anonymous", score, totalRounds, deviceId });
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  const heading = outcome === "clear" ? "Perfect Clear!" : "Game Over";
  const summary =
    outcome === "clear"
      ? `You cleared all ${totalRounds} scenarios without a wrong guess!`
      : `You reached a streak of ${score}.`;
  const isNewHighScore = score > 0 && (previousBest == null || score > previousBest.score);

  return (
    <div className="overlay">
      <div className="overlay-panel">
        <div className="end-screen">
          {outcome === "clear" && (
            <div className="confetti" aria-hidden="true">
              {Array.from({ length: 12 }).map((_, i) => (
                <span key={i} className="confetti-piece" style={{ "--i": i }} />
              ))}
            </div>
          )}
          <h1 className={outcome === "clear" ? "accent-cyan" : "accent-error"}>{heading}</h1>
          <p className="final-score">{summary}</p>
          {error && <p className="error-text">{error}</p>}
          {!submitted ? (
            <button type="button" className="btn-primary" onClick={handleSubmit} disabled={submitting}>
              {submitting ? "Submitting..." : "Submit to Leaderboard"}
            </button>
          ) : (
            <p>Score submitted!</p>
          )}
          {submitted && isNewHighScore && <p className="new-high-score">New High Score!</p>}
          <div className="end-actions">
            <button type="button" className="btn-primary" onClick={onPlayAgain}>
              Play Again
            </button>
            <button type="button" onClick={onViewLeaderboard}>
              View Leaderboard
            </button>
            <button type="button" className="btn-ghost" onClick={onViewSources}>
              Sources & Credits
            </button>
            <button type="button" className="btn-ghost" onClick={onReturnHome}>
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EndScreen;
