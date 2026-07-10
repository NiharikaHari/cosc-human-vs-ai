import { useState } from "react";
import { submitScore } from "../api.js";
import { accuracyPercent } from "../utils/format.js";

function EndScreen({ name, score, totalRounds, onPlayAgain, onViewLeaderboard, onViewSources }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    try {
      await submitScore({ name: name || "Anonymous", score, totalRounds });
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="end-screen">
      <h1>Game Over</h1>
      <p className="final-score">
        {score} / {totalRounds} correct ({accuracyPercent(score, totalRounds)}%)
      </p>
      {error && <p className="error-text">{error}</p>}
      {!submitted ? (
        <button type="button" onClick={handleSubmit} disabled={submitting}>
          {submitting ? "Submitting..." : "Submit to Leaderboard"}
        </button>
      ) : (
        <p>Score submitted!</p>
      )}
      <div className="end-actions">
        <button type="button" onClick={onPlayAgain}>
          Play Again
        </button>
        <button type="button" onClick={onViewLeaderboard}>
          View Leaderboard
        </button>
        <button type="button" onClick={onViewSources}>
          Sources & Credits
        </button>
      </div>
    </div>
  );
}

export default EndScreen;
