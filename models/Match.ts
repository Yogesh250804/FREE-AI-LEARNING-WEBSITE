import mongoose, { Schema, Document } from "mongoose";

export interface IMatch extends Document {
  players: {
    userId: mongoose.Types.ObjectId;
    displayName: string;
    isReady: boolean;
    score: number;
    completedAt?: Date;
  }[];
  problemId: string;
  status: "waiting" | "active" | "completed";
  winnerId?: mongoose.Types.ObjectId;
  createdAt: Date;
  startedAt?: Date;
}

const MatchSchema: Schema = new Schema({
  players: [{
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    displayName: { type: String, required: true },
    isReady: { type: Boolean, default: false },
    score: { type: Number, default: 0 },
    completedAt: { type: Date }
  }],
  problemId: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["waiting", "active", "completed"], 
    default: "waiting" 
  },
  winnerId: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  startedAt: { type: Date }
});

// Index to find waiting matches quickly
MatchSchema.index({ status: 1, createdAt: 1 });

export default mongoose.models.Match || mongoose.model<IMatch>("Match", MatchSchema);
