"use client";

import { use } from "react";
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CourseHeader } from "@/components/course-detail/course-header"
import { VideoPreview } from "@/components/course-detail/video-preview"
import { CourseDescription } from "@/components/course-detail/course-description"
import { LessonsList } from "@/components/course-detail/lessons-list"
import { CourseSidebar } from "@/components/course-detail/course-sidebar"

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const isAiMastery = id === "ai-mastery-class-10";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <CourseHeader courseId={id} />
              <VideoPreview courseId={id} />
              <CourseDescription courseId={id} />
              <div id="course-content">
                <LessonsList courseId={id} />
              </div>
            </div>
            
            {/* Sidebar with Enroll Button */}
            <div className="lg:col-span-1">
              <CourseSidebar courseId={id} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
