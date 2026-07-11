import { useState } from "react";
import { fetchRounds } from "./api.js";
import { getDeviceId } from "./utils/device.js";
import StartScreen from "./components/StartScreen.jsx";
import RoundScreen from "./components/RoundScreen.jsx";
import EndScreen from "./components/EndScreen.jsx";
import Leaderboard from "./components/Leaderboard.jsx";
import SourcesPage from "./components/SourcesPage.jsx";

function App() {
  const [screen, setScreen] = useState("start");
  const [name, setName] = useState(() => localStorage.getItem("human-vs-ai-name") || "");
  const [deviceId] = useState(() => getDeviceId());
  const [rounds, setRounds] = useState([]);
  const [roundIndex, setRoundIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [roundsAttempted, setRoundsAttempted] = useState(0);
  const [outcome, setOutcome] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [overlay, setOverlay] = useState(null);

  function handleNameChange(newName) {
    setName(newName);
    localStorage.setItem("human-vs-ai-name", newName);
  }

  async function startGame() {
    setLoadError(null);
    try {
      const sessionRounds = await fetchRounds();
      setRounds(sessionRounds);
      setRoundIndex(0);
      setScore(0);
      setRoundsAttempted(0);
      setOutcome(null);
      setScreen("round");
    } catch (err) {
      setLoadError(err.message);
    }
  }

  function returnHome() {
    setScreen("start");
  }

  function handleCorrectGuess() {
    setScore((current) => current + 1);
  }

  function handleAdvance(wasCorrect) {
    const attempted = roundIndex + 1;
    setRoundsAttempted(attempted);
    if (!wasCorrect) {
      setOutcome("wrong");
      setScreen("end");
    } else if (attempted >= rounds.length) {
      setOutcome("clear");
      setScreen("end");
    } else {
      setRoundIndex(attempted);
    }
  }

  return (
    <main className={screen === "start" ? "app app--start" : "app"}>
      {screen === "start" && (
        <StartScreen
          name={name}
          onNameChange={handleNameChange}
          onStart={startGame}
          onViewLeaderboard={() => setOverlay("leaderboard")}
          onViewSources={() => setOverlay("sources")}
          loadError={loadError}
        />
      )}

      {screen === "round" && rounds.length > 0 && (
        <RoundScreen
          rounds={rounds}
          roundIndex={roundIndex}
          score={score}
          onCorrectGuess={handleCorrectGuess}
          onAdvance={handleAdvance}
        />
      )}

      {screen === "end" && (
        <EndScreen
          name={name}
          score={score}
          totalRounds={roundsAttempted}
          outcome={outcome}
          deviceId={deviceId}
          onPlayAgain={startGame}
          onViewLeaderboard={() => setOverlay("leaderboard")}
          onViewSources={() => setOverlay("sources")}
          onReturnHome={returnHome}
        />
      )}

      {overlay === "leaderboard" && <Leaderboard onClose={() => setOverlay(null)} deviceId={deviceId} />}
      {overlay === "sources" && <SourcesPage onClose={() => setOverlay(null)} />}
    </main>
  );
}

export default App;
