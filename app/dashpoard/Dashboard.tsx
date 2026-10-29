"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Dashboard() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadProfile = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (!active) return;
      if (error) {
        setErrorMessage(error.message);
        setIsLoading(false);
        return;
      }

      if (!data.user) {
        window.location.replace("/");
        return;
      }

      const firstName = data.user.user_metadata.first_name;
      const lastName = data.user.user_metadata.last_name;
      const metadataName = data.user.user_metadata.full_name;
      const nameFromParts = [firstName, lastName]
        .filter((part): part is string => typeof part === "string" && part.trim().length > 0)
        .join(" ");

      setEmail(data.user.email ?? "");
      setFullName(
        nameFromParts ||
          (typeof metadataName === "string" ? metadataName : "") ||
          "User",
      );
      setIsLoading(false);
    };

    void loadProfile().catch((error: unknown) => {
      if (active) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "We could not load your account.",
        );
        setIsLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        window.location.replace("/");
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <main className="flex min-h-svh items-center justify-center bg-neutral-950 px-4 text-white">
      <section className="w-full max-w-2xl rounded-3xl border border-white/15 bg-white/5 p-8 sm:p-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
          Dashboard
        </p>
        <h1 className="text-3xl font-bold">Welcome, {isLoading ? "..." : fullName}</h1>
        {isLoading ? (
          <p className="mt-4 text-sm text-neutral-300">Loading your account...</p>
        ) : errorMessage ? (
          <p className="mt-4 text-sm text-red-300" role="alert">
            {errorMessage}
          </p>
        ) : (
          <p className="mt-4 text-sm text-neutral-300">
            Signed in as <span className="text-white">{email}</span>
          </p>
        )}
      </section>
    </main>
  );
}
