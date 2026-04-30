"use client";

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Clock, Users, ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

import { useFeaturedCourses } from "@/hooks/use-courses"
import { Skeleton } from "@/components/ui/skeleton"

import { useLanguage } from "@/contexts/language-context"

export function FeaturedCourses() {
  const { t } = useLanguage()
  const { courses, isLoading } = useFeaturedCourses()

  const displayCourses = courses || []

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section className="bg-transparent py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              {t('featured_title')}
            </h2>
            <p className="mt-2 text-lg text-muted-foreground text-pretty">
              {t('featured_desc')}
            </p>
          </div>
          <Button variant="outline" className="shrink-0 group" asChild>
            <Link href="/firestore-courses">
              {t('view_all')}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[4/5] rounded-xl" />
            ))
          ) : displayCourses.length > 0 ? (
            displayCourses.map((course) => (
              <div key={course.id} className="block group">
                <Link href={`/courses/${course.id}`} className="block group">
                  <Card
                    className="overflow-hidden transition-all duration-300 hover:shadow-2xl border-border h-full bg-card/50 backdrop-blur-sm"
                  >
                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={course.thumbnailUrl || "/images/course-placeholder.jpg"}
                        alt={course.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {course.category && (
                        <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground">
                          {course.category}
                        </Badge>
                      )}
                    </div>

                    <CardContent className="p-4">
                      <h3 className="line-clamp-2 font-semibold text-card-foreground group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">{course.instructorName}</p>

                      {/* Rating */}
                      <div className="mt-3 flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          <span className="font-semibold text-card-foreground">{course.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ({course.reviewCount.toLocaleString()} {t('reviews')})
                        </span>
                      </div>

                      {/* Meta Info */}
                      <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{(course.studentCount / 1000).toFixed(0)}K</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className="text-muted-foreground">No featured courses available at the moment. Please check back later!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

