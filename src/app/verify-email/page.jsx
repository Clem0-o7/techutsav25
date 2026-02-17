"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

function VerifyEmailPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // from email link
  const email = searchParams.get("email");

  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    if (!token) {
      setStatus("Invalid or missing token");
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch(`/api/auth/verify-email?token=${token}`);
        if (!res.ok) throw new Error("Verification failed");

        const data = await res.json();
        // Assuming API returns userId
        const userId = data.userId;

        setStatus("Email verified! Redirecting...");
        setTimeout(() => {
          router.push(`/onboarding?userId=${userId}`);
        }, 1500);
      } catch (err) {
        setStatus(err.message || "Verification failed");
      }
    };

    verify();
  }, [token, router]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <p>{status}</p>
      {status.includes("failed") && (
        <Button onClick={() => router.push("/signup")}>Go Back</Button>
      )}
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex flex-col justify-center items-center">Loading...</div>}>
      <VerifyEmailPageContent />
    </Suspense>
  );
}
