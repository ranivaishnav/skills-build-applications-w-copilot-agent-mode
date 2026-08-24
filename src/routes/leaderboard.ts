import { Router } from 'express';
import User from '../models/User';
import Team from '../models/Team';
import { wrap } from '../middleware/asyncHandler';

const router = Router();

router.get('/users', wrap(async (req, res) => {
  const top = await User.find().sort({ totalPoints: -1 }).limit(20).lean();
  res.send(top);
}));

router.get('/teams', wrap(async (req, res) => {
  const top = await Team.find().sort({ totalPoints: -1 }).limit(20).lean();
  res.send(top);
}));

export default router;
