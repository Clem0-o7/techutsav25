// Quick MongoDB connection test
import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://clement:j6fVfot21CnGTHev@techutsav26.impxb4x.mongodb.net/techutsav26?retryWrites=true&w=majority";

console.log("🔄 Testing MongoDB connection...");
console.log("URI Host:", MONGODB_URI.split("@")[1]?.split("/")[0]);

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000, // 5 second timeout
})
.then(() => {
  console.log("✅ Connection successful!");
  console.log("Database:", mongoose.connection.name);
  console.log("Ready state:", mongoose.connection.readyState);
  process.exit(0);
})
.catch((err) => {
  console.error("❌ Connection failed!");
  console.error("Error:", err.message);
  console.error("Error code:", err.code);
  
  if (err.message.includes("SSL") || err.message.includes("TLS")) {
    console.error("\n💡 This is an SSL/TLS error. Most likely causes:");
    console.error("   1. Your IP is not whitelisted in MongoDB Atlas Network Access");
    console.error("   2. MongoDB cluster is paused");
    console.error("   3. Credentials are incorrect");
  }
  
  process.exit(1);
});
