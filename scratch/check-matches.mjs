import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

async function checkMatches() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    const matchesCollection = mongoose.connection.db.collection('matches');
    
    const matches = await matchesCollection.find({}).toArray();
    
    console.log(`\nTotal Matches Found: ${matches.length}`);
    
    matches.forEach(m => {
      console.log(`Match ID: ${m._id}`);
      console.log(`Status: ${m.status}`);
      console.log(`Problem ID: ${m.problemId}`);
      console.log(`Players: ${m.players?.length || 0}`);
      if (m.players) {
        m.players.forEach((p, i) => {
          console.log(`  P${i+1}: ${p.displayName} (${p.userId})`);
        });
      }
      console.log('---');
    });

    // Cleanup: Remove old matches if requested?
    // await matchesCollection.deleteMany({ status: { $ne: 'active' } });

    await mongoose.connection.close();
  } catch (error) {
    console.error("Error checking matches:", error);
  }
}

checkMatches();
