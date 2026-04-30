"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { 
  Quote, 
  Star, 
  Play, 
  Briefcase, 
  GraduationCap, 
  ExternalLink,
  Zap,
  TrendingUp,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const stories = [
  {
    name: "Rohan Sharma",
    role: "AI Engineer at Google",
    story: "I started with zero knowledge of AI. The 'Class 10 AI Mastery' course on AIR G INTERNATIONAL gave me the foundations I needed. Now, I work at my dream company.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80",
    tags: ["Artificial Intelligence", "Career Switch"],
    stats: "Moved from Sales to Tech"
  },
  {
    name: "Priya Patel",
    role: "Full Stack Developer",
    story: "As a student from a small town, I couldn't afford expensive bootcamps. AIR G's free courses on Next.js were a lifesaver. The project-based approach is real.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    tags: ["Web Dev", "Remote Work"],
    stats: "Landed 3 Job Offers"
  },
  {
    name: "Amit Kumar",
    role: "Electronics Hobbyist",
    story: "The Robotics and Drone courses are incredible. I built my first autonomous drone using the materials provided here. The community support is amazing.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
    tags: ["Robotics", "Hardware"],
    stats: "Built 5 IoT Projects"
  }
];

export default function StudentStoriesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary/5 py-24">
          <div className="container px-4 mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-5xl md:text-7xl font-black tracking-tight">
                Real <span className="text-primary italic">Stories</span>, Real Impact.
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6 leading-relaxed">
                See how millions of students are using AIR G INTERNATIONAL to master new skills, build incredible projects, and transform their careers.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Video Testimonial Spotlight */}
        <section className="container px-4 mx-auto -mt-12 mb-24">
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             className="relative aspect-video max-w-5xl mx-auto rounded-[3rem] overflow-hidden shadow-2xl group cursor-pointer"
           >
             <img 
               src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80" 
               alt="Success Story" 
               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
             />
             <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="h-24 w-24 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl ring-8 ring-white/20 group-hover:scale-110 transition-transform">
                   <Play className="h-10 w-10 fill-current" />
                </div>
             </div>
             <div className="absolute bottom-10 left-10 text-white space-y-2">
                <Badge className="bg-white text-black mb-2">WATCH FEATURED STORY</Badge>
                <h3 className="text-3xl font-black italic">"AIR G changed my life."</h3>
                <p className="text-white/80 font-bold">— Maria S., Senior Developer</p>
             </div>
           </motion.div>
        </section>

        {/* Story Grid */}
        <section className="container px-4 mx-auto py-24">
          <div className="grid md:grid-cols-3 gap-8">
            {stories.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="group h-full"
              >
                <Card className="h-full border-none shadow-xl bg-card rounded-[2.5rem] overflow-hidden flex flex-col">
                  <CardContent className="p-10 flex-1 flex flex-col justify-between">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                         <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                         </div>
                         <Quote className="h-8 w-8 text-primary/10" />
                      </div>
                      <p className="text-lg font-medium leading-relaxed italic">"{s.story}"</p>
                    </div>

                    <div className="mt-10 pt-8 border-t flex items-center gap-4">
                       <img src={s.avatar} alt={s.name} className="h-14 w-14 rounded-2xl object-cover border-2 border-primary/20" />
                       <div>
                          <p className="font-black text-lg leading-tight">{s.name}</p>
                          <p className="text-sm text-muted-foreground font-bold">{s.role}</p>
                       </div>
                    </div>
                  </CardContent>
                  <div className="bg-primary/5 px-10 py-4 flex items-center justify-between">
                     <span className="text-xs font-black text-primary uppercase tracking-widest">{s.stats}</span>
                     <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats and Impact */}
        <section className="bg-muted/30 py-24">
          <div className="container px-4 mx-auto text-center space-y-16">
             <h2 className="text-4xl font-black">Our impact in <span className="text-primary italic">Numbers</span>.</h2>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
               {[
                 { icon: GraduationCap, val: "1M+", label: "Successful Grads" },
                 { icon: Briefcase, val: "85%", label: "Salary Increase" },
                 { icon: Zap, val: "5M+", label: "Hours Learned" },
                 { icon: Heart, val: "98%", label: "Happy Students" }
               ].map((st, i) => (
                 <div key={i} className="space-y-2">
                   <div className="h-16 w-16 bg-card rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4 text-primary">
                     <st.icon className="h-8 w-8" />
                   </div>
                   <p className="text-4xl font-black text-primary">{st.val}</p>
                   <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{st.label}</p>
                 </div>
               ))}
             </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="container px-4 mx-auto py-24">
           <div className="rounded-[4rem] bg-card p-12 md:p-24 text-center border shadow-2xl relative overflow-hidden group">
              <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                 <GraduationCap className="h-64 w-64" />
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight">Your success story <br /> starts <span className="text-primary italic underline underline-offset-8">here</span>.</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-8">
                Don't just watch from the sidelines. Join 1 million+ students who are already building their futures.
              </p>
              <div className="mt-12 flex flex-wrap justify-center gap-6">
                <Button size="lg" className="h-16 px-10 text-xl font-black rounded-2xl shadow-2xl" asChild>
                  <Link href="/firestore-courses">Start Your Quest</Link>
                </Button>
                <Button size="lg" variant="outline" className="h-16 px-10 text-xl font-black rounded-2xl border-2">
                  Share Your Story
                </Button>
              </div>
           </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
