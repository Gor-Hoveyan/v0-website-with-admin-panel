import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

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
};

export default async function TalksEventsPage() {
  const supabase = await createClient();
  const { data: events } = await supabase
    .from("talks_events")
    .select("*")
    .order("event_date", { ascending: false });

  // Group events by type and status
  const upcomingEvents =
    events?.filter(
      (event) => event.event_date && new Date(event.event_date) > new Date()
    ) || [];

  const pastEvents =
    events?.filter(
      (event) => !event.event_date || new Date(event.event_date) <= new Date()
    ) || [];

  const sections = [
    {
      title: "Upcoming Talks",
      items: upcomingEvents,
    },
    {
      title: "Recent Talks",
      items: pastEvents.slice(0, 4),
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background to-muted/50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-balance">
              Talks, Events & Media Appearances
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Sharing knowledge and insights through speaking engagements, panel
              discussions, podcasts, and media appearances worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Sections */}
      {sections.map((section, sectionIndex) => (
        <section
          key={sectionIndex}
          className={`py-16 ${sectionIndex % 2 === 1 ? "bg-muted/50" : ""}`}
        >
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">{section.title}</h2>
              {section.title === "Upcoming Talks" && (
                <p className="text-muted-foreground">
                  Join me at these upcoming events
                </p>
              )}
            </div>

            {section.items.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.items.map((item, itemIndex) => (
                  <Card
                    key={itemIndex}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Badge
                          className={
                            typeColors[
                              item.event_type as keyof typeof typeColors
                            ] || "bg-gray-100 text-gray-800"
                          }
                        >
                          {item.event_type || "Event"}
                        </Badge>
                        {section.title === "Upcoming Talks" &&
                          item.registration_url && (
                            <Button size="sm" variant="outline" asChild>
                              <a
                                href={item.registration_url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Register
                              </a>
                            </Button>
                          )}
                      </div>
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                      <CardDescription className="text-base font-medium text-primary">
                        {item.location || "TBD"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>

                      <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
                        {item.event_date && (
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(item.event_date).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                        {item.location && (
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4" />
                            <span>{item.location}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No {section.title.toLowerCase()} available at the moment.
                </p>
              </div>
            )}
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
              I'm available for keynotes, workshops, panel discussions, and
              media interviews on AI, education, and technology topics.
            </p>
            <Button size="lg" variant="secondary">
              Get in Touch
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
