function CodeContent({ content }) {
  return (
    <pre className="code-content">
      <code>{content.text}</code>
    </pre>
  );
}

export default CodeContent;
