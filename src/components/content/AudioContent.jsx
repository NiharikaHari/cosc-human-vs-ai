function AudioContent({ content }) {
  return (
    <div className="audio-content">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio controls src={content.assetPath} />
    </div>
  );
}

export default AudioContent;
