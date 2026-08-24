import { Router } from 'express';
import Activity from '../models/Activity.js';
const router = Router();
router.get('/', async (_req, res) => {
    try {
        const activities = await Activity.find().populate('userId');
        res.json(activities);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching activities', error });
    }
});
router.post('/', async (req, res) => {
    try {
        const activity = await Activity.create(req.body);
        res.status(201).json(activity);
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating activity', error });
    }
});
export default router;
