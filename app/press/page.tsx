"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { 
  Newspaper, 
  Download, 
  Share2, 
  ExternalLink, 
  Mail, 
  FileText,
  Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const pressReleases = [
  {
    title: "AIR G INTERNATIONAL Reaches 1 Million Students Milestone",
    date: "April 24, 2024",
    location: "Bangalore",
    excerpt: "The platform's rapid growth highlights the global demand for free, high-quality technical education in the AI era."
  },
  {
    title: "Introducing the 'Challenge Zone': Gamified Learning at Scale",
    date: "April 15, 2024",
    location: "Silicon Valley",
    excerpt: "New features allow students to compete in real-time coding battles and earn verified skill badges."
  },
  {
    title: "Partnership Announced with Harvard CS50 for AI Open Access",
    date: "March 28, 2024",
    location: "Cambridge, MA",
    excerpt: "Strategic collaboration aims to bring world-class computer science curriculum to underserved regions."
  }
];

export default function PressPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary py-24 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_85%)]" />
          <div className="container px-4 mx-auto relative z-10 text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <h1 className="text-5xl md:text-7xl font-black tracking-tight">Press & Media</h1>
              <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
                Official announcements, media assets, and resources for journalists.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="container px-4 mx-auto py-20">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Main Column: Press Releases */}
            <div className="lg:col-span-2 space-y-12">
              <div className="flex items-center gap-3 mb-8">
                <Newspaper className="h-8 w-8 text-primary" />
                <h2 className="text-3xl font-black">Latest News</h2>
              </div>

              <div className="space-y-8">
                {pressReleases.map((release, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group"
                  >
                    <div className="flex flex-col md:flex-row md:items-start gap-6 p-8 rounded-[2rem] bg-card/50 border hover:shadow-2xl transition-all cursor-pointer">
                      <div className="md:w-32 shrink-0 space-y-1">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{release.date}</p>
                        <p className="text-sm font-black text-primary italic">{release.location}</p>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-2xl font-black leading-tight group-hover:text-primary transition-colors">{release.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{release.excerpt}</p>
                        <Button variant="ghost" className="p-0 h-auto font-bold gap-2 hover:bg-transparent hover:text-primary group/btn">
                          Read Full Release <ExternalLink className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sidebar: Assets & Contact */}
            <div className="space-y-8">
              {/* Media Kit */}
              <Card className="border-none bg-muted/30 rounded-[2rem] p-4">
                <CardHeader>
                  <CardTitle className="text-xl font-black flex items-center gap-2">
                    <Download className="h-5 w-5" /> Media Kit
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">Download official logos, brand guidelines, and high-res photos.</p>
                  <div className="grid gap-2">
                    <Button variant="secondary" className="w-full justify-start gap-3 rounded-xl font-bold">
                      <ImageIcon className="h-4 w-4" /> Brand Logos (.svg)
                    </Button>
                    <Button variant="secondary" className="w-full justify-start gap-3 rounded-xl font-bold">
                      <FileText className="h-4 w-4" /> Company Fact Sheet
                    </Button>
                    <Button variant="secondary" className="w-full justify-start gap-3 rounded-xl font-bold">
                      <ImageIcon className="h-4 w-4" /> Platform Screenshots
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Media Contact */}
              <Card className="border-none bg-primary/5 rounded-[2rem] p-4 border-2 border-primary/10">
                <CardHeader>
                  <CardTitle className="text-xl font-black flex items-center gap-2">
                    <Mail className="h-5 w-5" /> Media Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">For interview requests or additional media information, contact our press office.</p>
                  <div className="p-4 rounded-xl bg-background border border-primary/20 text-center">
                    <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Email for Press</p>
                    <p className="font-bold text-primary">press@airginternational.com</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Logo Wall Placeholder */}
        <section className="bg-muted/50 py-20">
          <div className="container px-4 mx-auto text-center">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-10">As Featured In</p>
            <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
              {/* Replace with real logos */}
              {["TechCrunch", "Wired", "Forbes", "The Verge", "Reuters"].map((name) => (
                <span key={name} className="text-2xl font-black italic">{name}</span>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
