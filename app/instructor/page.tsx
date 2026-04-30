"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { 
  Users, 
  Video, 
  TrendingUp, 
  DollarSign, 
  Award, 
  MessageSquare, 
  Zap,
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const benefits = [
  { 
    icon: Users, 
    title: "Reach Millions", 
    desc: "Share your knowledge with a global community of over 1 million eager learners.",
    color: "text-blue-600",
    bg: "bg-blue-500/10"
  },
  { 
    icon: DollarSign, 
    title: "Earn Revenue", 
    desc: "Get paid for every student who enrolls in your premium content or mentorship sessions.",
    color: "text-green-600",
    bg: "bg-green-500/10"
  },
  { 
    icon: Zap, 
    title: "AI Tools", 
    desc: "Use our proprietary AI tools to generate transcripts, quizzes, and course outlines in seconds.",
    color: "text-purple-600",
    bg: "bg-purple-500/10"
  },
  { 
    icon: Award, 
    title: "Build Authority", 
    desc: "Establish yourself as a thought leader in the tech industry and grow your professional brand.",
    color: "text-orange-600",
    bg: "bg-orange-500/10"
  }
];

export default function InstructorPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-24 overflow-hidden bg-primary/5">
          <div className="container px-4 mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <Badge variant="outline" className="px-4 py-1 rounded-full border-primary/30 text-primary font-black uppercase tracking-widest">
                  Teach the World
                </Badge>
                <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
                  Turn your <span className="text-primary italic">Expertise</span> into Impact.
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Join AIR G INTERNATIONAL as an instructor and help us build the world's most accessible technical learning platform. We provide the tools, you provide the knowledge.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="h-16 px-10 text-xl font-black rounded-2xl shadow-2xl" asChild>
                    <Link href="/contact">Apply Now</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="h-16 px-10 text-xl font-black rounded-2xl border-2">
                    View Guide
                  </Button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative"
              >
                <div className="aspect-square rounded-[4rem] bg-gradient-to-br from-primary to-blue-600 p-1 flex items-center justify-center shadow-2xl overflow-hidden group">
                   <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1475721027187-402ec7570490?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay group-hover:scale-110 transition-transform duration-700" />
                   <div className="relative text-center text-white space-y-4">
                     <div className="h-24 w-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6">
                        <Video className="h-10 w-10" />
                     </div>
                     <h3 className="text-3xl font-black">10,000+ Instructors</h3>
                     <p className="text-primary-foreground/80 font-bold">Already making an impact.</p>
                   </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="container px-4 mx-auto py-24">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-black">Why teach with <span className="text-primary italic">Us?</span></h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              We empower our instructors with cutting-edge technology and a massive audience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card p-8 rounded-[2rem] border-2 border-transparent hover:border-primary/20 transition-all shadow-xl group"
              >
                <div className={`h-14 w-14 rounded-2xl ${b.bg} ${b.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <b.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{b.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Process Steps */}
        <section className="bg-muted/30 py-24">
          <div className="container px-4 mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-12">
                <h2 className="text-4xl font-black leading-tight">Your journey to <span className="text-primary italic">Expert</span> status starts here.</h2>
                <div className="space-y-8">
                  {[
                    { step: "01", title: "Apply", desc: "Fill out our simple application and tell us about your expertise." },
                    { step: "02", title: "Plan your course", desc: "Use our AI tools to outline your curriculum and define learning goals." },
                    { step: "03", title: "Record & Upload", desc: "Upload your videos. Our system automatically handles transcripts and translations." },
                    { step: "04", title: "Launch & Earn", desc: "Go live to 1M+ students and start earning revenue immediately." }
                  ].map((s, i) => (
                    <div key={i} className="flex gap-6 items-start">
                      <div className="text-4xl font-black text-primary/20 leading-none">{s.step}</div>
                      <div className="space-y-2">
                        <h4 className="text-xl font-black">{s.title}</h4>
                        <p className="text-muted-foreground">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Card className="border-none shadow-2xl p-10 rounded-[3rem] bg-card overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8">
                   <ShieldCheck className="h-12 w-12 text-primary opacity-20" />
                </div>
                <div className="space-y-6 relative z-10">
                  <h3 className="text-3xl font-black">Ready to Start?</h3>
                  <p className="text-muted-foreground">Complete the form below and our instructor success team will reach out within 48 hours.</p>
                  <div className="space-y-4">
                     <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-1"><label className="text-xs font-bold uppercase">First Name</label><input className="w-full h-12 bg-muted rounded-xl px-4 text-sm" placeholder="John" /></div>
                        <div className="space-y-1"><label className="text-xs font-bold uppercase">Last Name</label><input className="w-full h-12 bg-muted rounded-xl px-4 text-sm" placeholder="Doe" /></div>
                     </div>
                     <div className="space-y-1"><label className="text-xs font-bold uppercase">Email</label><input className="w-full h-12 bg-muted rounded-xl px-4 text-sm" placeholder="john@example.com" /></div>
                     <div className="space-y-1"><label className="text-xs font-bold uppercase">Your Expertise</label><select className="w-full h-12 bg-muted rounded-xl px-4 text-sm"><option>Web Development</option><option>Artificial Intelligence</option><option>Data Science</option><option>Design</option></select></div>
                     <Button className="w-full h-14 rounded-2xl font-black text-lg gap-2 shadow-xl shadow-primary/30">
                        Submit Application <ArrowRight className="h-5 w-5" />
                     </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
