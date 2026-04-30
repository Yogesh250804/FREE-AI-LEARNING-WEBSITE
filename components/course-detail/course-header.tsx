"use client";

import { Badge } from "@/components/ui/badge"
import { Star, Users, Clock, BarChart } from "lucide-react"
import Image from "next/image"
import { AI_MASTERY_COURSE } from "@/lib/ai-mastery-data"

import { useCourse } from "@/hooks/use-courses"
import { Skeleton } from "@/components/ui/skeleton"

export function CourseHeader({ courseId }: { courseId: string }) {
  const { course, isLoading } = useCourse(courseId)
  const isAiMastery = courseId === "ai-mastery-class-10"
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    )
  }

  const title = course?.title || (isAiMastery ? AI_MASTERY_COURSE.title : "Complete Web Development Bootcamp 2024")
  const description = course?.description || (isAiMastery ? AI_MASTERY_COURSE.description : "Master HTML, CSS, JavaScript, React, Node.js, and more. Build real-world projects and become a full-stack developer.")
  const instructor = course?.instructorName || (isAiMastery ? AI_MASTERY_COURSE.instructor : "Sarah Johnson")
  const rating = course?.rating || (isAiMastery ? AI_MASTERY_COURSE.rating : 4.8)
  const reviewCount = course?.reviewCount || (isAiMastery ? AI_MASTERY_COURSE.reviewCount : 12456)
  const studentCount = course?.studentCount || (isAiMastery ? AI_MASTERY_COURSE.studentCount : 54321)
  const duration = course?.duration || (isAiMastery ? AI_MASTERY_COURSE.duration : "42 hours")
  const category = course?.category || (isAiMastery ? AI_MASTERY_COURSE.category : "Development")


  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {isAiMastery ? (
          <Badge className="bg-primary text-primary-foreground">AI Curriculum</Badge>
        ) : (
          <Badge className="bg-accent text-accent-foreground">Bestseller</Badge>
        )}
        <Badge variant="secondary">{category}</Badge>
      </div>
      
      <h1 className="text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl text-balance">
        {title}
      </h1>
      
      <p className="mt-3 text-lg text-muted-foreground text-pretty">
        {description}
      </p>
      
      {/* Ratings and Stats */}
      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
        <div className="flex items-center gap-1">
          <span className="font-semibold text-foreground">{rating}</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
              />
            ))}
          </div>
          <span className="text-muted-foreground">({reviewCount.toLocaleString()} ratings)</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{studentCount.toLocaleString()} students</span>
        </div>
      </div>
      
      {/* Instructor */}
      <div className="mt-4 flex items-center gap-3">
        <Image
          src="/images/instructor.jpg"
          alt="Instructor"
          width={48}
          height={48}
          className="rounded-full object-cover"
        />
        <div>
          <p className="text-sm text-muted-foreground">Created by</p>
          <p className="font-medium text-foreground hover:text-primary cursor-pointer transition-colors">
            {instructor}
          </p>
        </div>
      </div>
      
      {/* Meta Info */}
      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{duration} total</span>
        </div>
        <div className="flex items-center gap-1">
          <BarChart className="h-4 w-4" />
          <span>{isAiMastery ? "Beginner friendly" : "All Levels"}</span>
        </div>
        <span>Last updated March 2024</span>
      </div>
    </div>
  )
}
