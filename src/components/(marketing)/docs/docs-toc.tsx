import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function DocsToc() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('h2, h3, h4'))
      .map(element => ({
        id: element.id,
        text: element.textContent || '',
        level: Number(element.tagName.charAt(1)),
      }));
    setHeadings(elements);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0% 0% -80% 0%' }
    );

    const elements = document.querySelectorAll('h2, h3, h4');
    elements.forEach((elem) => observer.observe(elem));

    return () => {
      elements.forEach((elem) => observer.unobserve(elem));
    };
  }, []);

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <p className="font-medium">On This Page</p>
      <div className="space-y-1">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={`block text-sm transition-colors hover:text-foreground ${
              activeId === heading.id
                ? 'text-foreground'
                : 'text-muted-foreground'
            } ${heading.level === 2 ? '' : 'ml-4'}`}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector(`#${heading.id}`)?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest',
              });
            }}
          >
            {heading.text}
          </a>
        ))}
      </div>
    </div>
  );
} 