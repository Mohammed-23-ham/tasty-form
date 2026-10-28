"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";

export default function SignupFormDemo() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
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
              autoComplete="given-name"
              placeholder="Tyler"
              type="text"
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
              autoComplete="family-name"
              placeholder="Durden"
              type="text"
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
            autoComplete="email"
            placeholder="projectmayhem@fc.com"
            type="email"
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
            autoComplete="new-password"
            placeholder="••••••••"
            type="password"
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
            autoComplete="new-password"
            placeholder="••••••••"
            type="password"
          />
        </LabelInputContainer>
        <button
          className="group/btn relative block h-12 w-full rounded-xl bg-white font-semibold text-neutral-950 transition hover:bg-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div className="my-6 flex items-center gap-4 text-xs font-medium text-neutral-400">
          <span className="h-px flex-1 bg-white/20" />
          Or continue with
          <span className="h-px flex-1 bg-white/20" />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <button
            className="group/btn relative flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 font-medium text-neutral-100 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            type="button"
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-100" />
            <span className="text-sm">GitHub</span>
            <BottomGradient />
          </button>
          <button
            className="group/btn relative flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 font-medium text-neutral-100 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            type="button"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-100" />
            <span className="text-sm">Google</span>
            <BottomGradient />
          </button>
          <button
            className="group/btn relative flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 font-medium text-neutral-100 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            type="button"
          >
            <IconBrandOnlyfans className="h-4 w-4 text-neutral-700" />
            <span className="text-sm">OnlyFans</span>
            <BottomGradient />
          </button>
        </div>
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
