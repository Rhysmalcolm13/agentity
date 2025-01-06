import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DocSection {
  title: string;
  id: string;
  subsections: {
    title: string;
    id: string;
    path?: string;
  }[];
}

const docSections: DocSection[] = [
  {
    title: 'Getting Started',
    id: 'getting-started',
    subsections: [
      { title: 'Installation', id: 'installation', path: '/docs/installation' },
      { title: 'Quick Start', id: 'quick-start', path: '/docs/quick-start' },
      { title: 'Basic Concepts', id: 'basic-concepts', path: '/docs/basic-concepts' },
    ],
  },
  {
    title: 'Core Features',
    id: 'core-features',
    subsections: [
      { title: 'Agent Creation', id: 'agent-creation', path: '/docs/agent-creation' },
      { title: 'Plugin System', id: 'plugin-system', path: '/docs/plugin-system' },
      { title: 'Training', id: 'training', path: '/docs/training' },
    ],
  },
  {
    title: 'Advanced Usage',
    id: 'advanced-usage',
    subsections: [
      { title: 'Custom Plugins', id: 'custom-plugins', path: '/docs/custom-plugins' },
      { title: 'API Integration', id: 'api-integration', path: '/docs/api-integration' },
      { title: 'Advanced Training', id: 'advanced-training', path: '/docs/advanced-training' },
    ],
  },
  {
    title: 'API Reference',
    id: 'api-reference',
    subsections: [
      { title: 'REST API', id: 'rest-api', path: '/docs/api-reference/rest-api' },
      { title: 'WebSocket API', id: 'websocket-api', path: '/docs/api-reference/websocket' },
      { title: 'SDK Reference', id: 'sdk-reference', path: '/docs/api-reference/sdk' },
    ],
  },
];

export function DocsSidebar() {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>(['getting-started']);

  // Automatically expand section based on current path
  useEffect(() => {
    const currentSection = docSections.find(section =>
      section.subsections.some(subsection => pathname.startsWith(subsection.path || `/docs/${subsection.id}`))
    );
    
    if (currentSection && !expandedSections.includes(currentSection.id)) {
      setExpandedSections(prev => [...prev, currentSection.id]);
    }
  }, [pathname]);

  const toggleSection = (id: string) => {
    setExpandedSections(prev =>
      prev.includes(id)
        ? prev.filter(s => s !== id)
        : [...prev, id]
    );
  };

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <nav className="space-y-1">
      {docSections.map((section) => {
        const isActiveSection = section.subsections.some(
          subsection => isActive(subsection.path || `/docs/${subsection.id}`)
        );

        return (
          <div key={section.id}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-between py-2 font-medium hover:bg-transparent hover:text-primary",
                isActiveSection && "text-primary"
              )}
              onClick={() => toggleSection(section.id)}
            >
              <span>{section.title}</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform",
                  expandedSections.includes(section.id) ? "rotate-180" : ""
                )}
              />
            </Button>
            {expandedSections.includes(section.id) && section.subsections && (
              <div className="ml-4 mt-1 space-y-1 border-l pl-4">
                {section.subsections.map((subsection) => {
                  const path = subsection.path || `/docs/${subsection.id}`;
                  return (
                    <Button
                      key={subsection.id}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start py-1.5 text-sm font-normal",
                        isActive(path)
                          ? "bg-accent text-accent-foreground font-medium"
                          : "text-muted-foreground hover:bg-transparent hover:text-primary"
                      )}
                      asChild
                    >
                      <Link href={path}>
                        {subsection.title}
                      </Link>
                    </Button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
} 