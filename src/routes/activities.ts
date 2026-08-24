import { Router } from 'express';
import Activity from '../models/Activity';
import User from '../models/User';
import { wrap } from '../middleware/asyncHandler';

const router = Router();

router.post('/', wrap(async (req, res) => {
  const { user, type, duration, distance, calories, points } = req.body;
  const act = await Activity.create({ user, type, duration, distance, calories, points });
  if (user && typeof points === 'number') {
    await User.findByIdAndUpdate(user, { $inc: { totalPoints: points } });
  }
  res.status(201).send(act);
}));

router.get('/', wrap(async (req, res) => {
  const list = await Activity.find().populate('user').sort({ date: -1 }).limit(100).lean();
  res.send(list);
}));

export default router;
