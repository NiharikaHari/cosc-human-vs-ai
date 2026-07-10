async function handleResponse(res, fallbackMessage) {
  if (!res.ok) {
    let message = fallbackMessage;
    try {
      const body = await res.json();
      if (body?.error) message = body.error;
    } catch {
      // response wasn't JSON - keep fallback
    }
    throw new Error(message);
  }
  return res.json();
}

export async function fetchRounds(count = 12) {
  const res = await fetch(`/api/rounds?count=${count}`);
  return handleResponse(res, "Couldn't load rounds. Is the server running?");
}

export async function fetchSources() {
  const res = await fetch("/api/rounds/sources");
  return handleResponse(res, "Couldn't load sources.");
}

export async function fetchLeaderboard(limit = 10) {
  const res = await fetch(`/api/leaderboard?limit=${limit}`);
  return handleResponse(res, "Couldn't load the leaderboard.");
}

export async function submitScore({ name, score, totalRounds }) {
  const res = await fetch("/api/leaderboard", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, score, totalRounds }),
  });
  return handleResponse(res, "Couldn't submit your score. Try again.");
}
