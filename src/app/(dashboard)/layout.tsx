'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  ChevronLeft,
  ChevronRight,
  Settings,
  Home,
  Bot,
  Puzzle,
  LogOut,
  FileText,
  HelpCircle,
} from 'lucide-react';

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    title: 'Overview',
    href: '/overview',
    icon: <Home className="h-5 w-5" />,
  },
  {
    title: 'Agents',
    href: '/agents',
    icon: <Bot className="h-5 w-5" />,
  },
  {
    title: 'Plugins',
    href: '/plugins',
    icon: <Puzzle className="h-5 w-5" />,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: <Settings className="h-5 w-5" />,
  },
];

// Secondary navigation items
const secondaryNavItems: NavItem[] = [
  {
    title: 'Documentation',
    href: '/docs',
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: 'Support',
    href: '/contact',
    icon: <HelpCircle className="h-5 w-5" />,
  },
  {
    title: 'FAQ',
    href: '/faq',
    icon: <HelpCircle className="h-5 w-5" />,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await signOut({ redirect: false });
      toast.success('Successfully logged out');
      router.push('/');
    } catch (error) {
      toast.error('Failed to logout');
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`relative flex flex-col border-r border-border bg-sidebar-background transition-all ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        {/* Toggle button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-4 top-6 z-40 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>

        {/* Logo */}
        <div className="flex h-16 items-center border-b border-border px-4">
          <Link href="/overview" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-sidebar-primary"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            {!isCollapsed && (
              <span className="text-lg font-semibold text-sidebar-foreground">
                Agentity
              </span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                {item.icon}
                {!isCollapsed && <span>{item.title}</span>}
              </Link>
            );
          })}

          {/* Divider */}
          <div className="my-4 border-t border-border" />

          {/* Secondary Navigation */}
          {secondaryNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-muted hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                {item.icon}
                {!isCollapsed && <span>{item.title}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-2">
          <Button
            variant="ghost"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`w-full text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground ${
              isCollapsed ? 'justify-center px-0' : ''
            }`}
          >
            <LogOut className={`h-5 w-5 ${isLoggingOut ? 'animate-pulse' : ''}`} />
            {!isCollapsed && (
              <span className="ml-2">{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
            )}
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto py-6">{children}</div>
      </main>
    </div>
  );
} 