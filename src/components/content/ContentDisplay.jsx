import TextContent from "./TextContent.jsx";
import CodeContent from "./CodeContent.jsx";
import ImageContent from "./ImageContent.jsx";
import AudioContent from "./AudioContent.jsx";
import TtsContent from "./TtsContent.jsx";

const COMPONENTS_BY_MODE = {
  text: TextContent,
  code: CodeContent,
  image: ImageContent,
  audio: AudioContent,
  tts: TtsContent,
};

function ContentDisplay({ content }) {
  const Component = COMPONENTS_BY_MODE[content.mode];
  if (!Component) return null;
  return <Component content={content} />;
}

export default ContentDisplay;
