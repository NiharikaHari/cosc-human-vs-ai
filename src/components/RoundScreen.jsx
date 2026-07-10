import { useState } from "react";
import ScoreBar from "./ScoreBar.jsx";
import GuessButtons from "./GuessButtons.jsx";
import RevealPanel from "./RevealPanel.jsx";
import ContentDisplay from "./content/ContentDisplay.jsx";

function RoundScreen({ rounds, roundIndex, score, onCorrectGuess, onAdvance }) {
  const [guessed, setGuessed] = useState(false);
  const [wasCorrect, setWasCorrect] = useState(false);

  const round = rounds[roundIndex];
  const isLastRound = roundIndex === rounds.length - 1;

  function handleGuess(guessedAI) {
    const correct = guessedAI === round.isAI;
    setWasCorrect(correct);
    setGuessed(true);
    if (correct) onCorrectGuess();
  }

  function handleNext() {
    setGuessed(false);
    setWasCorrect(false);
    onAdvance();
  }

  return (
    <div className="round-screen">
      <ScoreBar roundIndex={roundIndex} totalRounds={rounds.length} score={score} />
      <p className="round-prompt">{round.prompt}</p>
      <ContentDisplay content={round.content} />
      {!guessed ? (
        <GuessButtons onGuess={handleGuess} disabled={guessed} />
      ) : (
        <RevealPanel
          round={round}
          wasCorrect={wasCorrect}
          onNext={handleNext}
          isLastRound={isLastRound}
        />
      )}
    </div>
  );
}

export default RoundScreen;
