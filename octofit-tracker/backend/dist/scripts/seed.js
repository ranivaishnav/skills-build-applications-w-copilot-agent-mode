import dotenv from 'dotenv';
import { connectDB } from '../config/database.js';
import User from '../models/User.js';
import Team from '../models/Team.js';
import Activity from '../models/Activity.js';
import LeaderboardEntry from '../models/LeaderboardEntry.js';
import Workout from '../models/Workout.js';
dotenv.config();
async function seed() {
    await connectDB();
    await Promise.all([
        User.deleteMany({}),
        Team.deleteMany({}),
        Activity.deleteMany({}),
        LeaderboardEntry.deleteMany({}),
        Workout.deleteMany({}),
    ]);
    const users = await User.insertMany([
        { name: 'Ava', email: 'ava@example.com', username: 'ava', fitnessLevel: 'advanced' },
        { name: 'Leo', email: 'leo@example.com', username: 'leo', fitnessLevel: 'intermediate' },
        { name: 'Mia', email: 'mia@example.com', username: 'mia', fitnessLevel: 'beginner' },
    ]);
    const teams = await Team.insertMany([
        { name: 'Sunrise Squad', members: [users[0]._id, users[1]._id] },
        { name: 'Storm Crew', members: [users[2]._id] },
    ]);
    await Activity.insertMany([
        { userId: users[0]._id, type: 'run', durationMinutes: 30, distanceKm: 5.2, caloriesBurned: 420 },
        { userId: users[1]._id, type: 'cycle', durationMinutes: 45, distanceKm: 18.4, caloriesBurned: 510 },
        { userId: users[2]._id, type: 'walk', durationMinutes: 25, distanceKm: 3.6, caloriesBurned: 180 },
    ]);
    await LeaderboardEntry.insertMany([
        { userId: users[0]._id, username: 'ava', score: 980 },
        { userId: users[1]._id, username: 'leo', score: 910 },
        { userId: users[2]._id, username: 'mia', score: 760 },
    ]);
    await Workout.insertMany([
        { name: 'Cardio Blast', description: 'High-intensity interval workout', difficulty: 'advanced' },
        { name: 'Core Strength', description: 'Strength and stability routine', difficulty: 'intermediate' },
        { name: 'Mobility Flow', description: 'Stretching and recovery session', difficulty: 'beginner' },
    ]);
    console.log('Seed data inserted for octofit_db');
    process.exit(0);
}
seed().catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
});
