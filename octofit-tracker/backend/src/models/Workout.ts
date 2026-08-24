import mongoose, { Schema, type Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  description: string;
  difficulty: string;
}

const workoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, default: 'beginner' },
});

const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);

export default Workout;
