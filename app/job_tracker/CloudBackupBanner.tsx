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
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Cloud className="text-blue-600" size={24} />
        <div>
          <p className="font-semibold text-gray-900">Save to the Cloud</p>
          <p className="text-sm text-gray-600">
            Sign up to sync your applications across devices and never lose your
            progress.
          </p>
        </div>
      </div>
      <Link
        href="/auth/login"
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ml-4"
      >
        <LogIn size={18} />
        Sign Up
      </Link>
    </div>
  );
}
