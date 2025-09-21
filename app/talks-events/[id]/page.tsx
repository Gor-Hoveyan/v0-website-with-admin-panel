import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  ExternalLink,
  Clock,
  Users,
} from "lucide-react";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const typeColors = {
  talk: "bg-red-100 text-red-800",
  workshop: "bg-blue-100 text-blue-800",
  conference: "bg-green-100 text-green-800",
};

interface TalkEventPageProps {
  params: {
    id: string;
  };
}

export default async function TalkEventPage({ params }: TalkEventPageProps) {
  const supabase = await createClient();
  const { data: event, error } = await supabase
    .from("talks_events")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !event) {
    notFound();
  }

  const isUpcoming =
    event.event_date && new Date(event.event_date) > new Date();

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/talks-events">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Talks & Events
            </Link>
          </Button>
        </div>
      </section>

      {/* Event Hero */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Badge
                    className={
                      typeColors[event.event_type as keyof typeof typeColors] ||
                      "bg-gray-100 text-gray-800"
                    }
                  >
                    {event.event_type || "Event"}
                  </Badge>
                  {isUpcoming && <Badge variant="secondary">Upcoming</Badge>}
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-balance">
                  {event.title}
                </h1>
                <p className="text-xl text-muted-foreground text-pretty">
                  {event.description}
                </p>
              </div>

              <div className="space-y-4">
                {event.event_date && (
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Calendar className="h-5 w-5" />
                    <span className="text-lg">
                      {new Date(event.event_date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                )}

                {event.location && (
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <MapPin className="h-5 w-5" />
                    <span className="text-lg">{event.location}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {event.registration_url && isUpcoming && (
                  <Button size="lg" asChild className="flex-1">
                    <Link href={event.registration_url} target="_blank">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Register Now
                    </Link>
                  </Button>
                )}
                <Button size="lg" variant="outline" className="flex-1">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Learn More
                </Button>
              </div>
            </div>

            <div className="relative">
              <img
                src={event.image_url || "/placeholder.svg"}
                alt={event.title}
                className="w-full rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* About Event */}
              <div>
                <h2 className="text-3xl font-bold mb-6">About This Event</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {event.description ||
                    "This event provides valuable insights and networking opportunities in the field."}
                </p>
              </div>

              {/* Event Information */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Event Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Event Type</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground capitalize">
                        {event.event_type || "General"}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Badge variant={isUpcoming ? "default" : "outline"}>
                        {isUpcoming ? "Upcoming" : "Past Event"}
                      </Badge>
                    </CardContent>
                  </Card>

                  {event.event_date && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Date</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          {new Date(event.event_date).toLocaleDateString()}
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  {event.location && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Location</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          {event.location}
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Event Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Event Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {event.event_date && (
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Date</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(event.event_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}

                  {event.location && (
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Location</p>
                        <p className="text-sm text-muted-foreground">
                          {event.location}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Duration</p>
                      <p className="text-sm text-muted-foreground">TBD</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Registration */}
              {event.registration_url && isUpcoming && (
                <Card>
                  <CardHeader>
                    <CardTitle>Registration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full">
                      <Link href={event.registration_url} target="_blank">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Register Now
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Event Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Event Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Created:</span>
                    <span>
                      {new Date(event.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Updated:</span>
                    <span>
                      {new Date(event.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Related Events */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Related Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* This would typically fetch related events from the database */}
              <Card className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">Workshop</Badge>
                      <span className="text-xs text-muted-foreground">
                        Upcoming
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                      <Link href="/talks-events/related-1">
                        AI in Education Workshop
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Hands-on workshop on implementing AI in educational
                      settings.
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>Mar 20, 2024</span>
                      <span>San Francisco, CA</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">Conference</Badge>
                      <span className="text-xs text-muted-foreground">
                        Past
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                      <Link href="/talks-events/related-2">
                        Data Science Summit 2024
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Annual conference on the latest trends in data science.
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>Feb 15, 2024</span>
                      <span>New York, NY</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">Talk</Badge>
                      <span className="text-xs text-muted-foreground">
                        Upcoming
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                      <Link href="/talks-events/related-3">
                        Future of Machine Learning
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Keynote presentation on emerging trends in ML.
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>Apr 10, 2024</span>
                      <span>Boston, MA</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">
              Interested in Speaking at Your Event?
            </h2>
            <p className="text-lg opacity-90 text-pretty">
              I'm available for keynotes, workshops, and panel discussions on
              AI, education, and technology topics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Get in Touch
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                View All Events
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
