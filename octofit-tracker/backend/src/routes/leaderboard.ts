import { Router } from 'express';
import LeaderboardEntry from '../models/LeaderboardEntry.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const entries = await LeaderboardEntry.find().sort({ score: -1 }).populate('userId');
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leaderboard', error });
  }
});

router.post('/', async (req, res) => {
  try {
    const entry = await LeaderboardEntry.create(req.body);
    res.status(201).json(entry);
  } catch (error) {
    res.status(400).json({ message: 'Error creating leaderboard entry', error });
  }
});

export default router;
