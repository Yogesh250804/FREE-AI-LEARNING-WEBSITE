"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  BookOpen, 
  MessageCircle, 
  PlayCircle, 
  HelpCircle,
  ArrowRight,
  LifeBuoy,
  FileText,
  Video,
  Users,
  Zap,
  ShieldCheck,
  Globe,
  Trophy,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const faqs = [
  // Getting Started
  {
    id: "faq-1",
    question: "How do I start a course?",
    answer: "Browse our catalog, pick a path that interests you, and click 'Start Your Quest'. If you're not logged in, you'll be prompted to create an account.",
    category: "Getting Started"
  },
  {
    id: "faq-3",
    question: "Can I learn at my own pace?",
    answer: "Yes! All our courses are self-paced, allowing you to learn whenever and wherever it suits you.",
    category: "Getting Started"
  },
  {
    id: "faq-6",
    question: "Is there a mobile app?",
    answer: "Our website is fully responsive and works perfectly on all mobile browsers. We are currently developing a dedicated iOS and Android app, coming soon!",
    category: "Getting Started"
  },
  {
    id: "faq-7",
    question: "How do I reset my password?",
    answer: "You can reset your password by clicking 'Forgot Password' on the login page. We will send a reset link to your registered email address.",
    category: "Getting Started"
  },

  // Course Materials
  {
    id: "faq-2",
    question: "Are the certificates recognized?",
    answer: "Our certificates are verified by AIR G INTERNATIONAL and showcase your mastery of specific technical skills to potential employers. They are highly regarded by our partner companies.",
    category: "Course Materials"
  },
  {
    id: "faq-4",
    question: "How do I access transcripts?",
    answer: "Transcripts are available on the course detail page under the 'Description' section for most of our video content. You can also download them as PDF files.",
    category: "Course Materials"
  },
  {
    id: "faq-13",
    question: "Are the courses legit?",
    answer: "Yes, 100%! All our courses are curated from world-class institutions like Harvard, freeCodeCamp, and industry experts. Every course is vetted for quality and accuracy.",
    category: "Course Materials"
  },
  {
    id: "faq-8",
    question: "Can I download course videos?",
    answer: "To protect our instructors' intellectual property, videos are only available for streaming. However, all supplementary materials like PDFs and source code can be downloaded.",
    category: "Course Materials"
  },

  // Community & Support
  {
    id: "faq-5",
    question: "Is there a student community?",
    answer: "Absolutely! You can join our Discord server or participate in the discussion forums on each lesson page. We have over 50,000 active students sharing their journey.",
    category: "Community & Support"
  },
  {
    id: "faq-10",
    question: "How do I contact a mentor?",
    answer: "Premium students have access to 1-on-1 mentor support. You can schedule a session through your student dashboard under the 'Mentorship' tab.",
    category: "Community & Support"
  },
  {
    id: "faq-11",
    question: "How long does support take to respond?",
    answer: "Our typical response time for support tickets is under 4 hours. Technical queries for premium students are usually answered within 30 minutes.",
    category: "Community & Support"
  }
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredFaqs = faqs.filter(faq => {
    const searchLower = searchQuery.toLowerCase().trim();
    if (!searchLower) {
      return activeCategory ? faq.category === activeCategory : true;
    }
    return (
      faq.question.toLowerCase().includes(searchLower) || 
      faq.answer.toLowerCase().includes(searchLower) ||
      faq.category.toLowerCase().includes(searchLower)
    );
  });

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => (
          part.toLowerCase() === highlight.toLowerCase() ? 
            <span key={i} className="bg-yellow-400/30 text-yellow-900 rounded-sm px-0.5">{part}</span> : 
            part
        ))}
      </span>
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Header Section */}
        <section className="relative pt-24 pb-12 overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 -skew-y-3 origin-top-left -z-10" />
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Zap className="h-3 w-3" />
                  Support Center
                </div>
                <h1 className="text-4xl font-black md:text-7xl tracking-tight">
                  We're here to <span className="text-primary italic">guide</span> you.
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Find answers, connect with experts, and master your learning journey with our comprehensive support system.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="relative max-w-2xl mx-auto group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-blue-500/30 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground h-6 w-6" />
                  <Input 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Ask a question or enter a keyword..." 
                    className="h-16 pl-16 pr-8 rounded-2xl border-none shadow-2xl bg-card text-lg focus-visible:ring-2 focus-visible:ring-primary/50"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:block">
                    <kbd className="pointer-events-none inline-flex h-8 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-[10px] font-medium opacity-100">
                      <span className="text-xs">⌘</span>K
                    </kbd>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Bento Knowledge Grid */}
        <section className="container px-4 mx-auto py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Quick Actions (Bento Item 1) */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="md:col-span-4 space-y-6"
            >
              <Card className="border-none bg-primary text-white shadow-xl overflow-hidden relative group">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all" />
                <CardHeader>
                  <CardTitle className="text-2xl font-black">Quick Support</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 relative">
                  <p className="text-primary-foreground/80 text-sm">Need immediate help? Our most used actions are just a click away.</p>
                  <div className="grid grid-cols-1 gap-2">
                    <Button variant="secondary" className="w-full justify-start gap-3 rounded-xl font-bold" asChild>
                      <Link href="/contact"><ShieldCheck className="h-4 w-4" /> Reset Password</Link>
                    </Button>
                    <Button variant="secondary" className="w-full justify-start gap-3 rounded-xl font-bold" asChild>
                      <Link href="/contact"><Globe className="h-4 w-4" /> Language Issues</Link>
                    </Button>
                    <Button variant="secondary" className="w-full justify-start gap-3 rounded-xl font-bold" asChild>
                      <Link href="/contact"><Trophy className="h-4 w-4" /> Verify Certificate</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none bg-card/50 shadow-lg border-2 border-transparent hover:border-primary/20 transition-all cursor-pointer group" onClick={() => setActiveCategory("Community & Support")}>
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Users className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold">Student Community</h4>
                      <p className="text-xs text-muted-foreground">50k+ members active</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </CardContent>
              </Card>
            </motion.div>

            {/* Knowledge Tracks (Bento Item 2) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {/* Getting Started Track */}
              <Card 
                className={`border-2 transition-all duration-500 overflow-hidden cursor-pointer group ${activeCategory === "Getting Started" ? "border-primary shadow-2xl scale-[1.02]" : "border-transparent bg-card/50 shadow-lg"}`}
                onClick={() => setActiveCategory(activeCategory === "Getting Started" ? null : "Getting Started")}
              >
                <CardHeader className="relative z-10">
                  <div className="flex justify-between items-start">
                    <div className="h-14 w-14 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <PlayCircle className="h-7 w-7" />
                    </div>
                    <Badge variant="secondary" className="rounded-full">Intro</Badge>
                  </div>
                  <CardTitle className="text-2xl font-black">Getting Started</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 relative z-10">
                  <p className="text-muted-foreground text-sm leading-relaxed">Everything you need to set up your account and start your first technical quest.</p>
                  <ul className="space-y-2">
                    {["Account Setup", "Choosing a Path", "Dashboard Tour"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm font-medium text-primary/80 group-hover:text-primary transition-colors">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-2 flex items-center text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    View FAQ Track <ArrowRight className="ml-2 h-3 w-3" />
                  </div>
                </CardContent>
                <div className="absolute bottom-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                   <PlayCircle className="h-32 w-32 -mb-8 -mr-8" />
                </div>
              </Card>

              {/* Course Materials Track */}
              <Card 
                className={`border-2 transition-all duration-500 overflow-hidden cursor-pointer group ${activeCategory === "Course Materials" ? "border-primary shadow-2xl scale-[1.02]" : "border-transparent bg-card/50 shadow-lg"}`}
                onClick={() => setActiveCategory(activeCategory === "Course Materials" ? null : "Course Materials")}
              >
                <CardHeader className="relative z-10">
                  <div className="flex justify-between items-start">
                    <div className="h-14 w-14 rounded-2xl bg-green-500/10 text-green-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <BookOpen className="h-7 w-7" />
                    </div>
                    <Badge variant="secondary" className="rounded-full">Resources</Badge>
                  </div>
                  <CardTitle className="text-2xl font-black">Learning Tools</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 relative z-10">
                  <p className="text-muted-foreground text-sm leading-relaxed">Access transcripts, certificates, and our custom-built code playgrounds.</p>
                  <ul className="space-y-2">
                    {["Transcripts & PDFs", "Code Environment", "Certification"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm font-medium text-green-600/80 group-hover:text-green-600 transition-colors">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-2 flex items-center text-xs font-bold text-green-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore Materials <ArrowRight className="ml-2 h-3 w-3" />
                  </div>
                </CardContent>
                <div className="absolute bottom-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                   <BookOpen className="h-32 w-32 -mb-8 -mr-8" />
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Dynamic FAQ Section */}
        <section className="container px-4 mx-auto py-24">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
              <div className="space-y-2">
                <h2 className="text-4xl font-black tracking-tight">
                  {searchQuery ? `Search Results (${filteredFaqs.length})` : (activeCategory ? `${activeCategory} Questions` : "General Knowledge")}
                </h2>
                <p className="text-muted-foreground">
                  {searchQuery 
                    ? `Showing FAQs matching "${searchQuery}"` 
                    : (activeCategory ? `Common questions about ${activeCategory}` : "The most frequent questions from our global community.")}
                </p>
              </div>
              {(searchQuery || activeCategory) && (
                <Button variant="outline" onClick={() => { setSearchQuery(""); setActiveCategory(null); }} className="rounded-xl font-bold group">
                  Clear All Filters <X className="ml-2 h-4 w-4 group-hover:rotate-90 transition-transform" />
                </Button>
              )}
            </div>

            <AnimatePresence mode="wait">
              {filteredFaqs.length > 0 ? (
                <motion.div
                  key="faq-list"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Accordion type="single" collapsible className="space-y-4">
                    {filteredFaqs.map((faq) => (
                      <AccordionItem 
                        key={faq.id} 
                        value={faq.id}
                        className="border-2 rounded-[1.5rem] px-8 bg-card/20 hover:bg-card/50 transition-all border-transparent hover:border-primary/10"
                      >
                        <AccordionTrigger className="hover:no-underline font-bold text-xl py-8 text-left decoration-primary underline-offset-8">
                          {highlightText(faq.question, searchQuery)}
                        </AccordionTrigger>
                        <AccordionContent className="text-lg text-muted-foreground pb-8 leading-relaxed">
                          {highlightText(faq.answer, searchQuery)}
                          <div className="mt-6 flex items-center gap-4 text-xs font-bold text-primary uppercase tracking-widest">
                             <span>Category: {faq.category}</span>
                             <span className="h-1 w-1 bg-muted-foreground rounded-full" />
                             <button className="flex items-center gap-1 hover:underline">
                               Was this helpful? <Zap className="h-3 w-3" />
                             </button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-32 text-center space-y-6 bg-muted/20 rounded-[3rem] border-4 border-dashed"
                >
                  <div className="h-24 w-24 bg-muted rounded-full flex items-center justify-center mx-auto">
                    <LifeBuoy className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-black">No results for "{searchQuery}"</h3>
                    <p className="text-muted-foreground text-lg max-w-md mx-auto">We couldn't find an exact match. Try using simpler keywords or contact our support team directly.</p>
                  </div>
                  <div className="flex justify-center gap-4">
                    <Button asChild size="lg" className="rounded-xl font-black gap-2">
                      <Link href="/contact">Ask Support <ArrowRight className="h-5 w-5" /></Link>
                    </Button>
                    <Button variant="outline" size="lg" onClick={() => setSearchQuery("")} className="rounded-xl font-black">
                      Try Again
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Global Footer Support CTA */}
        <section className="container px-4 mx-auto pb-24">
          <Card className="rounded-[4rem] border-none bg-gradient-to-r from-blue-900 to-primary p-1 md:p-2 shadow-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(white,transparent)]" />
            <div className="bg-background/10 backdrop-blur-3xl rounded-[3.5rem] p-12 md:p-20 text-center relative z-10 space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">Still stuck? No problem.</h2>
                <p className="text-xl text-primary-foreground/70 max-w-2xl mx-auto">
                  Our community of 50,000+ students and technical mentors are ready to help you overcome any obstacle.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-6">
                <Button size="lg" variant="secondary" className="h-16 px-10 text-xl font-black rounded-2xl shadow-2xl" asChild>
                  <Link href="/contact">Open a Ticket</Link>
                </Button>
                <Button size="lg" variant="outline" className="h-16 px-10 text-xl font-black rounded-2xl border-white text-white hover:bg-white hover:text-primary transition-all gap-2">
                  Discord Community <ExternalLink className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}

import { X } from "lucide-react";
