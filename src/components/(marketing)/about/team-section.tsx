'use client';

import { Github, Linkedin, Twitter } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: 'Sarah Chen',
    role: 'CEO & Co-founder',
    bio: 'Former AI researcher at Stanford, passionate about making AI accessible to everyone.',
    image: '/team/sarah.jpg',
    social: {
      twitter: 'https://twitter.com/sarah',
      linkedin: 'https://linkedin.com/in/sarah',
      github: 'https://github.com/sarah',
    },
  },
  {
    name: 'Michael Rodriguez',
    role: 'CTO & Co-founder',
    bio: 'Ex-Google AI engineer with 10+ years of experience in machine learning.',
    image: '/team/michael.jpg',
    social: {
      twitter: 'https://twitter.com/michael',
      linkedin: 'https://linkedin.com/in/michael',
      github: 'https://github.com/michael',
    },
  },
  {
    name: 'Emily Watson',
    role: 'Head of Product',
    bio: 'Product leader focused on creating intuitive AI experiences.',
    image: '/team/emily.jpg',
    social: {
      twitter: 'https://twitter.com/emily',
      linkedin: 'https://linkedin.com/in/emily',
    },
  },
];

export function TeamSection() {
  return (
    <div>
      <div className="text-center">
        <h2 className="text-3xl font-bold">Meet Our Team</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          We're a diverse team of engineers, researchers, and designers passionate
          about AI technology.
        </p>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <div
            key={member.name}
            className="flex flex-col items-center rounded-lg border border-border bg-card p-6 text-center"
          >
            <div className="h-24 w-24 overflow-hidden rounded-full bg-muted">
              {/* Add actual images later */}
            </div>
            <h3 className="mt-4 text-xl font-semibold">{member.name}</h3>
            <p className="text-sm text-primary">{member.role}</p>
            <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
            <div className="mt-4 flex gap-4">
              {member.social.github && (
                <a
                  href={member.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Github className="h-5 w-5" />
                </a>
              )}
              {member.social.twitter && (
                <a
                  href={member.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              {member.social.linkedin && (
                <a
                  href={member.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 