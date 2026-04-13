"use client";

import { useAuth } from "@/app/lib/auth-context";
import { Cloud, LogIn } from "lucide-react";
import Link from "next/link";

export function CloudBackupBanner() {
  const { user } = useAuth();

  if (user) {
    return null;
  }

  return (
    <div className="mb-6 rounded-[28px] border border-cyan-100 bg-cyan-50 p-5 shadow-soft">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-soft">
            <Cloud className="text-cyan-600" size={24} />
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-900">
              Save to the Cloud
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Sign up to sync your applications across devices and keep progress
              safe.
            </p>
          </div>
        </div>
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow-soft transition hover:bg-blue-700"
        >
          <LogIn size={18} />
          Sign Up
        </Link>
      </div>
    </div>
  );
}
