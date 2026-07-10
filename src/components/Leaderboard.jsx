import { useEffect, useState } from "react";
import { fetchLeaderboard } from "../api.js";
import { accuracyPercent, formatTimestamp } from "../utils/format.js";

function Leaderboard({ onClose }) {
  const [entries, setEntries] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaderboard().then(setEntries).catch((err) => setError(err.message));
  }, []);

  return (
    <div className="overlay">
      <div className="overlay-panel">
        <h2>Leaderboard</h2>
        {error && <p className="error-text">{error}</p>}
        {!error && !entries && <p>Loading...</p>}
        {entries && entries.length === 0 && <p>No scores yet - be the first!</p>}
        {entries && entries.length > 0 && (
          <ol className="leaderboard-list">
            {entries.map((entry) => (
              <li key={entry.id}>
                <span className="leaderboard-name">{entry.name}</span>
                <span>
                  {entry.score}/{entry.totalRounds} ({accuracyPercent(entry.score, entry.totalRounds)}%)
                </span>
                <span className="leaderboard-date">{formatTimestamp(entry.createdAt)}</span>
              </li>
            ))}
          </ol>
        )}
        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Leaderboard;
