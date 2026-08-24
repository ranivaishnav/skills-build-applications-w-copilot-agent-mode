import { Schema, model, Types } from 'mongoose';

interface IUser {
  name: string;
  email: string;
  password?: string;
  teams: Types.ObjectId[];
  totalPoints: number;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
  totalPoints: { type: Number, default: 0 }
}, { timestamps: true });

export default model<IUser>('User', UserSchema);
