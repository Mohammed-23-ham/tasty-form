"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Verify() {
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let active = true;
    const redirectToDashboard = () => {
      if (active) {
        window.location.replace("/dashboard");
      }
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && (event === "SIGNED_IN" || event === "INITIAL_SESSION")) {
        redirectToDashboard();
      }
    });

    void supabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (!active) return;
        if (error) {
          setErrorMessage(error.message);
          return;
        }
        if (data.session) {
          redirectToDashboard();
        }
      })
      .catch((error: unknown) => {
        if (active) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "We could not check your verification status.",
          );
        }
      });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <main className="flex min-h-svh items-center justify-center bg-neutral-950 px-4 text-white">
      <section className="w-full max-w-md rounded-3xl border border-white/15 bg-white/5 p-8 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
          Verify your email
        </p>
        <h1 className="text-2xl font-bold">Check your inbox</h1>
        <p className="mt-4 text-sm leading-6 text-neutral-300">
          We sent you a confirmation link. Open it to verify your email address;
          you’ll be taken to your dashboard once verification is complete.
        </p>
        {errorMessage && (
          <p className="mt-5 text-sm text-red-300" role="alert">
            {errorMessage}
          </p>
        )}
      </section>
    </main>
  );
}
