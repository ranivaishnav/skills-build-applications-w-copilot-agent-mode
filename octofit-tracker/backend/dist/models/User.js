import mongoose, { Schema } from 'mongoose';
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    fitnessLevel: { type: String, default: 'beginner' },
});
const User = mongoose.model('User', userSchema);
export default User;
