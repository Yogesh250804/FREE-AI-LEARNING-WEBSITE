"use client";

import { useState } from "react";
import { createCourse } from "@/lib/course-service";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

const YOUTUBE_COURSES = [
  {
    title: "AI Mastery with Python (CS50)",
    description: "Learn the foundations of artificial intelligence and machine learning using Python. This course explores the concepts and algorithms that foundation modern AI.",
    videoUrl: "https://www.youtube.com/watch?v=5NgNicANyqM",
    thumbnailUrl: "https://img.youtube.com/vi/5NgNicANyqM/maxresdefault.jpg",
    price: 0,
    originalPrice: 99,
    instructorId: "youtube-cs50",
    instructorName: "Harvard CS50",
    category: "Artificial Intelligence",
    level: "intermediate" as const,
    duration: "12h 45m",
    totalLessons: 7,
    rating: 4.9,
    reviewCount: 15420,
    studentCount: 85000,
    tags: ["AI", "Python", "Machine Learning"],
    published: true,
  },
  {
    title: "Next.js 14 Full Stack Development",
    description: "Master the latest Next.js 14 features including App Router, Server Actions, and Data Fetching. Build a full-stack application from scratch.",
    videoUrl: "https://www.youtube.com/watch?v=wm5gMKuwSYk",
    thumbnailUrl: "https://img.youtube.com/vi/wm5gMKuwSYk/maxresdefault.jpg",
    price: 0,
    originalPrice: 49,
    instructorId: "youtube-jsmastery",
    instructorName: "JavaScript Mastery",
    category: "Web Development",
    level: "beginner" as const,
    duration: "8h 15m",
    totalLessons: 12,
    rating: 4.8,
    reviewCount: 8900,
    studentCount: 45000,
    tags: ["Next.js", "React", "Full Stack"],
    published: true,
  },
  {
    title: "Modern UI/UX Design Fundamentals",
    description: "Learn the principles of modern UI/UX design. Master color theory, typography, and layout to create stunning user interfaces.",
    videoUrl: "https://www.youtube.com/watch?v=c9Wg6ndoxag",
    thumbnailUrl: "https://img.youtube.com/vi/c9Wg6ndoxag/maxresdefault.jpg",
    price: 0,
    originalPrice: 29,
    instructorId: "youtube-designcourse",
    instructorName: "DesignCourse",
    category: "Design",
    level: "beginner" as const,
    duration: "5h 30m",
    totalLessons: 10,
    rating: 4.7,
    reviewCount: 5600,
    studentCount: 22000,
    tags: ["UI/UX", "Design", "Figma"],
    published: true,
  },
  {
    title: "Data Science for Beginners",
    description: "Start your journey into Data Science. Learn NumPy, Pandas, Matplotlib, and Scikit-Learn to analyze data and build models.",
    videoUrl: "https://www.youtube.com/watch?v=rfscVS0vtbw",
    thumbnailUrl: "https://img.youtube.com/vi/rfscVS0vtbw/maxresdefault.jpg",
    price: 0,
    originalPrice: 79,
    instructorId: "youtube-freecodecamp",
    instructorName: "freeCodeCamp",
    category: "Data Science",
    level: "beginner" as const,
    duration: "10h 20m",
    totalLessons: 15,
    rating: 4.9,
    reviewCount: 21000,
    studentCount: 120000,
    tags: ["Data Science", "Python", "Analysis"],
    published: true,
  }
];

export default function SeedPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSeed = async () => {
    setStatus("loading");
    setMessage("Seeding courses...");
    
    try {
      for (const course of YOUTUBE_COURSES) {
        await createCourse(course);
      }
      setStatus("success");
      setMessage("Successfully seeded YouTube courses to Firestore!");
    } catch (error) {
      console.error("Seeding error:", error);
      setStatus("error");
      setMessage("Failed to seed courses. Check console for details.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Database Seeding</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-muted-foreground">
              Click the button below to add curated YouTube courses to your Firestore database.
            </p>
            
            {status === "idle" && (
              <Button onClick={handleSeed} className="w-full">
                Seed YouTube Courses
              </Button>
            )}

            {status === "loading" && (
              <div className="flex flex-col items-center gap-2 py-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p>{message}</p>
              </div>
            )}

            {status === "success" && (
              <div className="flex flex-col items-center gap-2 py-4 text-green-600">
                <CheckCircle className="h-8 w-8" />
                <p>{message}</p>
                <Button variant="outline" className="mt-2" asChild>
                  <a href="/firestore-courses">Go to Courses</a>
                </Button>
              </div>
            )}

            {status === "error" && (
              <div className="flex flex-col items-center gap-2 py-4 text-destructive">
                <AlertCircle className="h-8 w-8" />
                <p>{message}</p>
                <Button variant="outline" className="mt-2" onClick={() => setStatus("idle")}>
                  Try Again
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
