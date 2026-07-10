import { Router } from "express";
import { getSessionRounds, getSources } from "../data/rounds/index.js";

const router = Router();

router.get("/", (req, res) => {
  const count = Number.parseInt(req.query.count, 10);
  const rounds = getSessionRounds(Number.isFinite(count) && count > 0 ? count : 12);
  res.json(rounds);
});

router.get("/sources", (req, res) => {
  res.json(getSources());
});

export default router;
