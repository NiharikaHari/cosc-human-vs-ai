import { useSpeechSynthesis } from "../../hooks/useSpeechSynthesis.js";

function TtsContent({ content }) {
  const { speak, stop, isSpeaking, supported } = useSpeechSynthesis();

  if (!supported) {
    return (
      <div className="tts-content">
        <p className="tts-fallback">
          Your browser doesn't support speech synthesis. Here's the text that would have
          been spoken:
        </p>
        <p className="text-content">{content.text}</p>
      </div>
    );
  }

  return (
    <div className="tts-content">
      <button
        type="button"
        className="tts-play-button"
        onClick={() => (isSpeaking ? stop() : speak(content.text))}
      >
        {isSpeaking ? "Stop" : "Play voice clip"}
      </button>
    </div>
  );
}

export default TtsContent;
