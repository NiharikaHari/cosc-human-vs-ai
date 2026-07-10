function ImageContent({ content }) {
  return (
    <div className="image-content">
      <img src={content.assetPath} alt={content.alt || ""} />
    </div>
  );
}

export default ImageContent;
