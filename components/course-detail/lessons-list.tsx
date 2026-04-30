"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { PlayCircle, FileText } from "lucide-react"
import { AI_MASTERY_COURSE } from "@/lib/ai-mastery-data"
import { useCourse, useLessons } from "@/hooks/use-courses"
import { Skeleton } from "@/components/ui/skeleton"

export function LessonsList({ courseId }: { courseId: string }) {
  const { course, isLoading: isCourseLoading } = useCourse(courseId)
  const { lessons, isLoading: isLessonsLoading } = useLessons(courseId)
  const isAiMastery = courseId === "ai-mastery-class-10"
  
  if (isCourseLoading || isLessonsLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    )
  }

  // Handle sections: AI Mastery has hardcoded sections, others use dynamic lessons
  const sections = isAiMastery ? AI_MASTERY_COURSE.sections : [
    {
      id: "main-section",
      title: "Course Modules",
      lessons: lessons.map(l => ({
        title: l.title,
        duration: l.duration,
        type: "video" as const
      }))
    }
  ]

  const handleLessonSelect = async (lessonId: string) => {
    try {
      // Calculate a rough percentage based on lesson index
      // In a more complex app, we'd know exactly how many lessons are in the course
      const currentProgress = Math.min(100, Math.floor(((lessons.findIndex(l => l.id === lessonId) + 1) / totalLessons) * 100));

      await fetch("/api/progress/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId,
          lessonId,
          percentComplete: currentProgress
        }),
      });
    } catch (error) {
      console.error("Failed to update progress:", error);
    }
  };

  const totalLessons = sections.reduce((acc, section) => acc + section.lessons.length, 0)
  const totalDuration = course?.duration || (isAiMastery ? AI_MASTERY_COURSE.duration : "42h")

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Course Content</h2>
        <p className="text-sm text-muted-foreground">
          {sections.length} sections &bull; {totalLessons} lessons &bull; {totalDuration} total
        </p>
      </div>

      <Accordion type="multiple" defaultValue={[sections[0].id]} className="rounded-xl border border-border overflow-hidden">
        {sections.map((section) => (
          <AccordionItem key={section.id} value={section.id} className="border-border">
            <AccordionTrigger className="px-4 py-3 bg-secondary/50 hover:bg-secondary hover:no-underline">
              <div className="flex flex-1 items-center justify-between pr-4">
                <span className="font-medium text-foreground text-left">{section.title}</span>
                <span className="text-sm text-muted-foreground">
                  {section.lessons.length} lessons
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-0">
              <ul className="divide-y divide-border">
                {section.lessons.map((lesson, index) => (
                  <li
                    key={index}
                    onClick={() => handleLessonSelect(lesson.id || `lesson-${index}`)}
                    className="flex items-center justify-between px-4 py-3 hover:bg-secondary/30 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      {lesson.type === "video" ? (
                        <PlayCircle className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      ) : (
                        <FileText className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      )}
                      <span className="text-sm text-foreground group-hover:underline">
                        {lesson.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{"duration" in lesson ? lesson.duration : ""}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
