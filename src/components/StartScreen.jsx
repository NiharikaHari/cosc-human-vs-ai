import { useState } from "react";

function StartScreen({ name, onNameChange, onStart, onViewLeaderboard, onViewSources, loadError }) {
  const [localName, setLocalName] = useState(name);

  function handleStart() {
    onNameChange(localName);
    onStart();
  }

  return (
    <div className="start-screen">
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="hero-word accent-cyan">Human</span>
          <span className="hero-vs">vs</span>
          <span className="hero-word accent-pink">AI</span>
        </h1>

        <div className="hiw-panel">
          <p className="hiw-label">[ How to play ]</p>
          <ol className="hiw-steps">
            <li className="hiw-step">
              <span className="hiw-step-num">01</span>
              <p className="hiw-step-text">You'll see text, code, images, or audio.</p>
            </li>
            <li className="hiw-step">
              <span className="hiw-step-num">02</span>
              <p className="hiw-step-text">Guess: made by a human, or by AI?</p>
            </li>
            <li className="hiw-step">
              <span className="hiw-step-num">03</span>
              <p className="hiw-step-text">One wrong guess ends your streak - stay sharp.</p>
            </li>
          </ol>
        </div>

        <div className="start-actions-block">
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

          {loadError && <p className="error-text">{loadError}</p>}

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
      </div>
    </div>
  );
}

export default StartScreen;
