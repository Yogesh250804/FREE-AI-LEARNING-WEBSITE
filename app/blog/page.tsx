"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { 
  Search, 
  Calendar, 
  Clock, 
  User, 
  ArrowRight,
  TrendingUp,
  Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const blogPosts = [
  {
    title: "The Future of AI in Education: Beyond the Hype",
    excerpt: "Exploring how Large Language Models are transforming the classroom and what it means for students and teachers.",
    category: "AI",
    author: "Dr. Sarah Chen",
    date: "April 24, 2024",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80"
  },
  {
    title: "Why Project-Based Learning is the Key to Mastery",
    excerpt: "Learn why building real-world projects is more effective than passive video watching for long-term skill retention.",
    category: "Learning",
    author: "Marco Rossi",
    date: "April 22, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80"
  },
  {
    title: "10 Next.js 14 Features You Should Be Using Today",
    excerpt: "A deep dive into Server Actions, App Router optimizations, and the new metadata API in Next.js 14.",
    category: "Web Dev",
    author: "Alex Rivera",
    date: "April 20, 2024",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80"
  },
  {
    title: "Building Your First Robotics Project on a Budget",
    excerpt: "You don't need thousands of dollars to start in robotics. Here's a list of affordable components and where to find them.",
    category: "Robotics",
    author: "James Wilson",
    date: "April 18, 2024",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
  }
];

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Featured Post */}
        <section className="bg-primary/5 py-24 overflow-hidden">
          <div className="container px-4 mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-2">
                  <Badge className="bg-primary text-white">FEATURED ARTICLE</Badge>
                  <span className="text-sm font-bold text-muted-foreground flex items-center gap-1"><TrendingUp className="h-3 w-3" /> Trending</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                  The <span className="text-primary italic">AI Revolution</span> in the Classroom.
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  How adaptive learning algorithms are creating personalized paths for millions of students worldwide, and why the human teacher is more important than ever.
                </p>
                <div className="flex items-center gap-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 border-2 border-primary" />
                    <div>
                      <p className="font-bold text-sm">Dr. Sarah Chen</p>
                      <p className="text-xs text-muted-foreground">Chief AI Officer</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" /> April 24, 2024
                  </div>
                </div>
                <Button size="lg" className="h-14 px-8 rounded-xl font-bold gap-2">
                  Read Full Story <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl"
              >
                <img 
                  src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80" 
                  alt="Featured" 
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="sticky top-[64px] z-30 bg-background/80 backdrop-blur-md border-b">
          <div className="container px-4 mx-auto py-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide w-full md:w-auto">
                {["All", "AI", "Web Dev", "Robotics", "Learning", "Career"].map((cat) => (
                  <Badge 
                    key={cat} 
                    variant={cat === "All" ? "default" : "outline"} 
                    className="rounded-full px-4 py-1.5 cursor-pointer hover:bg-primary hover:text-white transition-colors"
                  >
                    {cat}
                  </Badge>
                ))}
              </div>
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search articles..." className="pl-10 rounded-xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="container px-4 mx-auto py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-12">
            {blogPosts.map((post, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[16/9] rounded-[2rem] overflow-hidden mb-6">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-black backdrop-blur-sm border-none">{post.category}</Badge>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
                  </div>
                  <h3 className="text-3xl font-black leading-tight group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-muted" />
                      <span className="font-bold text-sm">{post.author}</span>
                    </div>
                    <Button variant="ghost" className="gap-2 font-bold group/btn">
                      Read More <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <Button variant="outline" size="lg" className="rounded-xl h-14 px-10 font-bold border-2">
              Load More Articles
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
