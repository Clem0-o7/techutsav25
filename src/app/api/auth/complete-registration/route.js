import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import { BlobServiceClient } from "@azure/storage-blob";
import { randomUUID } from "crypto";

export async function POST(request) {
  try {
    await connectToDatabase();
    
    // Parse FormData instead of JSON
    const formData = await request.formData();
    const transactionNumber = formData.get("transactionNumber");
    const transactionScreenshot = formData.get("transactionScreenshot"); // File
    const selectedDepartment = formData.get("selectedDepartment");

    // Validate input
    if (!transactionNumber || !transactionScreenshot || !selectedDepartment) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    // ✅ Corrected: Await cookies() before accessing auth-token
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

    // Ensure transaction number is unique
    const existingTransaction = await User.findOne({ transactionNumber });
    if (existingTransaction) {
      return new Response(JSON.stringify({ error: "Transaction Number already exists" }), { status: 400 });
    }

    // ✅ Corrected: Ensure the Azure Blob Storage connection string is properly formatted
    const connectionString = process.env.CONNECTIONSTRING;
    if (!connectionString || !connectionString.startsWith("DefaultEndpointsProtocol")) {
      return new Response(JSON.stringify({ error: "Invalid Azure Blob Storage connection string" }), { status: 500 });
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
    const transactionScreenshotUrl = blockBlobClient.url;

    // Update user record
    user.transactionNumber = transactionNumber;
    user.transactionScreenshot = transactionScreenshotUrl;
    user.selectedDepartment = selectedDepartment;
    await user.save();

    return new Response(
      JSON.stringify({ 
        message: "Payment details submitted successfully", 
        user: {
          _id: user._id,
          email: user.email,  // Fetching from DB
          transactionNumber: user.transactionNumber,
          transactionScreenshot: user.transactionScreenshot,
          selectedDepartment: user.selectedDepartment,
          verified: user.verified,
        } 
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error completing registration:", error);
    return new Response(JSON.stringify({ error: "Failed to complete registration" }), { status: 500 });
  }
}
