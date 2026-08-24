import { Schema, model, Types } from 'mongoose';

interface ITeam {
  name: string;
  members: Types.ObjectId[];
  totalPoints: number;
}

const TeamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  totalPoints: { type: Number, default: 0 }
}, { timestamps: true });

export default model<ITeam>('Team', TeamSchema);
