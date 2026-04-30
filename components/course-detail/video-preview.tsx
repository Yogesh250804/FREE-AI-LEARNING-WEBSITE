"use client"

import { useState } from "react"
import { Play } from "lucide-react"
import Image from "next/image"
import { useCourse } from "@/hooks/use-courses"
import { Skeleton } from "@/components/ui/skeleton"
import { AI_MASTERY_COURSE } from "@/lib/ai-mastery-data"
import { YouTubePlayer } from "@/components/youtube-player"

function getYouTubeId(url: string) {
  if (!url) return null;
  const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

export function VideoPreview({ courseId }: { courseId: string }) {
  const { course, isLoading } = useCourse(courseId)
  const [isPlaying, setIsPlaying] = useState(false)
  const isAiMastery = courseId === "ai-mastery-class-10"
  
  if (isLoading) {
    return <Skeleton className="aspect-video w-full rounded-xl" />
  }

  const thumbnailUrl = course?.thumbnailUrl || (isAiMastery ? AI_MASTERY_COURSE.thumbnailUrl : "/images/course-web-dev.jpg")
  const previewVideoId = getYouTubeId(course?.videoUrl || "") || (isAiMastery ? AI_MASTERY_COURSE.sections[0].lessons[0].videoId : "dQw4w9WgXcQ")
  const title = course?.title || (isAiMastery ? AI_MASTERY_COURSE.title : "Course preview")


  return (
    <div className="mb-8">
      <div className="relative aspect-video overflow-hidden rounded-xl bg-secondary">
        {!isPlaying ? (
          <>
            <Image
              src={thumbnailUrl}
              alt={title}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(true)}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-card/90 text-primary shadow-lg transition-transform hover:scale-110"
                aria-label="Play preview"
              >
                <Play className="h-8 w-8 ml-1" fill="currentColor" />
              </button>
            </div>
            <div className="absolute bottom-4 left-4 rounded-md bg-foreground/80 px-3 py-1 text-sm font-medium text-background">
              Preview this course
            </div>
          </>
        ) : (
          <div className="h-full">
            <YouTubePlayer
              videoId={previewVideoId || "dQw4w9WgXcQ"}
              title={title}
            />
          </div>
        )}
      </div>
    </div>
  )
}
