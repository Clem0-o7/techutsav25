//@/app/api/auth/complete-registration/route.js

import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import { BlobServiceClient } from "@azure/storage-blob";
import { randomUUID } from "crypto";

export async function POST(request) {
  try {
    await connectToDatabase();
    
    // Parse FormData
    const formData = await request.formData();
    const transactionNumber = formData.get("transactionNumber");
    const selectedDepartment = formData.get("selectedDepartment");
    const transactionScreenshot = formData.get("transactionScreenshot"); // File (optional for resubmission)

    // Validate input
    if (!transactionNumber || !selectedDepartment) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    // Get auth token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;
    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    // Verify the JWT token
    let decoded;
    try {
      decoded = verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
    }
    const userId = decoded.userId;

    // Retrieve user from DB
    const user = await User.findById(userId);
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    // Ensure user is verified before submitting payment details
    if (!user.verified) {
      return new Response(JSON.stringify({ error: "User email is not verified" }), { status: 403 });
    }

    // Only check for unique transaction number if it's a new submission (not a resubmission)
    if (!user.paymentRejected && transactionNumber !== user.transactionNumber) {
      const existingTransaction = await User.findOne({ 
        transactionNumber, 
        _id: { $ne: userId } // Exclude current user
      });
      
      if (existingTransaction) {
        return new Response(JSON.stringify({ error: "Transaction Number already used by another account" }), { status: 400 });
      }
    }

    // Setup for transaction screenshot upload (if provided)
    let transactionScreenshotUrl = user.transactionScreenshot;
    
    if (transactionScreenshot) {
      // Ensure the Azure Blob Storage connection string is properly formatted
      const connectionString = process.env.CONNECTIONSTRING;
      if (!connectionString || !connectionString.startsWith("DefaultEndpointsProtocol")) {
        return new Response(JSON.stringify({ error: "Invalid Azure Blob Storage configuration" }), { status: 500 });
      }

      const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
      const containerClient = blobServiceClient.getContainerClient("techutsav25");

      // Generate a unique filename for the upload
      const fileExtension = transactionScreenshot.name.split(".").pop();
      const blobName = `payments/${randomUUID()}.${fileExtension}`;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      // Convert file to buffer for upload
      const arrayBuffer = await transactionScreenshot.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Upload file
      await blockBlobClient.uploadData(buffer, {
        blobHTTPHeaders: { blobContentType: transactionScreenshot.type },
      });

      // Construct Azure Blob URL
      transactionScreenshotUrl = blockBlobClient.url;
    } else if (!user.transactionScreenshot && !transactionScreenshot) {
      // If this is a new submission (not a resubmission) and no screenshot is provided
      return new Response(JSON.stringify({ error: "Transaction screenshot is required" }), { status: 400 });
    }

    // Update user record
    user.transactionNumber = transactionNumber;
    user.transactionScreenshot = transactionScreenshotUrl;
    user.selectedDepartment = selectedDepartment;
    
    // Reset payment rejection status if this is a resubmission
    if (user.paymentRejected) {
      user.paymentRejected = false;
      user.rejectionReason = "";
    }
    
    await user.save();

    return new Response(
      JSON.stringify({ 
        message: "Payment details submitted successfully", 
        user: {
          _id: user._id,
          email: user.email,
          transactionNumber: user.transactionNumber,
          transactionScreenshot: user.transactionScreenshotUrl,
          selectedDepartment: user.selectedDepartment,
          verified: user.verified,
          paid: user.paid,
          paymentRejected: user.paymentRejected
        } 
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error completing registration:", error);
    return new Response(JSON.stringify({ error: "Failed to process payment details" }), { status: 500 });
  }
  
}
