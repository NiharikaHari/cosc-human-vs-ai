export function accuracyPercent(score, total) {
  if (total === 0) return 0;
  return Math.round((score / total) * 100);
}

export function formatTimestamp(isoString) {
  return new Date(isoString).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
