"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { 
  Users, 
  Target, 
  Lightbulb, 
  Rocket, 
  ShieldCheck, 
  Zap,
  ChevronRight,
  Heart,
  Globe,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation First",
    description: "We constantly push the boundaries of what's possible in online education using AI and interactive tech.",
    color: "bg-blue-500/10 text-blue-600"
  },
  {
    icon: Heart,
    title: "Student Centric",
    description: "Every feature we build and every course we curate is designed with the student's success as the priority.",
    color: "bg-red-500/10 text-red-600"
  },
  {
    icon: Globe,
    title: "Global Access",
    description: "We believe quality education should be accessible to anyone, anywhere, regardless of their background.",
    color: "bg-green-500/10 text-green-600"
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We don't settle for 'good enough'. We strive for the highest quality in our content and platform experience.",
    color: "bg-yellow-500/10 text-yellow-600"
  }
];

const stats = [
  { label: "Active Students", value: "1M+" },
  { label: "Expert Instructors", value: "500+" },
  { label: "Free Courses", value: "1,200+" },
  { label: "Countries Reached", value: "150+" }
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 -z-10" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
            <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-700" />
          </div>
          
          <div className="container px-4 mx-auto text-center space-y-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <Badge variant="outline" className="px-4 py-1 rounded-full border-primary/20 text-primary font-bold">
                ESTABLISHED 2024
              </Badge>
              <h1 className="text-5xl md:text-8xl font-black tracking-tight">
                Empowering the <br />
                <span className="text-primary italic">Next Generation</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                AIR G INTERNATIONAL is more than just a learning platform. We are a global movement dedicated to making world-class technical education free and accessible to everyone.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center gap-4"
            >
              <Button size="lg" className="h-14 px-8 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20" asChild>
                <Link href="/firestore-courses">Start Learning Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 rounded-2xl font-bold text-lg" asChild>
                <Link href="/contact">Partner with Us</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="py-12 border-y border-border bg-card/30">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center space-y-1"
                >
                  <p className="text-4xl md:text-5xl font-black text-primary">{stat.value}</p>
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="container px-4 mx-auto py-24">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="h-16 w-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <Target className="h-8 w-8" />
              </div>
              <h2 className="text-4xl font-black tracking-tight">Our Mission is <span className="text-primary italic">Universal</span> Mastery.</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                In a world rapidly evolving with AI and technology, the gap between those who can build and those who cannot is widening. Our mission is to close that gap by providing high-quality, project-based learning tracks in AI, Robotics, Web Development, and more.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe that education is the ultimate equalizer. By removing financial barriers, we empower millions of learners to transform their lives and their communities.
              </p>
              <div className="pt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <ShieldCheck className="h-5 w-5 text-primary" /> Verified Content
                </div>
                <div className="flex items-center gap-2 font-bold text-sm">
                  <Zap className="h-5 w-5 text-primary" /> AI-Powered Learning
                </div>
                <div className="flex items-center gap-2 font-bold text-sm">
                  <Users className="h-5 w-5 text-primary" /> Global Community
                </div>
                <div className="flex items-center gap-2 font-bold text-sm">
                  <Rocket className="h-5 w-5 text-primary" /> Rapid Upskilling
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-[3rem] bg-gradient-to-br from-primary/20 to-blue-500/20 border-2 border-dashed border-primary/30 flex items-center justify-center p-12 overflow-hidden relative group">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-700" />
                <div className="relative text-center space-y-4">
                  <div className="h-20 w-20 bg-background rounded-3xl shadow-2xl flex items-center justify-center mx-auto mb-6">
                    <Users className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-black">Together we grow.</h3>
                  <p className="text-sm text-muted-foreground font-medium">Join 1,000,000+ learners across the globe.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-muted/30 py-24">
          <div className="container px-4 mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-4xl font-black">Values that <span className="text-primary italic">define</span> us.</h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-lg">
                Our culture is built on core principles that guide how we build our platform and serve our community.
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              {values.map((value, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-card p-8 rounded-[2rem] shadow-xl border-2 border-transparent hover:border-primary/20 transition-all"
                >
                  <div className={`h-14 w-14 rounded-2xl ${value.color} flex items-center justify-center mb-6`}>
                    <value.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container px-4 mx-auto py-24">
          <div className="rounded-[4rem] bg-primary p-12 md:p-24 text-center text-white relative overflow-hidden group">
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_85%)]" />
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-6xl font-black tracking-tight">Be part of the <span className="italic underline decoration-white/30 underline-offset-8">Future</span>.</h2>
              <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
                We are always looking for passionate instructors, developers, and partners to join our mission.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Button size="lg" variant="secondary" className="h-16 px-10 text-xl font-black rounded-2xl shadow-2xl" asChild>
                  <Link href="/contact">Join the Team</Link>
                </Button>
                <Button size="lg" variant="outline" className="h-16 px-10 text-xl font-black rounded-2xl border-white text-white hover:bg-white hover:text-primary transition-all">
                  View Openings
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
