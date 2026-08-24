import mongoose, { Schema, type Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  username: string;
  fitnessLevel: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  fitnessLevel: { type: String, default: 'beginner' },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
