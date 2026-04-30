"use client";

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import {
  PlayCircle,
  FileText,
  Download,
  Infinity,
  Award,
  Smartphone,
  Heart,
  Share2,
  Gift,
} from "lucide-react"
import { AI_MASTERY_COURSE } from "@/lib/ai-mastery-data"

const defaultFeatures = [
  { icon: PlayCircle, text: "42 hours on-demand video" },
  { icon: FileText, text: "45 articles" },
  { icon: Download, text: "85 downloadable resources" },
  { icon: Smartphone, text: "Access on mobile and TV" },
  { icon: Infinity, text: "Full lifetime access" },
  { icon: Award, text: "Certificate of completion" },
]

const aiFeatures = [
  { icon: PlayCircle, text: "10 hours high-quality video content" },
  { icon: FileText, text: "12 detailed modules" },
  { icon: Download, text: "Interactive AI Practical Labs" },
  { icon: Smartphone, text: "Learn on mobile and desktop" },
  { icon: Infinity, text: "Unrestricted lifetime access" },
  { icon: Award, text: "Certificate of AI Achievement" },
]

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useState, useEffect } from "react"
import { useCourse } from "@/hooks/use-courses"
import { Skeleton } from "@/components/ui/skeleton"

export function CourseSidebar({ courseId }: { courseId: string }) {
  const { course, isLoading } = useCourse(courseId)
  const isAiMastery = courseId === "ai-mastery-class-10"
  const { user } = useAuth()
  const router = useRouter()
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [isEnrolling, setIsEnrolling] = useState(false)

  // Check if user is already enrolled
  useEffect(() => {
    const checkEnrollment = async () => {
      if (user) {
        try {
          const res = await fetch("/api/progress/me")
          if (res.ok) {
            const progress = await res.json()
            const enrolled = progress.some((p: any) => p.courseId === courseId)
            setIsEnrolled(enrolled)
          }
        } catch (error) {
          console.error("Failed to check enrollment:", error)
        }
      }
    }
    checkEnrollment()
  }, [user, courseId])

  const handleEnroll = async () => {
    if (!user) {
      toast.error("Please log in to enroll")
      router.push("/auth?mode=login")
      return
    }

    if (isEnrolled) {
      // If already enrolled, just scroll to content or stay here
      const content = document.getElementById("course-content")
      if (content) {
        content.scrollIntoView({ behavior: "smooth" })
      } else {
        toast.info("You are already enrolled in this course!")
      }
      return
    }

    setIsEnrolling(true)
    try {
      const res = await fetch("/api/progress/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId,
          percentComplete: 0
        }),
      })

      if (res.ok) {
        setIsEnrolled(true)
        toast.success("Successfully enrolled in the course!")
      } else {
        throw new Error("Failed to enroll")
      }
    } catch (error) {
      toast.error("Failed to enroll. Please try again.")
    } finally {
      setIsEnrolling(false)
    }
  }

  if (isLoading) {
    return <Skeleton className="h-[400px] w-full rounded-xl" />
  }

  const duration = course?.duration || (isAiMastery ? "10 hours" : "42 hours")
  const lessons = course?.totalLessons || (isAiMastery ? 12 : 45)

  const activeFeatures = isAiMastery ? aiFeatures : [
    { icon: PlayCircle, text: `${duration} on-demand video` },
    { icon: FileText, text: `${lessons} lessons` },
    { icon: Download, text: "Downloadable resources" },
    { icon: Smartphone, text: "Access on mobile and TV" },
    { icon: Infinity, text: "Full lifetime access" },
    { icon: Award, text: "Certificate of completion" },
  ]

  return (
    <div className="lg:sticky lg:top-24">
      <Card className="overflow-hidden shadow-lg">
        <CardContent className="p-6">
          {/* Enroll Button */}
          <Button 
            className="w-full mb-3 h-12 text-base font-semibold" 
            onClick={handleEnroll}
            disabled={isEnrolling}
          >
            {isEnrolling ? "Enrolling..." : isEnrolled ? "Continue Learning" : "Enroll Now"}
          </Button>
          
          <Button variant="outline" className="w-full mb-4 h-12 text-base">
            Add to Wishlist
          </Button>

          <p className="text-center text-sm text-muted-foreground mb-6">
            Instant access after enrollment
          </p>

          {/* Course Includes */}
          <div className="mb-6">
            <h3 className="font-semibold text-foreground mb-3">This course includes:</h3>
            <ul className="space-y-3">
              {activeFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-sm text-foreground">
                  <feature.icon className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Links */}
          <div className="flex items-center justify-between border-t border-border pt-4">
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Share2 className="h-4 w-4" />
              Share
            </button>
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Gift className="h-4 w-4" />
              Gift this course
            </button>
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Heart className="h-4 w-4" />
              Wishlist
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Coupon */}
      <Card className="mt-4">
        <CardContent className="p-4">
          <p className="text-sm font-medium text-foreground mb-2">Apply Coupon</p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter coupon"
              className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Button variant="secondary">Apply</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
