import { useEffect, useState } from "react";
import { fetchLeaderboard } from "../api.js";
import { formatTimestamp } from "../utils/format.js";

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
            {entries.map((entry, index) => {
              const rank = index + 1;
              const medal = rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : `#${rank}`;
              return (
                <li
                  key={entry.id}
                  className={rank === 1 ? "leaderboard-entry leaderboard-first" : "leaderboard-entry"}
                >
                  <span className="leaderboard-rank">{medal}</span>
                  <span className="leaderboard-name">{entry.name}</span>
                  <span>Streak: {entry.score}</span>
                  <span className="leaderboard-date">{formatTimestamp(entry.createdAt)}</span>
                </li>
              );
            })}
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
