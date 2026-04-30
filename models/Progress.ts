import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProgress extends Document {
  userId: mongoose.Types.ObjectId;
  courseId: string;
  completedLessons: string[];
  percentComplete: number;
  lastAccessed: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ProgressSchema = new Schema<IProgress>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: String, required: true },
    completedLessons: { type: [String], default: [] },
    percentComplete: { type: Number, default: 0 },
    lastAccessed: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Compound index to ensure one progress record per user per course
ProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

const Progress: Model<IProgress> =
  mongoose.models.Progress || mongoose.model<IProgress>("Progress", ProgressSchema);

export default Progress;
