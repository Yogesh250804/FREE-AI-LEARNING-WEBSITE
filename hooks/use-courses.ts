"use client";

import useSWR from "swr";
import {
  getCourses,
  getCourseById,
  getCoursesByCategory,
  getFeaturedCourses,
  getLessons,
  searchCourses,
} from "@/lib/course-service";
import type { Course, Lesson } from "@/lib/firestore-types";

// Fetcher functions for SWR
const fetchCourses = async (): Promise<Course[]> => {
  return getCourses();
};

const fetchCourseById = async (id: string): Promise<Course | null> => {
  return getCourseById(id);
};

const fetchLessonsByCourseId = async (id: string): Promise<Lesson[]> => {
  return getLessons(id);
};

const fetchCoursesByCategory = async (category: string): Promise<Course[]> => {
  return getCoursesByCategory(category);
};

const fetchFeaturedCourses = async (): Promise<Course[]> => {
  return getFeaturedCourses();
};

// Hook to fetch all courses
export function useCourses() {
  const { data, error, isLoading, mutate } = useSWR<Course[]>(
    "courses",
    fetchCourses,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1 minute
    }
  );

  return {
    courses: data ?? [],
    isLoading,
    isError: error,
    mutate,
  };
}

// Hook to fetch a single course
export function useCourse(courseId: string | null) {
  const { data, error, isLoading, mutate } = useSWR<Course | null>(
    courseId ? `course-${courseId}` : null,
    () => (courseId ? fetchCourseById(courseId) : null),
    {
      revalidateOnFocus: false,
    }
  );

  return {
    course: data,
    isLoading,
    isError: error,
    mutate,
  };
}

// Hook to fetch lessons for a course
export function useLessons(courseId: string | null) {
  const { data, error, isLoading, mutate } = useSWR<Lesson[]>(
    courseId ? `lessons-${courseId}` : null,
    () => (courseId ? fetchLessonsByCourseId(courseId) : []),
    {
      revalidateOnFocus: false,
    }
  );

  return {
    lessons: data ?? [],
    isLoading,
    isError: error,
    mutate,
  };
}

// Hook to fetch courses by category
export function useCoursesByCategory(category: string | null) {
  const { data, error, isLoading, mutate } = useSWR<Course[]>(
    category ? `courses-category-${category}` : null,
    () => (category ? fetchCoursesByCategory(category) : []),
    {
      revalidateOnFocus: false,
    }
  );

  return {
    courses: data ?? [],
    isLoading,
    isError: error,
    mutate,
  };
}

// Hook to fetch featured courses
export function useFeaturedCourses() {
  const { data, error, isLoading, mutate } = useSWR<Course[]>(
    "featured-courses",
    fetchFeaturedCourses,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  return {
    courses: data ?? [],
    isLoading,
    isError: error,
    mutate,
  };
}

// Hook for searching courses
export function useSearchCourses(searchTerm: string) {
  const { data, error, isLoading, mutate } = useSWR<Course[]>(
    searchTerm ? `search-${searchTerm}` : null,
    () => (searchTerm ? searchCourses(searchTerm) : []),
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    }
  );

  return {
    courses: data ?? [],
    isLoading,
    isError: error,
    mutate,
  };
}
