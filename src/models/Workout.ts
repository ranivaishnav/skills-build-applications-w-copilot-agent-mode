import { Schema, model, Types } from 'mongoose';

interface IWorkout {
  user: Types.ObjectId;
  title: string;
  exercises: { name: string; reps?: number; sets?: number; duration?: number }[];
  date: Date;
}

const WorkoutSchema = new Schema<IWorkout>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  exercises: [{ name: String, reps: Number, sets: Number, duration: Number }],
  date: { type: Date, default: Date.now }
}, { timestamps: true });

export default model<IWorkout>('Workout', WorkoutSchema);
