"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { sendSupportMessage } from "@/lib/support-service";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const success = await sendSupportMessage(formData);
    
    setIsSubmitting(false);
    if (success) {
      setIsSubmitted(true);
    } else {
      alert("Something went wrong. Please try again later.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="container mx-auto px-4 py-20">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Left Side: Info */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-5xl font-black tracking-tight">Let's <span className="text-primary italic">Connect</span></h1>
                <p className="text-xl text-muted-foreground">Have a question about a course or interested in partnership? We'd love to hear from you.</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold">Email Us</p>
                    <p className="text-muted-foreground">support@airginternational.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold">Call Us</p>
                    <p className="text-muted-foreground">+91 (800) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold">Visit Us</p>
                    <p className="text-muted-foreground">123 Tech Hub, Silicon Valley of India, Bangalore</p>
                  </div>
                </div>
              </div>

              <Card className="border-none bg-primary/5 shadow-none p-6">
                <div className="flex gap-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-bold italic">Quick Tip:</p>
                    <p className="text-sm text-muted-foreground">Check our Help Center first - 80% of questions are answered there instantly!</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Right Side: Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-none shadow-2xl bg-card p-8 rounded-[2rem] min-h-[500px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <label className="text-sm font-bold">First Name</label>
                            <Input 
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              placeholder="John" 
                              className="rounded-xl border-secondary bg-secondary/30 h-12" 
                              required 
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-bold">Last Name</label>
                            <Input 
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              placeholder="Doe" 
                              className="rounded-xl border-secondary bg-secondary/30 h-12" 
                              required 
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold">Email Address</label>
                          <Input 
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com" 
                            className="rounded-xl border-secondary bg-secondary/30 h-12" 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold">Subject</label>
                          <Input 
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="How can we help?" 
                            className="rounded-xl border-secondary bg-secondary/30 h-12" 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold">Message</label>
                          <Textarea 
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Tell us more about your inquiry..." 
                            className="rounded-xl border-secondary bg-secondary/30 min-h-[150px] resize-none" 
                            required 
                          />
                        </div>
                        <Button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="w-full h-14 text-lg font-bold gap-2 rounded-xl shadow-lg shadow-primary/30"
                        >
                          {isSubmitting ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          ) : (
                            <Send className="h-5 w-5" />
                          )}
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center space-y-6 py-12"
                    >
                      <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                        <CheckCircle2 className="h-10 w-10" />
                      </div>
                      <div className="space-y-2">
                        <h2 className="text-3xl font-black">Message Sent!</h2>
                        <p className="text-muted-foreground text-lg">
                          Thank you for reaching out. Your ticket has been logged in our system. Our team will review it and get back to you within 24 hours.
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({ firstName: "", lastName: "", email: "", subject: "", message: "" });
                        }}
                        className="rounded-xl h-12 px-8 font-bold"
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
