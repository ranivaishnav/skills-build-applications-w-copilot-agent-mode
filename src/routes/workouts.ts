import { Router } from 'express';
import Workout from '../models/Workout';
import { wrap } from '../middleware/asyncHandler';

const router = Router();

router.post('/', wrap(async (req, res) => {
  const { user, title, exercises } = req.body;
  const w = await Workout.create({ user, title, exercises });
  res.status(201).send(w);
}));

router.get('/', wrap(async (req, res) => {
  const items = await Workout.find().populate('user').sort({ date: -1 }).limit(100).lean();
  res.send(items);
}));

export default router;
