import { useEffect, useRef, useState } from "react";
import { formatTime } from "../../utils/format.js";

function AudioContent({ content }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [content.assetPath]);

  function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  }

  const progress = duration > 0 ? currentTime / duration : 0;

  return (
    <div className="media-player">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} src={content.assetPath} preload="metadata" />
      <button type="button" className="media-player-button" onClick={togglePlayback}>
        {isPlaying ? "Pause" : "Play"}
      </button>
      <div className="media-player-track">
        <div className="media-player-fill" style={{ width: `${progress * 100}%` }} />
      </div>
      <span className="media-player-time">
        {formatTime(currentTime)} / {formatTime(duration)}
      </span>
    </div>
  );
}

export default AudioContent;
