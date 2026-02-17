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

export function SignupFormPhase2({ userId }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    phoneNo: "",
    college: "",
    year: "",
    department: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Onboarding failed");

      setSuccess(true);
      // Redirect to login page after successful onboarding
      setTimeout(() => {
        router.push("/login?onboarded=true");
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-12 shadow-lg dark:shadow-xl transition-all duration-300">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-semibold">Complete Your Profile</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Provide additional information to complete your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FieldGroup className="space-y-4">
            <Field>
              <FieldLabel htmlFor="phoneNo">Phone Number</FieldLabel>
              <Input
                id="phoneNo"
                type="tel"
                placeholder="+91 12345 67890"
                required
                value={formData.phoneNo}
                onChange={handleChange}
                className="bg-input text-foreground border border-border rounded-md focus:ring-2 focus:ring-ring transition"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="college">College</FieldLabel>
              <Input
                id="college"
                type="text"
                placeholder="PSNA College of Engineering"
                required
                value={formData.college}
                onChange={handleChange}
                className="bg-input text-foreground border border-border rounded-md focus:ring-2 focus:ring-ring transition"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="year">Year</FieldLabel>
              <Input
                id="year"
                type="number"
                placeholder="2"
                required
                value={formData.year}
                onChange={handleChange}
                className="bg-input text-foreground border border-border rounded-md focus:ring-2 focus:ring-ring transition"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="department">Department</FieldLabel>
              <Input
                id="department"
                type="text"
                placeholder="Computer Science"
                required
                value={formData.department}
                onChange={handleChange}
                className="bg-input text-foreground border border-border rounded-md focus:ring-2 focus:ring-ring transition"
              />
            </Field>

            {error && <p className="text-destructive text-sm font-medium">{error}</p>}
            {success && (
              <p className="text-green-600 dark:text-green-400 text-sm font-medium">
                ✓ Profile completed successfully! Redirecting to login...
              </p>
            )}

            <Field>
              <Button
                type="submit"
                disabled={loading || success}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-2 focus:ring-ring transition"
              >
                {success ? "Success! Redirecting..." : loading ? "Saving..." : "Complete Profile"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
