// /app/api/profile/submit-payment/route.js
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { verify } from "jsonwebtoken";
import { BlobServiceClient } from "@azure/storage-blob";

export async function POST(request) {
  try {
    // Get user from token
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;
    
    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    
    const decoded = verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    
    await connectToDatabase();
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    // Parse form data
    const formData = await request.formData();
    const passType = parseInt(formData.get("passType"));
    const transactionId = formData.get("transactionId");
    const screenshot = formData.get("screenshot");

    // Validate required fields
    if (!passType || ![1, 2, 3, 4].includes(passType)) {
      return new Response(JSON.stringify({ error: "Invalid pass type" }), { status: 400 });
    }

    if (!transactionId) {
      return new Response(JSON.stringify({ error: "Transaction ID is required" }), { status: 400 });
    }

    if (!screenshot) {
      return new Response(JSON.stringify({ error: "Screenshot is required" }), { status: 400 });
    }

    // Initialize passes array if it doesn't exist
    if (!user.passes) {
      user.passes = [];
    }

    // Check if pass already purchased and verified
    const existingPass = user.passes.find(p => p.passType === passType);
    if (existingPass && existingPass.status === "verified") {
      return new Response(
        JSON.stringify({ error: "This pass has already been verified" }), 
        { status: 400 }
      );
    }

    // Upload screenshot to Azure Blob Storage
    let screenshotUrl;
    try {
      const blobServiceClient = BlobServiceClient.fromConnectionString(
        process.env.CONNECTIONSTRING
      );
      const containerClient = blobServiceClient.getContainerClient(
        process.env.CONTAINERNAME
      );

      const timestamp = Date.now();
      const blobName = `PASS${passType}/${user._id}-${timestamp}-${screenshot.name}`;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      const buffer = Buffer.from(await screenshot.arrayBuffer());
      await blockBlobClient.uploadData(buffer, {
        blobHTTPHeaders: { blobContentType: screenshot.type }
      });

      screenshotUrl = blockBlobClient.url;
    } catch (uploadError) {
      console.error("Screenshot upload error:", uploadError);
      return new Response(
        JSON.stringify({ error: "Failed to upload screenshot" }),
        { status: 500 }
      );
    }

    // If pass exists (rejected), update it
    if (existingPass) {
      existingPass.transactionNumber = transactionId;
      existingPass.transactionScreenshot = screenshotUrl;
      existingPass.status = "pending";
      existingPass.rejectionReason = undefined;
      existingPass.submittedDate = new Date();
    } else {
      // Add new pass
      user.passes.push({
        passType,
        transactionNumber: transactionId,
        transactionScreenshot: screenshotUrl,
        status: "pending",
        submittedDate: new Date(),
      });
    }

    await user.save();

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Payment details submitted successfully. Verification typically takes 24-36 hours." 
      }),
      { status: 200 }
    );

  } catch (error) {
    console.error("Payment submission error:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
