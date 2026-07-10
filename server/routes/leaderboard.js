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

router.post("/", async (req, res) => {
  const body = req.body ?? {};
  const validationError = validateEntry(body);
  if (validationError) return res.status(400).json({ error: validationError });

  const entry = {
    id: crypto.randomUUID(),
    name: body.name.trim(),
    score: body.score,
    totalRounds: body.totalRounds,
    createdAt: new Date().toISOString(),
  };

  db.data.leaderboard.push(entry);
  await db.write();
  res.status(201).json(entry);
});

export default router;
