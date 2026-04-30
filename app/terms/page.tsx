"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Scale, CheckCircle2, AlertCircle, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function TermsPage() {
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
                <Scale className="h-8 w-8" />
              </div>
              <h1 className="text-5xl font-black tracking-tight">Terms of Service</h1>
              <p className="text-muted-foreground">Effective Date: October 2024</p>
            </div>

            <div className="prose prose-slate dark:prose-invert max-w-none space-y-10">
              <div className="p-6 bg-amber-500/5 border border-amber-500/10 rounded-2xl flex gap-4">
                <AlertCircle className="h-6 w-6 text-amber-500 shrink-0" />
                <p className="text-sm text-amber-600 font-medium">Please read these terms carefully before using our platform. By accessing or using our services, you agree to be bound by these terms.</p>
              </div>

              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">1. Acceptance of Terms</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  AIR G INTERNATIONAL provides its service to you subject to the following Terms of Service, which may be updated from time to time without notice.
                </p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">2. User Conduct</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Users are responsible for maintaining the confidentiality of their account and password. You agree to use the platform only for lawful purposes and in a way that does not infringe the rights of others.
                </p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <Scale className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">3. Intellectual Property</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  All course content, videos, and materials provided on the platform are the intellectual property of AIR G INTERNATIONAL or its content providers and are protected by international copyright laws.
                </p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">4. Termination</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to terminate or suspend your account and access to the services at our sole discretion, without notice, for conduct that we believe violates these Terms.
                </p>
              </section>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
