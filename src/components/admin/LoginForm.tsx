"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function LoginForm() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedPath = searchParams.get("next") || "/admin";
  const nextPath = requestedPath.startsWith("/") ? requestedPath : "/admin";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || "Login failed.");
      }

      router.replace(nextPath);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="glass-card mx-auto mt-12 grid w-full max-w-md gap-4 p-6" onSubmit={onSubmit}>
      <h1 className="font-fredoka text-3xl text-white">Admin Login</h1>
      <p className="text-sm text-white/70">Enter the admin password to continue.</p>
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className="rounded-xl bg-white/5 p-3 text-sm"
        placeholder="Admin password"
        autoComplete="current-password"
        required
      />
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      <button type="submit" disabled={loading} className="neon-button !justify-center disabled:opacity-60">
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
