"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Coffee, 
  Zap, 
  Heart, 
  Star,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const jobs = [
  {
    title: "Senior AI Curriculum Developer",
    category: "Education",
    location: "Bangalore / Remote",
    type: "Full-time",
    salary: "₹25L - ₹40L"
  },
  {
    title: "Full Stack Engineer (Next.js)",
    category: "Engineering",
    location: "Remote",
    type: "Full-time",
    salary: "₹18L - ₹30L"
  },
  {
    title: "Student Success Manager",
    category: "Operations",
    location: "Mumbai",
    type: "Full-time",
    salary: "₹12L - ₹18L"
  },
  {
    title: "Content Marketing Lead",
    category: "Marketing",
    location: "Remote",
    type: "Full-time",
    salary: "₹15L - ₹25L"
  }
];

const benefits = [
  { icon: Zap, title: "Work with AI", desc: "Access to the latest LLMs and AI tools for your daily work." },
  { icon: Heart, title: "Health First", desc: "Comprehensive insurance for you and your dependent family." },
  { icon: Coffee, title: "Flexible Work", desc: "Work from anywhere in the world or our modern hubs." },
  { icon: Star, title: "Learning Fund", desc: "₹50k annual budget for your own personal growth." }
];

export default function CareersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary/5 py-24 text-center">
          <div className="container px-4 mx-auto space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-5xl md:text-7xl font-black tracking-tight">
                Build the <span className="text-primary italic">Future</span> of Learning.
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-6">
                Join a team of visionaries, educators, and engineers working to make quality education free for 100 million people.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Benefits */}
        <section className="container px-4 mx-auto py-20">
          <div className="grid md:grid-cols-4 gap-8">
            {benefits.map((b, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-card border shadow-sm hover:shadow-xl transition-all"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <b.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg">{b.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Job Listings */}
        <section className="bg-muted/30 py-24">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-black">Open Roles</h2>
                <p className="text-muted-foreground">Find your next big challenge.</p>
              </div>
              <div className="relative max-w-sm w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search roles..." className="pl-10 rounded-xl bg-background" />
              </div>
            </div>

            <div className="grid gap-4">
              {jobs.map((job, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-card p-6 md:p-8 rounded-[2rem] border-2 border-transparent hover:border-primary/20 hover:shadow-2xl transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="rounded-full text-[10px] uppercase font-bold">{job.category}</Badge>
                      <Badge variant="outline" className="rounded-full text-[10px] uppercase font-bold text-primary border-primary/20">{job.type}</Badge>
                    </div>
                    <h3 className="text-2xl font-black group-hover:text-primary transition-colors">{job.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground font-medium">
                      <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {job.location}</span>
                      <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> Posted 2 days ago</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right hidden md:block">
                      <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Salary Range</p>
                      <p className="text-xl font-black text-primary">{job.salary}</p>
                    </div>
                    <Button className="h-14 px-8 rounded-xl font-bold gap-2">
                      Apply Now <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Culture CTA */}
        <section className="container px-4 mx-auto py-24">
          <div className="rounded-[4rem] bg-gradient-to-br from-blue-900 to-primary p-12 md:p-24 text-center text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1522071823991-b19c77663c17?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay group-hover:scale-110 transition-transform duration-1000" />
            <div className="relative z-10 space-y-6">
              <h2 className="text-4xl md:text-6xl font-black">Not seeing a match?</h2>
              <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto font-medium">
                We're always looking for exceptional talent. Drop your resume in our talent pool and we'll reach out when the right role opens up.
              </p>
              <Button size="lg" variant="secondary" className="h-16 px-10 text-xl font-black rounded-2xl shadow-2xl">
                Join Talent Pool
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
