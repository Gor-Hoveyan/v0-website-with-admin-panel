import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, ExternalLink } from "lucide-react"

const sections = [
  {
    title: "Upcoming Talks",
    items: [
      {
        title: "AI in Education: The Next Frontier",
        event: "Tech Education Summit 2024",
        date: "March 15, 2024",
        location: "San Francisco, CA",
        type: "Keynote",
        description:
          "Exploring how AI is transforming educational experiences and creating new opportunities for personalized learning.",
      },
      {
        title: "Machine Learning for Everyone",
        event: "Data Science Conference",
        date: "April 22, 2024",
        location: "New York, NY",
        type: "Workshop",
        description: "Hands-on workshop introducing machine learning concepts to non-technical audiences.",
      },
    ],
  },
  {
    title: "Recent Talks",
    items: [
      {
        title: "The Future of Work in the AI Era",
        event: "Future of Work Summit",
        date: "January 18, 2024",
        location: "Austin, TX",
        type: "Panel Discussion",
        description: "Discussing how AI will reshape job markets and the skills needed for future careers.",
      },
      {
        title: "Building Ethical AI Systems",
        event: "AI Ethics Conference",
        date: "December 10, 2023",
        location: "Boston, MA",
        type: "Keynote",
        description: "Addressing the importance of ethics in AI development and deployment.",
      },
    ],
  },
  {
    title: "Panels",
    items: [
      {
        title: "Women in Tech: Breaking Barriers",
        event: "Women in Technology Summit",
        date: "November 15, 2023",
        location: "Seattle, WA",
        type: "Panel",
        description: "Discussing challenges and opportunities for women in technology careers.",
      },
      {
        title: "The State of AI Education",
        event: "EdTech Innovation Forum",
        date: "October 8, 2023",
        location: "Chicago, IL",
        type: "Panel",
        description: "Panel discussion on current trends and future directions in AI education.",
      },
    ],
  },
  {
    title: "Podcasts",
    items: [
      {
        title: "The Learning Revolution Podcast",
        event: "Episode #45: AI in the Classroom",
        date: "February 1, 2024",
        location: "Remote",
        type: "Podcast",
        description: "Deep dive into practical applications of AI in educational settings.",
      },
      {
        title: "Tech Talks with Industry Leaders",
        event: "Episode #128: The Future of Data Science",
        date: "January 12, 2024",
        location: "Remote",
        type: "Podcast",
        description: "Discussing emerging trends and career opportunities in data science.",
      },
    ],
  },
  {
    title: "Interviews",
    items: [
      {
        title: "AI Today Magazine",
        event: "Cover Story: Democratizing AI Education",
        date: "December 2023",
        location: "Print & Digital",
        type: "Interview",
        description: "Featured interview on making AI education accessible to everyone.",
      },
      {
        title: "TechCrunch",
        event: "The Rise of Online Learning Platforms",
        date: "November 2023",
        location: "Online",
        type: "Interview",
        description: "Discussing the evolution and impact of online education platforms.",
      },
    ],
  },
  {
    title: "Commentaries & Guest Posts",
    items: [
      {
        title: "Harvard Business Review",
        event: "Why Every Company Needs an AI Strategy",
        date: "January 2024",
        location: "Online",
        type: "Guest Article",
        description: "Strategic insights on implementing AI in business operations.",
      },
      {
        title: "MIT Technology Review",
        event: "The Ethics of AI in Education",
        date: "December 2023",
        location: "Online",
        type: "Commentary",
        description: "Exploring ethical considerations in educational AI applications.",
      },
    ],
  },
  {
    title: "Mentions",
    items: [
      {
        title: "Forbes",
        event: "Top 10 AI Educators to Follow",
        date: "February 2024",
        location: "Online",
        type: "Feature",
        description: "Listed among leading voices in AI education and training.",
      },
      {
        title: "Wired Magazine",
        event: "The New Wave of Tech Education",
        date: "January 2024",
        location: "Print & Digital",
        type: "Mention",
        description: "Featured as an innovative educator transforming tech learning.",
      },
    ],
  },
]

const typeColors = {
  Keynote: "bg-red-100 text-red-800",
  Workshop: "bg-blue-100 text-blue-800",
  "Panel Discussion": "bg-green-100 text-green-800",
  Panel: "bg-green-100 text-green-800",
  Podcast: "bg-purple-100 text-purple-800",
  Interview: "bg-yellow-100 text-yellow-800",
  "Guest Article": "bg-indigo-100 text-indigo-800",
  Commentary: "bg-pink-100 text-pink-800",
  Feature: "bg-orange-100 text-orange-800",
  Mention: "bg-gray-100 text-gray-800",
}

export default function TalksEventsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background to-muted/50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-balance">Talks, Events & Media Appearances</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Sharing knowledge and insights through speaking engagements, panel discussions, podcasts, and media
              appearances worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Sections */}
      {sections.map((section, sectionIndex) => (
        <section key={sectionIndex} className={`py-16 ${sectionIndex % 2 === 1 ? "bg-muted/50" : ""}`}>
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">{section.title}</h2>
              {section.title === "Upcoming Talks" && (
                <p className="text-muted-foreground">Join me at these upcoming events</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.items.map((item, itemIndex) => (
                <Card key={itemIndex} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge className={typeColors[item.type as keyof typeof typeColors]}>{item.type}</Badge>
                      {section.title === "Upcoming Talks" && (
                        <Button size="sm" variant="outline">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Register
                        </Button>
                      )}
                    </div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                    <CardDescription className="text-base font-medium text-primary">{item.event}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{item.description}</p>

                    <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{item.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Speaking Inquiry CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">
              Interested in Having Me Speak at Your Event?
            </h2>
            <p className="text-lg opacity-90 text-pretty">
              I'm available for keynotes, workshops, panel discussions, and media interviews on AI, education, and
              technology topics.
            </p>
            <Button size="lg" variant="secondary">
              Get in Touch
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
