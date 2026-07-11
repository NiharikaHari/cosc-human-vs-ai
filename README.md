# Human vs AI

A guessing game: you're shown a piece of content - text, code, an image/artwork,
or a voice clip - and you guess whether it was made by a human or by AI. After
each guess you see the correct answer and a short explanation, then your score
is tracked on a shared leaderboard.

## Stack

- **Frontend**: React 19 + Vite, plain CSS, no router (a small `App.jsx` state
  machine switches between screens).
- **Backend**: Express serving a JSON API, with `lowdb` for the leaderboard.
- Round content and media assets are curated, static, checked-in data (not
  generated at runtime) - see [Content sourcing](#content-sourcing) below.

## Running it

```bash
npm install
npm run dev
```

This runs the Vite dev server and the Express API together (via `concurrently`),
with `/api` and `/media` proxied from the client to the API. Open the URL Vite
prints (usually http://localhost:5173).

For a production build:

```bash
npm run build
npm start
```

`npm start` runs the Express server directly, which serves the built `dist/`
alongside the API and media assets from a single process.

## Project structure

```
server/
  index.js          Express app: API routes + /media static + serves dist/
  db.js             lowdb setup (leaderboard only)
  data/
    rounds/          Curated round data, one JSON file per category, plus
                      index.js which samples/interleaves a session
    assets/          Downloaded media (images/audio) referenced by rounds
  routes/
    rounds.js         GET /api/rounds, GET /api/rounds/sources
    leaderboard.js     GET/POST /api/leaderboard
src/
  App.jsx            Screen state machine: start -> round -> end (+ overlays)
  api.js             fetch wrappers for the API above
  hooks/             useSpeechSynthesis - wraps the browser's TTS API
  components/        Screens, plus components/content/* for per-category rendering
```

## Content sourcing

Every round is real, honestly-sourced content - nothing was generated to
impersonate a human. See [CREDITS.md](./CREDITS.md) for the full attribution
ledger (also available live in-app via the Sources page).

- **Text**: real human vs real ChatGPT answers to the same questions, from the
  [HC3 dataset](https://huggingface.co/datasets/Hello-SimpleAI/HC3).
- **Code**: real snippets from open-source projects (CPython, lodash) paired
  with snippets genuinely written by Claude for this game.
- **Images & artwork**: real wildlife photography and real hand-drawn paleoart
  illustration vs real AI art, all sourced from Wikimedia Commons (including
  its own `AI-generated images` category).
- **Voice**: real public-domain readings from LibriVox vs the browser's own
  `SpeechSynthesis` API, used live at play time so no synthetic audio needs to
  be hosted at all.

## How a round is picked

The game is endless: `GET /api/rounds?count=all` returns the entire shuffled
pool (every category's rounds, interleaved round-robin so a session touches
all four categories and never repeats a category twice in a row), and the
client plays through it round by round until you guess wrong - your streak
of correct answers is your score. Since content isn't repeated within a
session, the longest possible streak is capped at the pool size (currently
~24 rounds across all categories); clearing the whole pool without a miss
ends the game as a "Perfect Clear." A fixed-size sample is still available
via `GET /api/rounds?count=<n>`, which samples `count/4` rounds from each
category's pool, for any future non-endless mode. Every round's `isAI`,
`explanation`, and `source` are sent to the client up front - the UI just
doesn't render them until you've guessed.
