import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function CompaniesPage() {
  const supabase = await createClient();
  const { data: companies } = await supabase
    .from("companies")
    .select("*")
    .order("created_at", { ascending: false });

  // Group dynamically by partnership_type
  const groupedCompanies = companies
    ? Object.entries(
        companies.reduce((acc, company) => {
          if (!acc[company.partnership_type])
            acc[company.partnership_type] = [];
          acc[company.partnership_type].push(company);
          return acc;
        }, {} as Record<string, typeof companies>)
      ).map(([type, comps]) => ({
        partnership_type: type,
        companies: comps,
      }))
    : [];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background to-muted/50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-balance">
              Partner Organizations
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Collaborating with universities, training centers, companies, and
              more to deliver world-class technology education.
            </p>
          </div>
        </div>
      </section>

      {/* Dynamic Partnership Sections */}
      {groupedCompanies.map((category, idx) => (
        <section
          key={category.partnership_type}
          className={`py-20 ${idx % 2 === 1 ? "bg-muted/50" : ""}`}
        >
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <div className="flex items-center justify-center space-x-3">
                <Building2 className="h-8 w-8 text-primary" />
                <h2 className="text-3xl lg:text-4xl font-bold capitalize">
                  {category.partnership_type}
                </h2>
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Organizations with a{" "}
                <span className="font-semibold">
                  {category.partnership_type}
                </span>{" "}
                partnership
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {category.companies.map((company) => (
                <Card
                  key={company.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <img
                          src={company.logo_url || "/placeholder.svg"}
                          alt={`${company.name} logo`}
                          className="w-16 h-16 object-contain"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <CardTitle className="text-xl">
                          {company.name}
                        </CardTitle>
                        <CardDescription className="font-medium text-primary">
                          {company.description}
                        </CardDescription>
                        <Badge variant="outline">
                          {new Date(company.created_at).getFullYear()} - Present
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      {company.description}
                    </p>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">
                        Partnership Type:
                      </h4>
                      <p className="text-sm text-primary font-medium capitalize">
                        {company.partnership_type}
                      </p>
                    </div>

                    {company.website_url && (
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Website:</h4>
                        <a
                          href={company.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          {company.website_url}
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Partnership Stats */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Partnership Impact
            </h2>
            <p className="text-lg opacity-90">
              Measuring the success of our collaborative efforts
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold">
                {companies?.length || 0}+
              </div>
              <div className="text-sm opacity-90">Partner Organizations</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold">5,000+</div>
              <div className="text-sm opacity-90">Students Trained</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-sm opacity-90">Programs Developed</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold">95%</div>
              <div className="text-sm opacity-90">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Inquiry CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">
              Interested in Partnership?
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Let's collaborate to bring world-class technology education to
              your organization. Contact us to discuss partnership
              opportunities.
            </p>
            <Button size="lg">Explore Partnership</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
