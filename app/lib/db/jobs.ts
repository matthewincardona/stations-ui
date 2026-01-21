import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
);

export interface Job {
  id: string;
  title: string;
  company_name: string;
  location: string;
  date_posted: string;
  job_url: string;
  job_url_direct: string;
  company_logo: string;
  skills: string;
  summary: string;
}

export function parseSupabaseDate(dateString?: string) {
  if (!dateString) return null;

  let iso = dateString.replace(" ", "T");
  iso = iso.replace(/\+(\d{2})(?!:)/, "+$1:00");

  const date = new Date(iso);
  return isNaN(date.getTime()) ? null : date;
}

export async function fetchJobs(page: number, level: string, title: string) {
  const limit = 10;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("jobs")
    .select("*", { count: "exact" })
    .gt(`role_scores->>${title}`, "0.7")
    .gt(`seniority_scores->>${level}`, "0.7")
    .lt("seniority_scores->>mid_and_above", "0.6")
    .order("date_posted", { ascending: false })
    .range(from, to);

  const { data, count, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return { data: data || [], count: count || 0 };
}
