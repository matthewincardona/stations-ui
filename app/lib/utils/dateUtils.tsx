/**
 * Parse a Supabase timestamp string into a JavaScript Date.
 * Handles formats like:
 *  - 2025-12-23 00:00:00+00
 *  - 2026-01-06 06:02:24.5664+00
 */
export function parseSupabaseDate(dateString?: string): Date | null {
  if (!dateString) return null;

  // Split off the timezone part and replace space with T
  const [datetimePart] = dateString.split("+");
  const isoString = datetimePart.replace(" ", "T") + "Z";

  const date = new Date(isoString);
  return isNaN(date.getTime()) ? null : date;
}

/**
 * Convert a timestamp string into a "time ago" string.
 * Example: "2 days ago", "5 minutes ago", or "unknown"
 */
export function timeAgo(dateString?: string): string {
  const date = parseSupabaseDate(dateString);
  if (!date) return "unknown";

  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days !== 1 ? "s" : ""} ago`;

  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months !== 1 ? "s" : ""} ago`;

  const years = Math.floor(days / 365);
  return `${years} year${years !== 1 ? "s" : ""} ago`;
}
