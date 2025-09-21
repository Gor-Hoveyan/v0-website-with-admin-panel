import { createClient } from "@/lib/supabase/server";
import { CompanyManagement } from "@/components/admin/company-management";

export default async function AdminCompaniesPage() {
  const supabase = await createClient();

  const { data: companies, error } = await supabase
    .from("companies")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching companies:", error);
    return <div>Error loading companies</div>;
  }

  return <CompanyManagement initialCompanies={companies || []} />;
}
