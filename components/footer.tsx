
const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
    { name: "Press", href: "/press" },
  ],
  community: [
    { name: "Become an Instructor", href: "/instructor" },
    { name: "Affiliate Program", href: "/affiliate" },
    { name: "Student Stories", href: "/stories" },
    { name: "Events", href: "/events" },
  ],
  support: [
    { name: "Help Center", href: "/help" },
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
  categories: [
    { name: "Development", href: "/firestore-courses" },
    { name: "Business", href: "/firestore-courses" },
    { name: "Design", href: "/firestore-courses" },
    { name: "Marketing", href: "/firestore-courses" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="/" className="flex items-center gap-2 text-primary">
              <div className="h-10 w-10 overflow-hidden">
                <img src="/aig-logo.png" alt="AIG Logo" className="h-full w-full object-contain" />
              </div>
              <span className="text-xl font-bold text-foreground">AIR G INTERNATIONAL</span>
            </a>
            <p className="mt-4 text-sm text-muted-foreground text-pretty">
              Empowering millions of learners worldwide with quality education.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Company</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Community</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Support</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Tech Categories</h3>
            <ul className="mt-4 space-y-3">
              {[
                { name: "Programming", href: "/firestore-courses?category=Programming" },
                { name: "AI Mastery", href: "/firestore-courses?category=AI Mastery" },
                { name: "Web Crafting", href: "/firestore-courses?category=Web Crafting" },
                { name: "Data Science", href: "/firestore-courses?category=Data Science" },
                { name: "Cyber Security", href: "/firestore-courses?category=Cyber Security" },
                { name: "Cloud Computing", href: "/firestore-courses?category=Cloud Computing" },
              ].map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Advanced Tech</h3>
            <ul className="mt-4 space-y-3">
              {[
                { name: "Game Dev", href: "/firestore-courses?category=Game Dev" },
                { name: "Mobile Apps", href: "/firestore-courses?category=Mobile Apps" },
                { name: "3D Printing", href: "/firestore-courses?category=3D Printing" },
                { name: "Robotics", href: "/firestore-courses?category=Robotics" },
                { name: "Electronics", href: "/firestore-courses?category=Electronics" },
                { name: "Drone", href: "/firestore-courses?category=Drone" },
              ].map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground" suppressHydrationWarning>
            &copy; {new Date().getFullYear()} AIR G INTERNATIONAL. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy
            </a>
            <a href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms
            </a>
            <a href="/help" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
