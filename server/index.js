import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import roundsRouter from "./routes/rounds.js";
import leaderboardRouter from "./routes/leaderboard.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.use("/api/rounds", roundsRouter);
app.use("/api/leaderboard", leaderboardRouter);
app.use("/api", (req, res) => res.status(404).json({ error: "Not found" }));

app.use("/media", express.static(path.join(__dirname, "data", "assets")));

const distPath = path.join(__dirname, "..", "dist");
app.use(express.static(distPath));

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
