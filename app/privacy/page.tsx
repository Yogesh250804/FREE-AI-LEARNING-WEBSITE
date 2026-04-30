"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ShieldCheck, Lock, Eye, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="container mx-auto px-4 py-20 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <div className="text-center space-y-4">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h1 className="text-5xl font-black tracking-tight">Privacy Policy</h1>
              <p className="text-muted-foreground">Last Updated: October 2024</p>
            </div>

            <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <Eye className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">1. Information We Collect</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  We collect information you provide directly to us when you create an account, enroll in a course, or communicate with us. This includes your name, email address, and learning progress.
                </p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <Lock className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">2. How We Use Your Information</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  We use your information to provide and improve our services, track your learning progress, issue certificates, and communicate important updates about your courses.
                </p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">3. Data Security</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  We implement industry-standard security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
                </p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">4. Your Rights</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  You have the right to access, correct, or delete your personal data. You can manage most of these settings directly through your profile dashboard.
                </p>
              </section>
            </div>

            <div className="bg-primary/5 p-8 rounded-[2rem] border border-primary/10 text-center">
              <p className="font-bold">Questions about your privacy?</p>
              <p className="text-muted-foreground mt-2">Contact our DPO at privacy@airginternational.com</p>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
