import Link from 'next/link';
import { Destination } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock } from 'lucide-react';

interface DestinationCardProps {
  destination: Destination;
  link?: boolean;
}

export function DestinationCard({
  destination,
  link = true,
}: DestinationCardProps) {
  const content = (
    <div className="overflow-hidden rounded-lg border border-border bg-card hover:shadow-lg transition">
      <div
        className="relative h-48 w-full bg-muted"
        style={{
          backgroundImage: `url('${destination.image}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute top-3 right-3">
          <Badge label={destination.difficulty} variant="primary" />
        </div>
      </div>

      <div className="p-4 space-y-3">
        <h3 className="font-bold text-lg">{destination.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {destination.description}
        </p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {destination.location}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {destination.duration}h
          </div>
        </div>

        <div className="flex items-end justify-between pt-2">
          <div>
            <p className="text-xs text-muted-foreground">From</p>
            <p className="text-lg font-bold text-primary">${destination.price}</p>
          </div>
        </div>
      </div>
    </div>
  );

  if (link) {
    return (
      <Link href={`/destinations/${destination.id}`}>
        {content}
      </Link>
    );
  }

  return content;
}
