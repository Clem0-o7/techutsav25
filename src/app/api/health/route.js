// /app/api/health/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import mongoose from "mongoose";

export async function GET(req) {
  const checks = {
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
    checks: {}
  };

  // Check environment variables (without exposing values)
  checks.checks.mongodb_uri = !!process.env.MONGODB_URI;
  checks.checks.jwt_secret = !!process.env.JWT_SECRET;
  checks.checks.nextauth_url = !!process.env.NEXTAUTH_URL;
  checks.checks.nextauth_secret = !!process.env.NEXTAUTH_SECRET;
  checks.checks.email_host = !!process.env.EMAIL_SERVER_HOST;
  checks.checks.email_port = !!process.env.EMAIL_SERVER_PORT;
  checks.checks.email_user = !!process.env.EMAIL_SERVER_USER;
  checks.checks.email_password = !!process.env.EMAIL_SERVER_PASSWORD;
  checks.checks.email_from = !!process.env.EMAIL_FROM;
  checks.checks.azure_connection = !!process.env.CONNECTIONSTRING;
  checks.checks.azure_container = !!process.env.CONTAINERNAME;

  // MongoDB URI diagnostics (without exposing password)
  if (process.env.MONGODB_URI) {
    try {
      const uri = process.env.MONGODB_URI;
      checks.checks.mongodb_uri_details = {
        length: uri.length,
        hasProtocol: uri.startsWith("mongodb://") || uri.startsWith("mongodb+srv://"),
        protocol: uri.split("://")[0],
        hasCredentials: uri.includes("@"),
        hasDatabaseName: uri.split("/").length >= 4,
        endsWithSlash: uri.endsWith("/"),
      };
    } catch (err) {
      checks.checks.mongodb_uri_details = { parseError: err.message };
    }
  }

  // Test database connection
  try {
    //console.log("[HEALTH] Attempting database connection...");
    const startTime = Date.now();
    const conn = await connectToDatabase();
    const endTime = Date.now();
    
    checks.checks.database_connection = "✓ Connected";
    checks.checks.database_details = {
      connectionTime: `${endTime - startTime}ms`,
      readyState: mongoose.connection.readyState,
      readyStateText: getReadyStateText(mongoose.connection.readyState),
      host: mongoose.connection.host || "Unknown",
      dbName: mongoose.connection.name || "Unknown",
      models: Object.keys(mongoose.connection.models).length,
    };
    //console.log("[HEALTH] Database connected successfully");
  } catch (error) {
    console.error("[HEALTH] Database connection failed:", error);
    checks.checks.database_connection = "✗ Failed";
    checks.checks.database_error = {
      message: error.message,
      code: error.code,
      name: error.name,
    };
  }

  // Overall status
  const allEnvPresent = Object.entries(checks.checks)
    .filter(([key]) => !key.includes('database') && !key.includes('mongodb_uri_details'))
    .every(([_, value]) => value === true);
  
  checks.status = allEnvPresent && checks.checks.database_connection?.includes('Connected') 
    ? "healthy" 
    : "unhealthy";

  const statusCode = checks.status === "healthy" ? 200 : 503;

  return NextResponse.json(checks, { 
    status: statusCode,
    headers: {
      'Cache-Control': 'no-store, max-age=0'
    }
  });
}

function getReadyStateText(state) {
  const states = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };
  return states[state] || "unknown";
}
