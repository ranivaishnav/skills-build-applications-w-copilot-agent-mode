import mongoose, { Schema } from 'mongoose';
const activitySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    distanceKm: { type: Number, default: 0 },
    caloriesBurned: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});
const Activity = mongoose.model('Activity', activitySchema);
export default Activity;
