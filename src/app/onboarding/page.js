"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SignupFormPhase2 } from "./components/SignupFormPhase2";

function OnboardingPageContent() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  if (!userId) {
    return <p className="text-center mt-20">Missing user ID. Please verify your email first.</p>;
  }

  return <SignupFormPhase2 userId={userId} />;
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div className="text-center mt-20">Loading...</div>}>
      <OnboardingPageContent />
    </Suspense>
  );
}
