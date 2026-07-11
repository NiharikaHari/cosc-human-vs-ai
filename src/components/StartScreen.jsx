import { useState } from "react";

function StartScreen({ name, onNameChange, onStart, onViewLeaderboard, onViewSources }) {
  const [localName, setLocalName] = useState(name);

  function handleStart() {
    onNameChange(localName);
    onStart();
  }

  return (
    <div className="start-screen">
      <h1>
        <span className="accent-cyan">Human</span> vs <span className="accent-pink">AI</span>
      </h1>
      <p>
        You'll be shown text, code, images, and voice clips. Guess whether each one was
        made by a human or by AI, then see the explanation. Keep your streak alive - one
        wrong guess ends the game.
      </p>
      <label className="name-field">
        Your name (for the leaderboard)
        <input
          type="text"
          value={localName}
          maxLength={40}
          placeholder="Anonymous"
          onChange={(event) => setLocalName(event.target.value)}
        />
      </label>
      <div className="start-actions">
        <button type="button" className="btn-primary" onClick={handleStart}>
          Start Game
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

export default StartScreen;
