"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/lib/auth-context";
import { LogOut, User, ChevronDown } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogOut = async () => {
    try {
      await signOut();
      setDropdownOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <nav className="max-w-full flex justify-center border border-[#ececec] py-2 px-3">
      <div className="flex justify-between h-12 max-w-400 grow items-center rounded-xl">
        <div className="flex gap-4">
          <Link href="/">
            <p>
              <b>Stations</b>
            </p>
          </Link>
        </div>
        <ul className="flex gap-4 items-center">
          <li className="hover:underline">
            <Link href="/job_tracker">Job Tracker</Link>
          </li>
          <li className="hover:underline">
            <a href="https://stations.matthewincardona.com">Find Jobs</a>
          </li>
          <li className="hover:underline">
            <a href="https://stations.parser.matthewincardona.com">
              Test Your Resume
            </a>
          </li>

          {/* Auth Section */}
          {!loading && (
            <>
              {user ? (
                <li className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                  >
                    <User size={18} />
                    <span className="text-sm truncate max-w-xs">
                      {user.email}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`transition ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                      <a
                        href="/job_tracker"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg"
                        onClick={() => setDropdownOpen(false)}
                      >
                        My Applications
                      </a>
                      <button
                        onClick={handleLogOut}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-lg flex items-center gap-2 border-t border-gray-100"
                      >
                        <LogOut size={16} />
                        Log Out
                      </button>
                    </div>
                  )}
                </li>
              ) : (
                <li>
                  <Link
                    href="/auth/login"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition text-sm"
                  >
                    Sign In
                  </Link>
                </li>
              )}
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
