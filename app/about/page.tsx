import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const experience = [
  {
    role: "Senior AI Instructor",
    company: "Tech University",
    period: "2018 - Present",
    description:
      "Teaching AI, Machine Learning, and Data Science courses; mentoring students in capstone projects.",
  },
  {
    role: "AI Engineer",
    company: "Innovate Tech Co.",
    period: "2014 - 2018",
    description:
      "Developed AI solutions and predictive models for enterprise clients.",
  },
];

const education = [
  {
    degree: "M.Sc. Computer Science",
    school: "Tech University",
    period: "2008 - 2010",
  },
  {
    degree: "B.Sc. Computer Science",
    school: "Tech University",
    period: "2004 - 2008",
  },
];

export default function CVPage() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="lg:w-1/3 bg-muted p-8 flex flex-col items-center space-y-6">
        <img
          src="/profile.jpg"
          alt="Profile"
          className="w-40 h-40 rounded-full object-cover"
        />
        <h1 className="text-2xl font-bold">John Doe</h1>
        <p className="text-center text-muted-foreground">
          Senior AI Instructor & Software Engineer
        </p>

        <div className="space-y-2 text-sm">
          <p>
            Email: <Link href="mailto:john@example.com">john@example.com</Link>
          </p>
          <p>
            GitHub: <Link href="https://github.com/johndoe">johndoe</Link>
          </p>
          <p>
            LinkedIn:{" "}
            <Link href="https://linkedin.com/in/johndoe">john-doe</Link>
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:w-2/3 p-8 space-y-12">
        {/* Experience */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Experience</h2>
          <div className="space-y-4">
            {experience.map((exp, i) => (
              <Card key={i} className="bg-card">
                <CardHeader>
                  <CardTitle>
                    {exp.role} - {exp.company}
                  </CardTitle>
                  <CardDescription>{exp.period}</CardDescription>
                </CardHeader>
                <CardContent>{exp.description}</CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Education</h2>
          <div className="space-y-4">
            {education.map((edu, i) => (
              <Card key={i} className="bg-card">
                <CardHeader>
                  <CardTitle>{edu.degree}</CardTitle>
                  <CardDescription>
                    {edu.school} | {edu.period}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Optional Sections: Projects, Press, Achievements */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Achievements</h2>
          <div className="flex flex-wrap gap-4">
            <Badge>5,000+ Students Mentored</Badge>
            <Badge>25+ Courses Authored</Badge>
            <Badge>Recognized for Impact</Badge>
          </div>
        </section>
      </main>
    </div>
  );
}
