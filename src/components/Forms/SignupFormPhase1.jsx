"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function SignupFormPhase1() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Client-side validation
    if (formData.name.trim().length < 2) {
      setError("Name must be at least 2 characters");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Check if response is JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        // Response is not JSON - likely an error page or server error
        const text = await res.text();
        console.error("Non-JSON response:", text.substring(0, 200));
        throw new Error("Server error. Please check Vercel logs or contact support.");
      }

      const data = await res.json();
      
      // Log error code for debugging
      if (!res.ok && data.code) {
        console.error("Signup error code:", data.code);
        console.error("Signup error details:", data);
      }
      
      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }

      // Success - redirect to verification page
      router.push("/verify-email?email=" + encodeURIComponent(formData.email));
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-12 shadow-lg dark:shadow-xl transition-all duration-300">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-semibold">Create an account</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FieldGroup className="space-y-4">
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                required
                value={formData.name}
                onChange={handleChange}
                className="bg-input text-foreground border border-border rounded-md focus:ring-2 focus:ring-ring transition"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="example@student.com"
                required
                value={formData.email}
                onChange={handleChange}
                className="bg-input text-foreground border border-border rounded-md focus:ring-2 focus:ring-ring transition"
              />
              <FieldDescription className="text-sm text-muted-foreground">
                We'll use this to contact you. We will not share your email with anyone else.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="bg-input text-foreground border border-border rounded-md focus:ring-2 focus:ring-ring transition"
              />
              <FieldDescription className="text-sm text-muted-foreground">
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
              <Input
                id="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="bg-input text-foreground border border-border rounded-md focus:ring-2 focus:ring-ring transition"
              />
              <FieldDescription className="text-sm text-muted-foreground">
                Please confirm your password.
              </FieldDescription>
            </Field>

            {error && <p className="text-destructive text-sm font-medium">{error}</p>}

            <Field>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-2 focus:ring-ring transition"
              >
                {loading ? "Creating..." : "Create Account"}
              </Button>
            </Field>

            <FieldDescription className="text-center text-sm">
              Already have an account?{" "}
              <a href="/login" className="text-primary hover:underline font-medium">
                Sign in
              </a>
            </FieldDescription>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
