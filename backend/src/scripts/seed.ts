/**
 * Seed command: `npm run seed`
 * This script populates the `octofit_db` database with sample users, teams, and activities.
 */

import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db';

async function seed() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection;

  const usersColl = db.collection('users');
  const teamsColl = db.collection('teams');
  const activitiesColl = db.collection('activities');

  await Promise.all([
    usersColl.deleteMany({}),
    teamsColl.deleteMany({}),
    activitiesColl.deleteMany({}),
  ]);

  const now = new Date();
  const users = [
    { name: 'Alice', email: 'alice@example.com', totalPoints: 120, createdAt: now, updatedAt: now },
    { name: 'Bob', email: 'bob@example.com', totalPoints: 90, createdAt: now, updatedAt: now },
    { name: 'Cleo', email: 'cleo@example.com', totalPoints: 75, createdAt: now, updatedAt: now }
  ];

  const insertRes = await usersColl.insertMany(users);

  const team = {
    name: 'Team Rocket',
    members: Object.values(insertRes.insertedIds),
    totalPoints: 285,
    createdAt: now,
    updatedAt: now
  };

  const teamRes = await teamsColl.insertOne(team);

  await usersColl.updateMany({}, { $addToSet: { teams: teamRes.insertedId } });

  const activities = [
    { user: insertRes.insertedIds['0'], type: 'run', duration: 30, distance: 5, calories: 300, points: 50, date: now, createdAt: now, updatedAt: now },
    { user: insertRes.insertedIds['1'], type: 'bike', duration: 45, distance: 20, calories: 600, points: 70, date: now, createdAt: now, updatedAt: now },
    { user: insertRes.insertedIds['2'], type: 'swim', duration: 20, distance: 1, calories: 200, points: 30, date: now, createdAt: now, updatedAt: now }
  ];

  await activitiesColl.insertMany(activities);

  console.log('Seed complete (backend seed.ts)');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
