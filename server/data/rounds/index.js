import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CATEGORIES = ["text", "code", "image", "voice"];

const FILES = {
  text: "text.json",
  code: "code.json",
  image: "images.json",
  voice: "voice.json",
};

function loadCategory(category) {
  const file = path.join(__dirname, FILES[category]);
  return JSON.parse(readFileSync(file, "utf-8"));
}

const pools = Object.fromEntries(
  CATEGORIES.map((category) => [category, loadCategory(category)]),
);

const allRounds = CATEGORIES.flatMap((category) => pools[category]);

function shuffled(array) {
  const result = array.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Groups rounds that share a pairId (e.g. the human- and AI-written answers to
// the same underlying question) so a session only ever surfaces one variant
// of a given question, never both.
function groupByPair(pool) {
  const groups = new Map();
  for (const round of pool) {
    const key = round.pairId ?? round.id;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(round);
  }
  return [...groups.values()];
}

export function getSessionRounds(count = 12) {
  const perCategory =
    count === "all" ? Infinity : Math.max(1, Math.round(count / CATEGORIES.length));

  const picks = CATEGORIES.map((category) => {
    const groups = shuffled(groupByPair(pools[category]));
    const chosenGroups = groups.slice(0, Math.min(perCategory, groups.length));
    return chosenGroups.map((group) => group[Math.floor(Math.random() * group.length)]);
  });

  const maxLength = Math.max(...picks.map((p) => p.length));
  const interleaved = [];
  for (let i = 0; i < maxLength; i++) {
    for (const pick of picks) {
      if (pick[i]) interleaved.push(pick[i]);
    }
  }

  return interleaved;
}

export function getSources() {
  return allRounds.map(({ id, category, source }) => ({ id, category, source }));
}
