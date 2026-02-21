// /lib/mongodb.js
import mongoose from "mongoose";
import { MongoClient } from "mongodb";

let MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  const error = "MONGODB_URI environment variable is not defined";
  ////console.error("[MONGODB] ✗", error);
  throw new Error(error);
}

// Validate MongoDB URI format
if (!MONGODB_URI.startsWith("mongodb://") && !MONGODB_URI.startsWith("mongodb+srv://")) {
  const error = "MONGODB_URI must start with mongodb:// or mongodb+srv://";
  ////console.error("[MONGODB] ✗", error);
  throw new Error(error);
}

// Check if database name is specified - FIX IT if missing
const parts = MONGODB_URI.split("/");
const dbPart = parts[3] || "";
const dbName = dbPart.split("?")[0]; // Get database name before query params

if (!dbName || dbName === "") {
  ////console.error("[MONGODB] ✗ No database name specified in MONGODB_URI");
  ////console.error("[MONGODB] Current URI ends with:", parts[parts.length - 1]);
  ////console.error("[MONGODB] Expected format: mongodb+srv://user:pass@host/DATABASE_NAME");
  
  // Auto-fix: Add default database name
  const DEFAULT_DB = "techutsav26";
  //console.warn(`[MONGODB] ⚠️  Auto-fixing: Adding database name '${DEFAULT_DB}'`);
  
  if (MONGODB_URI.endsWith("/")) {
    MONGODB_URI = MONGODB_URI + DEFAULT_DB;
  } else {
    // Insert database name before query params
    const [baseUri, queryParams] = MONGODB_URI.split("?");
    MONGODB_URI = baseUri + (baseUri.endsWith("/") ? "" : "/") + DEFAULT_DB;
    if (queryParams) {
      MONGODB_URI = MONGODB_URI + "?" + queryParams;
    }
  }
  //console.warn("[MONGODB] Fixed URI (credentials hidden):", MONGODB_URI.replace(/\/\/[^@]+@/, "//*****:*****@"));
} else {
  ////console.log("[MONGODB] ✓ Database name:", dbName);
}

/**
 * Maintain a cached connection during hot reloads in development.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    ////console.log("[MONGODB] Using cached connection");
    return cached.conn;
  }
  
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };


    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {

      return mongoose;
    }).catch((err) => {

      cached.promise = null; // Reset promise so next attempt will retry
      throw err;
    });
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// For native MongoDB driver (used in API routes)
let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(MONGODB_URI);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default clientPromise;
export { connectToDatabase };

