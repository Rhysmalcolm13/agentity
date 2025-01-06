import { useState, useEffect } from 'react';
import { Check, Copy } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language = 'typescript',
  filename,
  className,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  // Only render syntax highlighting after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className={cn("relative rounded-md", className)}>
      {filename && (
        <div className="flex items-center justify-between border-b border-b-muted-foreground/20 rounded-t-md bg-muted px-4 py-2">
          <span className="text-sm text-muted-foreground">{filename}</span>
        </div>
      )}
      <div className="relative rounded-md">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-10 h-6 w-6"
          onClick={handleCopy}
        >
          {isCopied ? (
            <Check className="h-3 w-3 text-green-500" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </Button>
        {mounted && (
          <SyntaxHighlighter
            language={language}
            style={resolvedTheme === 'dark' ? oneDark : oneLight}
            showLineNumbers={showLineNumbers}
            customStyle={{
              margin: 0,
              borderRadius: filename ? '0 0 0.5rem 0.5rem' : '0.5rem',
              padding: '1.5rem 1rem',
              backgroundColor: 'hsl(var(--muted))',
            }}
            codeTagProps={{
              style: {
                fontSize: '14px',
                lineHeight: '1.5',
                fontFamily: 'var(--font-mono)',
                color: 'hsl(var(--foreground))',
              },
            }}
          >
            {code.trim()}
          </SyntaxHighlighter>
        )}
      </div>
    </div>
  );
}