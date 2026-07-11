import { Router } from "express";
import crypto from "node:crypto";
import { db } from "../db.js";

const router = Router();

function validateEntry(body) {
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const score = body.score;
  const totalRounds = body.totalRounds;

  if (!name) return "Enter a name to submit your score.";
  if (name.length > 40) return "Name must be 40 characters or fewer.";
  if (!Number.isInteger(score) || score < 0) return "Score must be a non-negative integer.";
  if (!Number.isInteger(totalRounds) || totalRounds < 0) {
    return "Total rounds must be a non-negative integer.";
  }
  if (score > totalRounds) return "Score can't exceed the total number of rounds.";

  if (body.deviceId !== undefined && body.deviceId !== null) {
    if (typeof body.deviceId !== "string" || body.deviceId.trim().length === 0 || body.deviceId.length > 64) {
      return "Invalid device ID.";
    }
  }

  return null;
}

router.get("/", (req, res) => {
  const limit = Number.parseInt(req.query.limit, 10);
  const effectiveLimit = Number.isFinite(limit) && limit > 0 ? limit : 10;

  const sorted = db.data.leaderboard
    .slice()
    .sort((a, b) => b.score - a.score || new Date(a.createdAt) - new Date(b.createdAt));

  res.json(sorted.slice(0, effectiveLimit));
});

router.get("/best", (req, res) => {
  const deviceId = typeof req.query.deviceId === "string" ? req.query.deviceId.trim() : "";
  if (!deviceId) return res.json({ best: null });

  const mine = db.data.leaderboard.filter((entry) => entry.deviceId === deviceId);
  if (mine.length === 0) return res.json({ best: null });

  const top = mine.reduce((max, entry) => (entry.score > max.score ? entry : max));
  res.json({ best: { score: top.score, totalRounds: top.totalRounds, createdAt: top.createdAt } });
});

router.post("/", async (req, res) => {
  const body = req.body ?? {};
  const validationError = validateEntry(body);
  if (validationError) return res.status(400).json({ error: validationError });

  const entry = {
    id: crypto.randomUUID(),
    name: body.name.trim(),
    score: body.score,
    totalRounds: body.totalRounds,
    deviceId: typeof body.deviceId === "string" ? body.deviceId.trim() : null,
    createdAt: new Date().toISOString(),
  };

  db.data.leaderboard.push(entry);
  await db.write();
  res.status(201).json(entry);
});

export default router;
