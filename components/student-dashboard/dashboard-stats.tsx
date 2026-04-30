"use client";

import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Clock, Award, TrendingUp } from "lucide-react";

interface DashboardStatsProps {
  enrolledCourses: number;
  completedCourses: number;
  totalHoursLearned: number;
  currentStreak: number;
}

export function DashboardStats({
  enrolledCourses,
  completedCourses,
  totalHoursLearned,
  currentStreak,
}: DashboardStatsProps) {
  const stats = [
    {
      label: "Enrolled Courses",
      value: enrolledCourses,
      icon: BookOpen,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Completed",
      value: completedCourses,
      icon: Award,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      label: "Hours Learned",
      value: totalHoursLearned,
      icon: Clock,
      color: "text-chart-1",
      bgColor: "bg-chart-1/10",
    },
    {
      label: "Day Streak",
      value: currentStreak,
      icon: TrendingUp,
      color: "text-chart-4",
      bgColor: "bg-chart-4/10",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="flex items-center gap-4 p-5">
            <div className={`rounded-lg p-3 ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
