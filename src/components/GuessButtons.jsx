function GuessButtons({ onGuess, disabled }) {
  return (
    <div className="guess-buttons">
      <button type="button" disabled={disabled} onClick={() => onGuess(false)}>
        Human
      </button>
      <button type="button" disabled={disabled} onClick={() => onGuess(true)}>
        AI
      </button>
    </div>
  );
}

export default GuessButtons;
