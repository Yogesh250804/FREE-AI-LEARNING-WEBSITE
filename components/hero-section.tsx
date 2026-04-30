"use client";

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Play, Rocket, Sparkles, Star, Trophy, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"

export function HeroSection() {
  const { t } = useLanguage()
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 40, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  }

  return (
    <section className="relative overflow-hidden bg-transparent pt-12 pb-24 sm:pt-20 sm:pb-32 lg:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center lg:flex-row lg:text-left lg:items-center lg:gap-16">
          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 space-y-10 z-10"
          >
            <div className="space-y-6">
              <motion.div variants={itemVariants}>
                <span className="inline-flex items-center gap-2 rounded-2xl bg-primary/10 px-4 py-2 text-sm font-bold text-primary border border-primary/20 backdrop-blur-sm">
                  <Sparkles className="h-4 w-4" />
                  Unlock Your Superpowers!
                </span>
              </motion.div>
              
              <motion.h1
                variants={itemVariants}
                className="text-5xl font-black tracking-tighter text-foreground sm:text-7xl lg:text-8xl leading-[0.95]"
              >
                {t('hero_title')} {t('hero_with')}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-purple-600 animate-gradient">
                  {t('hero_excellence')}
                </span>
              </motion.h1>
              
              <motion.p
                variants={itemVariants}
                className="mx-auto lg:mx-0 max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed"
              >
                {t('hero_desc')}
              </motion.p>
            </div>

            <motion.div 
              variants={itemVariants} 
              className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
            >
              <Button size="lg" className="h-14 px-10 text-lg font-bold shadow-[0_15px_30px_rgba(59,130,246,0.3)] hover:scale-105 transition-all bg-primary hover:bg-primary/90 rounded-2xl" asChild>
                <Link href="/firestore-courses">
                  {t('btn_quest')} <Rocket className="ml-2 h-5 w-5 animate-bounce-slow" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-bold hover:bg-primary/5 hover:scale-105 transition-all border-2 rounded-2xl" asChild>
                <Link href="/video-demo">
                  {t('btn_challenge')} <Trophy className="ml-2 h-5 w-5 text-yellow-500" />
                </Link>
              </Button>
            </motion.div>
            
            {/* Stats as Badges */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-card border border-border shadow-sm">
                <div className="bg-yellow-400/20 p-1.5 rounded-lg">
                  <Trophy className="h-5 w-5 text-yellow-600" />
                </div>
                <span className="font-bold text-sm tracking-tight">10K+ Adventures</span>
              </div>
              <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-card border border-border shadow-sm">
                <div className="bg-primary/20 p-1.5 rounded-lg">
                  <Star className="h-5 w-5 text-primary" />
                </div>
                <span className="font-bold text-sm tracking-tight">50K+ Heroes</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Image/Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 50, damping: 15, delay: 0.4 }}
            className="relative flex-1 mt-16 lg:mt-0"
          >
            <div className="relative aspect-square max-w-[500px] mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-purple-500/10 blur-[60px] rounded-full" />
              
              <div className="relative h-full w-full overflow-hidden rounded-[3.5rem] border-8 border-white/50 shadow-2xl backdrop-blur-sm">
                <img
                  src="/images/hero-learning.jpg"
                  alt="Students learning online"
                  className="h-full w-full object-cover transition-transform duration-1000 hover:scale-110"
                />
                
                {/* Floating elements */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-8 right-8 rounded-2xl bg-white/95 p-4 shadow-xl border border-white/20"
                >
                  <span className="text-4xl animate-bounce-slow inline-block">🚀</span>
                </motion.div>
                
                <motion.div
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute bottom-1/3 -left-4 rounded-2xl bg-white/95 p-4 shadow-xl border border-white/20"
                >
                  <span className="text-4xl">💻</span>
                </motion.div>

                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-8 left-8 right-8 rounded-3xl bg-card/90 p-5 shadow-2xl backdrop-blur-md border border-white/20"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/30">
                      <Zap className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-black text-foreground">Level Up!</p>
                      <p className="text-sm text-muted-foreground font-bold italic">Join 50K+ friends</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
