import { useEffect, useState } from "react";
import { fetchSources } from "../api.js";

function groupByCategory(sources) {
  const groups = {};
  for (const item of sources) {
    if (!groups[item.category]) groups[item.category] = [];
    groups[item.category].push(item);
  }
  return groups;
}

function SourcesPage({ onClose }) {
  const [sources, setSources] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSources().then(setSources).catch((err) => setError(err.message));
  }, []);

  const groups = sources ? groupByCategory(sources) : null;

  return (
    <div className="overlay">
      <div className="overlay-panel">
        <h2>Sources & Credits</h2>
        {error && <p className="error-text">{error}</p>}
        {!error && !sources && <p>Loading...</p>}
        {groups &&
          Object.entries(groups).map(([category, items]) => (
            <div key={category} className="sources-group">
              <h3>{category}</h3>
              <ul>
                {items.map((item) => (
                  <li key={item.id}>
                    {item.source.url ? (
                      <a href={item.source.url} target="_blank" rel="noreferrer">
                        {item.source.name}
                      </a>
                    ) : (
                      item.source.name
                    )}
                    {item.source.author ? ` - ${item.source.author}` : ""}
                    {item.source.license ? ` (${item.source.license})` : ""}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default SourcesPage;
