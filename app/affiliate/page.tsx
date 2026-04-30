"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { 
  Percent, 
  Users, 
  BarChart3, 
  Wallet, 
  Share2, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function AffiliatePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-24 overflow-hidden bg-primary text-white">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_85%)]" />
          <div className="container px-4 mx-auto relative z-10 text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <Badge variant="secondary" className="px-4 py-1 rounded-full text-primary font-black uppercase">
                Partner with us
              </Badge>
              <h1 className="text-5xl md:text-8xl font-black tracking-tight">
                Grow with <span className="italic underline decoration-white/30 underline-offset-8">Us</span>.
              </h1>
              <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
                Join our affiliate network and earn up to 30% commission on every student you refer to AIR G INTERNATIONAL.
              </p>
            </motion.div>
            <div className="flex justify-center gap-4">
              <Button size="lg" variant="secondary" className="h-16 px-10 text-xl font-black rounded-2xl shadow-2xl" asChild>
                <Link href="/contact">Join Affiliate Program</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Perks Grid */}
        <section className="container px-4 mx-auto py-24">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Percent, title: "High Commissions", desc: "Earn 30% on every premium course sale and subscription signup." },
              { icon: BarChart3, title: "Real-time Tracking", desc: "Access our advanced dashboard to track your clicks, conversions, and earnings in real-time." },
              { icon: Wallet, title: "Monthly Payouts", desc: "Get paid automatically every month via PayPal, Stripe, or direct bank transfer." }
            ].map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 rounded-[3rem] bg-card border-2 border-transparent hover:border-primary/20 hover:shadow-2xl transition-all group text-center"
              >
                <div className="h-16 w-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <p.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-black mb-4">{p.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How it Works */}
        <section className="bg-muted/30 py-24">
          <div className="container px-4 mx-auto">
            <h2 className="text-4xl font-black text-center mb-20">How it <span className="text-primary italic">works</span>.</h2>
            <div className="grid md:grid-cols-3 gap-12 relative">
               {/* Connector Line */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-primary/10 -translate-y-24 -z-10" />
              
              {[
                { step: "01", title: "Sign Up", desc: "Apply for our program and get your unique affiliate link in minutes." },
                { step: "02", title: "Promote", desc: "Share AIR G INTERNATIONAL with your audience through blog posts, social media, or email." },
                { step: "03", title: "Earn", desc: "When someone signs up through your link, we credit you the commission instantly." }
              ].map((s, i) => (
                <div key={i} className="text-center space-y-6">
                  <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center mx-auto text-2xl font-black shadow-xl ring-8 ring-background">
                    {s.step}
                  </div>
                  <h4 className="text-2xl font-black">{s.title}</h4>
                  <p className="text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="container px-4 mx-auto py-24">
          <div className="rounded-[4rem] bg-card p-12 md:p-24 border-4 border-dashed border-primary/20 text-center space-y-8 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                <Globe className="h-64 w-64" />
             </div>
             <h2 className="text-4xl md:text-6xl font-black tracking-tight">Ready to start <span className="text-primary italic">earning?</span></h2>
             <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
               Join 5,000+ partners who are already helping us spread the word about free technical education.
             </p>
             <Button size="lg" className="h-16 px-10 text-xl font-black rounded-2xl shadow-2xl gap-2">
               Apply Now <ArrowRight className="h-6 w-6" />
             </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
