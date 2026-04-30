"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { DashboardStats } from "@/components/student-dashboard/dashboard-stats";
import { ContinueWatching } from "@/components/student-dashboard/continue-watching";
import { EnrolledCourseCard } from "@/components/student-dashboard/enrolled-course-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search, Grid3X3, List, BookOpen } from "lucide-react";
import { MOCK_COURSES } from "@/lib/course-service";

// Mock data for demonstration
const mockEnrolledCourses = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp 2024",
    instructor: "Sarah Johnson",
    thumbnailUrl: "/images/course-web-dev.jpg",
    progress: 65,
    totalLessons: 48,
    completedLessons: 31,
    currentLesson: {
      id: "lesson-32",
      title: "Building REST APIs with Node.js",
      duration: "18:42",
    },
    lastAccessed: "2 hours ago",
    category: "Development",
  },
  {
    id: "2",
    title: "UI/UX Design Fundamentals",
    instructor: "Michael Chen",
    thumbnailUrl: "/images/course-ui-design.jpg",
    progress: 30,
    totalLessons: 32,
    completedLessons: 10,
    currentLesson: {
      id: "lesson-11",
      title: "Color Theory for Digital Interfaces",
      duration: "14:20",
    },
    lastAccessed: "Yesterday",
    category: "Design",
  },
  {
    id: "3",
    title: "Python for Data Science & Machine Learning",
    instructor: "Emily Rodriguez",
    thumbnailUrl: "/images/course-data-science.jpg",
    progress: 10,
    totalLessons: 56,
    completedLessons: 6,
    currentLesson: {
      id: "lesson-7",
      title: "Introduction to Pandas",
      duration: "22:15",
    },
    lastAccessed: "3 days ago",
    category: "Data Science",
  },
  {
    id: "4",
    title: "Digital Marketing Masterclass",
    instructor: "Alex Thompson",
    thumbnailUrl: "/images/course-marketing.jpg",
    progress: 100,
    totalLessons: 24,
    completedLessons: 24,
    currentLesson: {
      id: "lesson-24",
      title: "Building Your Marketing Strategy",
      duration: "16:30",
    },
    lastAccessed: "1 week ago",
    category: "Marketing",
  },
];

import { useAuth } from "@/contexts/auth-context";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [progressData, setProgressData] = useState<any[]>([]);
  const [isProgressLoading, setIsProgressLoading] = useState(true);

  // Fetch real progress from MongoDB
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await fetch("/api/progress/me");
        if (res.ok) {
          const data = await res.json();
          setProgressData(data);
        }
      } catch (error) {
        console.error("Failed to fetch progress:", error);
      } finally {
        setIsProgressLoading(false);
      }
    };

    if (user) {
      fetchProgress();
    }
  }, [user]);



  // Helper to map DB progress to UI course format
  const mappedCourses = progressData.map(p => {
    const courseInfo = MOCK_COURSES.find(c => c.id === p.courseId);
    return {
      id: p.courseId,
      title: courseInfo?.title || "Course Learning",
      instructor: courseInfo?.instructorName || "Air G Instructor",
      thumbnailUrl: courseInfo?.thumbnailUrl || "/images/course-web-dev.jpg",
      progress: p.percentComplete,
      totalLessons: courseInfo?.totalLessons || 10,
      completedLessons: p.completedLessons.length,
      currentLesson: {
        id: p.completedLessons.length > 0 ? p.completedLessons[p.completedLessons.length - 1] : "intro",
        title: "Continue with your next lesson",
        duration: "10:00"
      },
      lastAccessed: new Date(p.lastAccessed).toLocaleDateString(),
      category: courseInfo?.category || "Professional Development"
    };
  });

  // Filter courses based on search and tab
  const filteredCourses = mappedCourses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "in-progress" && course.progress < 100) ||
      (activeTab === "completed" && course.progress === 100);
    return matchesSearch && matchesTab;
  });

  // Get most recent course for continue watching (include 0% progress)
  const continueWatchingCourse = mappedCourses.length > 0 ? mappedCourses[0] : null;

  // Calculate stats
  const stats = {
    enrolledCourses: mappedCourses.length,
    completedCourses: mappedCourses.filter((c) => c.progress === 100).length,
    totalHoursLearned: Math.floor(mappedCourses.reduce((acc, c) => acc + (c.progress * 0.1), 0)), // Mock logic for hours
    currentStreak: mappedCourses.length > 0 ? 1 : 0,
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  if (authLoading || isProgressLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 flex-col items-center justify-center p-4 text-center">
          <h2 className="text-2xl font-bold">Please log in to view your dashboard</h2>
          <Button asChild className="mt-4">
            <Link href="/auth">Go to Login</Link>
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="border-b bg-card">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary text-xl text-primary-foreground">
                    {getInitials(user.displayName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold">Welcome back, {user.displayName || 'User'}!</h1>
                  <p className="text-muted-foreground">
                    Ready to continue your learning journey?
                  </p>
                </div>
              </div>
              <Button asChild>
                <Link href="/#courses">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Browse More Courses
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
          <DashboardStats {...stats} />

          <ContinueWatching course={continueWatchingCourse || null} />

          <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold">My Courses</h2>
              <div className="flex items-center gap-3">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <div className="flex overflow-hidden rounded-lg border">
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className="rounded-none"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className="rounded-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">
                  All ({mappedCourses.length})
                </TabsTrigger>
                <TabsTrigger value="in-progress">
                  In Progress (
                  {mappedCourses.filter((c) => c.progress < 100).length})
                </TabsTrigger>
                <TabsTrigger value="completed">
                  Completed (
                  {mappedCourses.filter((c) => c.progress === 100).length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-6">
                {filteredCourses.length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
                    <BookOpen className="h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold">No courses found</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {searchQuery
                        ? "Try a different search term"
                        : "Start learning by enrolling in a course"}
                    </p>
                    <Button asChild className="mt-4">
                      <Link href="/#courses">Browse Courses</Link>
                    </Button>
                  </div>
                ) : viewMode === "grid" ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredCourses.map((course) => (
                      <EnrolledCourseCard key={course.id} course={course} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredCourses.map((course) => (
                      <EnrolledCourseCard
                        key={course.id}
                        course={course}
                        variant="compact"
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
