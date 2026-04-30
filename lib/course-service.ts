import {
  isFirebaseConfigured,
} from "./firebase";
import type { Course, CourseInput, Lesson } from "./firestore-types";

// Collection reference name (kept for localStorage key)
const COURSES_STORAGE_KEY = "local_courses";

// Mock data for fallback (YouTube courses)
export const MOCK_COURSES: Course[] = [
  {
    id: "mock-ai-mastery",
    title: "AI Mastery with Python (CS50)",
    description: "Learn the foundations of artificial intelligence and machine learning using Python. This course explores the concepts and algorithms that foundation modern AI.",
    videoUrl: "https://www.youtube.com/watch?v=5NgNicANyqM",
    thumbnailUrl: "https://img.youtube.com/vi/5NgNicANyqM/hqdefault.jpg",
    price: 0,
    originalPrice: 99,
    instructorId: "youtube-cs50",
    instructorName: "Harvard CS50",
    category: "Artificial Intelligence",
    level: "intermediate",
    duration: "12h 45m",
    totalLessons: 7,
    rating: 4.9,
    reviewCount: 15420,
    studentCount: 85000,
    tags: ["AI", "Python", "Machine Learning"],
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "mock-nextjs",
    title: "Next.js 14 Full Stack Development",
    description: "Master the latest Next.js 14 features including App Router, Server Actions, and Data Fetching. Build a full-stack application from scratch.",
    videoUrl: "https://www.youtube.com/watch?v=wm5gMKuwSYk",
    thumbnailUrl: "https://img.youtube.com/vi/wm5gMKuwSYk/hqdefault.jpg",
    price: 0,
    originalPrice: 49,
    instructorId: "youtube-jsmastery",
    instructorName: "JavaScript Mastery",
    category: "Web Development",
    level: "beginner",
    duration: "8h 15m",
    totalLessons: 12,
    rating: 4.8,
    reviewCount: 8900,
    studentCount: 45000,
    tags: ["Next.js", "React", "Full Stack"],
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "mock-uiux",
    title: "Modern UI/UX Design Fundamentals",
    description: "Learn the principles of modern UI/UX design. Master color theory, typography, and layout to create stunning user interfaces.",
    videoUrl: "https://www.youtube.com/watch?v=68w2VwalD5w",
    thumbnailUrl: "https://img.youtube.com/vi/68w2VwalD5w/hqdefault.jpg",
    price: 0,
    originalPrice: 29,
    instructorId: "youtube-designcourse",
    instructorName: "DesignCourse",
    category: "Design",
    level: "beginner",
    duration: "5h 30m",
    totalLessons: 10,
    rating: 4.7,
    reviewCount: 5600,
    studentCount: 22000,
    tags: ["UI/UX", "Design", "Figma"],
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "mock-datascience",
    title: "Data Science for Beginners",
    description: "Start your journey into Data Science. Learn NumPy, Pandas, Matplotlib, and Scikit-Learn to analyze data and build models.",
    videoUrl: "https://www.youtube.com/watch?v=rfscVS0vtbw",
    thumbnailUrl: "https://img.youtube.com/vi/rfscVS0vtbw/hqdefault.jpg",
    price: 0,
    originalPrice: 79,
    instructorId: "youtube-freecodecamp",
    instructorName: "freeCodeCamp",
    category: "Data Science",
    level: "beginner",
    duration: "10h 20m",
    totalLessons: 15,
    rating: 4.9,
    reviewCount: 21000,
    studentCount: 120000,
    tags: ["Data Science", "Python", "Analysis"],
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

// Helper to get merged courses (Static + Local Storage)
function getMergedCourses(): Course[] {
  if (typeof window === "undefined") return MOCK_COURSES;
  
  const localCoursesJson = localStorage.getItem(COURSES_STORAGE_KEY);
  const localCourses: Course[] = localCoursesJson ? JSON.parse(localCoursesJson) : [];
  
  return [...MOCK_COURSES, ...localCourses];
}

// Get all published courses
export async function getCourses(maxResults?: number): Promise<Course[]> {
  const allCourses = getMergedCourses().filter(c => c.published);
  return allCourses.slice(0, maxResults || 20);
}

// Get courses by category
export async function getCoursesByCategory(category: string): Promise<Course[]> {
  return getMergedCourses().filter(c => c.category === category && c.published);
}

// Get a single course by ID
export async function getCourseById(courseId: string): Promise<Course | null> {
  return getMergedCourses().find(c => c.id === courseId) || null;
}

// Get lessons for a course
export async function getLessons(courseId: string): Promise<Lesson[]> {
  return generateMockLessons(courseId);
}

// Helper to generate mock lessons based on course ID
function generateMockLessons(courseId: string): Lesson[] {
  const courses = getMergedCourses();
  const course = courses.find(c => c.id === courseId);
  const titlePrefix = course ? course.title.split(' ')[0] : "Lesson";
  const count = course?.totalLessons || 5;
  
  return Array.from({ length: count }, (_, i) => ({
    id: `lesson-${i + 1}`,
    title: `${titlePrefix} Module ${i + 1}: ${getMockLessonTitle(i)}`,
    description: "Learn essential concepts in this module.",
    videoUrl: course?.videoUrl || "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    duration: `${Math.floor(Math.random() * 20) + 10}:00`,
    order: i + 1,
    isFree: i === 0,
  }));
}

function getMockLessonTitle(index: number): string {
  const titles = [
    "Introduction and Overview", "Fundamental Concepts", "Setting Up the Environment",
    "Deep Dive into Core Principles", "Hands-on Practical Exercise", "Advanced Techniques",
    "Troubleshooting and Best Practices", "Real-world Application Case Study",
    "Future Trends and Innovations", "Course Summary and Next Steps"
  ];
  return titles[index % titles.length];
}

// Search courses
export async function searchCourses(searchTerm: string): Promise<Course[]> {
  const term = searchTerm.toLowerCase();
  return getMergedCourses().filter(c => 
    c.published && 
    (c.title.toLowerCase().includes(term) || c.description.toLowerCase().includes(term))
  );
}

// Get featured courses
export async function getFeaturedCourses(maxResults = 4): Promise<Course[]> {
  const featured = getMergedCourses()
    .filter(c => c.published)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, maxResults);
    
  return featured;
}

// Administrative functions
export async function createCourse(courseData: CourseInput): Promise<string | null> {
  const id = `local-${Math.random().toString(36).substring(2, 9)}`;
  const newCourse: Course = {
    ...courseData,
    id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const localCoursesJson = localStorage.getItem(COURSES_STORAGE_KEY);
  const localCourses: Course[] = localCoursesJson ? JSON.parse(localCoursesJson) : [];
  
  localCourses.push(newCourse);
  localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(localCourses));
  
  return id;
}

export async function updateCourse(courseId: string, courseData: Partial<CourseInput>): Promise<boolean> {
  const localCoursesJson = localStorage.getItem(COURSES_STORAGE_KEY);
  if (!localCoursesJson) return false;

  let localCourses: Course[] = JSON.parse(localCoursesJson);
  const index = localCourses.findIndex(c => c.id === courseId);
  
  if (index === -1) return false;

  localCourses[index] = { 
    ...localCourses[index], 
    ...courseData, 
    updatedAt: new Date().toISOString() 
  };
  
  localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(localCourses));
  return true;
}

export async function deleteCourse(courseId: string): Promise<boolean> {
  const localCoursesJson = localStorage.getItem(COURSES_STORAGE_KEY);
  if (!localCoursesJson) return false;

  let localCourses: Course[] = JSON.parse(localCoursesJson);
  const filteredCourses = localCourses.filter(c => c.id !== courseId);
  
  if (filteredCourses.length === localCourses.length) return false;

  localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(filteredCourses));
  return true;
}
