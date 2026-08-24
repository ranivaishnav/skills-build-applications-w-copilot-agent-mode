import mongoose, { Schema, type Document, Types } from 'mongoose';

export interface IActivity extends Document {
  userId: Types.ObjectId;
  type: string;
  durationMinutes: number;
  distanceKm: number;
  caloriesBurned: number;
  createdAt?: Date;
}

const activitySchema = new Schema<IActivity>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  distanceKm: { type: Number, default: 0 },
  caloriesBurned: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Activity = mongoose.model<IActivity>('Activity', activitySchema);

export default Activity;
