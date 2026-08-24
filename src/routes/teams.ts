import { Router } from 'express';
import Team from '../models/Team';
import User from '../models/User';
import { wrap } from '../middleware/asyncHandler';

const router = Router();

router.post('/', wrap(async (req, res) => {
  const { name, memberIds } = req.body;
  if (!name) return res.status(400).send({ error: 'name required' });
  const team = await Team.create({ name, members: memberIds || [] });
  if (memberIds && memberIds.length) {
    await User.updateMany({ _id: { $in: memberIds } }, { $addToSet: { teams: team._id } });
  }
  res.status(201).send(team);
}));

router.get('/', wrap(async (req, res) => {
  const teams = await Team.find().populate('members').lean();
  res.send(teams);
}));

export default router;
