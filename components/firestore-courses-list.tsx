"use client";

import { useCourses, useFeaturedCourses, useCoursesByCategory } from "@/hooks/use-courses";
import { isFirebaseConfigured } from "@/lib/firebase";
import type { Course } from "@/lib/firestore-types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Star,
  Clock,
  Users,
  Play,
  AlertCircle,
  BookOpen,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Course Card Component
function CourseCard({ course }: { course: Course }) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-700";
      case "intermediate":
        return "bg-amber-100 text-amber-700";
      case "advanced":
        return "bg-red-100 text-red-700";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={course.thumbnailUrl || "/images/course-web-dev.jpg"}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90">
            <Play className="h-6 w-6 text-primary" fill="currentColor" />
          </div>
        </div>
        {course.rating >= 4.5 && (
          <Badge className="absolute left-3 top-3 bg-amber-500 text-white hover:bg-amber-600">
            Bestseller
          </Badge>
        )}
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 font-semibold leading-tight text-foreground">
            {course.title}
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">{course.instructorName}</p>
      </CardHeader>

      <CardContent className="space-y-3 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="font-medium text-foreground">{course.rating.toFixed(1)}</span>
          </div>
          <span className="text-sm text-muted-foreground">
            ({course.reviewCount.toLocaleString()} reviews)
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>{course.totalLessons} lessons</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{course.studentCount.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="secondary" className={getLevelColor(course.level)}>
            {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
          </Badge>
          <Badge variant="outline">{course.category}</Badge>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-end border-t pt-4">
        <Button asChild size="sm">
          <Link href={`/courses/${course.id}`}>View Course</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

// Loading Skeleton
function CourseCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-video w-full" />
      <CardHeader className="pb-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="mt-1 h-4 w-1/2" />
      </CardHeader>
      <CardContent className="space-y-3 pb-3">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-6 w-1/4" />
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="ml-auto h-9 w-24" />
      </CardFooter>
    </Card>
  );
}


// All Courses List
export function FirestoreCoursesList({ category }: { category?: string }) {
  const { courses: allCourses, isLoading: loadingAll, isError: errorAll } = useCourses();
  const { courses: categoryCourses, isLoading: loadingCat, isError: errorCat } = useCoursesByCategory(category || "");

  const courses = category ? categoryCourses : allCourses;
  const isLoading = category ? loadingCat : loadingAll;
  const isError = category ? errorCat : errorAll;


  if (isError) {
    return (
      <Card className="border-destructive/50 bg-destructive/10">
        <CardContent className="flex items-center gap-4 p-6">
          <AlertCircle className="h-6 w-6 text-destructive" />
          <p className="text-destructive">Error loading courses. Please try again later.</p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <CourseCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
          <BookOpen className="mb-4 h-12 w-12 text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground">No Courses Found</h3>
          <p className="text-sm text-muted-foreground">
            {category ? `There are no courses in the "${category}" category at the moment.` : "There are no courses available at the moment."}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}

// Featured Courses List
export function FeaturedCoursesList() {
  const { courses, isLoading, isError } = useFeaturedCourses();


  if (isError) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <CourseCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}

// Courses by Category
export function CoursesByCategoryList({ category }: { category: string }) {
  const { courses, isLoading, isError } = useCoursesByCategory(category);


  if (isError) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <CourseCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
          <BookOpen className="mb-4 h-12 w-12 text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground">No Courses in {category}</h3>
          <p className="text-sm text-muted-foreground">
            Check back later for courses in this category.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
