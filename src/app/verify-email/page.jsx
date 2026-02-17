"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function VerifyEmailPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // from email link
  const email = searchParams.get("email");

  const [status, setStatus] = useState(token ? "Verifying..." : "waiting");

  useEffect(() => {
    // If there's a token, verify it
    if (token) {
      const verify = async () => {
        try {
          const res = await fetch(`/api/auth/verify-email?token=${token}`);
          if (!res.ok) throw new Error("Verification failed");

          const data = await res.json();
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
    }
  }, [token, router]);

  // Show waiting message if no token (after signup)
  if (!token && email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <CardTitle>Check Your Email</CardTitle>
            <CardDescription>
              We've sent a verification link to <strong>{email}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-sm text-muted-foreground">
              Click the link in the email to verify your account and continue with registration.
            </p>
            <p className="text-center text-xs text-muted-foreground">
              Didn't receive the email? Check your spam folder or{" "}
              <a href="/signup" className="text-primary hover:underline">
                try signing up again
              </a>
              .
            </p>
            <Button 
              onClick={() => router.push("/login")} 
              variant="outline"
              className="w-full"
            >
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show verification status
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <CardTitle>{status.includes("verified") ? "Success!" : status.includes("failed") ? "Error" : "Verifying"}</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">{status}</p>
          {status.includes("failed") && (
            <Button onClick={() => router.push("/signup")} className="w-full">
              Go Back to Signup
            </Button>
          )}
        </CardContent>
      </Card>
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
