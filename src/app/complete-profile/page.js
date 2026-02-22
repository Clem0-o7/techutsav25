"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CompleteProfileContent from "./CompleteProfileContent";

function CompleteProfilePage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  return <CompleteProfileContent token={token} />;
}

export default function CompleteProfile() {
  return (
    <Suspense fallback={<PageShell><LoadingState /></PageShell>}>
      <CompleteProfilePage />
    </Suspense>
  );
}

// ── Tiny helpers used by the Suspense fallback ────────────────────────────────
function PageShell({ children }) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      {children}
    </main>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center gap-4 text-muted-foreground">
      <svg
        className="animate-spin h-8 w-8 text-primary"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        />
      </svg>
      <p className="text-sm">Loading…</p>
    </div>
  );
}
