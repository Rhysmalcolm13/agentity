'use client';

import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OfficeLocation {
  city: string;
  country: string;
  address: string;
  image: string;
}

const officeLocations: OfficeLocation[] = [
  {
    city: 'Melbourne',
    country: 'Australia',
    address: '101 Collins Street, VIC 3000',
    image: '/offices/melbourne.jpg',
  },
];

export function HeadquartersSection() {
  return (
    <div>
      <div className="text-center">
        <h2 className="text-3xl font-bold">Our Headquarters</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Located in the heart of Melbourne's business district
        </p>
      </div>

      <div className="mt-12 max-w-2xl mx-auto">
        {officeLocations.map((office) => (
          <div
            key={office.city}
            className="overflow-hidden rounded-lg border border-border bg-card"
          >
            <div className="aspect-video w-full">
              <iframe 
                width="100%"
                height="100%"
                frameBorder="0" 
                style={{border: 0}}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(`${office.address}, ${office.city}, ${office.country}`)}&output=embed`}
                allowFullScreen
              />
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{office.city}</h3>
                  <p className="text-sm text-muted-foreground">{office.country}</p>
                </div>
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {office.address}
              </p>
              <Button 
                variant="outline" 
                className="mt-4" 
                size="sm"
                onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(`${office.address}, ${office.city}, ${office.country}`)}`, '_blank')}
              >
                Get Directions
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}