import { useState } from "react";
import ScoreBar from "./ScoreBar.jsx";
import GuessButtons from "./GuessButtons.jsx";
import RevealPanel from "./RevealPanel.jsx";
import ContentDisplay from "./content/ContentDisplay.jsx";

const CATEGORY_LABELS = {
  text: "Text",
  code: "Code",
  image: "Image",
  voice: "Voice",
};

// For text/code rounds, round.prompt is the original question and
// round.content is a candidate answer - label the two so it's clear which
// part the player is meant to judge.
const SHOWS_QUESTION_ANSWER = { text: true, code: true };

function RoundScreen({ rounds, roundIndex, score, onCorrectGuess, onAdvance }) {
  const [guessed, setGuessed] = useState(false);
  const [wasCorrect, setWasCorrect] = useState(false);

  const round = rounds[roundIndex];
  const isLastInPool = roundIndex === rounds.length - 1;
  const isGameOver = !wasCorrect || isLastInPool;
  const showQuestionAnswer = SHOWS_QUESTION_ANSWER[round.category];

  function handleGuess(guessedAI) {
    const correct = guessedAI === round.isAI;
    setWasCorrect(correct);
    setGuessed(true);
    if (correct) onCorrectGuess();
  }

  function handleNext() {
    const correct = wasCorrect;
    setGuessed(false);
    setWasCorrect(false);
    onAdvance(correct);
  }

  return (
    <div className="round-screen">
      <ScoreBar roundIndex={roundIndex} totalRounds={rounds.length} score={score} />
      <span className="category-badge">
        {CATEGORY_LABELS[round.category] || round.category}
      </span>
      {showQuestionAnswer ? (
        <>
          <div className="qa-block">
            <span className="content-label">Question</span>
            <p className="round-prompt">{round.prompt}</p>
          </div>
          <div className="qa-block">
            <span className="content-label">Answer - human or AI?</span>
            <ContentDisplay content={round.content} />
          </div>
        </>
      ) : (
        <>
          <p className="round-prompt">{round.prompt}</p>
          <ContentDisplay content={round.content} />
        </>
      )}
      {!guessed ? (
        <GuessButtons onGuess={handleGuess} disabled={guessed} />
      ) : (
        <RevealPanel
          round={round}
          wasCorrect={wasCorrect}
          onNext={handleNext}
          isGameOver={isGameOver}
        />
      )}
    </div>
  );
}

export default RoundScreen;
