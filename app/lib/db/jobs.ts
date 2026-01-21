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

export async function fetchJobs(
  page: number,
  level: string,
  title: string,
  location: string,
) {
  const limit = 10;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase.from("jobs").select("*", { count: "exact" });

  const titles = title ? title.split(";") : [];
  if (titles.length > 0) {
    const titleFilters = titles
      .map((t) => `role_scores->>${t}.gt.0.7`)
      .join(",");
    query = query.or(titleFilters);
  }

  const levels = level ? level.split(";") : [];
  if (levels.length > 0) {
    const levelFilters = levels
      .map((l) => `seniority_scores->>${l}.gt.0.7`)
      .join(",");
    query = query.or(levelFilters);
    // if (levels.includes('entry') || levels.includes('intern')) {
    //     query = query.lt("seniority_scores->>mid_and_above", "0.6");
    // }
  }

  const locations = location ? location.split(";") : [];
  if (locations.length > 0) {
    const locationFilters = locations
      .map((l) => `location.ilike."%${l}%"`)
      .join(",");
    query = query.or(locationFilters);
  }

  query = query.order("date_posted", { ascending: false }).range(from, to);

  const { data, count, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return { data: data || [], count: count || 0 };
}
