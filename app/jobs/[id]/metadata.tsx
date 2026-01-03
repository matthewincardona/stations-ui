import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

export async function generateMetadata({ params }) {
  const { data } = await supabase
    .from("jobs")
    .select("title, company_name")
    .eq("id", params.id)
    .single();

  if (!data) {
    return {
      title: "Job Not Found",
    };
  }

  return {
    title: `${data.title} at ${data.company_name}`,
    description: `Details for the ${data.title} role at ${data.company_name}`,
  };
}
