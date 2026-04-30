"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { AI_MASTERY_COURSE } from "@/lib/ai-mastery-data"

const defaultLearningPoints = [
  "Build 16+ real-world web development projects",
  "Master HTML5, CSS3, and modern JavaScript (ES6+)",
  "Learn React.js and build single-page applications",
  "Understand Node.js and Express for backend development",
  "Work with databases including MongoDB and PostgreSQL",
  "Deploy applications to production environments",
  "Best practices for responsive and accessible design",
  "Version control with Git and GitHub",
]

const aiLearningPoints = [
  "Understand the fundamentals of Artificial Intelligence",
  "Identify different Types of AI and their applications",
  "Master Machine Learning basics and algorithms",
  "Explore Neural Networks and how they mimic the brain",
  "Hands-on experience with Deep Learning concepts",
  "Learn about AI Ethics and social implications",
  "Practical AI lab exercises for real-world practice",
  "Prepare for Class 10 AI examinations with confidence",
]

const defaultRequirements = [
  "No programming experience needed - beginners welcome",
  "A computer with internet access (Windows, Mac, or Linux)",
  "Willingness to learn and practice consistently",
]

const aiRequirements = [
  "Basic knowledge of mathematics and logic",
  "A computer with internet access",
  "Curiosity about how intelligent systems work",
]

import { useCourse } from "@/hooks/use-courses"
import { Skeleton } from "@/components/ui/skeleton"

export function CourseDescription({ courseId }: { courseId: string }) {
  const [expanded, setExpanded] = useState(false)
  const { course, isLoading } = useCourse(courseId)
  const isAiMastery = courseId === "ai-mastery-class-10"
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-40 w-full rounded-xl" />
        <Skeleton className="h-60 w-full rounded-xl" />
      </div>
    )
  }

  const learningPoints = course?.tags?.map(t => `Master ${t} concepts and applications`) || (isAiMastery ? aiLearningPoints : defaultLearningPoints)
  const requirements = isAiMastery ? aiRequirements : defaultRequirements
  const description = course?.description || ""


  return (
    <div className="mb-8">
      {/* What You Will Learn */}
      <div className="rounded-xl border border-border bg-card p-6 mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          What you&apos;ll learn
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {learningPoints.map((point, index) => (
            <div key={index} className="flex gap-3">
              <Check className="h-5 w-5 shrink-0 text-accent" />
              <span className="text-sm text-foreground">{point}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Course Description */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Description</h2>
        <div className={`prose prose-sm max-w-none text-muted-foreground ${!expanded ? "line-clamp-6" : ""}`}>
          {description ? (
            <div dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, '<br/>') }} />
          ) : isAiMastery ? (
            <>
              <p>
                Welcome to the **Class 10 AI Mastery** course! This program is designed to give you a strong foundation in the world of Artificial Intelligence. Whether you are preparing for school exams or just curious about the future of technology, this course is for you.
              </p>
              <p className="mt-4">
                We start with the very basics: What is AI? How does it differ from traditional programming? From there, we move into the exciting realms of Machine Learning and Neural Networks, explaining complex concepts with simple, easy-to-understand analogies.
              </p>
              {expanded && (
                <>
                  <p className="mt-4">
                    Our course includes dedicated sessions on Deep Learning and practical labs where you can see AI in action. We also take a deep dive into AI Ethics, ensuring you understand the responsibilities that come with building intelligent systems.
                  </p>
                  <p className="mt-4">
                    By the end of this course, you will not only be prepared for your Class 10 AI (417) curriculum but also have a solid grasp of the technologies that are shaping the 21st century.
                  </p>
                </>
              )}
            </>
          ) : (
            <>
              <p>
                Welcome to the most comprehensive and beginner-friendly web development course on the platform. 
                Whether you&apos;re looking to change careers, start freelancing, or simply build your own projects, 
                this course will take you from complete beginner to confident developer.
              </p>
              <p className="mt-4">
                This course is constantly updated with the latest technologies and best practices. 
                You&apos;ll learn by building real projects that you can add to your portfolio. 
                We cover everything from the basics of HTML and CSS to advanced React patterns and backend development with Node.js.
              </p>
              {expanded && (
                <>
                  <p className="mt-4">
                    Our teaching approach focuses on practical, hands-on learning. Each concept is reinforced 
                    with coding exercises and projects. You&apos;ll have access to our supportive community where 
                    you can ask questions and get help from instructors and fellow students.
                  </p>
                  <p className="mt-4">
                    By the end of this course, you&apos;ll have the skills and confidence to apply for junior 
                    developer positions, take on freelance projects, or build your own web applications from scratch.
                  </p>
                </>
              )}
            </>
          )}
        </div>
        <Button
          variant="link"
          className="mt-2 h-auto p-0 text-primary"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show less" : "Show more"}
        </Button>
      </div>

      {/* Requirements */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Requirements</h2>
        <ul className="list-disc pl-5 text-muted-foreground">
          {requirements.map((req, index) => (
            <li key={index} className="mb-2 text-sm">{req}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
