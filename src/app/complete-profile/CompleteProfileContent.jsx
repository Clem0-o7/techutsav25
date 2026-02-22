"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

// ─── States the page can be in ───────────────────────────────────────────────
const STATE = {
  VALIDATING: "VALIDATING", // checking the token on load
  ERROR: "ERROR",           // token missing / invalid / expired / already used
  FORM: "FORM",             // token valid — show the pre-filled form
  SAVING: "SAVING",         // POST in flight
  SUCCESS: "SUCCESS",       // profile saved
};

export default function CompleteProfileContent({ token }) {
  const router = useRouter();

  const [pageState, setPageState] = useState(STATE.VALIDATING);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    year: "",
    department: "",
  });
  const [formError, setFormError] = useState("");

  // ── 1. Validate token on mount ────────────────────────────────────────────
  const validateToken = useCallback(async () => {
    if (!token || token.trim() === "") {
      setErrorMessage("No magic link token found. Please check your email.");
      setPageState(STATE.ERROR);
      return;
    }

    try {
      const res = await fetch(
        `/api/complete-profile?token=${encodeURIComponent(token)}`
      );
      const data = await res.json();

      if (!res.ok) {
        // 401 = invalid/expired, surface a specific message
        if (res.status === 401) {
          setErrorMessage(
            data.error === "Invalid or expired link"
              ? "This link is invalid or has expired. Please request a new one."
              : "This link has already been used."
          );
        } else {
          setErrorMessage(data.error || "Something went wrong. Please try again.");
        }
        setPageState(STATE.ERROR);
        return;
      }

      // Pre-fill the form with the returned safe fields
      setFormData({
        name: data.name ?? "",
        email: data.email ?? "",
        phone: data.phone ?? "",
        college: data.college ?? "",
        year: data.year !== undefined && data.year !== null ? String(data.year) : "",
        department: data.department ?? "",
      });
      setPageState(STATE.FORM);
    } catch {
      setErrorMessage("Unable to reach the server. Please check your connection.");
      setPageState(STATE.ERROR);
    }
  }, [token]);

  useEffect(() => {
    validateToken();
  }, [validateToken]);

  // ── 2. Handle form input ──────────────────────────────────────────────────
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    setFormError(""); // clear inline error on edit
  };

  // ── 3. Submit ─────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    // Client-side quick checks (the API validates too)
    if (!formData.name.trim()) return setFormError("Name is required.");
    if (!formData.phone.trim()) return setFormError("Phone number is required.");
    if (!formData.college.trim()) return setFormError("College is required.");
    if (!formData.year) return setFormError("Year is required.");
    if (!formData.department.trim()) return setFormError("Department is required.");

    const yearNum = Number(formData.year);
    if (isNaN(yearNum) || yearNum < 1 || yearNum > 5)
      return setFormError("Year must be between 1 and 5.");

    setPageState(STATE.SAVING);

    try {
      const res = await fetch("/api/complete-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          profileData: {
            name: formData.name.trim(),
            phone: formData.phone.trim(),
            college: formData.college.trim(),
            year: yearNum,
            department: formData.department.trim(),
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFormError(data.error || "Failed to save profile. Please try again.");
        setPageState(STATE.FORM);
        return;
      }

      setPageState(STATE.SUCCESS);
      // Redirect to login after a short delay so the user sees the success state
      setTimeout(() => {
        router.push("/login?profileCompleted=true");
      }, 3000);
    } catch {
      setFormError("Unable to reach the server. Please check your connection.");
      setPageState(STATE.FORM);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Render helpers
  // ─────────────────────────────────────────────────────────────────────────

  if (pageState === STATE.VALIDATING) {
    return (
      <PageShell>
        <div className="flex flex-col items-center gap-4 text-muted-foreground">
          <Spinner />
          <p className="text-sm">Validating your link…</p>
        </div>
      </PageShell>
    );
  }

  if (pageState === STATE.ERROR) {
    return (
      <PageShell>
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-destructive"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                />
              </svg>
            </div>
            <CardTitle className="text-xl">Link Problem</CardTitle>
            <CardDescription className="text-sm text-destructive">
              {errorMessage}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0 flex justify-center">
            <p className="text-xs text-muted-foreground text-center">
              If you believe this is a mistake, please contact support or ask
              your administrator to resend the profile completion link.
            </p>
          </CardContent>
        </Card>
      </PageShell>
    );
  }

  if (pageState === STATE.SUCCESS) {
    return (
      <PageShell>
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-green-500"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <CardTitle className="text-xl">Profile Completed!</CardTitle>
            <CardDescription>
              Your profile has been saved. Redirecting you to login…
            </CardDescription>
          </CardHeader>
        </Card>
      </PageShell>
    );
  }

  // ── STATE.FORM or STATE.SAVING ───────────────────────────────────────────
  const isSaving = pageState === STATE.SAVING;

  return (
    <PageShell>
      <Card className="w-full max-w-lg shadow-lg dark:shadow-xl transition-all duration-300">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold">
            Complete Your Profile
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Please fill in the details below to finish setting up your account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <FieldGroup className="space-y-4">
              {/* Name */}
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  disabled={isSaving}
                />
              </Field>

              {/* Email — read-only, it is not editable */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  readOnly
                  disabled
                  className="bg-muted cursor-not-allowed"
                />
              </Field>

              {/* Phone */}
              <Field>
                <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  required
                  disabled={isSaving}
                />
              </Field>

              {/* College */}
              <Field>
                <FieldLabel htmlFor="college">College</FieldLabel>
                <Input
                  id="college"
                  type="text"
                  value={formData.college}
                  onChange={handleChange}
                  placeholder="Sri Eshwar College of Engineering"
                  required
                  disabled={isSaving}
                />
              </Field>

              {/* Year */}
              <Field>
                <FieldLabel htmlFor="year">Year of Study</FieldLabel>
                <Input
                  id="year"
                  type="number"
                  min={1}
                  max={5}
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="1 – 5"
                  required
                  disabled={isSaving}
                />
              </Field>

              {/* Department */}
              <Field>
                <FieldLabel htmlFor="department">Department</FieldLabel>
                <Input
                  id="department"
                  type="text"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="Computer Science & Engineering"
                  required
                  disabled={isSaving}
                />
              </Field>
            </FieldGroup>

            {/* Inline error */}
            {formError && (
              <p className="text-sm text-destructive text-center">{formError}</p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isSaving}
            >
              {isSaving ? (
                <span className="flex items-center justify-center gap-2">
                  <Spinner className="h-4 w-4" />
                  Saving…
                </span>
              ) : (
                "Save Profile"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </PageShell>
  );
}

// ── Shared layout wrapper ─────────────────────────────────────────────────────
function PageShell({ children }) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      {children}
    </main>
  );
}

// ── Tiny SVG spinner ──────────────────────────────────────────────────────────
function Spinner({ className = "h-8 w-8" }) {
  return (
    <svg
      className={`animate-spin text-primary ${className}`}
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
  );
}
