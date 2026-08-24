import { Router } from 'express';
import User from '../models/User';
import { wrap } from '../middleware/asyncHandler';

const router = Router();

router.post('/', wrap(async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).send({ error: 'name,email required' });
  const user = await User.create({ name, email });
  res.status(201).send(user);
}));

router.get('/', wrap(async (req, res) => {
  const users = await User.find().lean();
  res.send(users);
}));

router.get('/:id', wrap(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send({ error: 'not found' });
  res.send(user);
}));

export default router;
