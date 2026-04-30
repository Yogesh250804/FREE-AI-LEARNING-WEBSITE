"use client";

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { 
  Code, 
  Terminal, 
  Cpu, 
  Database, 
  Globe, 
  Layers,
  FileCode,
  Smartphone,
  Box,
  Bot,
  Zap,
  Plane
} from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const categories = [
  {
    id: "python",
    name: "Python 🐍",
    icon: Terminal,
    courses: "1,200+",
    color: "bg-blue-500/10 text-blue-600 border-blue-200",
  },
  {
    id: "java",
    name: "Java ☕",
    icon: Code,
    courses: "950+",
    color: "bg-orange-500/10 text-orange-600 border-orange-200",
  },
  {
    id: "cpp",
    name: "C++ 🕹️",
    icon: FileCode,
    courses: "600+",
    color: "bg-indigo-500/10 text-indigo-600 border-indigo-200",
  },
  {
    id: "c",
    name: "C Language 🏗️",
    icon: Layers,
    courses: "450+",
    color: "bg-slate-500/10 text-slate-600 border-slate-200",
  },
  {
    id: "js",
    name: "JavaScript 🌐",
    icon: Globe,
    courses: "1,800+",
    color: "bg-yellow-500/10 text-yellow-600 border-yellow-200",
  },
  {
    id: "ds",
    name: "Data Science 📊",
    icon: Database,
    courses: "800+",
    color: "bg-green-500/10 text-green-600 border-green-200",
  },
  {
    id: "aiml",
    name: "AI & ML 🤖",
    icon: Cpu,
    courses: "700+",
    color: "bg-purple-500/10 text-purple-600 border-purple-200",
  },
  {
    id: "web",
    name: "Web Dev 🎨",
    icon: Smartphone,
    courses: "2,200+",
    color: "bg-cyan-500/10 text-cyan-600 border-cyan-200",
  },
  {
    id: "3d",
    name: "3D Printing 🖨️",
    icon: Box,
    courses: "350+",
    color: "bg-rose-500/10 text-rose-600 border-rose-200",
  },
  {
    id: "robotics",
    name: "Robotics 🤖",
    icon: Bot,
    courses: "500+",
    color: "bg-teal-500/10 text-teal-600 border-teal-200",
  },
  {
    id: "electronics",
    name: "Electronics ⚡",
    icon: Zap,
    courses: "400+",
    color: "bg-amber-500/10 text-amber-600 border-amber-200",
  },
  {
    id: "drone",
    name: "Drone 🛸",
    icon: Plane,
    courses: "250+",
    color: "bg-pink-500/10 text-pink-600 border-pink-200",
  },
]

export function CategoriesSection() {
  const { t } = useLanguage();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 40, opacity: 0, scale: 0.8 },
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
    <section className="bg-transparent py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 50 }}
          className="text-center"
        >
          <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl text-balance">
            {t('path_title').split(' ')[0]} {t('path_title').split(' ')[1]} <span className="text-primary">{t('path_title').split(' ')[2]}</span> 🗺️
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-medium text-muted-foreground text-pretty">
            {t('path_desc')}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {categories.map((category) => (
            <motion.div 
              key={category.id} 
              variants={itemVariants}
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/firestore-courses">
                <Card
                  className={`group cursor-pointer transition-all duration-300 border-2 bg-card/40 backdrop-blur-md hover:bg-card/60 ${category.color} hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)]`}
                >
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:rotate-12 ${category.color} bg-white shadow-sm`}>
                      <category.icon className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-card-foreground group-hover:text-primary transition-colors">
                        {t(`cat_${category.id}`)}
                      </h3>
                      <p className="text-sm font-medium opacity-70">{category.courses} {t('courses_text')}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

