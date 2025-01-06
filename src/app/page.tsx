'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Menu, X, Loader2, User } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UserMenu } from "@/components/user-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Home(): JSX.Element {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle body scroll lock
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Get current padding to prevent layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.paddingRight = '';
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.paddingRight = '';
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut({ redirect: false });
      router.push('/');
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  };

  const AuthButtons = () => {
    if (status === "loading") {
      return (
        <Button variant="ghost" disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </Button>
      );
    }

    if (session) {
      return <UserMenu user={session.user} />;
    }

    return (
      <div className="flex items-center gap-2">
        <Link href="/login">
          <Button variant="ghost" className="hidden sm:inline-flex">
            Sign in
          </Button>
        </Link>
        <Link href="/register">
          <Button>Get Started</Button>
        </Link>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex shrink-0 items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-primary"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            <span className="text-lg font-semibold">Agentity</span>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="block rounded-md p-2.5 text-foreground hover:bg-accent md:hidden"
          >
            <span className="sr-only">Toggle menu</span>
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden flex-1 items-center justify-center lg:ml-20 md:flex">
            <div className="flex items-center gap-6 lg:gap-8">
              <Link
                href="/features"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Pricing
              </Link>
              <Link
                href="/blog"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Blog
              </Link>
              <Link
                href="/docs"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Documentation
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                About
              </Link>
              <Link
                href="/faq"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                FAQ
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Contact
              </Link>
            </div>
          </nav>

          {/* Right side items */}
          <div className="hidden items-center gap-4 md:flex">
            <ModeToggle />
            <AuthButtons />
          </div>
        </div>
      </header>

      {/* Mobile menu (moved outside header) */}
      <>
        {/* Backdrop */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity duration-300 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}
        
        {/* Menu panel */}
        <div
          className={`${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-background shadow-xl transition-transform duration-300 ease-in-out md:hidden`}
        >
          <div className="flex h-full flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                  </svg>
                  <span className="text-lg font-semibold">Agentity</span>
                </div>
                <div className="flex items-center gap-2">
                  <ModeToggle />
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-md p-2.5 text-foreground hover:bg-accent"
                  >
                    <span className="sr-only">Close menu</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col space-y-4 px-6">
                <Link
                  href="/features"
                  className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  href="/pricing"
                  className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  href="/blog"
                  className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  href="/docs"
                  className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Documentation
                </Link>
                <Link
                  href="/about"
                  className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/faq"
                  className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  FAQ
                </Link>
                <Link
                  href="/contact"
                  className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
              <div className="mt-6 border-t border-border px-6 pt-6">
                <div className="flex flex-col space-y-4">
                  {status === "loading" ? (
                    <Button variant="ghost" disabled className="w-full justify-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </Button>
                  ) : session ? (
                    <>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          {session.user.image ? (
                            <AvatarImage src={session.user.image} alt={session.user.name || ''} />
                          ) : (
                            <AvatarFallback>
                              {session.user.name ? session.user.name.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{session.user.name}</span>
                          <span className="text-xs text-muted-foreground">{session.user.email}</span>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        onClick={handleSignOut} 
                        className="w-full justify-center"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Signing out...
                          </>
                        ) : (
                          'Sign out'
                        )}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/login">
                        <Button variant="ghost" className="w-full justify-center">
                          Sign in
                        </Button>
                      </Link>
                      <Link href="/register">
                        <Button className="w-full justify-center">Get Started</Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
              <div className="mt-6 border-t border-border px-6 pt-6">
                <div className="flex flex-col space-y-4">
                  <Link
                    href="/privacy"
                    className="text-sm text-muted-foreground hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/terms"
                    className="text-sm text-muted-foreground hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Terms & Conditions
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>

      {/* Hero Section */}
      <section className="w-full flex-1 overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative flex flex-col items-center gap-4 text-center sm:gap-6 lg:gap-8"
          >
            <div className="absolute -top-4 -z-10 h-[300px] w-[300px] bg-gradient-radial from-primary/20 to-transparent opacity-20 blur-3xl" />
            <h1 className="max-w-4xl px-4 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              AI Agents that{" "}
              <span className="bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
                adapt
              </span>{" "}
              and{" "}
              <span className="bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
                learn
            </span>
            </h1>
            <p className="max-w-[600px] px-4 text-base text-muted-foreground sm:text-lg md:text-xl">
              Empower your workflow with intelligent AI agents that understand your needs,
              adapt to your preferences, and learn from your interactions.
            </p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto">Get Started</Button>
              </Link>
              <Link href="/features">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Integration Logos Section */}
      <section className="w-full border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="flex flex-col items-center gap-8">
            <p className="text-center text-sm text-muted-foreground">Trusted by leading companies</p>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-6">
              {integrationLogos.map((logo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-center"
                >
                  <div className="h-8 w-24">
                    {logo.icon}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full border-t border-border bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8 lg:py-24 xl:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-4 text-center sm:gap-6"
          >
            <h2 className="px-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Features
          </h2>
            <p className="max-w-[600px] px-4 text-base text-muted-foreground sm:text-lg">
              Everything you need to build, deploy, and manage AI agents that work for you.
            </p>
          </motion.div>
          <div className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:mt-16 lg:grid-cols-3 lg:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent sm:p-6"
              >
                <div className="flex flex-col gap-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="w-full border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div className="flex flex-col items-center gap-2">
              <p className="text-3xl font-bold text-primary">10k+</p>
              <p className="text-sm text-muted-foreground">Active Users</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-3xl font-bold text-primary">1M+</p>
              <p className="text-sm text-muted-foreground">Tasks Completed</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-3xl font-bold text-primary">99.9%</p>
              <p className="text-sm text-muted-foreground">Uptime</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-3xl font-bold text-primary">24/7</p>
              <p className="text-sm text-muted-foreground">Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full border-t border-border bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8 lg:py-24">
          <div className="flex flex-col items-center gap-4 text-center sm:gap-6">
            <h2 className="px-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Trusted by Teams
          </h2>
            <p className="max-w-[600px] px-4 text-base text-muted-foreground sm:text-lg">
              See what our customers have to say about their experience with Agentity.
            </p>
          </div>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg border border-border bg-card p-6"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-primary/10">
                      <svg
                        className="h-full w-full text-primary/40"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{testimonial.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-primary"
                >
                  <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                </svg>
                <span className="text-sm font-semibold">Agentity</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering workflows with intelligent AI agents.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold">Product</h3>
              <div className="flex flex-col gap-2">
                <Link href="/features" className="text-sm text-muted-foreground hover:text-primary">
                  Features
                </Link>
                <Link href="/pricing" className="text-sm text-muted-foreground hover:text-primary">
                  Pricing
                </Link>
                <Link href="/docs" className="text-sm text-muted-foreground hover:text-primary">
                  Documentation
                </Link>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary">
                  Blog
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold">Company</h3>
              <div className="flex flex-col gap-2">
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
                  About
                </Link>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                  Contact
                </Link>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary">
                  FAQ
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold">Legal</h3>
              <div className="flex flex-col gap-2">
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
                  Terms & Conditions
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-8">
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} Agentity. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      </div>
  );
}

const features = [
  {
    title: "Adaptive Learning",
    description:
      "AI agents that learn from your interactions and adapt to your preferences over time.",
    icon: function Icon(props: React.ComponentProps<"svg">) {
      return (
        <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2v20M2 12h20" />
          <path d="M12 2a5 5 0 0 1 5 5" />
          <path d="M17 21a5 5 0 0 0 5-5" />
        </svg>
      );
    },
  },
  {
    title: "Plugin System",
    description:
      "Extend your agents' capabilities with a powerful plugin system that's easy to use.",
    icon: function Icon(props: React.ComponentProps<"svg">) {
      return (
        <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2v5" />
          <path d="M6 7h12l4 5-8 10-8-10 4-5" />
        </svg>
      );
    },
  },
  {
    title: "Real-time Monitoring",
    description:
      "Monitor your agents' performance and behavior in real-time with detailed analytics.",
    icon: function Icon(props: React.ComponentProps<"svg">) {
      return (
        <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      );
    },
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Product Manager at TechCorp",
    content: "Agentity has transformed how we handle customer support. The AI agents learn and adapt quickly, providing consistent and accurate responses.",
  },
  {
    name: "Michael Chen",
    role: "CTO at StartupX",
    content: "The plugin system is incredibly powerful. We've been able to extend our agents' capabilities in ways we never thought possible.",
  },
  {
    name: "Emily Rodriguez",
    role: "Operations Director at Enterprise Co",
    content: "Real-time monitoring has given us unprecedented insight into our AI operations. The analytics are comprehensive yet easy to understand.",
  },
];

const integrationLogos = [
  {
    icon: (
      <svg className="h-8 w-auto text-muted-foreground/40" viewBox="0 0 100 32" fill="currentColor">
        <path d="M50,0 L100,16 L50,32 L0,16 L50,0z M50,4 L10,16 L50,28 L90,16 L50,4z" />
      </svg>
    ),
  },
  {
    icon: (
      <svg className="h-8 w-auto text-muted-foreground/40" viewBox="0 0 100 32" fill="currentColor">
        <circle cx="16" cy="16" r="16" />
        <circle cx="50" cy="16" r="16" />
        <circle cx="84" cy="16" r="16" />
      </svg>
    ),
  },
  {
    icon: (
      <svg className="h-8 w-auto text-muted-foreground/40" viewBox="0 0 100 32" fill="currentColor">
        <rect x="0" y="0" width="32" height="32" />
        <rect x="34" y="0" width="32" height="32" />
        <rect x="68" y="0" width="32" height="32" />
      </svg>
    ),
  },
  {
    icon: (
      <svg className="h-8 w-auto text-muted-foreground/40" viewBox="0 0 100 32" fill="currentColor">
        <polygon points="16,0 32,32 0,32" />
        <polygon points="50,0 66,32 34,32" />
        <polygon points="84,0 100,32 68,32" />
      </svg>
    ),
  },
  {
    icon: (
      <svg className="h-8 w-auto text-muted-foreground/40" viewBox="0 0 100 32" fill="currentColor">
        <path d="M0,16 L32,0 L32,32 z M34,16 L66,0 L66,32 z M68,16 L100,0 L100,32 z" />
      </svg>
    ),
  },
  {
    icon: (
      <svg className="h-8 w-auto text-muted-foreground/40" viewBox="0 0 100 32" fill="currentColor">
        <path d="M16,0 A16,16 0 0,1 16,32 A16,16 0 0,1 16,0" />
        <path d="M50,0 A16,16 0 0,1 50,32 A16,16 0 0,1 50,0" />
        <path d="M84,0 A16,16 0 0,1 84,32 A16,16 0 0,1 84,0" />
      </svg>
    ),
  },
];
