// @/app/api/submissions/withdraw/route.js

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { BlobServiceClient } from "@azure/storage-blob";
import { verify } from "jsonwebtoken";

const connectionString = process.env.CONNECTIONSTRING;
const containerName = process.env.CONTAINERNAME;

/** Delete a blob from Azure given its full public URL */
async function deleteBlobFromUrl(fileUrl) {
  if (!fileUrl || !connectionString || !containerName) return;
  try {
    const url = new URL(fileUrl);
    // URL: https://<account>.blob.core.windows.net/<container>/<blobpath>
    const parts = url.pathname.split(`/${containerName}/`);
    if (parts.length < 2) return;
    const blobName = decodeURIComponent(parts[1]);
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.getBlockBlobClient(blobName).deleteIfExists();
    console.log(`Deleted blob: ${blobName}`);
  } catch (err) {
    console.error("Blob deletion error:", err);
  }
}

export async function POST(request) {
  try {
    // JWT cookie auth – same pattern used across all other routes
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const decoded = verify(token, process.env.JWT_SECRET);
    if (!decoded?.userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    await connectToDatabase();

    const user = await User.findById(decoded.userId);
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    const { eventType } = await request.json();
    if (!eventType) return NextResponse.json({ message: "Event type is required" }, { status: 400 });

    if (!user.submissions) user.submissions = [];

    const submissionIndex = user.submissions.findIndex(
      (sub) => sub.type === eventType && sub.finalSubmission === true
    );

    if (submissionIndex === -1) {
      return NextResponse.json({ message: "No active submission found for this event" }, { status: 404 });
    }

    const submission = user.submissions[submissionIndex];

    if (!["draft", "submitted"].includes(submission.status)) {
      return NextResponse.json(
        { message: "Submission cannot be withdrawn at this stage" },
        { status: 400 }
      );
    }

    // Delete file from Azure Blob Storage before removing the DB record
    if (submission.fileUrl) {
      await deleteBlobFromUrl(submission.fileUrl);
    }

    user.submissions.splice(submissionIndex, 1);
    await user.save();

    return NextResponse.json({ message: "Submission withdrawn successfully" }, { status: 200 });
  } catch (error) {
    console.error("Submission withdrawal error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}