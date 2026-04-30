"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, BookOpen, CheckCircle2 } from "lucide-react";

interface EnrolledCourse {
  id: string;
  title: string;
  instructor: string;
  thumbnailUrl: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  currentLesson: {
    id: string;
    title: string;
    duration: string;
  };
  lastAccessed: string;
  category: string;
}

interface EnrolledCourseCardProps {
  course: EnrolledCourse;
  variant?: "default" | "compact";
}

export function EnrolledCourseCard({ course, variant = "default" }: EnrolledCourseCardProps) {
  const isCompleted = course.progress === 100;

  if (variant === "compact") {
    return (
      <Card className="overflow-hidden transition-shadow hover:shadow-md">
        <CardContent className="p-0">
          <div className="flex gap-4">
            <div className="relative h-24 w-36 flex-shrink-0">
              <Image
                src={course.thumbnailUrl}
                alt={course.title}
                fill
                className="object-cover"
              />
              {isCompleted && (
                <div className="absolute inset-0 flex items-center justify-center bg-foreground/60">
                  <CheckCircle2 className="h-8 w-8 text-accent" />
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col justify-center gap-2 py-3 pr-4">
              <h4 className="line-clamp-1 font-medium">{course.title}</h4>
              <p className="text-sm text-muted-foreground">by {course.instructor}</p>
              <div className="flex items-center gap-3">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  {course.progress}%
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <div className="relative aspect-video w-full">
        <Image
          src={course.thumbnailUrl}
          alt={course.title}
          fill
          className="object-cover"
        />
        {isCompleted ? (
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/60">
            <div className="flex flex-col items-center gap-2 text-card">
              <CheckCircle2 className="h-12 w-12 text-accent" />
              <span className="font-medium">Completed</span>
            </div>
          </div>
        ) : (
          <Link
            href={`/courses/${course.id}/lesson/${course.currentLesson.id}`}
            className="absolute inset-0 flex items-center justify-center bg-foreground/40 opacity-0 transition-opacity hover:opacity-100"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-card shadow-lg">
              <Play className="h-6 w-6 fill-primary text-primary" />
            </div>
          </Link>
        )}
        <Badge className="absolute right-3 top-3 bg-card/90 text-card-foreground backdrop-blur-sm">
          {course.category}
        </Badge>
      </div>
      <CardContent className="space-y-4 p-5">
        <div>
          <h3 className="line-clamp-2 text-lg font-semibold leading-tight">
            {course.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">by {course.instructor}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {course.completedLessons} of {course.totalLessons} lessons
            </span>
            <span className="font-medium">{course.progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${course.progress}%` }}
            />
          </div>
        </div>

        {!isCompleted && (
          <div className="rounded-lg border bg-muted/50 p-3">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Continue with
            </p>
            <div className="mt-1 flex items-center justify-between">
              <p className="line-clamp-1 text-sm font-medium">
                {course.currentLesson.title}
              </p>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {course.currentLesson.duration}
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <Button asChild className="flex-1 gap-2">
            <Link href={`/courses/${course.id}/lesson/${course.currentLesson.id}`}>
              <Play className="h-4 w-4" />
              {isCompleted ? "Watch Again" : "Continue Watching"}
            </Link>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <Link href={`/courses/${course.id}`}>
              <BookOpen className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Last accessed {course.lastAccessed}
        </p>
      </CardContent>
    </Card>
  );
}
