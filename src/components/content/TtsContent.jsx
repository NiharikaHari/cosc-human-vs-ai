import { useEffect, useRef, useState } from "react";
import { useSpeechSynthesis } from "../../hooks/useSpeechSynthesis.js";
import { formatTime } from "../../utils/format.js";

const WORDS_PER_SECOND = 2.5;

function estimateDuration(text) {
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(wordCount / WORDS_PER_SECOND, 1);
}

function TtsContent({ content }) {
  const { speak, stop, isSpeaking, supported } = useSpeechSynthesis();
  const [elapsed, setElapsed] = useState(0);
  const frameRef = useRef(null);
  const startedAtRef = useRef(0);
  const duration = estimateDuration(content.text);

  useEffect(() => {
    if (!isSpeaking) {
      cancelAnimationFrame(frameRef.current);
      setElapsed(0);
      return undefined;
    }

    startedAtRef.current = performance.now();
    function tick(now) {
      setElapsed(Math.min((now - startedAtRef.current) / 1000, duration));
      frameRef.current = requestAnimationFrame(tick);
    }
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [isSpeaking, duration]);

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

  const progress = duration > 0 ? elapsed / duration : 0;

  return (
    <div className="media-player">
      <button
        type="button"
        className="media-player-button"
        onClick={() => (isSpeaking ? stop() : speak(content.text))}
      >
        {isSpeaking ? "Pause" : "Play"}
      </button>
      <div className="media-player-track">
        <div className="media-player-fill" style={{ width: `${progress * 100}%` }} />
      </div>
      <span className="media-player-time">
        {formatTime(elapsed)} / {formatTime(duration)}
      </span>
    </div>
  );
}

export default TtsContent;
