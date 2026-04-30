"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Video, 
  Users, 
  Search, 
  ArrowRight,
  Zap,
  Globe,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const events = [
  {
    title: "AI Mastery Webinar: The Power of LLMs",
    date: "April 28, 2024",
    time: "6:00 PM IST",
    location: "Online (Live)",
    category: "Webinar",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80"
  },
  {
    title: "Bangalore Tech Meetup: Web Crafting 2024",
    date: "May 05, 2024",
    time: "10:00 AM IST",
    location: "Tech Hub, Bangalore",
    category: "Meetup",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80"
  },
  {
    title: "Global Student Hackathon: Build with AI",
    date: "May 12-14, 2024",
    time: "48 Hours",
    location: "Online / Global",
    category: "Hackathon",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80"
  },
  {
    title: "Robotics Workshop: Build Your First Drone",
    date: "May 20, 2024",
    time: "2:00 PM IST",
    location: "Mumbai",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
  }
];

export default function EventsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary py-24 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_85%)]" />
          <div className="container px-4 mx-auto relative z-10 text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h1 className="text-5xl md:text-8xl font-black tracking-tight">
                Join the <span className="italic underline decoration-white/30 underline-offset-8">Action</span>.
              </h1>
              <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto font-medium">
                From live webinars to global hackathons, discover events that help you connect, build, and grow with the community.
              </p>
            </motion.div>
            <div className="flex justify-center gap-4">
              <Button size="lg" variant="secondary" className="h-16 px-10 text-xl font-black rounded-2xl shadow-2xl gap-2">
                <Bell className="h-5 w-5" /> Get Notified
              </Button>
            </div>
          </div>
        </section>

        {/* Featured / Search */}
        <section className="container px-4 mx-auto -mt-8 relative z-20">
           <Card className="rounded-[2.5rem] shadow-2xl border-none p-6 md:p-8 bg-card flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-wrap gap-2">
                 {["All Events", "Webinars", "Hackathons", "Meetups", "Workshops"].map((c) => (
                   <Badge key={c} variant={c === "All Events" ? "default" : "outline"} className="px-6 py-2 rounded-full cursor-pointer hover:bg-primary hover:text-white transition-all">
                     {c}
                   </Badge>
                 ))}
              </div>
              <div className="relative w-full md:w-80">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                 <Input placeholder="Search events..." className="pl-10 rounded-xl bg-muted/50 border-none h-12" />
              </div>
           </Card>
        </section>

        {/* Events Grid */}
        <section className="container px-4 mx-auto py-24">
          <div className="grid md:grid-cols-2 gap-12">
            {events.map((ev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="flex flex-col lg:flex-row gap-8 p-6 rounded-[3rem] bg-card/50 border hover:shadow-2xl hover:border-primary/20 transition-all overflow-hidden relative">
                   <div className="w-full lg:w-48 h-48 rounded-2xl overflow-hidden shrink-0">
                      <img src={ev.image} alt={ev.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   </div>
                   <div className="space-y-6 flex-1">
                      <div className="flex justify-between items-start">
                         <Badge className="bg-primary/10 text-primary border-none font-black text-[10px] tracking-widest uppercase">{ev.category}</Badge>
                         <div className="text-right">
                            <p className="text-2xl font-black italic">{ev.date.split(',')[0]}</p>
                            <p className="text-xs font-bold text-muted-foreground uppercase">{ev.date.split(',')[1]}</p>
                         </div>
                      </div>
                      <h3 className="text-2xl font-black group-hover:text-primary transition-colors leading-tight">{ev.title}</h3>
                      <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground font-bold uppercase tracking-wider">
                         <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> {ev.time}</span>
                         <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> {ev.location}</span>
                      </div>
                      <Button className="w-full lg:w-auto h-12 px-8 rounded-xl font-bold gap-2">
                         Register Now <ArrowRight className="h-4 w-4" />
                      </Button>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Global Impact CTA */}
        <section className="container px-4 mx-auto pb-24">
           <Card className="rounded-[4rem] border-none bg-muted/30 p-12 md:p-24 text-center space-y-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                 <Globe className="h-64 w-64" />
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight">Stay ahead of the <span className="text-primary italic underline underline-offset-8">Curve</span>.</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-8 font-medium">
                Subscribe to our events calendar to get notified about upcoming hackathons, webinars, and workshops directly in your inbox.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
                 <Input placeholder="Enter your email" className="h-14 rounded-2xl bg-background shadow-xl" />
                 <Button size="lg" className="h-14 px-10 rounded-2xl font-black shadow-xl">
                   Subscribe
                 </Button>
              </div>
           </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}
