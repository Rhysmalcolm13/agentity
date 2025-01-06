'use client';

import { Button } from '@/components/ui/button';

interface CareerCategory {
  name: string;
  positions: {
    title: string;
    type: string;
    location: string;
  }[];
}

const careerCategories: CareerCategory[] = [
  {
    name: 'Engineering',
    positions: [
      {
        title: 'Senior AI Engineer',
        type: 'Full-time',
        location: 'Melbourne',
      },
      {
        title: 'Full Stack Developer',
        type: 'Full-time',
        location: 'Remote',
      },
    ],
  },
  {
    name: 'Product & Design',
    positions: [
      {
        title: 'Product Manager',
        type: 'Full-time',
        location: 'Melbourne',
      },
      {
        title: 'UI/UX Designer',
        type: 'Full-time',
        location: 'Remote',
      },
    ],
  },
];

export function CareersSection() {
  return (
    <div>
      <div className="text-center">
        <h2 className="text-3xl font-bold">Career Opportunities</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Join us in building the future of AI technology
        </p>
      </div>

      <div className="mt-12 space-y-8">
        {careerCategories.map((category) => (
          <div key={category.name}>
            <h3 className="text-xl font-semibold">{category.name}</h3>
            <div className="mt-4 space-y-4">
              {category.positions.map((position) => (
                <div
                  key={position.title}
                  className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
                >
                  <div>
                    <h4 className="font-medium">{position.title}</h4>
                    <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{position.type}</span>
                      <span>•</span>
                      <span>{position.location}</span>
                    </div>
                  </div>
                  <Button>Apply Now</Button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 