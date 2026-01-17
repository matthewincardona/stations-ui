export function timeAgo(rawDate: Date | string | null): string {
  if (!rawDate) return "Unknown";

  const date = rawDate instanceof Date ? rawDate : new Date(rawDate);
  if (isNaN(date.getTime())) return "Unknown";

  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 5) return "just now";
  if (seconds < 60) return `${seconds} seconds ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  }

  const hours = Math.floor(seconds / 3600);
  if (hours < 24) {
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  }

  const days = Math.floor(seconds / 86400);
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;

  const months = Math.floor(days / 30);
  if (months < 12) {
    return months === 1 ? "1 month ago" : `${months} months ago`;
  }

  const years = Math.floor(days / 365);
  return years === 1 ? "1 year ago" : `${years} years ago`;
}

export function parseSupabaseDate(dateString?: string) {
  if (!dateString) return null;

  const date = new Date(dateString); // Supabase format is fully valid
  return isNaN(date.getTime()) ? null : date;
}
