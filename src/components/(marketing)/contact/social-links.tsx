import { Github, Linkedin, Twitter } from 'lucide-react';

const socialLinks = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/agentity',
    icon: Twitter,
    username: '@agentity',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/agentity',
    icon: Linkedin,
    username: 'Agentity',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/agentity',
    icon: Github,
    username: '@agentity',
  },
];

export function SocialLinks() {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="text-xl font-semibold">Connect With Us</h3>
      <div className="mt-4 space-y-4">
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-muted-foreground hover:text-primary"
          >
            <social.icon className="h-5 w-5" />
            <div>
              <p className="font-medium">{social.name}</p>
              <p className="text-sm">{social.username}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
} 