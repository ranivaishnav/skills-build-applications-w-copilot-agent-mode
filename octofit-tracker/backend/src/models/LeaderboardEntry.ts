import mongoose, { Schema, type Document, Types } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  userId: Types.ObjectId;
  username: string;
  score: number;
}

const leaderboardEntrySchema = new Schema<ILeaderboardEntry>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true },
  score: { type: Number, required: true, default: 0 },
});

const LeaderboardEntry = mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardEntrySchema);

export default LeaderboardEntry;
