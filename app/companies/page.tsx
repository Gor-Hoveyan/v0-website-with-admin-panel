import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, GraduationCap, Users, Heart } from "lucide-react"

const companyCategories = [
  {
    title: "Universities",
    icon: GraduationCap,
    description: "Academic institutions where I've taught courses and developed curriculum",
    companies: [
      {
        name: "UFAR",
        fullName: "University of French Armenia",
        logo: "/ufar-university-logo.jpg",
        description:
          "Leading private university in Armenia offering programs in engineering, business, and technology.",
        partnership: "Guest Lecturer & Curriculum Developer",
        duration: "2020 - Present",
      },
      {
        name: "NPUA",
        fullName: "National Polytechnic University of Armenia",
        logo: "/npua-university-logo.jpg",
        description: "Premier technical university specializing in engineering and applied sciences.",
        partnership: "AI & Machine Learning Course Instructor",
        duration: "2019 - Present",
      },
      {
        name: "ASUE",
        fullName: "Armenian State University of Economics",
        logo: "/asue-university-logo.jpg",
        description: "Leading economics university with growing focus on data science and business analytics.",
        partnership: "Data Science Program Consultant",
        duration: "2021 - Present",
      },
      {
        name: "GSU",
        fullName: "Gavar State University",
        logo: "/gsu-university-logo.jpg",
        description: "Regional university committed to providing quality higher education and research opportunities.",
        partnership: "Technology Education Advisor",
        duration: "2022 - Present",
      },
    ],
  },
  {
    title: "Training Centers",
    icon: Users,
    description: "Professional training organizations focused on skill development and career advancement",
    companies: [
      {
        name: "ARDY Academy",
        fullName: "ARDY Academy",
        logo: "/ardy-academy-logo.jpg",
        description: "Innovative training center specializing in technology education and professional development.",
        partnership: "Lead AI Instructor & Program Designer",
        duration: "2020 - Present",
      },
      {
        name: "Picsart Academy",
        fullName: "Picsart Academy",
        logo: "/picsart-academy-logo.jpg",
        description: "Creative technology academy by Picsart, focusing on design and development skills.",
        partnership: "Machine Learning for Creatives Instructor",
        duration: "2021 - Present",
      },
      {
        name: "Microsoft Academy",
        fullName: "Microsoft Academy",
        logo: "/microsoft-academy-logo.jpg",
        description:
          "Microsoft's official training partner providing certification and professional development programs.",
        partnership: "Azure AI Specialist Trainer",
        duration: "2019 - Present",
      },
    ],
  },
  {
    title: "Companies",
    icon: Building2,
    description: "Technology companies where I've provided consulting and training services",
    companies: [
      {
        name: "Luseen Mobile",
        fullName: "Luseen Mobile",
        logo: "/luseen-mobile-company-logo.jpg",
        description: "Mobile app development company creating innovative solutions for businesses and consumers.",
        partnership: "AI Integration Consultant & Team Training",
        duration: "2022 - Present",
      },
    ],
  },
  {
    title: "Charities",
    icon: Heart,
    description: "Non-profit organizations focused on education and community development",
    companies: [
      {
        name: "SASTIC",
        fullName: "South Asian Science & Technology Innovation Center",
        logo: "/placeholder.svg?key=sastic",
        description: "Non-profit organization promoting STEM education and innovation in underserved communities.",
        partnership: "Volunteer Educator & Curriculum Advisor",
        duration: "2021 - Present",
      },
      {
        name: "FAST",
        fullName: "Foundation for Advancement of Science & Technology",
        logo: "/placeholder.svg?key=fast",
        description: "Educational foundation dedicated to making science and technology accessible to all.",
        partnership: "Pro Bono Training & Mentorship",
        duration: "2020 - Present",
      },
    ],
  },
]

export default function CompaniesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background to-muted/50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-balance">Partner Organizations</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Collaborating with leading universities, training centers, companies, and charities to deliver world-class
              technology education and training programs.
            </p>
          </div>
        </div>
      </section>

      {/* Company Categories */}
      {companyCategories.map((category, categoryIndex) => {
        const Icon = category.icon
        return (
          <section key={categoryIndex} className={`py-20 ${categoryIndex % 2 === 1 ? "bg-muted/50" : ""}`}>
            <div className="container mx-auto px-4">
              <div className="text-center space-y-4 mb-12">
                <div className="flex items-center justify-center space-x-3">
                  <Icon className="h-8 w-8 text-primary" />
                  <h2 className="text-3xl lg:text-4xl font-bold">{category.title}</h2>
                </div>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{category.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {category.companies.map((company, companyIndex) => (
                  <Card key={companyIndex} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start space-x-4">
                        <div className="bg-white rounded-lg p-3 shadow-sm">
                          <img
                            src={company.logo || "/placeholder.svg"}
                            alt={`${company.name} logo`}
                            className="w-16 h-16 object-contain"
                          />
                        </div>
                        <div className="flex-1 space-y-2">
                          <CardTitle className="text-xl">{company.name}</CardTitle>
                          <CardDescription className="font-medium text-primary">{company.fullName}</CardDescription>
                          <Badge variant="outline">{company.duration}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">{company.description}</p>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Partnership Role:</h4>
                        <p className="text-sm text-primary font-medium">{company.partnership}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {/* Partnership Stats */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">Partnership Impact</h2>
            <p className="text-lg opacity-90">Measuring the success of our collaborative efforts</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold">15+</div>
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
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">Interested in Partnership?</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Let's collaborate to bring world-class technology education to your organization. Contact us to discuss
              partnership opportunities.
            </p>
            <Button size="lg">Explore Partnership</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
