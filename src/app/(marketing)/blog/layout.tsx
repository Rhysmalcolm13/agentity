import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Agentity',
  description: 'Latest updates and insights from Agentity',
  alternates: {
    types: {
      'application/rss+xml': '/rss.xml',
    },
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      {children}
    </div>
  );
} 