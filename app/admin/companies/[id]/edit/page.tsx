import { createClient } from "@/lib/supabase/server";
import { CompanyEditor } from "@/components/admin/company-editor";

interface EditCompanyPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCompanyPage({
  params,
}: EditCompanyPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: company, error } = await supabase
    .from("companies")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching company:", error);
    return <div>Error loading company</div>;
  }

  return <CompanyEditor initialCompany={company} />;
}
