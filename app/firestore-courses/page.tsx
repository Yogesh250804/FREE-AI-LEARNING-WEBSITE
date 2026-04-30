"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FirestoreCoursesList } from "@/components/firestore-courses-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function CoursesContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(categoryParam);

  return (
    <main className="flex-1">
      {/* Header */}
      <section className="bg-primary/5 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-black tracking-tight">
            {activeCategory ? `Explore ${activeCategory}` : "Browse All Courses"}
          </h1>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            {activeCategory 
              ? `Master your skills in ${activeCategory} with our expert-led tracks.`
              : "Discover world-class technical education, project-based and free forever."}
          </p>

          <div className="mx-auto mt-8 flex max-w-xl gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 rounded-xl"
              />
            </div>
            <Button className="h-12 px-6 rounded-xl font-bold">Search</Button>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <FirestoreCoursesList category={activeCategory || undefined} />
        </div>
      </section>
    </main>
  );
}

export default function FirestoreCoursesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <Suspense fallback={<div className="flex-1 flex items-center justify-center">Loading...</div>}>
        <CoursesContent />
      </Suspense>
      <Footer />
    </div>
  );
}
