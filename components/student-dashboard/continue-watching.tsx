"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Clock } from "lucide-react";

interface ContinueWatchingCourse {
  id: string;
  title: string;
  thumbnailUrl: string;
  currentLesson: {
    id: string;
    title: string;
    duration: string;
  };
  progress: number;
}

interface ContinueWatchingProps {
  course: ContinueWatchingCourse | null;
}

export function ContinueWatching({ course }: ContinueWatchingProps) {
  if (!course) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-muted p-4">
            <Play className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">No courses in progress</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Start a course to see it here
          </p>
          <Button asChild className="mt-4">
            <Link href="/#courses">Browse Courses</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Continue Watching</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="relative aspect-video w-full md:aspect-auto md:h-48 md:w-80">
            <Image
              src={course.thumbnailUrl}
              alt={course.title}
              fill
              className="object-cover"
            />
            <Link
              href={`/courses/${course.id}/lesson/${course.currentLesson.id}`}
              className="absolute inset-0 flex items-center justify-center bg-foreground/30 transition-colors hover:bg-foreground/40"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-card shadow-lg transition-transform hover:scale-105">
                <Play className="h-7 w-7 fill-primary text-primary" />
              </div>
            </Link>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary">
              <div
                className="h-full bg-primary"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-between p-5">
            <div>
              <h3 className="font-semibold">{course.title}</h3>
              <div className="mt-3 rounded-lg border bg-muted/50 p-3">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Next Lesson
                </p>
                <p className="mt-1 font-medium">{course.currentLesson.title}</p>
                <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {course.currentLesson.duration}
                </div>
              </div>
            </div>
            <Button asChild className="mt-4 gap-2">
              <Link href={`/courses/${course.id}/lesson/${course.currentLesson.id}`}>
                <Play className="h-4 w-4" />
                Continue Watching
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
