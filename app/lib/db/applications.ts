import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
);

export interface JobApplication {
  id: string;
  title: string;
  company: string;
  link: string;
  applied_date: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export async function fetchApplications(): Promise<JobApplication[]> {
  const { data, error } = await supabase
    .from("job_applications")
    .select("*")
    .order("applied_date", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch applications: ${error.message}`);
  }

  return data || [];
}

export async function getApplicationById(id: string): Promise<JobApplication> {
  const { data, error } = await supabase
    .from("job_applications")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(`Failed to fetch application: ${error.message}`);
  }

  return data;
}

export async function createApplication(
  application: Omit<JobApplication, "id" | "created_at" | "updated_at">,
): Promise<JobApplication> {
  const { data, error } = await supabase
    .from("job_applications")
    .insert([
      {
        title: application.title,
        company: application.company,
        link: application.link,
        applied_date: application.applied_date,
        notes: application.notes || "",
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create application: ${error.message}`);
  }

  return data;
}

export async function updateApplication(
  id: string,
  updates: Partial<Omit<JobApplication, "id" | "created_at" | "updated_at">>,
): Promise<JobApplication> {
  const { data, error } = await supabase
    .from("job_applications")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update application: ${error.message}`);
  }

  return data;
}

export async function deleteApplication(id: string): Promise<void> {
  const { error } = await supabase
    .from("job_applications")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(`Failed to delete application: ${error.message}`);
  }
}
