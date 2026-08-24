import mongoose, { Schema } from 'mongoose';
const workoutSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, default: 'beginner' },
});
const Workout = mongoose.model('Workout', workoutSchema);
export default Workout;
