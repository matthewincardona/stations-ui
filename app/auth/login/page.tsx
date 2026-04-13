"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/lib/auth-context";
import { Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { user, signIn, signUp } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isSignUp) {
        if (password.length < 6) {
          setError("Password must be at least 6 characters");
          return;
        }
        await signUp(email, password);
        setError(null);
        setEmail("");
        setPassword("");
        setIsSignUp(false);
        alert(
          "Account created! Check your email to confirm, then you can log in.",
        );
      } else {
        await signIn(email, password);
        router.push("/job_tracker");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl bg-white border border-gray-200 rounded-[28px] shadow-card p-10">
        <div className="text-center mb-8">
          <span className="inline-flex items-center rounded-full bg-cyan-50 text-cyan-800 px-3 py-1 text-sm font-medium">
            {isSignUp ? "New here?" : "Welcome back"}
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-gray-900">
            {isSignUp ? "Create your account" : "Sign in to your workspace"}
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            {isSignUp
              ? "Set up your profile and keep your applications synced across devices."
              : "Access your saved applications, notes, and job tracker from anywhere."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="relative">
              <Mail
                className="pointer-events-none absolute left-4 top-3.5 text-gray-400"
                size={20}
              />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pl-11 text-gray-800 placeholder:text-gray-400 shadow-softer outline-none transition duration-150 focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(18,151,217,0.18)]"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <Lock
                className="pointer-events-none absolute left-4 top-3.5 text-gray-400"
                size={20}
              />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isSignUp ? "At least 6 characters" : "••••••••"}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pl-11 text-gray-800 placeholder:text-gray-400 shadow-softer outline-none transition duration-150 focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(18,151,217,0.18)]"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-base font-medium text-white shadow-soft transition duration-150 hover:bg-blue-700 disabled:bg-blue-400"
          >
            {loading ? "Please wait…" : isSignUp ? "Create Account" : "Sign In"}
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <span>
            {isSignUp
              ? "Already have an account?"
              : "Don’t have an account yet?"}
          </span>
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError(null);
              setEmail("");
              setPassword("");
            }}
            className="ml-1 font-semibold text-blue-600 hover:underline"
          >
            {isSignUp ? "Sign in" : "Create one"}
          </button>
        </div>

        <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-center text-sm text-gray-500">
          We’ll keep your job applications secure and synced across devices. No
          spam, ever.
        </div>
      </div>
    </div>
  );
}
