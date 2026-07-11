import { useEffect, useState } from "react";
import { fetchLeaderboard } from "../api.js";
import { formatTimestamp } from "../utils/format.js";

function Leaderboard({ onClose, deviceId }) {
  const [entries, setEntries] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaderboard().then(setEntries).catch((err) => setError(err.message));
  }, []);

  return (
    <div className="overlay">
      <div className="overlay-panel overlay-panel--leaderboard">
        <h2>Leaderboard</h2>
        <p className="leaderboard-subtitle">Top streaks across every player</p>
        {error && <p className="error-text">{error}</p>}
        {!error && !entries && <p>Loading...</p>}
        {entries && entries.length === 0 && <p>No scores yet - be the first!</p>}
        {entries && entries.length > 0 && (
          <ol className="leaderboard-list">
            {entries.map((entry, index) => {
              const rank = index + 1;
              const medal = rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : `#${rank}`;
              const rankClass =
                rank === 1 ? "leaderboard-first" : rank === 2 ? "leaderboard-second" : rank === 3 ? "leaderboard-third" : "";
              const isMine = Boolean(deviceId) && entry.deviceId === deviceId;
              const className = ["leaderboard-entry", rankClass, isMine ? "leaderboard-mine" : ""]
                .filter(Boolean)
                .join(" ");
              return (
                <li key={entry.id} className={className}>
                  <span className="leaderboard-rank">{medal}</span>
                  <span className="leaderboard-name">
                    {entry.name}
                    {isMine && <span className="leaderboard-you-badge">You</span>}
                  </span>
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
