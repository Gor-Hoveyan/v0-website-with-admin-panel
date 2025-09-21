"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, Eye } from "lucide-react";

interface Company {
  id: string;
  name: string;
  description: string;
  logo_url?: string;
  website_url?: string;
  partnership_type: string;
  created_at: string;
  updated_at: string;
}

interface CompanyEditorProps {
  initialCompany?: Company;
}

export function CompanyEditor({ initialCompany }: CompanyEditorProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [company, setCompany] = useState<Partial<Company>>({
    name: initialCompany?.name || "",
    description: initialCompany?.description || "",
    logo_url: initialCompany?.logo_url || "",
    website_url: initialCompany?.website_url || "",
    partnership_type: initialCompany?.partnership_type || "company",
  });

  const handleSave = async () => {
    if (!company.name?.trim() || !company.description?.trim()) {
      alert("Please fill in the name and description");
      return;
    }

    setIsLoading(true);

    try {
      const url = initialCompany
        ? `/api/companies/${initialCompany.id}`
        : "/api/companies";
      const method = initialCompany ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(company),
      });

      if (response.ok) {
        router.push("/admin/companies");
      } else {
        const error = await response.json();
        alert(`Failed to save company: ${error.error}`);
      }
    } catch (error) {
      console.error("Error saving company:", error);
      alert("Failed to save company");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/50">
      <div className="border-b bg-background">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="p-0"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold">
                  {initialCompany ? "Edit Company" : "Add New Company"}
                </h1>
                <p className="text-muted-foreground">
                  {initialCompany
                    ? "Update company information"
                    : "Add a new partner organization"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" asChild>
                <a href="/admin/companies">
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                </a>
              </Button>
              <Button onClick={handleSave} disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>
                Basic information about the partner organization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Company Name *</Label>
                  <Input
                    id="name"
                    value={company.name || ""}
                    onChange={(e) =>
                      setCompany({ ...company, name: e.target.value })
                    }
                    placeholder="Enter company name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="partnership_type">Partnership Type *</Label>
                  <Select
                    value={company.partnership_type || "company"}
                    onValueChange={(value) =>
                      setCompany({ ...company, partnership_type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select partnership type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="university">University</SelectItem>
                      <SelectItem value="training">Training Center</SelectItem>
                      <SelectItem value="company">Company</SelectItem>
                      <SelectItem value="charity">Charity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={company.description || ""}
                  onChange={(e) =>
                    setCompany({ ...company, description: e.target.value })
                  }
                  placeholder="Enter company description"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="logo_url">Logo URL</Label>
                  <Input
                    id="logo_url"
                    value={company.logo_url || ""}
                    onChange={(e) =>
                      setCompany({ ...company, logo_url: e.target.value })
                    }
                    placeholder="https://example.com/logo.png"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website_url">Website URL</Label>
                  <Input
                    id="website_url"
                    value={company.website_url || ""}
                    onChange={(e) =>
                      setCompany({ ...company, website_url: e.target.value })
                    }
                    placeholder="https://example.com"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
