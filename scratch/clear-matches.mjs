import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

async function clearMatches() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    const matchesCollection = mongoose.connection.db.collection('matches');
    
    const result = await matchesCollection.deleteMany({});
    console.log(`\nSuccessfully cleared ${result.deletedCount} matches.`);

    await mongoose.connection.close();
  } catch (error) {
    console.error("Error clearing matches:", error);
  }
}

clearMatches();
