"use client";

import { SignupFormPhase1 } from "@/components/Forms/SignupFormPhase1";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-background transition-colors duration-300">
      <div className="w-full max-w-md">
        <SignupFormPhase1 />
      </div>
    </div>
  );
}

