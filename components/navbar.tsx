"use client"

import Link from "next/link"
import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Menu, X, User, LogOut, LayoutDashboard } from "lucide-react"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const { language, setLanguage, t } = useLanguage()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md shadow-sm transition-all duration-300">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <Link href="/" className="flex items-center gap-2 text-primary group">
            <motion.div
              whileHover={{ rotate: 5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex h-12 w-12 items-center justify-center overflow-hidden shadow-sm"
            >
              <img src="/aig-logo.png" alt="AIG Logo" className="h-full w-full object-contain" />
            </motion.div>
            <span className="text-xl font-black tracking-tighter text-foreground hidden sm:block">
              AIR G <span className="text-primary italic">INTERNATIONAL</span>
            </span>
          </Link>
        </motion.div>

        {/* Search Bar - Hidden on mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden flex-1 max-w-xl md:flex"
        >
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for courses..."
              className="w-full pl-10 bg-secondary/50 border-none focus-visible:ring-1 transition-all"
            />
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden items-center gap-4 md:flex"
        >
          {/* Language Switcher */}
          <div className="flex items-center bg-secondary/50 rounded-xl p-1 border border-border">
            {[
              { code: "en", label: "EN" },
              { code: "hi", label: "हि" },
              { code: "mr", label: "म" },
            ].map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code as any)}
                className={`px-3 py-1 text-xs font-black rounded-lg transition-all ${
                  language === lang.code 
                    ? "bg-primary text-white shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          <Button variant="ghost" className="text-foreground relative group overflow-hidden" asChild>
            <Link href="/firestore-courses">
              {t('explore') || 'Explore'}
              <motion.span className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-300" />
            </Link>
          </Button>
          
          {user ? (
            <>
              <Button variant="ghost" className="gap-2 text-foreground" asChild>
                <Link href="/dashboard">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="outline" className="gap-2 transition-all hover:scale-105" asChild>
                <Link href="/profile">
                  <User className="h-4 w-4" />
                  Profile
                </Link>
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout" className="text-muted-foreground hover:text-destructive transition-colors">
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" className="text-foreground hidden lg:flex">
                For Business
              </Button>
              <Button variant="outline" asChild className="hover:scale-105 transition-transform">
                <Link href="/auth?mode=login">Log In</Link>
              </Button>
              <Button asChild className="shadow-lg shadow-primary/20 hover:scale-105 transition-transform active:scale-95">
                <Link href="/auth?mode=signup">Sign Up</Link>
              </Button>
            </>
          )}
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </motion.button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-card md:hidden">
          <div className="space-y-4 px-4 py-4">
            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for courses..."
                className="w-full pl-10 bg-secondary"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Button variant="ghost" className="justify-start text-foreground" asChild>
                <Link href="/firestore-courses">Explore</Link>
              </Button>
              {user ? (
                <>
                  <Button variant="ghost" className="justify-start gap-2 text-foreground" asChild onClick={() => setMobileMenuOpen(false)}>
                    <Link href="/dashboard">
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                  </Button>
                  <Button variant="ghost" className="justify-start gap-2 text-foreground" asChild onClick={() => setMobileMenuOpen(false)}>
                    <Link href="/profile">
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                  </Button>
                  <Button variant="destructive" className="mt-2 w-full gap-2" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                    Log Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" className="justify-start text-foreground">
                    For Business
                  </Button>
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" className="flex-1" asChild onClick={() => setMobileMenuOpen(false)}>
                      <Link href="/auth?mode=login">Log In</Link>
                    </Button>
                    <Button className="flex-1" asChild onClick={() => setMobileMenuOpen(false)}>
                      <Link href="/auth?mode=signup">Sign Up</Link>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
