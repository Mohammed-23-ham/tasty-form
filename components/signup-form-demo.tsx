"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabaseClient";

const siteUrl = "https://tasty-form.vercel.app";

export default function SignupFormDemo() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const formData = new FormData(e.currentTarget);
    const firstName = String(formData.get("firstname")).trim();
    const lastName = String(formData.get("lastname")).trim();
    const email = String(formData.get("email")).trim();
    const password = String(formData.get("password"));
    const confirmPassword = String(formData.get("confirm-password"));

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${siteUrl}/verify`,
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      if (!data.user) {
        setErrorMessage("We could not create your account. Please try again.");
        return;
      }

      window.location.assign(`${siteUrl}/verify`);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "We could not create your account. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className="mx-auto grid w-full max-w-5xl gap-8 rounded-3xl border border-white/15 bg-transparent p-5 sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14 lg:p-12">
      <header className="text-left lg:pt-3">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
          Create your account
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Welcome to Aceternity
        </h2>
        <p className="mt-4 max-w-sm text-sm leading-6 text-neutral-300 sm:text-base">
          Join us today. Set up your account in just a few steps.
        </p>
      </header>

      <form className="w-full" onSubmit={handleSubmit}>
        <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <LabelInputContainer>
            <Label
              className="text-sm font-medium text-neutral-200"
              htmlFor="firstname"
            >
              First name
            </Label>
            <Input
              className="!bg-white/10 !text-white placeholder:!text-neutral-400 focus-visible:!ring-white/50"
              id="firstname"
              name="firstname"
              autoComplete="given-name"
              placeholder="Tyler"
              type="text"
              required
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label
              className="text-sm font-medium text-neutral-200"
              htmlFor="lastname"
            >
              Last name
            </Label>
            <Input
              className="!bg-white/10 !text-white placeholder:!text-neutral-400 focus-visible:!ring-white/50"
              id="lastname"
              name="lastname"
              autoComplete="family-name"
              placeholder="Durden"
              type="text"
              required
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-5">
          <Label
            className="text-sm font-medium text-neutral-200"
            htmlFor="email"
          >
            Email Address
          </Label>
          <Input
            className="!bg-white/10 !text-white placeholder:!text-neutral-400 focus-visible:!ring-white/50"
            id="email"
            name="email"
            autoComplete="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            required
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-5">
          <Label
            className="text-sm font-medium text-neutral-200"
            htmlFor="password"
          >
            Password
          </Label>
          <Input
            className="!bg-white/10 !text-white placeholder:!text-neutral-400 focus-visible:!ring-white/50"
            id="password"
            name="password"
            autoComplete="new-password"
            placeholder="••••••••"
            type="password"
            required
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-6">
          <Label
            className="text-sm font-medium text-neutral-200"
            htmlFor="confirm-password"
          >
            Confirm password
          </Label>
          <Input
            className="!bg-white/10 !text-white placeholder:!text-neutral-400 focus-visible:!ring-white/50"
            id="confirm-password"
            name="confirm-password"
            autoComplete="new-password"
            placeholder="••••••••"
            type="password"
            required
          />
        </LabelInputContainer>
        {errorMessage && (
          <p className="mb-4 text-sm text-red-300" role="alert">
            {errorMessage}
          </p>
        )}
        {successMessage && (
          <p className="mb-4 text-sm text-emerald-300" role="status">
            {successMessage}
          </p>
        )}
        <button
          aria-busy={isSubmitting}
          disabled={isSubmitting}
          className="group/btn relative block h-12 w-full rounded-xl bg-white font-semibold text-neutral-950 transition hover:bg-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
          type="submit"
        >
          {isSubmitting ? "Creating account..." : "Sign up →"}
          <BottomGradient />
        </button>
      </form>
    </section>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      {children}
    </div>
  );
};
