import { Schema, model, Types } from 'mongoose';

interface IActivity {
  user: Types.ObjectId;
  type: string;
  duration: number; // minutes
  distance?: number; // km
  calories?: number;
  points: number;
  date: Date;
}

const ActivitySchema = new Schema<IActivity>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  duration: { type: Number, default: 0 },
  distance: { type: Number },
  calories: { type: Number },
  points: { type: Number, default: 0 },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

export default model<IActivity>('Activity', ActivitySchema);
