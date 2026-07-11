import { Router } from "express";
import { getSessionRounds, getSources } from "../data/rounds/index.js";

const router = Router();

router.get("/", (req, res) => {
  const countParam = req.query.count;
  let count = 12;
  if (countParam === "all") {
    count = "all";
  } else {
    const parsed = Number.parseInt(countParam, 10);
    if (Number.isFinite(parsed) && parsed > 0) count = parsed;
  }
  const rounds = getSessionRounds(count);
  res.json(rounds);
});

router.get("/sources", (req, res) => {
  res.json(getSources());
});

export default router;
